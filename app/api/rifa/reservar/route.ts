import { obtenerConfig, reservar } from "@/lib/rifa";
import { responderError } from "@/lib/respuesta";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const datos = await request.json();
    const reserva = await reservar(datos);
    const { alias, titular, precio } = await obtenerConfig();
    return NextResponse.json({ ...reserva, alias, titular, precio });
  } catch (error) {
    return responderError(error);
  }
}
