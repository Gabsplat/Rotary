import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { socioPorEmail } from "./socios";

// Se consulta la base en cada pedido para que quitarle el acceso a un socio
// tenga efecto inmediato, sin esperar a que venza su sesión.
export async function socioActual() {
  const sesion = await auth();
  if (!sesion?.user?.email) return null;
  return socioPorEmail(sesion.user.email);
}

export async function exigirSocio() {
  const socio = await socioActual();
  if (!socio) redirect("/panel/ingresar");
  return socio;
}
