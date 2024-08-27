import Container from "@/components/Container";
import {
  default as QueHemosHechoCarousel,
  default as SchoolsCarousel,
} from "@/components/QueHemosHechoCarousel";
import { Calendar, LandPlot, Medal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Container className="min-h-screen">
        <HeroMaraton />
        <div className="block h-1 bg-slate-100 mt-20"></div>
        <UbicacionMaraton />
        <QueHemosHechoMaraton />
        {/* <SchoolsCarousel /> */}
        <EscuelasAyudadas />
      </Container>
    </main>
  );
}

function HeroMaraton() {
  return (
    <section className="flex flex-row items-center gap-4 my-6">
      <section className="w-full sm:w-1/2">
        <img
          src="/maraton_logo.png"
          alt=""
          className="select-none w-full sm:w-96"
        />
        <HeroItems />
        <Link
          className="bg-blue-rotary  text-white px-8 py-2 font-bold block text-center w-full sm:w-fit mt-20"
          target="_blank"
          href="https://www.entradaweb.com.ar/evento/3a1e29dd/step/1"
        >
          INSCRIBITE
        </Link>
      </section>
      <aside className="hidden flex-1 sm:block -mr-[10%] h-full">
        <img src="/maraton/hero.jpg" alt="" className="rounded-l-2xl" />
      </aside>
    </section>
  );
}

function HeroItems() {
  return (
    <div className="flex flex-col gap-10 mt-10">
      <div>
        <div className="flex gap-2 items-center mb-2">
          <LandPlot size={28} className="text-blue-rotary" />
          <span className="text-blue-rotary font-bold text-md sm:text-lg">
            LARGADA
          </span>
        </div>
        <p className="font-roboto font-bold text-lg sm:text-xl">
          Parque General San Martín, Mendoza
        </p>
      </div>
      <div>
        <div className="flex gap-2 items-center mb-2">
          <Calendar size={28} className="text-blue-rotary" />
          <span className="text-blue-rotary font-bold text-md sm:text-lg">
            FECHA
          </span>
        </div>
        <p className="font-roboto font-bold text-lg sm:text-xl">
          15 de Septiembre, 9hs
        </p>
      </div>
      <div>
        <div className="flex gap-2 items-center mb-2">
          <Medal size={28} className="text-blue-rotary" />
          <span className="text-blue-rotary font-bold text-md sm:text-lg">
            CATEGORÍAS
          </span>
        </div>
        <div className="flex flex-row gap-4">
          <p className="font-roboto text-lg sm:text-xl">
            Participativa <span className="font-bold">2.6KM</span>{" "}
          </p>
          <span className="hidden sm:block">-</span>
          <p className="font-roboto text-lg sm:text-xl">
            Competitiva <span className="font-bold">10KM</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function UbicacionMaraton() {
  return (
    <section className="flex flex-col-reverse sm:flex-row gap-4 mt-10 sm:mt-20">
      <div className="flex-1">
        <LandPlot className="text-blue-rotary w-8 h-8 sm:w-10 sm:h-10 mb-3" />
        <span className="text-2xl sm:text-3xl font-open">
          <span className="font-bold">Rosedal</span> <br />{" "}
          <span className="font-semibold">Parque General San Martín,</span>{" "}
          <br />
          Mendoza
        </span>
        <ul className="space-y-1 text-lg list-disc list-inside mt-4">
          <li>
            Categoría{" "}
            <span className="text-pink-rotary font-bold">
              Participativa de 2.6KM
            </span>{" "}
            alrededor del lago
          </li>
          <li>
            Categoría{" "}
            <span className="text-pink-rotary font-bold">
              Competitiva de 10KM
            </span>{" "}
            atravesando más zonas del parque
          </li>
        </ul>
      </div>
      <div className="w-full sm:w-2/5">
        <img src="/mapaSM.jpg" className="object-cover" />
      </div>
    </section>
  );
}

function QueHemosHechoMaraton() {
  return (
    <section className="flex flex-col-reverse sm:flex-row items-center gap-4 sm:gap-28 mt-20">
      <div className="flex-1">
        <h2 className="font-open text-3xl sm:text-4xl font-medium text-blue-rotary mt-3 mb-4 sm:mt-0">
          Qué hemos hecho
        </h2>
        <p className="text-lg mb-10">
          A lo largo de las{" "}
          <i>
            últimas <b>9 ediciones</b>
          </i>{" "}
          de la Maratón Rotaria &quot;Corriendo por la Visión Futura&quot;,
          hemos trabajado incansablemente para{" "}
          <b>
            mejorar la salud visual de niños en edad escolar de bajos recursos
            en Mendoza
          </b>
          . Gracias al compromiso y la generosidad de nuestra comunidad, hemos
          logrado detectar y resolver problemas de visión en cientos de
          pequeños, brindándoles una mejor oportunidad para un desarrollo
          educativo pleno. Hasta la fecha,{" "}
          <b>
            hemos entregado más de 300 anteojos a alumnos de diversas escuelas
            primarias
          </b>
          , ayudándolos a ver un futuro más claro y prometedor.
        </p>
        <p className="text-lg mt-2 sm:mt-5 sm:mb-0 ">
          Este año,{" "}
          <b>
            nuestra misión continúa con un enfoque especial en los estudiantes
            de la Escuela N° 1-580 Dr. Carlos Padín
          </b>
          . Necesitamos nuevamente de tu solidaridad para seguir haciendo una
          diferencia real en la vida de estos niños, asegurando que cada uno de
          ellos reciba el apoyo visual que necesita para alcanzar su
          máximo potencial.
        </p>
      </div>
      <div className="w-full sm:w-1/2">
        <QueHemosHechoCarousel />
      </div>
    </section>
  );
}

function EscuelasAyudadas() {
  return (
    <section className="mb-10 flex flex-col">
      <h3 className="font-open text-2xl font-light text-blue-rotary mt-6 sm:mt-12">
        Escuelas beneficiadas
      </h3>
      <ul className="space-y-1 list-disc list-inside mt-2">
        <li>
          N° 1-127, <b>Elías Villanueva</b>
        </li>
        <li>
          N° 1-525 <b>Ramón Rosales</b>
        </li>
        <li>
          N° 1-4160, <b>Tito Francia</b>
        </li>
        <li>
          J-051, <b>Jardín Garabatos</b>
        </li>
        <li>
          <b>Carlos Berdasco</b>, Barrio La Favorita
        </li>
        <li>
          <b>Flavio Ferraris</b>, Provincia de Mendoza{" "}
        </li>
        <li>
          Nº 1-557, <b>Cerro de la Gloria</b>
        </li>
        <li>
          <b>Hermana Sara Molina</b>
        </li>
      </ul>
      <Link
        className="bg-blue-rotary self-center text-white px-8 sm:px-12 py-2 font-bold block text-center w-full sm:w-fit mt-10 sm:mt-5 "
        target="_blank"
        href="https://www.entradaweb.com.ar/evento/3a1e29dd/step/1"
      >
        INSCRIBITE
      </Link>
    </section>
  );
}
