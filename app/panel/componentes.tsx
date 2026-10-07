"use client";

import { Check, Copy } from "lucide-react";
import React, { useState } from "react";

// Botón de envío que pide confirmación antes de una acción que no se deshace.
export function BotonConfirmar({
  pregunta,
  className,
  children,
}: {
  pregunta: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      className={className}
      onClick={(evento) => {
        if (!window.confirm(pregunta)) evento.preventDefault();
      }}
    >
      {children}
    </button>
  );
}

export function CopiarEnlace({ enlace }: { enlace: string }) {
  const [copiado, setCopiado] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard?.writeText(enlace);
        setCopiado(true);
      }}
      className="inline-flex items-center gap-2 rounded-full bg-gold-rotary px-5 py-2.5 text-sm font-bold text-ink transition-colors hover:bg-white"
    >
      {copiado ? <Check size={16} /> : <Copy size={16} />}
      {copiado ? "Copiado" : "Copiar enlace"}
    </button>
  );
}
