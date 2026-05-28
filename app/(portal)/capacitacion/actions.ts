"use server";

import { revalidatePath } from "next/cache";
import { requireCliente } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function marcarCompletado(slug: string) {
  const cliente = await requireCliente();
  await prisma.progresoModulo.upsert({
    where: {
      clienteId_moduloSlug: { clienteId: cliente.id, moduloSlug: slug },
    },
    create: { clienteId: cliente.id, moduloSlug: slug },
    update: {},
  });
  revalidatePath("/capacitacion");
  revalidatePath(`/capacitacion/${slug}`);
}

export async function desmarcarCompletado(slug: string) {
  const cliente = await requireCliente();
  await prisma.progresoModulo.deleteMany({
    where: { clienteId: cliente.id, moduloSlug: slug },
  });
  revalidatePath("/capacitacion");
  revalidatePath(`/capacitacion/${slug}`);
}
