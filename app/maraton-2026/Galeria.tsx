"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";

const BASE = "/maraton-2026/galeria";

type Foto = { id: string; pie?: string };

const momentos: Foto[] = [
  { id: "18", pie: "La largada desde la Rotonda del Rosedal" },
  { id: "00", pie: "El paso frente a la Fuente de los Continentes" },
  { id: "01", pie: "Gustavo Galeano, ganador de los 10 km" },
  { id: "02", pie: "María Clara Rosselot, ganadora de los 10 km" },
  { id: "16", pie: "Podio masculino de los 10 km" },
  { id: "17", pie: "Podio femenino de los 10 km" },
  { id: "03", pie: "Podio simbólico de los 2,6 km" },
  { id: "05", pie: "Gran parte del staff del Rotary Club Mendoza Sur" },
  { id: "04", pie: "Ricardo Llorente, socio del club" },
  { id: "10", pie: "Florencia Beckford, locutora del evento" },
  { id: "09", pie: "La profesora Miriam Bravo, a cargo de la entrada en calor" },
  { id: "06", pie: "Ana Vázquez, profesora y banderillera" },
  { id: "07", pie: "Personal de Tránsito de la Municipalidad de Mendoza" },
  { id: "08", pie: "La docente Graciela Carobolante" },
  { id: "14", pie: "Rosa y Jimena, del Team Los Caciques" },
  { id: "11", pie: "Integrantes del Club Rotario de Maipú Amanecer" },
  { id: "13", pie: "Facultad de Kinesiología de la Universidad Maza" },
  { id: "12", pie: "El emprendimiento Lala Home" },
  { id: "15", pie: "El staff de Sport Timer" },
];

const corredores: Foto[] = Array.from({ length: 52 }, (_, i) => ({
  id: String(i + 19),
}));

const todas = [...momentos, ...corredores];

export default function Galeria() {
  const [abierta, setAbierta] = useState<number | null>(null);
  const [verTodas, setVerTodas] = useState(false);

  const mover = useCallback(
    (paso: number) =>
      setAbierta((actual) =>
        actual === null
          ? null
          : (actual + paso + todas.length) % todas.length
      ),
    []
  );

  useEffect(() => {
    if (abierta === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAbierta(null);
      if (e.key === "ArrowRight") mover(1);
      if (e.key === "ArrowLeft") mover(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [abierta, mover]);

  const visibles = verTodas ? corredores : corredores.slice(0, 12);
  const foto = abierta === null ? null : todas[abierta];

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {momentos.map((f, i) => (
          <button
            key={f.id}
            onClick={() => setAbierta(i)}
            className={`group relative overflow-hidden rounded-2xl bg-ink text-left ${
              i === 0
                ? "col-span-2 row-span-2 aspect-[4/3] lg:aspect-auto"
                : "aspect-[4/3]"
            }`}
          >
            <img
              src={`${BASE}/${i === 0 ? "" : "thumb/"}${f.id}.webp`}
              alt={f.pie}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-4 pt-12 text-xs sm:text-sm font-semibold leading-snug text-white">
              {f.pie}
            </span>
          </button>
        ))}
      </div>

      <h3 className="mt-16 font-display text-3xl tracking-tight">
        Los corredores
      </h3>
      <p className="mt-2 text-ink/60">
        Si corriste, buscate: tocá cualquier foto para verla en grande.
      </p>
      <div className="mt-8 grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6">
        {visibles.map((f, i) => (
          <button
            key={f.id}
            onClick={() => setAbierta(momentos.length + i)}
            className="group aspect-square overflow-hidden rounded-xl bg-ink"
          >
            <img
              src={`${BASE}/thumb/${f.id}.webp`}
              alt={`Corredor de la Maratón Rotaria, foto ${i + 1}`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </button>
        ))}
      </div>
      {!verTodas && (
        <button
          onClick={() => setVerTodas(true)}
          className="mt-8 rounded-full border border-ink/20 px-7 py-3.5 text-sm font-bold tracking-wide transition-colors hover:bg-ink hover:text-white"
        >
          Ver las {corredores.length} fotos
        </button>
      )}

      {foto && abierta !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Foto ampliada"
          className="fixed inset-0 z-[100] flex flex-col bg-ink/95 text-white backdrop-blur-sm"
          onClick={() => setAbierta(null)}
        >
          <div className="flex items-center justify-between px-5 py-4 text-sm text-white/70">
            <span>
              {abierta + 1} / {todas.length}
            </span>
            <button
              aria-label="Cerrar"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 hover:bg-white hover:text-ink"
              onClick={() => setAbierta(null)}
            >
              <X size={20} />
            </button>
          </div>
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-3 sm:px-20">
            <img
              key={foto.id}
              src={`${BASE}/${foto.id}.webp`}
              alt={foto.pie || "Foto de la Maratón Rotaria"}
              className="max-h-full max-w-full rounded-lg object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              aria-label="Foto anterior"
              className="absolute left-3 sm:left-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 hover:bg-white hover:text-ink"
              onClick={(e) => {
                e.stopPropagation();
                mover(-1);
              }}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              aria-label="Foto siguiente"
              className="absolute right-3 sm:right-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 hover:bg-white hover:text-ink"
              onClick={(e) => {
                e.stopPropagation();
                mover(1);
              }}
            >
              <ChevronRight size={24} />
            </button>
          </div>
          <p className="min-h-[4rem] px-5 py-5 text-center font-display text-lg">
            {foto.pie}
          </p>
        </div>
      )}
    </>
  );
}
