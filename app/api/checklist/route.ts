import { z } from "zod";
import { getCurrentCliente } from "@/lib/auth";
import {
  alternarItem,
  obtenerChecklistDelCliente,
} from "@/lib/checklist";

export const runtime = "nodejs";

export async function GET() {
  const cliente = await getCurrentCliente();
  if (!cliente) {
    return Response.json({ error: "No autorizado." }, { status: 401 });
  }
  const items = await obtenerChecklistDelCliente(cliente.id);
  return Response.json({ items });
}

const ToggleSchema = z.object({ slug: z.string().min(1).max(64) });

export async function POST(request: Request) {
  const cliente = await getCurrentCliente();
  if (!cliente) {
    return Response.json({ error: "No autorizado." }, { status: 401 });
  }
  let payload: z.infer<typeof ToggleSchema>;
  try {
    payload = ToggleSchema.parse(await request.json());
  } catch {
    return Response.json({ error: "Solicitud inválida." }, { status: 400 });
  }
  try {
    const completado = await alternarItem(cliente.id, payload.slug);
    return Response.json({ slug: payload.slug, completado });
  } catch {
    return Response.json(
      { error: "Item desconocido." },
      { status: 400 },
    );
  }
}
