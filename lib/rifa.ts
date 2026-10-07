import { randomBytes } from "node:crypto";
import type { TransactionSql } from "postgres";
import { db } from "./db";

export const TOTAL_NUMEROS = 100;
export const MINUTOS_RESERVA = 15;
// El límite de Vercel para el cuerpo de una petición es 4,5 MB.
export const MAX_COMPROBANTE = 4 * 1024 * 1024;
const MAX_RESERVAS_POR_TELEFONO = 3;

export type Config = {
  nombre: string;
  precio: number;
  alias: string;
  titular: string;
  premio: string;
  sorteo: string;
  activa: boolean;
};

export type EstadoPublico = "disponible" | "reservado" | "vendido";

export type Operacion = {
  id: number;
  numero: number;
  // "vencida" incluye las reservas cuyo plazo pasó aunque nadie las haya pisado.
  estado: "reservada" | "pendiente" | "confirmada" | "liberada" | "vencida";
  medio: "transferencia" | "efectivo";
  comprador_nombre: string;
  comprador_telefono: string;
  vendedor_id: number | null;
  vendedor_nombre: string | null;
  vence_en: Date | null;
  prueba: boolean;
  rendido: boolean;
  creado_en: Date;
  resuelto_en: Date | null;
  resuelto_por: string | null;
  tiene_comprobante: boolean;
};

export class ErrorRifa extends Error {}

// Una reserva vencida sigue guardada como "reservada" hasta que alguien pide
// ese número; mientras tanto se la trata como libre.
const VIVA = `(o.estado IN ('pendiente', 'confirmada')
  OR (o.estado = 'reservada' AND o.vence_en > now()))`;

export async function obtenerConfig(): Promise<Config> {
  const [config] = await db()<Config[]>`
    SELECT nombre, precio, alias, titular, premio, sorteo, activa
    FROM rifa_config WHERE id = 1`;
  return config;
}

export async function estadoPublico(): Promise<EstadoPublico[]> {
  const filas = await db().unsafe<{ numero: number; estado: string }[]>(
    `SELECT o.numero, o.estado FROM operaciones o WHERE ${VIVA}`
  );
  const estados: EstadoPublico[] = Array(TOTAL_NUMEROS).fill("disponible");
  for (const fila of filas) {
    estados[fila.numero - 1] =
      fila.estado === "confirmada" ? "vendido" : "reservado";
  }
  return estados;
}

export async function vendedoresPublicos() {
  return db()<{ id: number; nombre: string }[]>`
    SELECT id, nombre FROM socios
    WHERE activo AND nombre <> '' ORDER BY nombre`;
}

