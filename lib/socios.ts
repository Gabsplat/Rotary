import { db } from "./db";
import { ErrorRifa } from "./rifa";

export type Socio = {
  id: number;
  email: string;
  nombre: string;
  rol: "admin" | "mod";
  activo: boolean;
};

function normalizar(email: unknown) {
  return String(email ?? "").trim().toLowerCase();
}

function correosIniciales() {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map(normalizar)
    .filter(Boolean);
}

export async function socioPorEmail(email: unknown): Promise<Socio | null> {
  const [socio] = await db()<Socio[]>`
    SELECT id, email, nombre, rol, activo FROM socios
    WHERE email = ${normalizar(email)} AND activo`;
  return socio ?? null;
}

// Decide si una cuenta de Google puede entrar al panel. Los correos de
// ADMIN_EMAILS entran siempre; el resto tiene que estar cargado como socio.
export async function autorizarIngreso(emailCrudo: unknown, nombre: unknown) {
  const email = normalizar(emailCrudo);
  if (!email) return false;
  const nombreLimpio = String(nombre ?? "").trim().slice(0, 80);

  if (correosIniciales().includes(email)) {
    await db()`
      INSERT INTO socios (email, nombre) VALUES (${email}, ${nombreLimpio})
      ON CONFLICT (email) DO UPDATE SET activo = true`;
  }
  const socio = await socioPorEmail(email);
  if (!socio) return false;
  if (!socio.nombre && nombreLimpio)
    await db()`UPDATE socios SET nombre = ${nombreLimpio} WHERE id = ${socio.id}`;
  return true;
}

export async function listarSocios() {
  return db()<Socio[]>`
    SELECT id, email, nombre, rol, activo FROM socios
    ORDER BY activo DESC, nombre, email`;
}

export async function agregarSocio(emailCrudo: unknown, nombre: unknown) {
  const email = normalizar(emailCrudo);
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
    throw new ErrorRifa("Ingresá un correo válido.");
  const nombreLimpio = String(nombre ?? "").trim().slice(0, 80);
  await db()`
    INSERT INTO socios (email, nombre) VALUES (${email}, ${nombreLimpio})
    ON CONFLICT (email) DO UPDATE SET
      activo = true,
      nombre = CASE WHEN ${nombreLimpio} = '' THEN socios.nombre
                    ELSE ${nombreLimpio} END`;
}

export async function desactivarSocio(id: number, emailActual: string) {
  const [socio] = await db()<{ email: string }[]>`
    SELECT email FROM socios WHERE id = ${id}`;
  if (!socio) throw new ErrorRifa("Ese socio no existe.");
  if (socio.email === normalizar(emailActual))
    throw new ErrorRifa("No podés quitarte el acceso a vos mismo.");
  if (correosIniciales().includes(socio.email))
    throw new ErrorRifa(
      "Ese correo está en ADMIN_EMAILS; hay que quitarlo de ahí primero."
    );
  await db()`UPDATE socios SET activo = false WHERE id = ${id}`;
}
