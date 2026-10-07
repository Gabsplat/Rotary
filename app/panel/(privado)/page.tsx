import {
  listarOperaciones,
  obtenerConfig,
  TOTAL_NUMEROS,
  vendedoresPublicos,
} from "@/lib/rifa";
import { exigirSocio } from "@/lib/sesion";
import { headers } from "next/headers";
import Link from "next/link";
import { efectivo } from "../acciones";
import { CopiarEnlace } from "../componentes";
import {
  Avisos,
  boton,
  campo,
  etiqueta,
  ListaOperaciones,
  pesos,
  Tarjeta,
} from "../ui";

export default async function Page({
  searchParams,
}: {
  searchParams: { ok?: string; error?: string };
}) {
  const socio = await exigirSocio();
  const [config, operaciones, vendedores] = await Promise.all([
    obtenerConfig(),
    listarOperaciones(),
    vendedoresPublicos(),
  ]);

  const vendidas = operaciones.filter((o) => o.estado === "confirmada");
  const pendientes = operaciones.filter((o) => o.estado === "pendiente");
  const reservadas = operaciones.filter((o) => o.estado === "reservada");
  const sinRendir = vendidas.filter((o) => o.medio === "efectivo" && !o.rendido);
  const disponibles =
    TOTAL_NUMEROS - vendidas.length - pendientes.length - reservadas.length;
  const mias = operaciones.filter(
    (o) => o.vendedor_id === socio.id && o.estado !== "vencida" && o.estado !== "liberada"
  );

  const porVendedor = vendedores
    .map((vendedor) => ({
      ...vendedor,
      vendidas: vendidas.filter((o) => o.vendedor_id === vendedor.id).length,
      porVerificar: pendientes.filter((o) => o.vendedor_id === vendedor.id).length,
    }))
    .sort((a, b) => b.vendidas - a.vendidas);

  const cabeceras = headers();
  const origen = `${cabeceras.get("x-forwarded-proto") ?? "http"}://${cabeceras.get("host")}`;
  const enlace = `${origen}/rifa?v=${socio.id}`;

  return (
    <>
      <div>
        <h1 className="font-display text-4xl sm:text-5xl tracking-tight">
          {config.nombre}
        </h1>
        {!config.activa && (
          <p className="mt-4 rounded-2xl border border-gold-rotary bg-gold-rotary/15 px-5 py-4 text-sm font-semibold">
            Modo de prueba: todo lo que se cargue ahora se borra al activar la
            rifa desde{" "}
            <Link className="underline" href="/panel/configuracion">
              Configuración
            </Link>
            .
          </p>
        )}
      </div>
      <Avisos searchParams={searchParams} />

      <dl className="grid grid-cols-2 gap-4 lg:grid-cols-6">
        <Cifra etiqueta="Vendidos" valor={vendidas.length} />
        <Cifra etiqueta="Por verificar" valor={pendientes.length} destacada={pendientes.length > 0} />
        <Cifra etiqueta="Reservados" valor={reservadas.length} />
        <Cifra etiqueta="Disponibles" valor={disponibles} />
        <Cifra etiqueta="Recaudado" valor={pesos.format(vendidas.length * config.precio)} />
        <Cifra
          etiqueta="Efectivo sin rendir"
          valor={pesos.format(sinRendir.length * config.precio)}
        />
      </dl>

      <Tarjeta titulo="Pagos por verificar">
        <ListaOperaciones
          operaciones={pendientes}
          volver="/panel"
          vacio="No hay comprobantes esperando revisión."
        />
      </Tarjeta>

      <div className="grid gap-8 lg:grid-cols-2">
        <Tarjeta titulo="Tu enlace de vendedor" oscura>
          <p className="text-white/70">
            Compartilo con quien quiera comprar: las ventas que entren por acá
            quedan a tu nombre.
          </p>
          <p className="mt-5 break-all rounded-2xl bg-white/10 px-4 py-3 font-mono text-sm">
            {enlace}
          </p>
          <div className="mt-5">
            <CopiarEnlace enlace={enlace} />
          </div>
        </Tarjeta>

        <Tarjeta titulo="Registrar venta en efectivo">
          <form action={efectivo} className="grid gap-4 sm:grid-cols-2">
            <input type="hidden" name="volver" value="/panel" />
            <label className={etiqueta}>
              Número
              <input name="numero" type="number" min={1} max={TOTAL_NUMEROS} required className={campo} />
            </label>
            <label className={etiqueta}>
              Vendedor
              <select name="vendedor" defaultValue={socio.id} required className={campo}>
                {vendedores.map((vendedor) => (
                  <option key={vendedor.id} value={vendedor.id}>
                    {vendedor.nombre}
                  </option>
                ))}
              </select>
            </label>
            <label className={etiqueta}>
              Comprador
              <input name="nombre" required minLength={3} maxLength={80} className={campo} />
            </label>
            <label className={etiqueta}>
              Teléfono
              <input name="telefono" type="tel" required maxLength={30} className={campo} />
            </label>
            <button className={`${boton} sm:col-span-2`}>
              Marcar número como vendido
            </button>
          </form>
        </Tarjeta>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <Tarjeta titulo="Tus ventas">
          <ListaOperaciones
            operaciones={mias}
            volver="/panel"
            vacio="Todavía no entraron ventas por tu enlace."
          />
        </Tarjeta>

        <Tarjeta titulo="Ventas por vendedor">
          <table className="w-full text-left text-sm">
            <thead className="text-xs font-bold uppercase tracking-[0.18em] text-ink/50">
              <tr>
                <th className="pb-3">Vendedor</th>
                <th className="pb-3 text-right">Vendidos</th>
                <th className="pb-3 text-right">Por verificar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/10">
              {porVendedor.map((vendedor) => (
                <tr key={vendedor.id}>
                  <td className="py-3 font-semibold">{vendedor.nombre}</td>
                  <td className="py-3 text-right tabular-nums">{vendedor.vendidas}</td>
                  <td className="py-3 text-right tabular-nums">{vendedor.porVerificar}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Tarjeta>
      </div>
    </>
  );
}

function Cifra({
  etiqueta,
  valor,
  destacada,
}: {
  etiqueta: string;
  valor: number | string;
  destacada?: boolean;
}) {
  return (
    <div className={`rounded-3xl p-5 ${destacada ? "bg-gold-rotary" : "bg-white"}`}>
      <dt className="text-xs font-bold uppercase tracking-[0.18em] text-ink/60">
        {etiqueta}
      </dt>
      <dd className="mt-3 font-display text-3xl tracking-tight tabular-nums">
        {valor}
      </dd>
    </div>
  );
}
