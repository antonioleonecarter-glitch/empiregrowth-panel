import "server-only";
import { prisma } from "./db";

// Los 8 pasos del checklist del proyecto. El orden aquí define el orden visual.
// El slug es el identificador estable que se guarda en SQLite.
export type ItemChecklistDef = { slug: string; numero: number; titulo: string };

export const ITEMS_CHECKLIST: ItemChecklistDef[] = [
  { slug: "firma-contrato", numero: 1, titulo: "Firma del contrato" },
  { slug: "reunion-onboarding", numero: 2, titulo: "Reunión onboarding" },
  { slug: "cuenta-publicitaria", numero: 3, titulo: "Cuenta publicitaria" },
  { slug: "crear-anuncio-ia", numero: 4, titulo: "Crear anuncio IA" },
  { slug: "capacitacion-sistema", numero: 5, titulo: "Capacitación sistema" },
  {
    slug: "capacitacion-plataforma",
    numero: 6,
    titulo: "Capacitación plataforma",
  },
  { slug: "ver-leads", numero: 7, titulo: "Ver los leads" },
  { slug: "lanzar-campanas", numero: 8, titulo: "Lanzar campañas" },
];

export type EstadoItem = ItemChecklistDef & { completado: boolean };

export async function obtenerChecklistDelCliente(
  clienteId: number,
): Promise<EstadoItem[]> {
  const guardados = await prisma.itemChecklist.findMany({
    where: { clienteId },
    select: { slug: true, completadoEn: true },
  });
  const completados = new Set(
    guardados.filter((g) => g.completadoEn !== null).map((g) => g.slug),
  );
  return ITEMS_CHECKLIST.map((def) => ({
    ...def,
    completado: completados.has(def.slug),
  }));
}

export async function alternarItem(
  clienteId: number,
  slug: string,
): Promise<boolean> {
  if (!ITEMS_CHECKLIST.some((i) => i.slug === slug)) {
    throw new Error("Slug desconocido");
  }
  const existente = await prisma.itemChecklist.findUnique({
    where: { clienteId_slug: { clienteId, slug } },
  });
  if (!existente) {
    await prisma.itemChecklist.create({
      data: { clienteId, slug, completadoEn: new Date() },
    });
    return true;
  }
  const yaCompletado = existente.completadoEn !== null;
  await prisma.itemChecklist.update({
    where: { clienteId_slug: { clienteId, slug } },
    data: { completadoEn: yaCompletado ? null : new Date() },
  });
  return !yaCompletado;
}
