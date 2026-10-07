import Container from "@/components/Container";
import { Eyebrow } from "@/components/ui";
import { estadoPublico, obtenerConfig, vendedoresPublicos } from "@/lib/rifa";
import type { Metadata } from "next";
import Rifa from "./Rifa";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Rifa solidaria · Rotary Club Mendoza Sur",
  description: "Elegí tu número, reservalo y enviá el comprobante.",
};

const pesos = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

export default async function Page({
  searchParams,
}: {
  searchParams: { v?: string };
}) {
  const [config, numeros, vendedores] = await Promise.all([
    obtenerConfig(),
    estadoPublico(),
    vendedoresPublicos(),
  ]);
  const vendedorInicial = vendedores.find(
    (vendedor) => String(vendedor.id) === searchParams.v
  )?.id;

  return (
    <main className="overflow-hidden">
      <section>
        <Container className="pt-12 pb-24 lg:pt-20 lg:pb-32">
          {!config.activa && (
            <p className="mb-8 rounded-2xl border border-gold-rotary bg-gold-rotary/15 px-5 py-4 text-sm font-semibold">
              Modo de prueba: la rifa todavía no está habilitada. Las reservas
              que se hagan ahora no son válidas.
            </p>
          )}
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <Eyebrow>Rifa solidaria</Eyebrow>
              <h1 className="mt-6 font-display text-5xl sm:text-6xl leading-[1.02] tracking-tight text-balance">
                {config.nombre}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-ink/70">
                Elegí un número disponible, reservalo y enviá el comprobante
                de la transferencia. Un socio del club confirma el pago y el
                número queda a tu nombre.
              </p>
              <dl className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
                {config.premio && <Dato etiqueta="Premio" valor={config.premio} />}
                {config.precio > 0 && (
                  <Dato
                    etiqueta="Valor del número"
                    valor={pesos.format(config.precio)}
                  />
                )}
                {config.sorteo && <Dato etiqueta="Sorteo" valor={config.sorteo} />}
              </dl>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <Rifa
                numerosIniciales={numeros}
                vendedores={vendedores}
                vendedorInicial={vendedorInicial}
              />
            </div>
          </div>
        </Container>
      </section>
    </main>
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
