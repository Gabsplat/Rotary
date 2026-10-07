import { obtenerComprobante } from "@/lib/rifa";
import { socioActual } from "@/lib/sesion";

export const dynamic = "force-dynamic";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  if (!(await socioActual())) return new Response("No autorizado", { status: 401 });
  const id = Number(params.id);
  const comprobante = Number.isInteger(id) ? await obtenerComprobante(id) : null;
  if (!comprobante) return new Response("No encontrado", { status: 404 });
  return new Response(new Uint8Array(comprobante.datos), {
    headers: {
      "Content-Type": comprobante.mime,
      "Content-Disposition": "inline",
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "private, no-store",
    },
  });
}
