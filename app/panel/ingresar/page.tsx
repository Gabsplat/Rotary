import { INGRESO_DEV } from "@/auth";
import Container from "@/components/Container";
import { Eyebrow } from "@/components/ui";
import { socioActual } from "@/lib/sesion";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ingresarConGoogle, ingresarDev } from "../acciones";
import { boton, campo, etiqueta } from "../ui";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Panel de socios · Rotary Club Mendoza Sur",
  robots: { index: false },
};

export default async function Page({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  if (await socioActual()) redirect("/panel");

  return (
    <main>
      <Container className="flex min-h-[70vh] items-center justify-center py-20">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 sm:p-10 shadow-2xl shadow-ink/10">
          <Eyebrow>Solo socios</Eyebrow>
          <h1 className="mt-6 font-display text-4xl tracking-tight">
            Panel del club
          </h1>
          <p className="mt-4 text-ink/70">
            Ingresá con la cuenta de Google que el club tiene registrada a tu
            nombre.
          </p>
          {searchParams.error && (
            <p role="alert" className="mt-6 rounded-2xl bg-red-50 px-5 py-4 text-sm font-semibold text-red-800">
              {searchParams.error === "AccessDenied"
                ? "Esa cuenta no está habilitada. Pedile a un socio que cargue tu correo en el panel."
                : "No pudimos iniciar la sesión. Probá de nuevo."}
            </p>
          )}
          <form action={ingresarConGoogle} className="mt-8">
            <button className={`${boton} w-full`}>Ingresar con Google</button>
          </form>
          {INGRESO_DEV && (
            <form action={ingresarDev} className="mt-8 border-t border-ink/10 pt-6">
              <label className={etiqueta}>
                Ingreso de desarrollo
                <input name="email" type="email" required placeholder="correo@ejemplo.com" className={campo} />
              </label>
              <button className={`${boton} mt-4 w-full`}>Ingresar sin Google</button>
            </form>
          )}
        </div>
      </Container>
    </main>
  );
}
