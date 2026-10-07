import { listarSocios } from "@/lib/socios";
import { quitarSocio, sumarSocio } from "../../acciones";
import { BotonConfirmar } from "../../componentes";
import { Avisos, boton, campo, etiqueta, Tarjeta } from "../../ui";

export default async function Page({
  searchParams,
}: {
  searchParams: { ok?: string; error?: string };
}) {
  const socios = await listarSocios();

  return (
    <>
      <h1 className="font-display text-4xl sm:text-5xl tracking-tight">
        Socios
      </h1>
      <Avisos searchParams={searchParams} />

      <Tarjeta titulo="Habilitar un socio">
        <form action={sumarSocio} className="grid gap-5 sm:grid-cols-2">
          <input type="hidden" name="volver" value="/panel/socios" />
          <label className={etiqueta}>
            Correo de Google
            <input name="email" type="email" required className={campo} />
          </label>
          <label className={etiqueta}>
            Nombre (como lo ven los compradores)
            <input name="nombre" required maxLength={80} className={campo} />
          </label>
          <button className={`${boton} sm:col-span-2 sm:justify-self-start`}>
            Habilitar
          </button>
        </form>
      </Tarjeta>

      <Tarjeta titulo="Con acceso al panel">
        <ul className="divide-y divide-ink/10">
          {socios.map((socio) => (
            <li
              key={socio.id}
              className="flex flex-wrap items-center justify-between gap-4 py-4"
            >
              <div className={socio.activo ? "" : "text-ink/40"}>
                <p className="font-bold">{socio.nombre || "Sin nombre"}</p>
                <p className="text-sm">
                  {socio.email} · {socio.activo ? "Administrador" : "Sin acceso"}
                </p>
              </div>
              {socio.activo && (
                <form action={quitarSocio}>
                  <input type="hidden" name="id" value={socio.id} />
                  <input type="hidden" name="volver" value="/panel/socios" />
                  <BotonConfirmar
                    pregunta={`¿Quitarle el acceso a ${socio.nombre || socio.email}?`}
                    className="rounded-full border border-red-700/30 px-4 py-2 text-xs font-bold text-red-800 transition-colors hover:bg-red-700 hover:text-white"
                  >
                    Quitar acceso
                  </BotonConfirmar>
                </form>
              )}
            </li>
          ))}
        </ul>
      </Tarjeta>
    </>
  );
}
