import Link from "next/link";
import React from "react";
import Container from "./Container";

export default function Footer() {
  return (
    <Container
      className="flex justify-between items-center py-6 text-center text-lg"
      wrapper="footer"
    >
      <span className="text-sm sm:text-md">
        © 2024 <span className="font-bold">Rotary Club Mendoza Sur</span>. Todos
        los derechos reservados.
      </span>
    </Container>
  );
}
