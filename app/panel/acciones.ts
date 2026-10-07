"use server";

import { signIn, signOut } from "@/auth";
import {
  activarRifa,
  confirmarPago,
  ErrorRifa,
  guardarConfig,
  liberarOperacion,
  marcarRendido,
  registrarEfectivo,
} from "@/lib/rifa";
import { exigirSocio } from "@/lib/sesion";
import { agregarSocio, desactivarSocio, type Socio } from "@/lib/socios";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Toda acción del panel verifica la sesión, ejecuta y vuelve a la pantalla de
// origen con el resultado en la URL.
async function ejecutar(
  formulario: FormData,
  tarea: (socio: Socio) => Promise<void>
) {
  const socio = await exigirSocio();
  const pedido = String(formulario.get("volver") ?? "");
  const volver = /^\/panel(\/[a-z]*)?$/.test(pedido) ? pedido : "/panel";
  let aviso = "ok=1";
  try {
    await tarea(socio);
  } catch (error) {
    if (!(error instanceof ErrorRifa)) throw error;
    aviso = `error=${encodeURIComponent(error.message)}`;
  }
  revalidatePath("/panel", "layout");
  redirect(`${volver}?${aviso}`);
}

export async function ingresarConGoogle() {
  await signIn("google", { redirectTo: "/panel" });
}

export async function ingresarDev(formulario: FormData) {
  try {
    await signIn("credentials", {
      email: formulario.get("email"),
      redirectTo: "/panel",
    });
  } catch (error) {
    if (error instanceof AuthError) redirect("/panel/ingresar?error=AccessDenied");
    throw error;
  }
}

export async function salir() {
  await signOut({ redirectTo: "/panel/ingresar" });
}

export async function confirmar(formulario: FormData) {
  await ejecutar(formulario, (socio) =>
    confirmarPago(Number(formulario.get("id")), socio.email)
  );
}

export async function liberar(formulario: FormData) {
  await ejecutar(formulario, (socio) =>
    liberarOperacion(Number(formulario.get("id")), socio.email)
  );
}

export async function rendir(formulario: FormData) {
  await ejecutar(formulario, (socio) =>
    marcarRendido(Number(formulario.get("id")), socio.email)
  );
}

export async function efectivo(formulario: FormData) {
  await ejecutar(formulario, (socio) =>
    registrarEfectivo(
      {
        numero: formulario.get("numero"),
        nombre: formulario.get("nombre"),
        telefono: formulario.get("telefono"),
        vendedorId: formulario.get("vendedor"),
      },
      socio.email
    )
  );
}

export async function configurar(formulario: FormData) {
  await ejecutar(formulario, (socio) =>
    guardarConfig(
      {
        nombre: String(formulario.get("nombre") ?? ""),
        precio: Number(formulario.get("precio")),
        alias: String(formulario.get("alias") ?? ""),
        titular: String(formulario.get("titular") ?? ""),
        premio: String(formulario.get("premio") ?? ""),
        sorteo: String(formulario.get("sorteo") ?? ""),
      },
      socio.email
    )
  );
}

export async function activar(formulario: FormData) {
  await ejecutar(formulario, (socio) => activarRifa(socio.email));
}

export async function sumarSocio(formulario: FormData) {
  await ejecutar(formulario, () =>
    agregarSocio(formulario.get("email"), formulario.get("nombre"))
  );
}

export async function quitarSocio(formulario: FormData) {
  await ejecutar(formulario, (socio) =>
    desactivarSocio(Number(formulario.get("id")), socio.email)
  );
}
