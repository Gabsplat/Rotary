"use client";

import React, { useRef } from "react";

// Boleto que se inclina y brilla siguiendo al puntero. La inclinación se
// escribe directo en el estilo, sin pasar por el estado de React.
export default function Boleto({
  numero,
  premio,
  precio,
  sello,
  className,
}: {
  numero: number | null;
  premio?: string;
  precio?: string;
  sello?: string;
  className?: string;
}) {
  const sombra = useRef<HTMLDivElement>(null);
  const boleto = useRef<HTMLDivElement>(null);

  function mover(evento: React.PointerEvent<HTMLDivElement>) {
    if (evento.pointerType !== "mouse") return;
    const caja = evento.currentTarget.getBoundingClientRect();
    const x = (evento.clientX - caja.left) / caja.width;
    const y = (evento.clientY - caja.top) / caja.height;
    sombra.current?.style.setProperty("--ry", `${(x - 0.5) * 22}deg`);
    sombra.current?.style.setProperty("--rx", `${(0.5 - y) * 18}deg`);
    boleto.current?.style.setProperty("--mx", `${x * 100}%`);
    boleto.current?.style.setProperty("--my", `${y * 100}%`);
  }

  function soltar() {
    sombra.current?.style.setProperty("--ry", "0deg");
    sombra.current?.style.setProperty("--rx", "0deg");
  }

  return (
    <div
      className={`boleto-escena ${className || ""}`}
      onPointerMove={mover}
      onPointerLeave={soltar}
    >
      <div ref={sombra} className="boleto-sombra">
        <div ref={boleto} className="boleto select-none">
          <div className="boleto-trama" />
          <div className="boleto-perforado" />
          <div className="relative px-7 pt-6">
            <div className="flex items-center justify-between gap-3 whitespace-nowrap text-[9px] font-bold uppercase tracking-[0.16em]">
              <span>Rotary Club Mendoza Sur</span>
              <span>N°</span>
            </div>
            <div
              className="flex h-32 items-center justify-center font-display text-[6rem] leading-none tracking-tighter tabular-nums sm:h-[11.5rem] sm:text-[8.5rem]"
              aria-live="polite"
            >
              <span key={numero ?? "vacio"} className="boleto-numero">
                {numero === null ? (
                  <span className="opacity-30">??</span>
                ) : (
                  String(numero).padStart(2, "0")
                )}
              </span>
            </div>
          </div>
          <div className="relative px-7 pb-6 pt-7">
            <p className="line-clamp-2 min-h-[2.5rem] font-display text-lg leading-tight">
              {premio || "Rifa solidaria"}
            </p>
            <div className="mt-3 flex items-end justify-between gap-4">
              <div className="boleto-codigo w-28" />
              {precio && (
                <span className="font-display text-2xl tracking-tight">
                  {precio}
                </span>
              )}
            </div>
          </div>
          {sello && (
            <span className="boleto-sello absolute right-4 top-[42%] rounded-lg bg-gold-rotary/80 border-[3px] border-blue-rotary px-3 py-1 text-sm font-black uppercase tracking-[0.18em] text-blue-rotary">
              {sello}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
