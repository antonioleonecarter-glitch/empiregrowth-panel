import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { getCurrentCliente } from "@/lib/auth";
import { JARVIS_SYSTEM_PROMPT } from "@/lib/jarvis-personalidad";

export const runtime = "nodejs";

const MODEL = "claude-sonnet-4-6";
const MAX_TOKENS = 1024;

const TurnoSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(4000),
});

const CuerpoSchema = z.object({
  mensaje: z.string().min(1).max(4000),
  historial: z.array(TurnoSchema).max(20).optional(),
});

function sseError(status: number, mensaje: string) {
  return Response.json({ error: mensaje }, { status });
}

export async function POST(request: Request) {
  const cliente = await getCurrentCliente();
  if (!cliente) {
    return sseError(401, "No autorizado.");
  }

  // Cortacircuito de gasto: en modo desactivado, NO llamamos a Anthropic.
  // Defensa en profundidad — el cliente también respeta esto, esto es por si
  // se llama directo al endpoint sin pasar por el cliente.
  if (process.env.JARVIS_DISABLED === "true") {
    return sseError(503, "JARVIS está en modo demostración.");
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return sseError(503, "Servicio no configurado.");
  }

  let payload: z.infer<typeof CuerpoSchema>;
  try {
    payload = CuerpoSchema.parse(await request.json());
  } catch {
    return sseError(400, "Solicitud inválida.");
  }

  const client = new Anthropic({ apiKey });

  const messages: Anthropic.MessageParam[] = [
    ...(payload.historial ?? []).map((t) => ({
      role: t.role,
      content: t.content,
    })),
    { role: "user", content: payload.mensaje },
  ];

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const send = (obj: unknown) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(obj)}\n\n`));
      };

      try {
        const claudeStream = client.messages.stream({
          model: MODEL,
          max_tokens: MAX_TOKENS,
          system: [
            {
              type: "text",
              text: JARVIS_SYSTEM_PROMPT,
              cache_control: { type: "ephemeral" },
            },
          ],
          messages,
        });

        for await (const event of claudeStream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            send({ text: event.delta.text });
          }
        }
        send({ done: true });
      } catch (error) {
        console.error("[JARVIS] Error llamando a Anthropic:", error);
        if (error instanceof Anthropic.RateLimitError) {
          send({
            error: `Rate limit · ${error.message}`,
          });
        } else if (error instanceof Anthropic.AuthenticationError) {
          send({ error: `Auth · ${error.message}` });
        } else if (error instanceof Anthropic.BadRequestError) {
          send({ error: `400 · ${error.message}` });
        } else if (error instanceof Anthropic.APIError) {
          send({
            error: `API ${error.status ?? "?"} · ${error.message}`,
          });
        } else if (error instanceof Error) {
          send({ error: `Interno · ${error.message}` });
        } else {
          send({ error: "Error interno desconocido." });
        }
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
