import Container from "@/components/Container";
import QueHemosHechoCarousel from "@/components/QueHemosHechoCarousel";
import Reveal from "@/components/Reveal";
import { Eyebrow, PillLink } from "@/components/ui";
import Image from "next/image";

const escuelas = [
  ["N° 1-127", "Elías Villanueva"],
  ["N° 1-525", "Ramón Rosales"],
  ["N° 1-4160", "Tito Francia"],
  ["J-051", "Jardín Garabatos"],
  ["Barrio La Favorita", "Carlos Berdasco"],
  ["Provincia de Mendoza", "Flavio Ferraris"],
  ["Nº 1-557", "Cerro de la Gloria"],
  ["", "Hermana Sara Molina"],
];

export default function Home() {
  return (
    <main className="overflow-hidden">
      <HeroMaraton />
      <Recorrido />
      <QueHemosHechoMaraton />
      <EscuelasAyudadas />
    </main>
  );
}

function HeroMaraton() {
  return (
    <section>
      <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10 pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div className="lg:col-span-6">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-white">
              <span className="h-2 w-2 rounded-full bg-gold-rotary" />
              Maratón finalizada
            </span>
            <h1 className="mt-8">
              <img
                src="/maraton_logo.png"
                alt="Maratón Rotaria"
                className="w-full max-w-sm select-none"
              />
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <dl className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
              <Dato etiqueta="Fecha" valor="15 de septiembre, 9 hs" />
              <Dato
                etiqueta="Largada"
                valor="Parque General San Martín, Mendoza"
              />
              <Dato
                etiqueta="Categorías"
                valor="Participativa 2.6 km · Competitiva 10 km"
              />
            </dl>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <PillLink
                href="https://drive.google.com/drive/folders/1dLb3Qy6ett6l9dSPZq2rITPstvwxHamv?usp=sharing"
                externo
              >
                Fotos del evento
              </PillLink>
              <PillLink
                href="https://drive.google.com/file/d/1nRUqwkYEowq116pMi8VmZ75V2iEJdyzx/view?usp=sharing"
                externo
                variante="outline"
              >
                Resultados
              </PillLink>
            </div>
          </Reveal>
        </div>
        <Reveal className="lg:col-span-5 lg:col-start-8" delay={200}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-3xl">
            <Image
              src="/maraton/hero.jpg"
              alt="Corredores en la largada de la Maratón Rotaria"
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function Dato({ etiqueta, valor }: { etiqueta: string; valor: string }) {
  return (
    <div className="flex items-baseline justify-between gap-6 py-4">
      <dt className="text-xs font-bold uppercase tracking-[0.22em] text-ink/50">
        {etiqueta}
      </dt>
      <dd className="text-right font-display text-xl sm:text-2xl tracking-tight">
        {valor}
      </dd>
    </div>
  );
}

function Recorrido() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <Container>
        <Reveal>
          <Eyebrow>Recorrido</Eyebrow>
          <h2 className="mt-6 font-display text-4xl sm:text-6xl leading-[1.02] tracking-tight">
            Rosedal, Parque General{" "}
            <span className="italic text-blue-rotary">San Martín.</span>
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          <Reveal>
            <Mapa
              src="/mapaSM.jpg"
              alt="Mapa del recorrido de la maratón"
              titulo="Circuito"
            >
              Categoría <b>Participativa de 2.6 km</b> alrededor del lago y{" "}
              <b>Competitiva de 10 km</b> atravesando más zonas del parque.
            </Mapa>
          </Reveal>
          <Reveal delay={120}>
            <Mapa
              src="/mapaKITS.jpeg"
              alt="Mapa del punto de entrega de kits"
              titulo="Entrega de kits"
            >
              Rosedal, Parque General San Martín.
            </Mapa>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function Mapa({
  src,
  alt,
  titulo,
  children,
}: {
  src: string;
  alt: string;
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <article className="h-full overflow-hidden rounded-3xl bg-paper">
      <img src={src} alt={alt} className="h-72 sm:h-96 w-full object-cover" />
      <div className="p-7 sm:p-9">
        <h3 className="font-display text-2xl sm:text-3xl tracking-tight">
          {titulo}
        </h3>
        <p className="mt-3 leading-relaxed text-ink/70">{children}</p>
      </div>
    </article>
  );
}

function QueHemosHechoMaraton() {
  return (
    <section className="py-24 sm:py-32">
      <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-6">
          <Eyebrow>Qué hemos hecho</Eyebrow>
          <h2 className="mt-6 font-display text-4xl sm:text-5xl leading-[1.05] tracking-tight text-balance">
            Más de 300 anteojos para alumnos de escuelas primarias.
          </h2>
          <p className="mt-8 text-lg leading-relaxed text-ink/70">
            A lo largo de las últimas <b>9 ediciones</b> de la Maratón Rotaria
            &quot;Corriendo por la Visión Futura&quot;, hemos trabajado
            incansablemente para mejorar la salud visual de niños en edad
            escolar de bajos recursos en Mendoza. Gracias al compromiso y la
            generosidad de nuestra comunidad, logramos detectar y resolver
            problemas de visión en cientos de pequeños.
          </p>
          <p className="mt-5 text-lg leading-relaxed text-ink/70">
            Este año, nuestra misión continúa con un enfoque especial en los
            estudiantes de la <b>Escuela N° 1-580 Dr. Carlos Padín</b>.
            Necesitamos nuevamente de tu solidaridad para asegurar que cada
            uno de ellos reciba el apoyo visual que necesita.
          </p>
        </Reveal>
        <Reveal className="lg:col-span-5 lg:col-start-8" delay={150}>
          <div className="overflow-hidden rounded-3xl">
            <QueHemosHechoCarousel />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function EscuelasAyudadas() {
  return (
    <section className="bg-ink text-white">
      <Container className="grid gap-12 lg:grid-cols-12 py-24 sm:py-32">
        <div className="lg:col-span-4">
          <Eyebrow dark>Escuelas beneficiadas</Eyebrow>
        </div>
        <Reveal className="lg:col-span-8">
          <ul className="grid sm:grid-cols-2 gap-x-10 border-t border-white/15">
            {escuelas.map(([detalle, nombre]) => (
              <li
                key={nombre}
                className="flex items-baseline justify-between gap-4 border-b border-white/15 py-4"
              >
                <span className="font-display text-xl tracking-tight">
                  {nombre}
                </span>
                <span className="text-right text-sm text-white/50">
                  {detalle}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
