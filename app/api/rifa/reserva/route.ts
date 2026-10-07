import { obtenerConfig, reservaPorToken } from "@/lib/rifa";
import { responderError } from "@/lib/respuesta";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Permite que el comprador retome su reserva si recarga la página.
export async function GET(request: Request) {
  try {
    const token = new URL(request.url).searchParams.get("token") ?? "";
    const reserva = token ? await reservaPorToken(token) : null;
    if (!reserva) return NextResponse.json({ reserva: null });
    const { alias, titular, precio } = await obtenerConfig();
    return NextResponse.json(
      {
        reserva: {
          numero: reserva.numero,
          estado: reserva.estado,
          venceEn: reserva.vence_en,
          alias,
          titular,
          precio,
        },
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    return responderError(error);
  }
}
