"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import Container from "./Container";
import { PillLink, WHATSAPP } from "./ui";

const links = [
  { href: "/#proyectos", label: "Proyectos" },
  { href: "/#sumarte", label: "Por qué sumarte" },
  { href: "/#club", label: "El club" },
  { href: "/maraton-2026", label: "Maratón" },
];

export default function Navbar() {
  const [abierto, setAbierto] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/85 backdrop-blur-md">
      <Container
        wrapper="nav"
        className="flex items-center justify-between gap-6 py-3"
      >
        <Link href="/" onClick={() => setAbierto(false)}>
          <img
            className="h-11 sm:h-12 object-contain"
            src="/logoRotary.png"
            alt="Rotary Club Mendoza Sur"
          />
        </Link>
        <ul className="hidden lg:flex items-center gap-9">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                className="text-sm font-semibold text-ink/70 hover:text-ink transition-colors"
                href={link.href}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <PillLink
            href={WHATSAPP}
            externo
            className="!px-5 !py-2.5 hidden sm:inline-flex"
          >
            Sumate
          </PillLink>
          <button
            className="lg:hidden flex h-11 w-11 items-center justify-center rounded-full border border-ink/15"
            aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={abierto}
            onClick={() => setAbierto(!abierto)}
          >
            {abierto ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </Container>
      {abierto && (
        <Container className="lg:hidden pb-6">
          <ul className="border-t border-ink/10">
            {links.map((link) => (
              <li key={link.href} className="border-b border-ink/10">
                <Link
                  className="block py-4 font-display text-2xl"
                  href={link.href}
                  onClick={() => setAbierto(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <PillLink href={WHATSAPP} externo className="mt-6 w-full">
            Sumate al club
          </PillLink>
        </Container>
      )}
    </header>
  );
}
