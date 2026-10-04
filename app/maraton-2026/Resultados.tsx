"use client";

import { Search } from "lucide-react";
import React, { useMemo, useState } from "react";
import { resultados10k, resultados2k } from "./resultados";

const vistas = [
  { id: "general", label: "10 km · General" },
  { id: "M", label: "10 km · Varones" },
  { id: "F", label: "10 km · Mujeres" },
  { id: "2k", label: "2,6 km" },
] as const;

type Vista = (typeof vistas)[number]["id"];

type Fila = {
  pos: number;
  dorsal: number;
  nombre: string;
  tiempo: string;
  ciudad: string;
  categoria?: string;
};

export default function Resultados() {
  const [vista, setVista] = useState<Vista>("general");
  const [busqueda, setBusqueda] = useState("");

  const filas = useMemo(() => {
    let base: Fila[];
    if (vista === "2k") base = resultados2k;
    else if (vista === "general") base = resultados10k;
    else
      base = resultados10k
        .filter((r) => r.rama === vista)
        .map((r, i) => ({ ...r, pos: i + 1 }));
    const q = busqueda.trim().toLowerCase();
    return q ? base.filter((r) => r.nombre.toLowerCase().includes(q)) : base;
  }, [vista, busqueda]);

  return (
    <div>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2" role="tablist">
          {vistas.map((v) => (
            <button
              key={v.id}
              role="tab"
              aria-selected={vista === v.id}
              onClick={() => setVista(v.id)}
              className={`rounded-full px-5 py-2.5 text-sm font-bold tracking-wide transition-colors ${
                vista === v.id
                  ? "bg-ink text-white"
                  : "border border-ink/15 text-ink/70 hover:border-ink hover:text-ink"
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>
        <label className="relative block lg:w-72">
          <span className="sr-only">Buscar por apellido o nombre</span>
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40"
          />
          <input
            type="search"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscá tu nombre"
            className="w-full rounded-full border border-ink/15 bg-white py-3 pl-11 pr-5 text-sm outline-none transition-colors placeholder:text-ink/40 focus:border-ink"
          />
        </label>
      </div>

      <div className="mt-8 overflow-hidden rounded-3xl border border-ink/10 bg-white">
        <div className="max-h-[36rem] overflow-auto">
          <table className="w-full text-left text-sm">
            <thead className="sticky top-0 bg-white text-xs uppercase tracking-[0.18em] text-ink/50 shadow-[0_1px_0_rgba(11,27,58,0.1)]">
              <tr>
                <th className="px-5 py-4 font-bold">Pos.</th>
                <th className="px-3 py-4 font-bold">Corredor</th>
                <th className="hidden px-3 py-4 font-bold md:table-cell">
                  Categoría
                </th>
                <th className="hidden px-3 py-4 font-bold sm:table-cell">
                  Ciudad
                </th>
                <th className="px-5 py-4 text-right font-bold">Tiempo</th>
              </tr>
            </thead>
            <tbody>
              {filas.map((r) => (
                <tr
                  key={r.dorsal}
                  className="border-t border-ink/10 transition-colors hover:bg-paper"
                >
                  <td className="px-5 py-3.5">
                    <span
                      className={`inline-flex h-8 w-8 items-center justify-center rounded-full font-display text-base ${
                        r.pos <= 3 && !busqueda
                          ? "bg-gold-rotary text-ink"
                          : "text-ink/60"
                      }`}
                    >
                      {r.pos}
                    </span>
                  </td>
                  <td className="px-3 py-3.5">
                    <span className="font-semibold">{r.nombre}</span>
                    <span className="ml-2 text-xs text-ink/40">
                      #{r.dorsal}
                    </span>
                  </td>
                  <td className="hidden px-3 py-3.5 text-ink/60 md:table-cell">
                    {r.categoria || "General"}
                  </td>
                  <td className="hidden px-3 py-3.5 text-ink/60 sm:table-cell">
                    {r.ciudad}
                  </td>
                  <td className="px-5 py-3.5 text-right font-display text-lg tabular-nums">
                    {r.tiempo}
                  </td>
                </tr>
              ))}
              {filas.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-ink/50">
                    No encontramos a nadie con ese nombre en esta distancia.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
