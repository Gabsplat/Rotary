"use client";

import type { EstadoPublico } from "@/lib/rifa";
import { Check, Copy, X } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";

const CLAVE_RESERVA = "rifa-reserva";
const MAX_COMPROBANTE = 4 * 1024 * 1024;

type Vendedor = { id: number; nombre: string };

type Reserva = {
  token: string;
  numero: number;
  venceEn: string | null;
  alias: string;
  titular: string;
  precio: number;
};

type Paso =
  | { tipo: "datos"; numero: number }
  | { tipo: "pago"; reserva: Reserva }
  | { tipo: "enviado"; numero: number };

const pesos = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

async function pedir(url: string, init?: RequestInit) {
  const respuesta = await fetch(url, init);
  const cuerpo = await respuesta.json().catch(() => ({}));
  if (!respuesta.ok)
    throw new Error(cuerpo.error || "No pudimos procesar el pedido.");
  return cuerpo;
}

export default function Rifa({
  numerosIniciales,
  vendedores,
  vendedorInicial,
}: {
  numerosIniciales: EstadoPublico[];
  vendedores: Vendedor[];
  vendedorInicial?: number;
}) {
  const [numeros, setNumeros] = useState(numerosIniciales);
  const [paso, setPaso] = useState<Paso | null>(null);
  const [reservaGuardada, setReservaGuardada] = useState<Reserva | null>(null);

  const actualizar = useCallback(async () => {
    try {
      setNumeros((await pedir("/api/rifa/estado")).numeros);
    } catch {
      // Se reintenta en el próximo ciclo.
    }
  }, []);

  useEffect(() => {
    const intervalo = setInterval(actualizar, 10_000);
    return () => clearInterval(intervalo);
  }, [actualizar]);

  // Retoma una reserva en curso si el comprador recargó o cerró la página.
  useEffect(() => {
    const token = localStorage.getItem(CLAVE_RESERVA);
    if (!token) return;
    pedir(`/api/rifa/reserva?token=${encodeURIComponent(token)}`)
      .then(({ reserva }) => {
        if (reserva?.estado === "reservada")
          setReservaGuardada({ token, ...reserva });
        else localStorage.removeItem(CLAVE_RESERVA);
      })
      .catch(() => {});
  }, []);

  function cerrar() {
    setPaso(null);
    actualizar();
  }

  const disponibles = numeros.filter((estado) => estado === "disponible").length;

  return (
    <div>
      {reservaGuardada && !paso && (
        <button
          onClick={() => setPaso({ tipo: "pago", reserva: reservaGuardada })}
          className="mb-6 w-full rounded-2xl bg-ink px-5 py-4 text-left text-sm font-semibold text-white transition-colors hover:bg-blue-rotary"
        >
          Tenés el número {reservaGuardada.numero} reservado. Tocá acá para
          enviar el comprobante.
        </button>
      )}

      <div className="rounded-3xl bg-white p-5 sm:p-8 shadow-2xl shadow-ink/10">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="font-display text-2xl tracking-tight">
            Elegí tu número
          </h2>
          <span className="text-sm text-ink/60">
            {disponibles} de {numeros.length} disponibles
          </span>
        </div>
        <div className="mt-6 grid grid-cols-5 gap-2 sm:grid-cols-10">
          {numeros.map((estado, i) => (
            <button
              key={i}
              disabled={estado !== "disponible"}
              onClick={() => setPaso({ tipo: "datos", numero: i + 1 })}
              aria-label={`Número ${i + 1}, ${estado}`}
              className={`aspect-square rounded-xl text-sm font-bold transition-colors ${
                estado === "disponible"
                  ? "border border-ink/15 hover:bg-ink hover:text-white"
                  : estado === "reservado"
                  ? "bg-gold-rotary/30 text-ink/50"
                  : "bg-ink/10 text-ink/30 line-through"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold text-ink/60">
          <Leyenda className="border border-ink/15" texto="Disponible" />
          <Leyenda className="bg-gold-rotary/30" texto="Reservado" />
          <Leyenda className="bg-ink/10" texto="Vendido" />
        </ul>
      </div>

      {paso && (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-ink/60 p-0 sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-paper p-6 sm:rounded-3xl sm:p-8">
            <button
              onClick={cerrar}
              aria-label="Cerrar"
              className="absolute right-4 top-4 rounded-full p-2 text-ink/60 hover:bg-ink/10"
            >
              <X size={20} />
            </button>
            {paso.tipo === "datos" && (
              <FormularioDatos
                numero={paso.numero}
                vendedores={vendedores}
                vendedorInicial={vendedorInicial}
                onReservado={(reserva) => {
                  localStorage.setItem(CLAVE_RESERVA, reserva.token);
                  setReservaGuardada(reserva);
                  setPaso({ tipo: "pago", reserva });
                  actualizar();
                }}
              />
            )}
            {paso.tipo === "pago" && (
              <Pago
                reserva={paso.reserva}
                onEnviado={() => {
                  localStorage.removeItem(CLAVE_RESERVA);
                  setReservaGuardada(null);
                  setPaso({ tipo: "enviado", numero: paso.reserva.numero });
                  actualizar();
                }}
              />
            )}
            {paso.tipo === "enviado" && (
              <div className="py-4 text-center">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-rotary text-white">
                  <Check size={28} />
                </span>
                <h3 className="mt-6 font-display text-3xl tracking-tight">
                  Recibimos tu comprobante
                </h3>
                <p className="mt-4 text-ink/70">
                  El número {paso.numero} queda bloqueado a tu nombre mientras
                  un socio del club verifica que el pago ingresó. Tu vendedor
                  te va a avisar cuando esté confirmado.
                </p>
                <button onClick={cerrar} className={`${botonPrimario} mt-8`}>
                  Listo
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const botonPrimario =
  "inline-flex w-full items-center justify-center rounded-full bg-ink px-7 py-3.5 text-sm font-bold tracking-wide text-white transition-colors hover:bg-blue-rotary disabled:opacity-50";
const campo =
  "mt-2 w-full rounded-xl border border-ink/20 bg-white px-4 py-3 text-base font-normal normal-case tracking-normal text-ink outline-none focus:border-blue-rotary";
const etiqueta = "block text-xs font-bold uppercase tracking-[0.18em] text-ink/60";

function Leyenda({ className, texto }: { className: string; texto: string }) {
  return (
    <li className="flex items-center gap-2">
      <span className={`h-4 w-4 rounded ${className}`} />
      {texto}
    </li>
  );
}

function Aviso({ children }: { children: React.ReactNode }) {
  return (
    <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">
      {children}
    </p>
  );
}

function FormularioDatos({
  numero,
  vendedores,
  vendedorInicial,
  onReservado,
}: {
  numero: number;
  vendedores: Vendedor[];
  vendedorInicial?: number;
  onReservado: (reserva: Reserva) => void;
}) {
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function enviar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const datos = new FormData(evento.currentTarget);
    setEnviando(true);
    setError("");
    try {
      const reserva = await pedir("/api/rifa/reservar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          numero,
          nombre: datos.get("nombre"),
          telefono: datos.get("telefono"),
          vendedorId: datos.get("vendedor"),
        }),
      });
      onReservado(reserva);
    } catch (e) {
      setError((e as Error).message);
      setEnviando(false);
    }
  }

  return (
    <form onSubmit={enviar} className="space-y-5">
      <h3 className="font-display text-3xl tracking-tight">
        Número <span className="italic text-blue-rotary">{numero}</span>
      </h3>
      <p className="text-ink/70">
        Completá tus datos para reservarlo durante 15 minutos.
      </p>
      <label className={etiqueta}>
        Nombre y apellido
        <input name="nombre" required minLength={3} maxLength={80} autoComplete="name" className={campo} />
      </label>
      <label className={etiqueta}>
        Teléfono
        <input name="telefono" required type="tel" maxLength={30} autoComplete="tel" placeholder="261 555 5555" className={campo} />
      </label>
      <label className={etiqueta}>
        ¿Quién te lo vendió?
        <select name="vendedor" required defaultValue={vendedorInicial ?? ""} className={campo}>
          <option value="" disabled>
            Elegí un vendedor
          </option>
          {vendedores.map((vendedor) => (
            <option key={vendedor.id} value={vendedor.id}>
              {vendedor.nombre}
            </option>
          ))}
        </select>
      </label>
      {error && <Aviso>{error}</Aviso>}
      <button disabled={enviando} className={botonPrimario}>
        {enviando ? "Reservando…" : "Reservar número"}
      </button>
    </form>
  );
}

function useRestante(venceEn: string | null) {
  const [ahora, setAhora] = useState(() => Date.now());
  useEffect(() => {
    const intervalo = setInterval(() => setAhora(Date.now()), 1000);
    return () => clearInterval(intervalo);
  }, []);
  if (!venceEn) return 0;
  return Math.max(0, Math.floor((new Date(venceEn).getTime() - ahora) / 1000));
}

// Las fotos de celular suelen superar el límite; se achican antes de subir.
async function achicarImagen(archivo: File): Promise<File> {
  if (!archivo.type.startsWith("image/") || archivo.size < 1.5 * 1024 * 1024)
    return archivo;
  try {
    const imagen = await createImageBitmap(archivo);
    const escala = Math.min(1, 1800 / Math.max(imagen.width, imagen.height));
    const lienzo = document.createElement("canvas");
    lienzo.width = Math.round(imagen.width * escala);
    lienzo.height = Math.round(imagen.height * escala);
    lienzo.getContext("2d")!.drawImage(imagen, 0, 0, lienzo.width, lienzo.height);
    const blob = await new Promise<Blob | null>((resolver) =>
      lienzo.toBlob(resolver, "image/jpeg", 0.82)
    );
    return blob ? new File([blob], "comprobante.jpg", { type: "image/jpeg" }) : archivo;
  } catch {
    return archivo;
  }
}

function Pago({
  reserva,
  onEnviado,
}: {
  reserva: Reserva;
  onEnviado: () => void;
}) {
  const restante = useRestante(reserva.venceEn);
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [copiado, setCopiado] = useState(false);

  async function enviar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const original = new FormData(evento.currentTarget).get("comprobante");
    if (!(original instanceof File) || original.size === 0) return;
    setEnviando(true);
    setError("");
    try {
      const archivo = await achicarImagen(original);
      if (archivo.size > MAX_COMPROBANTE)
        throw new Error("El comprobante supera los 4 MB.");
      const cuerpo = new FormData();
      cuerpo.set("token", reserva.token);
      cuerpo.set("comprobante", archivo);
      await pedir("/api/rifa/comprobante", { method: "POST", body: cuerpo });
      onEnviado();
    } catch (e) {
      setError((e as Error).message);
      setEnviando(false);
    }
  }

  const minutos = String(Math.floor(restante / 60)).padStart(2, "0");
  const segundos = String(restante % 60).padStart(2, "0");

  return (
    <form onSubmit={enviar} className="space-y-5">
      <h3 className="font-display text-3xl tracking-tight">
        Número <span className="italic text-blue-rotary">{reserva.numero}</span>{" "}
        reservado
      </h3>
      {restante > 0 ? (
        <p className="text-ink/70">
          Tenés{" "}
          <span className="font-bold tabular-nums text-ink">
            {minutos}:{segundos}
          </span>{" "}
          para transferir y enviar el comprobante.
        </p>
      ) : (
        <Aviso>
          Se cumplieron los 15 minutos. Si ya transferiste, enviá el
          comprobante igual: vale mientras nadie más haya tomado el número.
        </Aviso>
      )}

      <dl className="divide-y divide-ink/10 rounded-2xl bg-white px-5">
        {reserva.precio > 0 && (
          <Fila etiqueta="Monto" valor={pesos.format(reserva.precio)} />
        )}
        <div className="flex items-center justify-between gap-4 py-3">
          <dt className="text-xs font-bold uppercase tracking-[0.18em] text-ink/50">
            Alias o CBU
          </dt>
          <dd className="flex items-center gap-2 text-right font-semibold break-all">
            {reserva.alias || "A confirmar"}
            {reserva.alias && (
              <button
                type="button"
                aria-label="Copiar alias"
                onClick={() => {
                  navigator.clipboard?.writeText(reserva.alias);
                  setCopiado(true);
                }}
                className="rounded-full p-2 text-blue-rotary hover:bg-ink/10"
              >
                {copiado ? <Check size={16} /> : <Copy size={16} />}
              </button>
            )}
          </dd>
        </div>
        {reserva.titular && <Fila etiqueta="Titular" valor={reserva.titular} />}
      </dl>

      <label className={etiqueta}>
        Comprobante (JPG, PNG o PDF, hasta 4 MB)
        <input
          name="comprobante"
          type="file"
          required
          accept="image/jpeg,image/png,application/pdf"
          className="mt-2 block w-full text-sm font-normal normal-case tracking-normal file:mr-4 file:rounded-full file:border-0 file:bg-ink file:px-5 file:py-2.5 file:text-sm file:font-bold file:text-white"
        />
      </label>
      {error && <Aviso>{error}</Aviso>}
      <button disabled={enviando} className={botonPrimario}>
        {enviando ? "Enviando…" : "Enviar comprobante"}
      </button>
      <p className="text-xs text-ink/50">
        El comprobante no confirma el pago por sí solo: un socio del club
        verifica que el dinero haya ingresado.
      </p>
    </form>
  );
}

function Fila({ etiqueta, valor }: { etiqueta: string; valor: string }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <dt className="text-xs font-bold uppercase tracking-[0.18em] text-ink/50">
        {etiqueta}
      </dt>
      <dd className="text-right font-semibold">{valor}</dd>
    </div>
  );
}
