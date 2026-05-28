import "server-only";
import { prisma } from "./db";

export async function obtenerSetProgreso(
  clienteId: number,
): Promise<Set<string>> {
  const registros = await prisma.progresoModulo.findMany({
    where: { clienteId },
    select: { moduloSlug: true },
  });
  return new Set(registros.map((r) => r.moduloSlug));
}

export async function obtenerProgresoModulo(
  clienteId: number,
  moduloSlug: string,
): Promise<boolean> {
  const r = await prisma.progresoModulo.findUnique({
    where: { clienteId_moduloSlug: { clienteId, moduloSlug } },
  });
  return r !== null;
}
