import { adjuntarComprobante, ErrorRifa, MAX_COMPROBANTE } from "@/lib/rifa";
import { responderError } from "@/lib/respuesta";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formulario = await request.formData();
    const token = String(formulario.get("token") ?? "");
    const archivo = formulario.get("comprobante");
    if (!token || !(archivo instanceof File))
      throw new ErrorRifa("Falta el comprobante.");
    if (archivo.size > MAX_COMPROBANTE)
      throw new ErrorRifa("El comprobante supera los 4 MB.");
    const numero = await adjuntarComprobante(token, {
      nombre: archivo.name,
      datos: Buffer.from(await archivo.arrayBuffer()),
    });
    return NextResponse.json({ numero });
  } catch (error) {
    return responderError(error);
  }
}
