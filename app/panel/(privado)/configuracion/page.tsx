import { obtenerConfig } from "@/lib/rifa";
import { activar, configurar } from "../../acciones";
import { BotonConfirmar } from "../../componentes";
import { Avisos, boton, campo, etiqueta, Tarjeta } from "../../ui";

export default async function Page({
  searchParams,
}: {
  searchParams: { ok?: string; error?: string };
}) {
  const config = await obtenerConfig();

  return (
    <>
      <h1 className="font-display text-4xl sm:text-5xl tracking-tight">
        Configuración
      </h1>
      <Avisos searchParams={searchParams} />

      <Tarjeta titulo="Datos de la rifa">
        <form action={configurar} className="grid gap-5 sm:grid-cols-2">
          <input type="hidden" name="volver" value="/panel/configuracion" />
          <label className={etiqueta}>
            Nombre de la rifa
            <input name="nombre" defaultValue={config.nombre} required maxLength={80} className={campo} />
          </label>
          <label className={etiqueta}>
            Precio del número (pesos)
            <input name="precio" type="number" min={0} step={1} defaultValue={config.precio} required className={campo} />
          </label>
          <label className={etiqueta}>
            Alias o CBU
            <input name="alias" defaultValue={config.alias} maxLength={60} className={campo} />
          </label>
          <label className={etiqueta}>
            Titular de la cuenta
            <input name="titular" defaultValue={config.titular} maxLength={80} className={campo} />
          </label>
          <label className={etiqueta}>
            Premio
            <input name="premio" defaultValue={config.premio} maxLength={200} className={campo} />
          </label>
          <label className={etiqueta}>
            Fecha y modalidad del sorteo
            <input name="sorteo" defaultValue={config.sorteo} maxLength={200} className={campo} />
          </label>
          <button className={`${boton} sm:col-span-2 sm:justify-self-start`}>
            Guardar
          </button>
        </form>
      </Tarjeta>

      <Tarjeta titulo="Estado">
        {config.activa ? (
          <p className="text-ink/70">
            La rifa está <strong className="text-ink">activa</strong>: las
            ventas son reales.
          </p>
        ) : (
          <form action={activar}>
            <input type="hidden" name="volver" value="/panel/configuracion" />
            <p className="max-w-2xl text-ink/70">
              La rifa está en <strong className="text-ink">modo de prueba</strong>.
              Al activarla se borran todas las operaciones de prueba y los 100
              números vuelven a estar disponibles. Antes hay que cargar el
              precio, el alias o CBU y el titular.
            </p>
            <BotonConfirmar
              pregunta="Se van a borrar todas las operaciones de prueba y la rifa queda habilitada para ventas reales. ¿Activar?"
              className={`${boton} mt-6`}
            >
              Activar la rifa
            </BotonConfirmar>
          </form>
        )}
      </Tarjeta>
    </>
  );
}
