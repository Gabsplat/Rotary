import { NextResponse } from "next/server";
import { ErrorRifa } from "./rifa";

// Los errores de negocio llegan al comprador con su mensaje; el resto se
// registra y se responde con un texto genérico.
export function responderError(error: unknown) {
  if (error instanceof ErrorRifa)
    return NextResponse.json({ error: error.message }, { status: 400 });
  console.error(error);
  return NextResponse.json(
    { error: "No pudimos procesar el pedido. Probá de nuevo." },
    { status: 500 }
  );
}