function limpiarTexto(valor: unknown, max: number) {
  return String(valor ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

function validarComprador(nombre: unknown, telefono: unknown) {
  const n = limpiarTexto(nombre, 80);
  const t = limpiarTexto(telefono, 30);
  if (n.length < 3) throw new ErrorRifa("Ingresá tu nombre y apellido.");
  if (t.replace(/\D/g, "").length < 8)
    throw new ErrorRifa("Ingresá un teléfono válido, con código de área.");
  return { nombre: n, telefono: t };
}

function validarNumero(numero: unknown) {
  const n = Number(numero);
  if (!Number.isInteger(n) || n < 1 || n > TOTAL_NUMEROS)
    throw new ErrorRifa("Número inválido.");
  return n;
}

async function validarVendedor(vendedorId: unknown) {
  const id = Number(vendedorId);
  if (!Number.isInteger(id) || id < 1) return null;
  const [socio] = await db()`SELECT id FROM socios WHERE id = ${id} AND activo`;
  return socio ? id : null;
}

export async function reservar(datos: {
  numero: unknown;
  nombre: unknown;
  telefono: unknown;
  vendedorId: unknown;
}) {
  const numero = validarNumero(datos.numero);
  const { nombre, telefono } = validarComprador(datos.nombre, datos.telefono);
  const vendedorId = await validarVendedor(datos.vendedorId);
  if (!vendedorId) throw new ErrorRifa("Elegí quién te vendió el número.");
  const config = await obtenerConfig();
  const token = randomBytes(24).toString("base64url");

  const reserva = await db().begin(async (tx) => {
    const [{ abiertas }] = await tx<{ abiertas: number }[]>`
      SELECT count(*)::int AS abiertas FROM operaciones
      WHERE comprador_telefono = ${telefono}
        AND estado = 'reservada' AND vence_en > now()`;
    if (abiertas >= MAX_RESERVAS_POR_TELEFONO)
      throw new ErrorRifa(
        "Ya tenés reservas sin pagar. Enviá esos comprobantes antes de reservar otro número."
      );

    await tx`
      UPDATE operaciones SET estado = 'vencida', resuelto_en = now()
      WHERE numero = ${numero} AND estado = 'reservada' AND vence_en <= now()`;

    // Si otra persona ganó el número, el índice único descarta esta fila.
    const [fila] = await tx<{ vence_en: Date }[]>`
      INSERT INTO operaciones
        (numero, estado, comprador_nombre, comprador_telefono, vendedor_id,
         token, vence_en, prueba)
      VALUES
        (${numero}, 'reservada', ${nombre}, ${telefono}, ${vendedorId},
         ${token}, now() + make_interval(mins => ${MINUTOS_RESERVA}),
         ${!config.activa})
      ON CONFLICT (numero)
        WHERE estado IN ('reservada', 'pendiente', 'confirmada')
        DO NOTHING
      RETURNING vence_en`;
    return fila;
  });

  if (!reserva)
    throw new ErrorRifa("Ese número acaba de ser reservado. Elegí otro.");
  return { token, numero, venceEn: reserva.vence_en };
}

export async function reservaPorToken(token: string) {
  const [fila] = await db()<
    { numero: number; estado: Operacion["estado"]; vence_en: Date | null }[]
  >`
    SELECT numero, estado, vence_en FROM operaciones WHERE token = ${token}`;
  return fila ?? null;
}

const FIRMAS: { mime: string; firma: number[] }[] = [
  { mime: "image/jpeg", firma: [0xff, 0xd8, 0xff] },
  { mime: "image/png", firma: [0x89, 0x50, 0x4e, 0x47] },
  { mime: "application/pdf", firma: [0x25, 0x50, 0x44, 0x46] },
];

// El tipo se decide por el contenido real, no por lo que declara el navegador.
function detectarMime(datos: Buffer) {
  return FIRMAS.find(({ firma }) => firma.every((byte, i) => datos[i] === byte))
    ?.mime;
}

export async function adjuntarComprobante(
  token: string,
  archivo: { nombre: string; datos: Buffer }
) {
  if (archivo.datos.length === 0) throw new ErrorRifa("El archivo está vacío.");
  if (archivo.datos.length > MAX_COMPROBANTE)
    throw new ErrorRifa("El comprobante supera los 4 MB.");
  const mime = detectarMime(archivo.datos);
  if (!mime) throw new ErrorRifa("El comprobante debe ser JPG, PNG o PDF.");

  const numero = await db().begin(async (tx) => {
    // Se acepta aunque hayan pasado los 15 minutos, siempre que nadie más
    // haya tomado el número: en ese caso la reserva ya figura como vencida.
    const [operacion] = await tx<{ id: number; numero: number }[]>`
      UPDATE operaciones
      SET estado = 'pendiente', comprobante_en = now(), vence_en = NULL
      WHERE token = ${token} AND estado = 'reservada'
      RETURNING id, numero`;
    if (!operacion) return null;
    await tx`
      INSERT INTO comprobantes (operacion_id, mime, nombre, datos)
      VALUES (${operacion.id}, ${mime}, ${limpiarTexto(archivo.nombre, 120)},
              ${archivo.datos})`;
    return operacion.numero;
  });

  if (numero === null) {
    const reserva = await reservaPorToken(token);
    if (!reserva) throw new ErrorRifa("No encontramos esa reserva.");
    if (reserva.estado === "pendiente" || reserva.estado === "confirmada")
      throw new ErrorRifa("Ya recibimos el comprobante de este número.");
    throw new ErrorRifa(
      "La reserva venció y el número fue tomado por otra persona. Escribile a tu vendedor."
    );
  }
  return numero;
}

// ---- Panel de socios ----

const CAMPOS_OPERACION = `
  o.id, o.numero, o.medio, o.comprador_nombre, o.comprador_telefono,
  o.vendedor_id, s.nombre AS vendedor_nombre, o.vence_en, o.prueba, o.rendido,
  o.creado_en, o.resuelto_en, o.resuelto_por,
  CASE WHEN o.estado = 'reservada' AND o.vence_en <= now()
    THEN 'vencida' ELSE o.estado END AS estado,
  EXISTS (SELECT 1 FROM comprobantes c WHERE c.operacion_id = o.id)
    AS tiene_comprobante`;

export async function listarOperaciones(filtro?: { vendedorId?: number }) {
  const condicion = filtro?.vendedorId ? "WHERE o.vendedor_id = $1" : "";
  return db().unsafe<Operacion[]>(
    `SELECT ${CAMPOS_OPERACION}
     FROM operaciones o LEFT JOIN socios s ON s.id = o.vendedor_id
     ${condicion}
     ORDER BY o.creado_en DESC`,
    filtro?.vendedorId ? [filtro.vendedorId] : []
  );
}

export async function obtenerComprobante(operacionId: number) {
  const [fila] = await db()<{ mime: string; datos: Buffer }[]>`
    SELECT mime, datos FROM comprobantes WHERE operacion_id = ${operacionId}`;
  return fila ?? null;
}

async function auditar(
  tx: TransactionSql,
  email: string,
  accion: string,
  operacionId: number | null,
  detalle = ""
) {
  await tx`
    INSERT INTO auditoria (socio_email, accion, operacion_id, detalle)
    VALUES (${email}, ${accion}, ${operacionId}, ${detalle})`;
}

export async function confirmarPago(id: number, email: string) {
  await db().begin(async (tx) => {
    const [fila] = await tx`
      UPDATE operaciones
      SET estado = 'confirmada', resuelto_en = now(), resuelto_por = ${email}
      WHERE id = ${id} AND estado = 'pendiente' RETURNING id`;
    if (!fila) throw new ErrorRifa("La operación ya no está pendiente.");
    await auditar(tx, email, "confirmar", id);
  });
}

export async function liberarOperacion(id: number, email: string) {
  await db().begin(async (tx) => {
    const [fila] = await tx<{ estado: string }[]>`
      UPDATE operaciones o
      SET estado = 'liberada', resuelto_en = now(), resuelto_por = ${email}
      FROM (SELECT id, estado FROM operaciones WHERE id = ${id} FOR UPDATE) previo
      WHERE o.id = previo.id
        AND previo.estado IN ('reservada', 'pendiente', 'confirmada')
      RETURNING previo.estado`;
    if (!fila) throw new ErrorRifa("La operación ya no está activa.");
    await auditar(tx, email, "liberar", id, `estaba ${fila.estado}`);
  });
}

export async function registrarEfectivo(
  datos: { numero: unknown; nombre: unknown; telefono: unknown; vendedorId: unknown },
  email: string
) {
  const numero = validarNumero(datos.numero);
  const { nombre, telefono } = validarComprador(datos.nombre, datos.telefono);
  const vendedorId = await validarVendedor(datos.vendedorId);
  if (!vendedorId) throw new ErrorRifa("Elegí el vendedor.");
  const config = await obtenerConfig();

  await db().begin(async (tx) => {
    await tx`
      UPDATE operaciones SET estado = 'vencida', resuelto_en = now()
      WHERE numero = ${numero} AND estado = 'reservada' AND vence_en <= now()`;
    const [fila] = await tx<{ id: number }[]>`
      INSERT INTO operaciones
        (numero, estado, medio, comprador_nombre, comprador_telefono,
         vendedor_id, token, prueba, resuelto_en, resuelto_por)
      VALUES
        (${numero}, 'confirmada', 'efectivo', ${nombre}, ${telefono},
         ${vendedorId}, ${randomBytes(24).toString("base64url")},
         ${!config.activa}, now(), ${email})
      ON CONFLICT (numero)
        WHERE estado IN ('reservada', 'pendiente', 'confirmada')
        DO NOTHING
      RETURNING id`;
    if (!fila)
      throw new ErrorRifa(`El número ${numero} ya está reservado o vendido.`);
    await auditar(tx, email, "efectivo", fila.id);
  });
}

export async function marcarRendido(id: number, email: string) {
  await db().begin(async (tx) => {
    const [fila] = await tx`
      UPDATE operaciones SET rendido = true
      WHERE id = ${id} AND medio = 'efectivo' AND estado = 'confirmada'
        AND NOT rendido
      RETURNING id`;
    if (!fila) throw new ErrorRifa("Esa venta no tiene efectivo por rendir.");
    await auditar(tx, email, "rendir", id);
  });
}

export async function guardarConfig(datos: Omit<Config, "activa">, email: string) {
  const precio = Math.trunc(Number(datos.precio));
  if (!Number.isFinite(precio) || precio < 0)
    throw new ErrorRifa("El precio no es válido.");
  await db().begin(async (tx) => {
    await tx`
      UPDATE rifa_config SET
        nombre = ${limpiarTexto(datos.nombre, 80) || "Rifa solidaria"},
        precio = ${precio},
        alias = ${limpiarTexto(datos.alias, 60)},
        titular = ${limpiarTexto(datos.titular, 80)},
        premio = ${limpiarTexto(datos.premio, 200)},
        sorteo = ${limpiarTexto(datos.sorteo, 200)}
      WHERE id = 1`;
    await auditar(tx, email, "configurar", null);
  });
}

// Pasa de modo prueba a ventas reales: borra las operaciones de prueba y deja
// los 100 números disponibles.
export async function activarRifa(email: string) {
  const config = await obtenerConfig();
  if (config.activa) throw new ErrorRifa("La rifa ya está activa.");
  if (!config.alias || !config.titular || config.precio <= 0)
    throw new ErrorRifa(
      "Antes de activar completá el precio, el alias o CBU y el titular."
    );
  await db().begin(async (tx) => {
    await tx`DELETE FROM operaciones WHERE prueba`;
    await tx`UPDATE rifa_config SET activa = true, activada_en = now() WHERE id = 1`;
    await auditar(tx, email, "activar", null);
  });
}
