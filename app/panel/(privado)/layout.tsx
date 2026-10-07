import Container from "@/components/Container";
import { exigirSocio } from "@/lib/sesion";
import type { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { salir } from "../acciones";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Panel de socios · Rotary Club Mendoza Sur",
  robots: { index: false },
};

const secciones = [
  { href: "/panel", label: "Resumen" },
  { href: "/panel/pedidos", label: "Pedidos" },
  { href: "/panel/configuracion", label: "Configuración" },
  { href: "/panel/socios", label: "Socios" },
];

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const socio = await exigirSocio();

  return (
    <main className="min-h-[70vh]">
      <div className="border-b border-ink/10 bg-white">
        <Container className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-4">
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-bold">
            {secciones.map((seccion) => (
              <Link
                key={seccion.href}
                href={seccion.href}
                className="text-ink/70 transition-colors hover:text-blue-rotary"
              >
                {seccion.label}
              </Link>
            ))}
          </nav>
          <form action={salir} className="flex items-center gap-4 text-sm">
            <span className="text-ink/60">{socio.nombre || socio.email}</span>
            <button className="font-bold underline decoration-ink/30 hover:text-blue-rotary">
              Salir
            </button>
          </form>
        </Container>
      </div>
      <Container className="space-y-8 py-10 sm:py-14">{children}</Container>
    </main>
  );
}
