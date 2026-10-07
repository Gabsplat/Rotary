import type { Operacion } from "@/lib/rifa";
import React from "react";
import { confirmar, liberar, rendir } from "./acciones";
import { BotonConfirmar } from "./componentes";

export const pesos = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

const fecha = new Intl.DateTimeFormat("es-AR", {
  timeZone: "America/Argentina/Mendoza",
  day: "2-digit",
  month: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

export const campo =
  "mt-2 w-full rounded-xl border border-ink/20 bg-white px-4 py-2.5 text-base font-normal normal-case tracking-normal text-ink outline-none focus:border-blue-rotary";
export const etiqueta =
  "block text-xs font-bold uppercase tracking-[0.18em] text-ink/60";
export const boton =
  "inline-flex items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-bold tracking-wide text-white transition-colors hover:bg-blue-rotary";
const botonChico =
  "rounded-full px-4 py-2 text-xs font-bold transition-colors";

export function Tarjeta({
  titulo,
  children,
  oscura,
}: {
  titulo?: string;
  children: React.ReactNode;
  oscura?: boolean;
}) {
  return (
    <section
      className={`rounded-3xl p-6 sm:p-8 ${oscura ? "bg-ink text-white" : "bg-white"}`}
    >
      {titulo && (
        <h2 className="mb-6 font-display text-2xl tracking-tight">{titulo}</h2>
      )}
      {children}
    </section>
  );
}

export function Avisos({
  searchParams,
}: {
  searchParams: { ok?: string; error?: string };
}) {
  if (searchParams.error)
    return (
      <p role="alert" className="rounded-2xl bg-red-50 px-5 py-4 text-sm font-semibold text-red-800">
        {searchParams.error}
      </p>
    );
  if (searchParams.ok)
    return (
      <p role="status" className="rounded-2xl bg-blue-rotary/10 px-5 py-4 text-sm font-semibold text-blue-rotary">
        Cambios guardados.
      </p>
    );
  return null;
}

const ESTADOS: Record<Operacion["estado"], { texto: string; clase: string }> = {
  reservada: { texto: "Reservada", clase: "bg-gold-rotary/30 text-ink" },
  pendiente: { texto: "Por verificar", clase: "bg-gold-rotary text-ink" },
  confirmada: { texto: "Vendida", clase: "bg-blue-rotary text-white" },
  liberada: { texto: "Liberada", clase: "bg-ink/10 text-ink/60" },
  vencida: { texto: "Vencida", clase: "bg-ink/10 text-ink/60" },
};

function enlaceWhatsApp(telefono: string) {
  const digitos = telefono.replace(/\D/g, "").replace(/^0/, "");
  return `https://wa.me/${digitos.startsWith("54") ? digitos : `549${digitos}`}`;
}

export function ListaOperaciones({
  operaciones,
  volver,
  vacio,
}: {
  operaciones: Operacion[];
  volver: string;
  vacio: string;
}) {
  if (operaciones.length === 0)
    return <p className="text-ink/60">{vacio}</p>;

  return (
    <ul className="divide-y divide-ink/10">
      {operaciones.map((operacion) => {
        const estado = ESTADOS[operacion.estado];
        const viva = ["reservada", "pendiente", "confirmada"].includes(
          operacion.estado
        );
        return (
          <li
            key={operacion.id}
            className="flex flex-col gap-4 py-5 lg:flex-row lg:items-center lg:justify-between"
          >
            <div className="flex items-start gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-paper font-display text-2xl">
                {operacion.numero}
              </span>
              <div className="min-w-0">
                <p className="font-bold">{operacion.comprador_nombre}</p>
                <p className="text-sm text-ink/70">
                  <a
                    className="underline decoration-ink/30 hover:text-blue-rotary"
                    href={enlaceWhatsApp(operacion.comprador_telefono)}
                    target="_blank"
                  >
                    {operacion.comprador_telefono}
                  </a>{" "}
                  · Vendió {operacion.vendedor_nombre || "sin asignar"} ·{" "}
                  {fecha.format(operacion.creado_en)}
                </p>
                <p className="mt-2 flex flex-wrap items-center gap-2 text-xs font-bold">
                  <span className={`rounded-full px-3 py-1 ${estado.clase}`}>
                    {estado.texto}
                  </span>
                  <span className="rounded-full border border-ink/15 px-3 py-1">
                    {operacion.medio === "efectivo" ? "Efectivo" : "Transferencia"}
                  </span>
                  {operacion.medio === "efectivo" &&
                    operacion.estado === "confirmada" && (
                      <span className="rounded-full border border-ink/15 px-3 py-1">
                        {operacion.rendido ? "Rendido" : "Sin rendir"}
                      </span>
                    )}
                  {operacion.prueba && (
                    <span className="rounded-full border border-ink/15 px-3 py-1 text-ink/50">
                      Prueba
                    </span>
                  )}
                  {operacion.resuelto_por && (
                    <span className="font-normal text-ink/50">
                      por {operacion.resuelto_por}
                    </span>
                  )}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {operacion.tiene_comprobante && (
                <a
                  href={`/api/panel/comprobante/${operacion.id}`}
                  target="_blank"
                  className={`${botonChico} border border-ink/20 hover:bg-ink hover:text-white`}
                >
                  Ver comprobante
                </a>
              )}
              {operacion.estado === "pendiente" && (
                <form action={confirmar}>
                  <input type="hidden" name="id" value={operacion.id} />
                  <input type="hidden" name="volver" value={volver} />
                  <BotonConfirmar
                    pregunta={`¿Confirmás que ingresó el pago del número ${operacion.numero}?`}
                    className={`${botonChico} bg-blue-rotary text-white hover:bg-ink`}
                  >
                    Confirmar pago
                  </BotonConfirmar>
                </form>
              )}
              {operacion.medio === "efectivo" &&
                operacion.estado === "confirmada" &&
                !operacion.rendido && (
                  <form action={rendir}>
                    <input type="hidden" name="id" value={operacion.id} />
                    <input type="hidden" name="volver" value={volver} />
                    <BotonConfirmar
                      pregunta={`¿El vendedor rindió el efectivo del número ${operacion.numero}?`}
                      className={`${botonChico} bg-blue-rotary text-white hover:bg-ink`}
                    >
                      Marcar rendido
                    </BotonConfirmar>
                  </form>
                )}
              {viva && (
                <form action={liberar}>
                  <input type="hidden" name="id" value={operacion.id} />
                  <input type="hidden" name="volver" value={volver} />
                  <BotonConfirmar
                    pregunta={
                      operacion.estado === "confirmada"
                        ? `El número ${operacion.numero} ya está vendido. ¿Anular la venta y liberarlo?`
                        : `¿Liberar el número ${operacion.numero}?`
                    }
                    className={`${botonChico} border border-red-700/30 text-red-800 hover:bg-red-700 hover:text-white`}
                  >
                    {operacion.estado === "confirmada" ? "Anular venta" : "Liberar"}
                  </BotonConfirmar>
                </form>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
