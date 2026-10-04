import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import { Eyebrow, PillLink, WHATSAPP } from "@/components/ui";
import { ArrowRight, HeartHandshake, LucideIcon, Trees } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Hero />
      <Valores />
      <Manifiesto />
      <PorQueSumarte />
      <Proyectos />
      <Maraton />
      <QuienesSomos />
      <Sumate />
    </main>
  );
}

function Hero() {
  return (
    <section className="relative">
      <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10 pt-12 pb-16 lg:pt-20 lg:pb-24">
        <div className="lg:col-span-7">
          <Reveal>
            <Eyebrow>Mendoza · Desde 1968</Eyebrow>
            <h1 className="mt-7 font-display text-[clamp(3rem,7.4vw,6.5rem)] leading-[0.95] tracking-tight text-balance">
              Que tu tiempo{" "}
              <span className="italic text-blue-rotary">deje huella.</span>
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-8 max-w-xl text-lg sm:text-xl leading-relaxed text-ink/70">
              Somos profesionales, vecinos y amigos que nos reunimos cada
              semana para convertir buenas intenciones en proyectos concretos
              para Mendoza.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-5">
              <PillLink href={WHATSAPP} externo>
                Vení a una reunión
              </PillLink>
              <Link
                href="#proyectos"
                className="group inline-flex items-center gap-2 font-bold text-sm tracking-wide"
              >
                <span className="border-b border-ink/30 pb-1 group-hover:border-gold-rotary transition-colors">
                  Conocé lo que hacemos
                </span>
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          </Reveal>
        </div>
        <Reveal className="lg:col-span-5" delay={200}>
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-3xl">
              <Image
                src="/maraton/controles/foto3.jpg"
                alt="Un socio del club le prueba anteojos nuevos a una alumna"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
            </div>
            <div className="absolute -left-4 sm:-left-10 bottom-10 max-w-[15rem] rounded-2xl bg-white p-5 shadow-2xl shadow-ink/15">
              <span className="font-display text-5xl text-blue-rotary">
                +300
              </span>
              <p className="mt-1 text-sm leading-snug text-ink/70">
                anteojos entregados a chicos de escuelas mendocinas
              </p>
            </div>
            <div className="absolute -right-3 top-16 hidden h-24 w-24 rounded-full border border-gold-rotary sm:block" />
          </div>
        </Reveal>
      </Container>
      <Container>
        <Reveal>
          <dl className="grid grid-cols-2 lg:grid-cols-4 border-t border-ink/10">
            <Cifra numero="1968" descripcion="Año de fundación" />
            <Cifra numero="+55" descripcion="Años de servicio en Mendoza" />
            <Cifra numero="11" descripcion="Ediciones de la Maratón Rotaria" />
            <Cifra numero="1,4 M" descripcion="Socios de Rotary en el mundo" />
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

const valores = [
  "Servicio",
  "Compañerismo",
  "Integridad",
  "Diversidad",
  "Liderazgo",
];

function Valores() {
  return (
    <section
      aria-label="Valores de Rotary"
      className="overflow-hidden border-y border-ink/10 bg-white py-6"
    >
      <div className="flex w-max animate-marquee">
        {[0, 1].map((copia) => (
          <ul
            key={copia}
            aria-hidden={copia === 1}
            className="flex shrink-0 items-center"
          >
            {[...valores, ...valores].map((valor, i) => (
              <li
                key={i}
                className="flex items-center font-display text-2xl sm:text-3xl italic text-ink/80"
              >
                <span className="px-8 sm:px-12">{valor}</span>
                <span className="h-2 w-2 rounded-full bg-gold-rotary" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}

function Manifiesto() {
  return (
    <section className="bg-ink text-white">
      <Container className="grid gap-12 lg:grid-cols-12 py-24 sm:py-32">
        <div className="lg:col-span-3">
          <Eyebrow dark>Qué es Rotary</Eyebrow>
        </div>
        <Reveal className="lg:col-span-9">
          <p className="font-display text-3xl sm:text-5xl leading-[1.15] tracking-tight text-balance">
            La vida es breve. Podemos enfocarnos solo en nuestros objetivos
            personales o, sin descuidar lo propio,{" "}
            <span className="italic text-gold-rotary">
              trabajar para dejar un mundo mejor.
            </span>
          </p>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 max-w-3xl text-white/70 leading-relaxed">
            <p>
              Rotary ofrece un camino para vivir de manera significativa:
              centrarse en lo que realmente importa y encontrar formas de
              enriquecer el mundo.
            </p>
            <p>
              Valora las amistades y nos impulsa a dar lo mejor de nosotros
              mismos. Todos tenemos algo que ofrecer para cambiar la vida de
              los demás.
            </p>
          </div>
          <PillLink
            href="https://www.rotary.org/es/about-rotary"
            externo
            variante="light"
            className="mt-12"
          >
            Conocé Rotary International
          </PillLink>
        </Reveal>
      </Container>
    </section>
  );
}

function PorQueSumarte() {
  return (
    <section id="sumarte" className="scroll-mt-20 py-24 sm:py-32">
      <Container>
        <Reveal className="max-w-3xl">
          <Eyebrow>Por qué sumarte</Eyebrow>
          <h2 className="mt-6 font-display text-4xl sm:text-6xl leading-[1.02] tracking-tight text-balance">
            Un lugar para devolver, aprender y{" "}
            <span className="italic text-blue-rotary">encontrarse.</span>
          </h2>
        </Reveal>
        <div className="mt-16 grid gap-10 md:grid-cols-3 md:gap-0">
          <Motivo
            numero="01"
            titulo="Propósito"
            descripcion="Proyectos concretos en escuelas, hogares y espacios públicos del Gran Mendoza. El resultado de lo que hacés se ve."
          />
          <Motivo
            numero="02"
            titulo="Amistad"
            descripcion="Una mesa semanal con gente de distintas profesiones y recorridos. En Rotary las amistades valen tanto como el servicio."
            delay={120}
          />
          <Motivo
            numero="03"
            titulo="Red global"
            descripcion="Formás parte de una organización con 1,4 millones de socios y clubes en todo el mundo."
            delay={240}
          />
        </div>
      </Container>
    </section>
  );
}

function Motivo({
  numero,
  titulo,
  descripcion,
  delay,
}: {
  numero: string;
  titulo: string;
  descripcion: string;
  delay?: number;
}) {
  return (
    <Reveal
      delay={delay}
      className="border-t border-ink/15 pt-8 md:border-t-0 md:border-l md:pl-10 md:pt-0 md:pr-10"
    >
      <span className="font-display text-sm italic text-blue-rotary">
        {numero}
      </span>
      <h3 className="mt-6 font-display text-3xl tracking-tight">{titulo}</h3>
      <p className="mt-4 leading-relaxed text-ink/65">{descripcion}</p>
    </Reveal>
  );
}

function Proyectos() {
  return (
    <section id="proyectos" className="scroll-mt-20 bg-white py-24 sm:py-32">
      <Container>
        <Reveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <Eyebrow>Qué hacemos</Eyebrow>
            <h2 className="mt-6 font-display text-4xl sm:text-6xl leading-[1.02] tracking-tight">
              Proyectos de servicio
            </h2>
          </div>
          <p className="max-w-sm leading-relaxed text-ink/65">
            Más de cinco décadas de trabajo sostenido en la comunidad, con foco
            en la niñez, la educación y el ambiente.
          </p>
        </Reveal>
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          <Reveal className="lg:col-span-2 lg:row-span-2">
            <ProyectoFoto
              src="/maraton/controles/foto5.jpg"
              alt="Una profesional realiza un control de visión a una alumna"
              etiqueta="Salud visual"
              titulo="Chicos que vuelven a ver bien el pizarrón"
              descripcion="Controles de visión en escuelas y entrega de anteojos a alumnos de bajos recursos."
              className="min-h-[26rem] lg:min-h-full"
            />
          </Reveal>
          <Reveal delay={100}>
            <ProyectoFoto
              src="/servicio_1.jpg"
              alt="Alumnos de una escuela junto al estandarte del club"
              etiqueta="Educación"
              titulo="Escuelas apadrinadas"
              descripcion="Becas, botiquines, banderas y cursos de mediación escolar."
              className="min-h-[20rem]"
            />
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            <Reveal delay={160}>
              <ProyectoTexto
                icono={Trees}
                etiqueta="Medio ambiente"
                descripcion="Bosquecillos rotarios y plantaciones en escuelas y espacios públicos."
              />
            </Reveal>
            <Reveal delay={220}>
              <ProyectoTexto
                icono={HeartHandshake}
                etiqueta="Comunidad"
                descripcion="Donaciones, edición de libros y acompañamiento a hogares de ancianos."
              />
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

function ProyectoFoto({
  src,
  alt,
  etiqueta,
  titulo,
  descripcion,
  className,
}: {
  src: string;
  alt: string;
  etiqueta: string;
  titulo: string;
  descripcion: string;
  className?: string;
}) {
  return (
    <article
      className={`group relative flex h-full items-end overflow-hidden rounded-3xl bg-ink text-white ${
        className || ""
      }`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 60vw, 100vw"
        className="object-cover transition-transform duration-[1200ms] group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
      <div className="relative p-7 sm:p-9">
        <span className="text-xs font-bold uppercase tracking-[0.22em] text-gold-rotary">
          {etiqueta}
        </span>
        <h3 className="mt-3 font-display text-2xl sm:text-4xl leading-tight tracking-tight text-balance">
          {titulo}
        </h3>
        <p className="mt-3 max-w-md text-white/75">{descripcion}</p>
      </div>
    </article>
  );
}

function ProyectoTexto({
  icono: Icon,
  etiqueta,
  descripcion,
}: {
  icono: LucideIcon;
  etiqueta: string;
  descripcion: string;
}) {
  return (
    <article className="h-full rounded-3xl bg-paper p-7">
      <Icon size={28} strokeWidth={1.5} className="text-blue-rotary" />
      <h3 className="mt-5 font-display text-2xl tracking-tight">{etiqueta}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink/65">{descripcion}</p>
    </article>
  );
}

function Maraton() {
  return (
    <section className="relative isolate bg-ink text-white">
      <Image
        src="/maraton-2026/galeria/18.webp"
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover opacity-25 grayscale"
      />
      <Container className="grid gap-12 lg:grid-cols-12 py-24 sm:py-36">
        <Reveal className="lg:col-span-7">
          <Eyebrow dark>Maratón Rotaria · Edición 2026 finalizada</Eyebrow>
          <h2 className="mt-6 font-display text-5xl sm:text-7xl leading-[0.98] tracking-tight text-balance">
            Corriendo por la{" "}
            <span className="italic text-gold-rotary">Visión Futura.</span>
          </h2>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/75">
            La 11ª edición se corrió el 12 de abril de 2026 en el Parque
            General San Martín. Lo recaudado se destina a la salud visual de
            chicos en edad escolar de Mendoza.
          </p>
          <PillLink href="/maraton-2026" variante="gold" className="mt-10">
            Resultados y fotos
          </PillLink>
        </Reveal>
        <Reveal className="lg:col-span-4 lg:col-start-9 self-end" delay={150}>
          <dl className="divide-y divide-white/15 border-y border-white/15">
            <DatoMaraton valor="2.6 km" detalle="Categoría participativa" />
            <DatoMaraton valor="10 km" detalle="Categoría competitiva" />
            <DatoMaraton valor="35:06" detalle="Mejor tiempo en 10 km" />
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}

function DatoMaraton({ valor, detalle }: { valor: string; detalle: string }) {
  return (
    <div className="flex items-baseline justify-between gap-6 py-5">
      <dt className="font-display text-4xl tracking-tight">{valor}</dt>
      <dd className="text-right text-sm text-white/60">{detalle}</dd>
    </div>
  );
}

function QuienesSomos() {
  return (
    <section id="club" className="scroll-mt-20 py-24 sm:py-32">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-5">
          <Eyebrow>El club</Eyebrow>
          <p
            aria-hidden
            className="mt-6 font-display text-[clamp(6rem,17vw,13rem)] leading-[0.8] tracking-tighter text-blue-rotary"
          >
            1968
          </p>
        </Reveal>
        <Reveal className="lg:col-span-6 lg:col-start-7" delay={120}>
          <h2 className="font-display text-4xl sm:text-5xl leading-[1.05] tracking-tight text-balance">
            Más de 55 años al servicio de Mendoza.
          </h2>
          <p className="mt-8 text-lg leading-relaxed text-ink/70">
            El Rotary Club Mendoza Sur, parte del Distrito 4851 de Rotary
            International, fue fundado en 1968 y se reúne todas las semanas,
            los martes.
          </p>
          <p className="mt-5 text-lg leading-relaxed text-ink/70">
            Desde entonces llevamos adelante actividades para mejorar la
            convivencia social: donaciones, becas, edición de libros,
            apadrinamiento de escuelas y hogares de ancianos, y la creación de
            bosquecillos rotarios.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

function Sumate() {
  return (
    <section id="contacto" className="scroll-mt-20 pb-24 sm:pb-32">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gold-rotary px-7 py-16 sm:px-16 sm:py-24">
            <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border border-ink/15" />
            <div className="absolute -right-10 -top-10 h-80 w-80 rounded-full border border-ink/15" />
            <div className="relative max-w-3xl">
              <h2 className="font-display text-5xl sm:text-7xl leading-[0.98] tracking-tight text-balance">
                ¿Nos acompañás el{" "}
                <span className="italic">próximo martes?</span>
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/80">
                Escribinos y te contamos cómo participar de una reunión, como
                socio o como voluntario.
              </p>
              <PillLink href={WHATSAPP} externo className="mt-10">
                Escribinos por WhatsApp
              </PillLink>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
