import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import { Eyebrow, PillLink, WHATSAPP } from "@/components/ui";
import { Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Galeria from "./Galeria";
import Resultados from "./Resultados";

const NOTA = "https://mendozacorre.com/los-rotarios-corrieron-por-la-infancia/";
const FOTOS = "/maraton-2026/galeria";

export default function Page() {
  return (
    <main className="overflow-hidden">
      <HeroMaraton />
      <Cronica />
      <Podios />
      <Clasificacion />
      <Fotos />
      <Mision />
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
                src="/maraton-2026/logo.svg"
                alt="11ª Maratón Rotaria"
                className="h-24 sm:h-32 object-contain"
              />
            </h1>
            <p className="mt-8 max-w-lg font-display text-3xl sm:text-4xl leading-tight tracking-tight text-balance">
              Gracias por correr para que más chicos mendocinos{" "}
              <span className="italic text-blue-rotary">vean mejor.</span>
            </p>
          </Reveal>
          <Reveal delay={120}>
            <dl className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
              <Dato etiqueta="Se corrió el" valor="12 de abril de 2026" />
              <Dato
                etiqueta="Largada"
                valor="Rotonda del Rosedal, Parque San Martín"
              />
              <Dato etiqueta="Distancias" valor="10 km y 2,6 km" />
            </dl>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <PillLink href="#resultados">Ver resultados</PillLink>
              <PillLink href="#fotos" variante="outline">
                Ver fotos
              </PillLink>
            </div>
          </Reveal>
        </div>
        <Reveal className="lg:col-span-5 lg:col-start-8" delay={200}>
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-3xl">
              <Image
                src={`${FOTOS}/18.webp`}
                alt="Largada de la 11ª Maratón Rotaria bajo el arco de salida"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -left-4 sm:-left-10 bottom-10 rounded-2xl bg-white p-5 shadow-2xl shadow-ink/15">
              <span className="font-display text-5xl text-blue-rotary">
                35:06
              </span>
              <p className="mt-1 text-sm text-ink/70">
                mejor tiempo en los 10 km
              </p>
            </div>
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

function Cronica() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <Container className="grid gap-14 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-6">
          <Eyebrow>Cómo fue</Eyebrow>
          <h2 className="mt-6 font-display text-4xl sm:text-6xl leading-[1.02] tracking-tight text-balance">
            Una mañana de otoño en el{" "}
            <span className="italic text-blue-rotary">Parque.</span>
          </h2>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink/70">
            <p>
              El domingo 12 de abril, minutos después de las 9, más de un
              centenar de corredores largó desde la Rotonda del Rosedal con 14
              grados, cielo despejado y un clima bien familiar.
            </p>
            <p>
              El circuito de 5 kilómetros, que los competidores de los 10 km
              recorrieron dos veces, pasó por la Avenida del Rosedal, el Paseo
              de Las Tipas, la Avenida del Libertador, los Caballitos de Marly
              y la Fuente de los Continentes. Mucho desnivel y veredas de
              tierra batida le sumaron exigencia a la carrera.
            </p>
            <p>
              En paralelo se hizo la caminata familiar de 2,6 km, una vuelta
              completa al Lago del Parque.
            </p>
            <p>
              Lo recaudado se destina a la detección temprana de problemas
              visuales en chicos en edad escolar de sectores vulnerables y a
              entregarles anteojos de forma gratuita.
            </p>
          </div>
          <Link
            href={NOTA}
            target="_blank"
            className="mt-8 inline-block border-b border-ink/30 pb-1 text-sm font-bold tracking-wide hover:border-gold-rotary"
          >
            Leé la crónica completa en Mendoza Corre
          </Link>
        </Reveal>
        <Reveal className="lg:col-span-5 lg:col-start-8" delay={150}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
            <Image
              src={`${FOTOS}/05.webp`}
              alt="Staff del Rotary Club Mendoza Sur en la línea de llegada"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
          <figure className="mt-8 rounded-3xl bg-paper p-8">
            <blockquote className="font-display text-2xl sm:text-3xl leading-snug tracking-tight text-balance">
              “Un niño que no ve bien, no estudia bien, por lo que no tendrá
              futuro.”
            </blockquote>
            <figcaption className="mt-5 text-sm text-ink/60">
              Ricardo Llorente, socio del Rotary Club Mendoza Sur
            </figcaption>
          </figure>
        </Reveal>
      </Container>
      <Container className="mt-20">
        <Reveal>
          <dl className="grid grid-cols-2 lg:grid-cols-4 border-t border-ink/10">
            <Cifra numero="11ª" descripcion="Edición de la Maratón Rotaria" />
            <Cifra numero="47" descripcion="Llegadas en los 10 km" />
            <Cifra numero="12" descripcion="Llegadas en los 2,6 km" />
            <Cifra numero="14°" descripcion="A la hora de la largada" />
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}

function Cifra({
  numero,
  descripcion,
}: {
  numero: string;
  descripcion: string;
}) {
  return (
    <div className="py-8 pr-6 lg:border-r lg:border-ink/10 lg:pl-8 lg:first:pl-0 lg:last:border-r-0">
      <dt className="font-display text-4xl sm:text-5xl tracking-tight">
        {numero}
      </dt>
      <dd className="mt-2 text-sm text-ink/60">{descripcion}</dd>
    </div>
  );
}

function Podios() {
  return (
    <section className="bg-ink py-24 sm:py-32 text-white">
      <Container>
        <Reveal>
          <Eyebrow dark>Los ganadores</Eyebrow>
          <h2 className="mt-6 font-display text-4xl sm:text-6xl leading-[1.02] tracking-tight">
            De punta a <span className="italic text-gold-rotary">punta.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
            Gustavo Galeano y María Clara Rosselot lideraron los 10 km desde la
            largada hasta la meta.
          </p>
        </Reveal>
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          <Reveal>
            <Podio
              titulo="10 km · Varones"
              foto="16"
              alt="Podio masculino de los 10 km"
              puestos={[
                ["Gustavo Galeano", "35:06", "Ciudad · Victory Team"],
                ["Roy Chamo", "37:38", "Tunuyán"],
                ["Tomás Flores", "39:53", "Ciudad"],
              ]}
            />
          </Reveal>
          <Reveal delay={120}>
            <Podio
              titulo="10 km · Mujeres"
              foto="17"
              alt="Podio femenino de los 10 km"
              puestos={[
                ["María Clara Rosselot", "52:51", "Las Heras"],
                ["Paula Gil", "54:17", "Godoy Cruz"],
                ["Xiomara Barrios", "56:32", "Ciudad"],
              ]}
            />
          </Reveal>
          <Reveal delay={240}>
            <Podio
              titulo="2,6 km · Recreativa"
              foto="03"
              alt="Podio simbólico de los 2,6 km"
              puestos={[
                ["Marcos Bartolomé", "25:26", "Guaymallén"],
                ["Verónica Bazán", "27:55", "Ciudad"],
                ["Érica Buita", "27:55", "Godoy Cruz"],
              ]}
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function Podio({
  titulo,
  foto,
  alt,
  puestos,
}: {
  titulo: string;
  foto: string;
  alt: string;
  puestos: [string, string, string][];
}) {
  return (
    <article className="h-full overflow-hidden rounded-3xl bg-white/5 ring-1 ring-white/10">
      <div className="relative aspect-[16/10]">
        <Image
          src={`${FOTOS}/thumb/${foto}.webp`}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="p-7">
        <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-gold-rotary">
          {titulo}
        </h3>
        <ol className="mt-4 divide-y divide-white/10">
          {puestos.map(([nombre, tiempo, origen], i) => (
            <li key={nombre} className="flex items-center gap-4 py-4">
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-display text-lg ${
                  i === 0
                    ? "bg-gold-rotary text-ink"
                    : "border border-white/20 text-white/70"
                }`}
              >
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-display text-xl leading-tight tracking-tight">
                  {nombre}
                </p>
                <p className="text-sm text-white/50">{origen}</p>
              </div>
              <span className="font-display text-xl tabular-nums">
                {tiempo}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </article>
  );
}

function Clasificacion() {
  return (
    <section id="resultados" className="scroll-mt-20 py-24 sm:py-32">
      <Container>
        <Reveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div>
            <Eyebrow>Resultados</Eyebrow>
            <h2 className="mt-6 font-display text-4xl sm:text-6xl leading-[1.02] tracking-tight">
              Clasificación{" "}
              <span className="italic text-blue-rotary">general.</span>
            </h2>
            <p className="mt-5 max-w-xl text-ink/65">
              Tiempos oficiales cronometrados por Sport Timer.
            </p>
          </div>
          <a
            href="/maraton-2026/clasificacion-general.pdf"
            download
            className="inline-flex items-center gap-2 self-start rounded-full border border-ink/20 px-6 py-3 text-sm font-bold tracking-wide transition-colors hover:bg-ink hover:text-white lg:self-auto"
          >
            <Download size={16} /> Descargar PDF
          </a>
        </Reveal>
        <Reveal className="mt-12">
          <Resultados />
        </Reveal>
      </Container>
    </section>
  );
}

function Fotos() {
  return (
    <section id="fotos" className="scroll-mt-20 bg-white py-24 sm:py-32">
      <Container>
        <Reveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div>
            <Eyebrow>Galería</Eyebrow>
            <h2 className="mt-6 font-display text-4xl sm:text-6xl leading-[1.02] tracking-tight">
              La maratón en{" "}
              <span className="italic text-blue-rotary">imágenes.</span>
            </h2>
          </div>
          <p className="text-sm text-ink/60">
            Fotos: Claudio Pereyra Moos ·{" "}
            <Link
              href={NOTA}
              target="_blank"
              className="border-b border-ink/30 pb-0.5 font-semibold text-ink hover:border-gold-rotary"
            >
              Mendoza Corre
            </Link>
          </p>
        </Reveal>
        <div className="mt-12">
          <Galeria />
        </div>
      </Container>
    </section>
  );
}

function Mision() {
  return (
    <section className="bg-ink text-white">
      <Container className="grid gap-12 lg:grid-cols-12 py-24 sm:py-32">
        <div className="lg:col-span-3">
          <Eyebrow dark>Para qué corremos</Eyebrow>
        </div>
        <Reveal className="lg:col-span-9">
          <p className="font-display text-3xl sm:text-5xl leading-[1.15] tracking-tight text-balance">
            Lo recaudado en cada edición se destina a mejorar la salud visual
            de niños en edad escolar de bajos recursos en Mendoza.{" "}
            <span className="italic text-gold-rotary">
              Ya entregamos más de 300 anteojos.
            </span>
          </p>
          <PillLink
            href={WHATSAPP}
            externo
            variante="gold"
            className="mt-12"
          >
            Sumate al club
          </PillLink>
        </Reveal>
      </Container>
    </section>
  );
}
