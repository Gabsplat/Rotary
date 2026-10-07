import { estadoPublico, obtenerConfig, vendedoresPublicos } from "@/lib/rifa";
import type { Metadata } from "next";
import Rifa from "./Rifa";
import "./rifa.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Rifa solidaria · Rotary Club Mendoza Sur",
  description: "Elegí tu número, reservalo y enviá el comprobante.",
};

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
    <main className="overflow-x-clip">
      <Rifa
        config={{
          nombre: config.nombre,
          precio: config.precio,
          premio: config.premio,
          sorteo: config.sorteo,
          activa: config.activa,
        }}
        numerosIniciales={numeros}
        vendedores={vendedores}
        vendedorInicial={vendedorInicial}
      />
    </main>
  );
}
