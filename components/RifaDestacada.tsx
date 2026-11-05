import Boleto from "@/app/rifa/Boleto";
import { estadoPublico, obtenerConfig } from "@/lib/rifa";
import Container from "./Container";
import Reveal from "./Reveal";
import { Eyebrow, PillLink } from "./ui";

const pesos = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

// Invitación a la rifa en la página de inicio. Solo aparece con la rifa
// activa; si la base no responde, la página de inicio se muestra sin ella.
export default async function RifaDestacada() {
  let datos;
  try {
    const [config, numeros] = await Promise.all([
      obtenerConfig(),
      estadoPublico(),
    ]);
    datos = { config, numeros };
  } catch (error) {
    console.error(error);
    return null;
  }
  const { config, numeros } = datos;
  if (!config.activa) return null;

  const libres = numeros.flatMap((estado, i) =>
    estado === "disponible" ? [i + 1] : []
  );
  const tomados = numeros.length - libres.length;
  const muestra = libres.length
    ? libres[Math.floor(Math.random() * libres.length)]
    : null;
  const precio = config.precio > 0 ? pesos.format(config.precio) : undefined;

  return (
    <section id="rifa" className="scroll-mt-20 py-24 sm:py-32">
      <Container className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-6">
          <Eyebrow>Rifa solidaria</Eyebrow>
          <h2 className="mt-6 font-display text-4xl sm:text-6xl leading-[1.02] tracking-tight text-balance">
            {config.nombre}
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink/70">
            Cien números, un ganador. Cada número que comprás{" "}
            <span className="font-display italic text-blue-rotary">
              suma a los proyectos del club.
            </span>
          </p>

          <dl className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
            {config.premio && <Dato etiqueta="Premio" valor={config.premio} />}
            {precio && <Dato etiqueta="Valor del número" valor={precio} />}
            {config.sorteo && <Dato etiqueta="Sorteo" valor={config.sorteo} />}
          </dl>

          <div className="mt-8">
            <div className="flex items-baseline justify-between gap-4 text-sm">
              <span>
                <strong className="font-display text-2xl tabular-nums">
                  {libres.length}
                </strong>{" "}
                <span className="text-ink/60">
                  {libres.length === 1 ? "número libre" : "números libres"}
                </span>
              </span>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-ink/50">
                {tomados} de {numeros.length} tomados
              </span>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-ink/10">
              <div
                className="h-full rounded-full bg-gold-rotary"
                style={{ width: `${(tomados / numeros.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="mt-10">
            <PillLink href="/rifa">
              {libres.length ? "Elegí tu número" : "Ver la rifa"}
            </PillLink>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-5 lg:col-start-8" delay={150}>
          <div className="rifa-escenario relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-t-full rounded-b-3xl px-8">
            <div className="rifa-estrellas" />
            <Boleto
              numero={muestra}
              premio={config.premio}
              precio={precio}
              className="relative w-full max-w-[16rem] sm:max-w-[17rem]"
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
