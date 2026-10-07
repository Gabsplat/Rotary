import { estadoPublico } from "@/lib/rifa";
import { responderError } from "@/lib/respuesta";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return NextResponse.json(
      { numeros: await estadoPublico() },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    return responderError(error);
  }
}
