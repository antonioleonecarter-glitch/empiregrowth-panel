"use client";

import { useEffect, useState } from "react";
import { PUERTA_1 } from "@/lib/contenido";

const DURACION_PLACEHOLDER_SEG = 6;

export default function VideoReproductor({
  onTerminar,
}: {
  onTerminar: () => void;
}) {
  const [estado, setEstado] = useState<"idle" | "play" | "fin">("idle");
  const [progreso, setProgreso] = useState(0);

  useEffect(() => {
    if (estado !== "play") return;
    const t0 = performance.now();
    let raf = 0;
    const tick = () => {
      const elapsed = (performance.now() - t0) / 1000;
      if (elapsed >= DURACION_PLACEHOLDER_SEG) {
        setProgreso(1);
        setEstado("fin");
        onTerminar();
        return;
      }
      setProgreso(elapsed / DURACION_PLACEHOLDER_SEG);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [estado, onTerminar]);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-[12px] border border-borde bg-fondo">
      <div
        aria-hidden
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 45%, rgba(242, 193, 78, 0.22), transparent 65%)",
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-6 text-center">
        {estado === "idle" && (
          <>
            <button
              type="button"
              onClick={() => setEstado("play")}
              aria-label="Reproducir video"
              className="group flex h-24 w-24 items-center justify-center rounded-full border border-oro bg-oro/15 transition-all hover:scale-105 hover:bg-oro/25"
              style={{ boxShadow: "0 0 40px rgba(242,193,78,0.45)" }}
            >
              <span className="ml-1 text-4xl text-oro-claro">▶</span>
            </button>
            <p className="font-mono text-[9px] uppercase tracking-[2px] text-oro-oscuro">
              Pulsa para reproducir
            </p>
            <p className="max-w-md font-sans text-[14px] text-texto/85">
              {PUERTA_1.video.placeholderVideo}
            </p>
          </>
        )}
        {estado === "play" && (
          <>
            <p className="eg-blink font-mono text-[9px] uppercase tracking-[2.5px] text-oro">
              ◉ TRANSMITIENDO
            </p>
            <p className="max-w-lg font-sans text-[15px] text-texto md:text-[17px]">
              {PUERTA_1.video.placeholderVideo}
            </p>
            <p className="font-mono text-[8px] uppercase tracking-[2px] text-texto-tenue/70">
              {PUERTA_1.video.placeholderVideoNota}
            </p>
          </>
        )}
        {estado === "fin" && (
          <>
            <p className="font-mono text-[9px] uppercase tracking-[2.5px] text-oro-claro">
              TRANSMISIÓN COMPLETA
            </p>
            <p className="max-w-md font-sans text-[17px] text-texto">
              Calendario desbloqueado a la derecha.
            </p>
          </>
        )}
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1 bg-oro/10">
        <div
          className="h-full bg-oro"
          style={{
            width: `${progreso * 100}%`,
            boxShadow: "0 0 10px rgba(242,193,78,0.65)",
          }}
        />
      </div>
    </div>
  );
}
