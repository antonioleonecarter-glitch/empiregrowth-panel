"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import dynamic from "next/dynamic";
import { useDobleAplauso } from "@/lib/useDobleAplauso";
import { saludoBienvenida } from "@/lib/jarvis-personalidad";

const NucleoJarvis = dynamic(
  () => import("@/components/brand/NucleoJarvis"),
  { ssr: false },
);

type Mensaje = {
  role: "user" | "assistant";
  content: string;
  streaming?: boolean;
};

const RESPUESTA_PLACEHOLDER =
  "Estoy en modo demostración. El cerebro real está pausado para no gastar créditos en pruebas de diseño. Para activarlo, pon JARVIS_DISABLED=false en .env.local.";

export default function JarvisAsistente({
  primerNombre,
  jarvisHabilitado,
}: {
  primerNombre: string;
  jarvisHabilitado: boolean;
}) {
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [entrada, setEntrada] = useState<string>("");
  const [pensando, setPensando] = useState<boolean>(false);
  const [errorChat, setErrorChat] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [mensajes, pensando]);

  const hablar = useCallback((texto: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const u = new SpeechSynthesisUtterance(texto);
    u.lang = "es-ES";
    u.rate = 1.0;
    u.pitch = 1.0;
    u.volume = 1.0;
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
  }, []);

  const { estado, error, activar, desactivar } = useDobleAplauso({
    onDoble: () => hablar(saludoBienvenida(primerNombre)),
  });

  const escuchando = estado === "escuchando";

  const onClickNucleo = () => {
    if (escuchando) {
      desactivar();
    } else if (estado === "off") {
      activar();
    }
  };

  const onEnviar = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const texto = entrada.trim();
    if (!texto || pensando) return;
    setEntrada("");
    setErrorChat(null);

    if (!jarvisHabilitado) {
      setMensajes((prev) => [
        ...prev,
        { role: "user", content: texto },
        { role: "assistant", content: RESPUESTA_PLACEHOLDER },
      ]);
      return;
    }

    setPensando(true);
    const historial = mensajes
      .filter((m) => !m.streaming && m.content.length > 0)
      .map((m) => ({ role: m.role, content: m.content }));

    setMensajes((prev) => [
      ...prev,
      { role: "user", content: texto },
      { role: "assistant", content: "", streaming: true },
    ]);

    try {
      const r = await fetch("/api/jarvis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mensaje: texto, historial }),
      });

      if (!r.ok || !r.body) {
        const data = await r.json().catch(() => ({}));
        const msg =
          typeof data?.error === "string"
            ? data.error
            : "No pude responder en este momento.";
        setErrorChat(msg);
        setMensajes((prev) => prev.slice(0, -1));
        return;
      }

      const reader = r.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let primerChunk = true;

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const eventos = buffer.split("\n\n");
        buffer = eventos.pop() ?? "";

        for (const ev of eventos) {
          const linea = ev.trim();
          if (!linea.startsWith("data:")) continue;
          const datos = linea.slice(5).trim();
          if (!datos) continue;

          try {
            const json = JSON.parse(datos) as {
              text?: string;
              done?: boolean;
              error?: string;
            };
            if (json.error) {
              setErrorChat(json.error);
              setMensajes((prev) => prev.slice(0, -1));
              return;
            }
            if (json.text) {
              if (primerChunk) {
                setPensando(false);
                primerChunk = false;
              }
              setMensajes((prev) => {
                const next = [...prev];
                const last = next[next.length - 1];
                if (last && last.streaming) {
                  next[next.length - 1] = {
                    ...last,
                    content: last.content + json.text,
                  };
                }
                return next;
              });
            }
            if (json.done) {
              setMensajes((prev) => {
                const next = [...prev];
                const last = next[next.length - 1];
                if (last && last.streaming) {
                  next[next.length - 1] = { ...last, streaming: false };
                }
                return next;
              });
            }
          } catch {
            // ignorar líneas mal formadas
          }
        }
      }
    } catch {
      setErrorChat("Sin conexión con JARVIS.");
      setMensajes((prev) => prev.slice(0, -1));
    } finally {
      setPensando(false);
    }
  };

  const chatVacio = mensajes.length === 0 && !pensando && !errorChat;

  return (
    <div
      className="grid overflow-hidden"
      style={{
        gridTemplateColumns: "260px 1fr",
        background: "rgba(11, 17, 30, 0.6)",
        border: "1px solid rgba(95, 184, 230, 0.16)",
        borderRadius: 16,
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
      }}
    >
      {/* Columna izquierda — esfera 3D */}
      <button
        type="button"
        onClick={onClickNucleo}
        aria-label={
          escuchando
            ? "Detener escucha"
            : "Activar JARVIS — aplaude dos veces para hablar"
        }
        className="flex cursor-pointer flex-col items-center justify-center bg-transparent"
        style={{
          borderRight: "1px solid rgba(95, 184, 230, 0.16)",
          padding: "32px 24px",
          background:
            "radial-gradient(circle at center, rgba(95, 184, 230, 0.05), transparent 70%)",
        }}
      >
        <div
          className="relative flex items-center justify-center"
          style={{ width: 170, height: 170 }}
        >
          <NucleoJarvis size="xs" />
        </div>
        <div
          className="mt-6 text-center font-mono text-[16px] font-medium tracking-[6px] text-crema"
        >
          J·A·R·V·I·S
        </div>
        <div
          className="mt-[6px] text-center font-sans text-[13px] tracking-[0.5px]"
          style={{ color: "#5a6472" }}
        >
          {estado === "encendiendo"
            ? "Encendiendo micrófono..."
            : escuchando
              ? "● Escuchando · aplaude 2 veces"
              : error
                ? `⚠ ${error}`
                : "Aplaude 2 veces para hablar"}
        </div>
      </button>

      {/* Columna derecha — chat */}
      <div className="flex min-h-[280px] flex-col p-6">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 font-mono text-[13px] font-medium uppercase tracking-[2px] text-gris">
            <svg
              className="h-4 w-4 opacity-65"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            Conversación
          </span>
          {!jarvisHabilitado && (
            <span className="font-mono text-[11px] tracking-[1.5px] text-gris-tenue">
              MODO DEMOSTRACIÓN
            </span>
          )}
        </div>

        <div
          ref={scrollRef}
          className="eg-scroll flex flex-1 flex-col gap-3 overflow-y-auto pr-1"
          style={{ padding: "16px 4px 16px 0", marginTop: 16 }}
        >
          {chatVacio ? (
            <div className="flex flex-1 items-center justify-center px-3 text-center font-sans text-[14px] italic text-gris-tenue">
              Escríbele a JARVIS para empezar la conversación.
            </div>
          ) : (
            mensajes.map((m, i) => {
              const esUsuario = m.role === "user";
              return (
                <div
                  key={i}
                  className={`flex w-full ${
                    esUsuario ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className="font-sans"
                    style={
                      esUsuario
                        ? {
                            maxWidth: "75%",
                            padding: "12px 16px",
                            borderRadius: 14,
                            borderBottomRightRadius: 4,
                            background: "rgba(242, 193, 78, 0.14)",
                            border: "1px solid rgba(242, 193, 78, 0.25)",
                            fontSize: 15,
                            lineHeight: 1.5,
                            color: "#f5f0e6",
                          }
                        : {
                            maxWidth: "75%",
                            padding: "12px 16px",
                            borderRadius: 14,
                            borderBottomLeftRadius: 4,
                            background: "rgba(95, 184, 230, 0.12)",
                            border: "1px solid rgba(95, 184, 230, 0.2)",
                            fontSize: 15,
                            lineHeight: 1.5,
                            color: "#f5f0e6",
                          }
                    }
                  >
                    <span className="whitespace-pre-wrap">{m.content}</span>
                    {m.streaming && m.content.length > 0 ? (
                      <span className="eg-blink ml-0.5 text-cel">▋</span>
                    ) : null}
                  </div>
                </div>
              );
            })
          )}

          {pensando ? (
            <div className="flex w-full justify-start">
              <div
                className="eg-blink font-sans italic"
                style={{
                  maxWidth: "75%",
                  padding: "12px 16px",
                  borderRadius: 14,
                  borderBottomLeftRadius: 4,
                  background: "rgba(95, 184, 230, 0.12)",
                  border: "1px solid rgba(95, 184, 230, 0.2)",
                  fontSize: 14,
                  color: "#cfd6e0",
                }}
              >
                JARVIS está pensando…
              </div>
            </div>
          ) : null}

          {errorChat ? (
            <div className="flex w-full justify-start">
              <div className="rounded-[14px] border border-red-500/40 bg-red-500/10 px-4 py-3 font-sans text-[13px] text-red-300">
                ⚠ {errorChat}
              </div>
            </div>
          ) : null}
        </div>

        <form onSubmit={onEnviar} className="mt-4 flex w-full gap-3">
          <input
            type="text"
            value={entrada}
            onChange={(e) => setEntrada(e.target.value)}
            placeholder="Escríbele a JARVIS…"
            disabled={pensando}
            maxLength={4000}
            aria-label="Mensaje para JARVIS"
            className="flex-1 font-sans text-[15px] text-crema placeholder:text-gris-tenue disabled:opacity-50"
            style={{
              background: "rgba(4, 6, 13, 0.6)",
              border: "1px solid rgba(95, 184, 230, 0.16)",
              borderRadius: 32,
              padding: "14px 22px",
            }}
          />
          <button
            type="submit"
            disabled={pensando || entrada.trim().length === 0}
            className="cursor-pointer font-mono text-[13px] font-semibold tracking-[1.5px] transition-all hover:-translate-y-[1px] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
            style={{
              background: "linear-gradient(135deg, #f2c14e, #d4a43c)",
              color: "#04060d",
              border: "none",
              borderRadius: 32,
              padding: "0 28px",
            }}
            aria-label="Enviar mensaje a JARVIS"
          >
            {pensando ? "···" : "ENVIAR"}
          </button>
        </form>
      </div>
    </div>
  );
}
