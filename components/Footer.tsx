import Link from "next/link";
import React from "react";
import Container from "./Container";
import { WHATSAPP } from "./ui";

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <Container className="pt-20 pb-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="font-display text-4xl sm:text-6xl leading-[1.05] tracking-tight">
              Rotary Club <br />
              <span className="italic text-gold-rotary">Mendoza Sur</span>
            </p>
            <p className="mt-6 max-w-sm text-white/60">
              Profesionales, vecinos y amigos al servicio de la comunidad
              mendocina desde 1968.
            </p>
          </div>
          <FooterLista titulo="El club">
            <FooterLink href="/#proyectos">Proyectos</FooterLink>
            <FooterLink href="/#sumarte">Por qué sumarte</FooterLink>
            <FooterLink href="/#club">Quiénes somos</FooterLink>
            <FooterLink href="/maraton-2026">Maratón Rotaria</FooterLink>
          </FooterLista>
          <FooterLista titulo="Contacto">
            <FooterLink href={WHATSAPP} externo>
              WhatsApp
            </FooterLink>
            <FooterLink href="https://www.rotary.org/es" externo>
              Rotary International
            </FooterLink>
          </FooterLista>
        </div>
        <div className="mt-16 flex flex-col sm:flex-row justify-between gap-2 border-t border-white/10 pt-6 text-sm text-white/50">
          <span>
            © {new Date().getFullYear()} Rotary Club Mendoza Sur. Todos los
            derechos reservados.
          </span>
          <span>Distrito 4851 · Rotary International</span>
        </div>
      </Container>
    </footer>
  );
}

function FooterLista({
  titulo,
  children,
}: {
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <div className="lg:col-span-2 lg:col-start-auto">
      <span className="text-xs font-bold uppercase tracking-[0.22em] text-white/40">
        {titulo}
      </span>
      <ul className="mt-5 space-y-3">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  externo,
  children,
}: {
  href: string;
  externo?: boolean;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        className="text-white/80 hover:text-gold-rotary transition-colors"
        href={href}
        target={externo ? "_blank" : undefined}
      >
        {children}
      </Link>
    </li>
  );
}
