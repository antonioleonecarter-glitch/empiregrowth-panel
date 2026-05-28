"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { verifyPassword } from "@/lib/auth";
import { getSession } from "@/lib/session";

export type LoginState = {
  ok: boolean;
  error?: string;
};

const schema = z.object({
  email: z.string().trim().toLowerCase().email("Correo no válido"),
  password: z.string().min(1, "Contraseña requerida"),
});

export async function iniciarSesion(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const parsed = schema.safeParse({
    email: formData.get("email")?.toString() ?? "",
    password: formData.get("password")?.toString() ?? "",
  });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Datos inválidos" };
  }

  const cliente = await prisma.cliente.findUnique({
    where: { email: parsed.data.email },
  });
  if (!cliente) {
    return { ok: false, error: "Credenciales no válidas" };
  }
  const ok = await verifyPassword(parsed.data.password, cliente.passwordHash);
  if (!ok) {
    return { ok: false, error: "Credenciales no válidas" };
  }

  const session = await getSession();
  session.clienteId = cliente.id;
  session.email = cliente.email;
  await session.save();

  redirect("/inicio");
}
