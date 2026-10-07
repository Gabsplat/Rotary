import { listarOperaciones, type Operacion } from "@/lib/rifa";
import Link from "next/link";
import { Avisos, ListaOperaciones, Tarjeta } from "../../ui";

const FILTROS: { clave: string; texto: string; estados: Operacion["estado"][] }[] = [
  { clave: "activos", texto: "Activos", estados: ["reservada", "pendiente", "confirmada"] },
  { clave: "pendiente", texto: "Por verificar", estados: ["pendiente"] },
  { clave: "confirmada", texto: "Vendidos", estados: ["confirmada"] },
  { clave: "reservada", texto: "Reservados", estados: ["reservada"] },
  { clave: "cerrados", texto: "Liberados y vencidos", estados: ["liberada", "vencida"] },
];

export default async function Page({
  searchParams,
}: {
  searchParams: { ver?: string; ok?: string; error?: string };
}) {
  const filtro = FILTROS.find((f) => f.clave === searchParams.ver) ?? FILTROS[0];
  const operaciones = (await listarOperaciones()).filter((operacion) =>
    filtro.estados.includes(operacion.estado)
  );

  return (
    <>
      <h1 className="font-display text-4xl sm:text-5xl tracking-tight">
        Pedidos
      </h1>
      <Avisos searchParams={searchParams} />
      <nav className="flex flex-wrap gap-2 text-sm font-bold">
        {FILTROS.map((f) => (
          <Link
            key={f.clave}
            href={`/panel/pedidos?ver=${f.clave}`}
            className={`rounded-full px-5 py-2.5 transition-colors ${
              f === filtro
                ? "bg-ink text-white"
                : "border border-ink/20 hover:bg-ink hover:text-white"
            }`}
          >
            {f.texto}
          </Link>
        ))}
      </nav>
      <Tarjeta>
        <ListaOperaciones
          operaciones={operaciones}
          volver="/panel/pedidos"
          vacio="No hay pedidos en esta vista."
        />
      </Tarjeta>
    </>
  );
}
