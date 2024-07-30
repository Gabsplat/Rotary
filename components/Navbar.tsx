import Link from "next/link";
import React from "react";
import Container from "./Container";

export default function Navbar() {
  return (
    <nav className="sticky top-0 bg-white">
      <Container
        className="flex justify-between items-center sm:gap-4 py-4 text-lg"
        wrapper="nav"
      >
        <Link href="/">
          <img className="h-16 object-contain" src="/logo.png" />
        </Link>
        <div className="flex justify-between items-center gap-6">
          <Link href="/maraton">Maratón</Link>
          <Link
            className="bg-blue-rotary  text-white px-8 py-2 font-bold"
            href="#"
          >
            AFILIATE
          </Link>
        </div>
      </Container>
    </nav>
  );
}
