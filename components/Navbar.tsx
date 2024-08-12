import Link from "next/link";
import React from "react";
import Container from "./Container";

export default function Navbar() {
  return (
    <nav className="sticky top-0 bg-white z-10">
      <Container
        className="flex justify-between items-center sm:gap-4 py-4 text-lg"
        wrapper="nav"
      >
        <Link href="/">
          <img className="h-12 sm:h-16 object-contain" src="/logoRotary.png" />
        </Link>
        <div className="flex justify-between items-center gap-3 sm:gap-6">
          <Link href="/maraton">Maratón</Link>
          <Link
            className="bg-blue-rotary  text-white px-3 sm:px-8 py-1 sm:py-2 font-semibold sm:font-bold"
            href="https://wa.me/2616557776"
            target="_blank"
          >
            ASOCIATE
          </Link>
        </div>
      </Container>
    </nav>
  );
}
