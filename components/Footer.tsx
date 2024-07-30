import Link from "next/link";
import React from "react";
import Container from "./Container";

export default function Footer() {
  return (
    <Container
      className="flex justify-between items-center py-8 gap-4 text-center text-lg"
      wrapper="footer"
    >
      <Link href="/">
        <img className="h-24 sm:h-16 object-contain" src="/logoRotary.png" />
      </Link>
      <span className="text-sm sm:text-md">
        © 2024 <span className="font-bold">Rotary Mendoza Sur</span>. Todos los
        derechos reservados.
      </span>
    </Container>
  );
}
