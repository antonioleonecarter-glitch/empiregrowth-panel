"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { getSession } from "@/lib/session";

export type AccesoState = {
  ok: boolean;
  error?: string;
};

const schema = z.object({
  clave: z.string().min(1, "Introduce la clave"),
});

export async function validarClaveAcceso(
  _prev: AccesoState,
  formData: FormData,
): Promise<AccesoState> {
  const parsed = schema.safeParse({
    clave: formData.get("clave")?.toString() ?? "",
  });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Clave requerida" };
  }

  const claveEsperada = process.env.ACCESO_CLAVE;
  if (!claveEsperada) {
    return { ok: false, error: "Servicio no configurado. Contacta al equipo." };
  }

  if (parsed.data.clave.trim() !== claveEsperada) {
    return { ok: false, error: "Clave incorrecta" };
  }

  const session = await getSession();
  session.accesoOk = true;
  await session.save();

  redirect("/video");
}
