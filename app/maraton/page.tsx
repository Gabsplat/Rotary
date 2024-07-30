import Container from "@/components/Container";
import { LandPlot } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroMaraton />
      <UbicacionMaraton />
      <QueHemosHechoMaraton />
    </main>
  );
}

function QueHemosHechoMaraton() {
  return (
    <Container wrapper="section" className="flex items-center gap-28 mt-20">
      <div className="flex-1">
        <h2 className="font-open text-4xl font-light text-blue-rotary">
          Que hemos hecho
        </h2>
        <p className="text-xl mt-10">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
      <div className="w-1/2">
        <img
          src="https://plus.unsplash.com/premium_photo-1661351646756-f2b55dc1359e?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="object-cover rounded-xl"
        />
      </div>
    </Container>
  );
}

function UbicacionMaraton() {
  return (
    <Container wrapper="section" className="flex gap-4 mt-20">
      <div className="flex-1">
        <LandPlot size={48} className="text-blue-rotary" />
        <span className="text-3xl font-open">
          <span className="font-bold">Rosedal</span> <br />{" "}
          <span className="font-semibold">Parque General San Martín,</span>{" "}
          <br />
          Mendoza
        </span>
        <ul className="text-xl list-disc list-inside mt-4">
          <li>
            Categoría{" "}
            <span className="text-pink-rotary">Participativa de 2.5KM</span>{" "}
            alrededor del lago
          </li>
          <li>
            Categoría{" "}
            <span className="text-pink-rotary">Competitiva de 10KM</span>{" "}
            atravesando más zonas del parque
          </li>
        </ul>
      </div>
      <div className="w-2/5">
        <img src="/mapaSM.jpg" className="object-cover" />
      </div>
    </Container>
  );
}

function HeroMaraton() {
  return (
    <Container className="flex flex-row gap-4">
      <section className="mt-10">
        <img src="/MaratonLogo.png" alt="" className="select-none" />
        <HeroItems />
        <Link
          className="bg-blue-rotary  text-white px-8 py-2 font-bold block text-center w-full sm:w-fit mt-20"
          href="#"
        >
          INSCRIBITE
        </Link>
      </section>
      <aside className="hidden sm:block">img</aside>
    </Container>
  );
}

function HeroItems() {
  return (
    <div className="flex flex-col gap-10 mt-10">
      <div>
        <div className="flex gap-2 items-center mb-2">
          <LandPlot size={28} className="text-blue-rotary" />
          <span className="text-blue-rotary font-bold text-lg">LARGADA</span>
        </div>
        <p className="font-roboto font-bold text-xl">
          Parque General San Martín, Mendoza
        </p>
      </div>
      <div>
        <div className="flex gap-2 items-center mb-2">
          <LandPlot size={28} className="text-blue-rotary" />
          <span className="text-blue-rotary font-bold text-lg">FECHA</span>
        </div>
        <p className="font-roboto font-bold text-xl">15 de Septiembre, 9hs</p>
      </div>
      <div>
        <div className="flex gap-2 items-center mb-2">
          <LandPlot size={28} className="text-blue-rotary" />
          <span className="text-blue-rotary font-bold text-lg">CATEGORÍAS</span>
        </div>
        <div className="flex flex-row gap-4">
          <p className="font-roboto text-xl">
            Participativa <span className="font-bold">2.6KM</span>{" "}
          </p>
          <span>-</span>
          <p className="font-roboto text-xl">
            Competitiva <span className="font-bold">10KM</span>
          </p>
        </div>
      </div>
    </div>
  );
}
