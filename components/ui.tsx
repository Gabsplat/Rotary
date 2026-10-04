import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export const WHATSAPP = "https://wa.me/2616557776";

export function Eyebrow({
  children,
  dark,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] ${
        dark ? "text-gold-rotary" : "text-blue-rotary"
      }`}
    >
      <span className="h-px w-8 bg-current" />
      {children}
    </span>
  );
}

const variantes = {
  ink: "bg-ink text-white hover:bg-blue-rotary",
  gold: "bg-gold-rotary text-ink hover:bg-white",
  light: "border border-white/30 text-white hover:bg-white hover:text-ink",
  outline: "border border-ink/20 text-ink hover:bg-ink hover:text-white",
};

export function PillLink({
  href,
  children,
  variante = "ink",
  externo,
  className,
}: {
  href: string;
  children: React.ReactNode;
  variante?: keyof typeof variantes;
  externo?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      target={externo ? "_blank" : undefined}
      className={`group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold tracking-wide transition-colors duration-300 ${
        variantes[variante]
      } ${className || ""}`}
    >
      {children}
      <ArrowUpRight
        size={18}
        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </Link>
  );
}
