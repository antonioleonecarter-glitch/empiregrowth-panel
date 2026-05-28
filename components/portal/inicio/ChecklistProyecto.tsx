"use client";

import { useState, useTransition } from "react";
import type { EstadoItem } from "@/lib/checklist";

const ESTILO_TARJETA = {
  background: "rgba(11, 17, 30, 0.6)",
  border: "1px solid rgba(95, 184, 230, 0.16)",
  borderRadius: 16,
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)",
  padding: 24,
} as const;

export default function ChecklistProyecto({
  itemsIniciales,
}: {
  itemsIniciales: EstadoItem[];
}) {
  const [items, setItems] = useState<EstadoItem[]>(itemsIniciales);
  const [, startTransition] = useTransition();

  const completados = items.filter((i) => i.completado).length;
  const total = items.length;
  const porcentaje = total > 0 ? Math.round((completados / total) * 100) : 0;

  const alternar = (slug: string) => {
    setItems((prev) =>
      prev.map((i) =>
        i.slug === slug ? { ...i, completado: !i.completado } : i,
      ),
    );
    startTransition(async () => {
      try {
        const r = await fetch("/api/checklist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slug }),
        });
        if (!r.ok) throw new Error("Toggle falló");
        const data = (await r.json()) as { slug: string; completado: boolean };
        setItems((prev) =>
          prev.map((i) =>
            i.slug === data.slug ? { ...i, completado: data.completado } : i,
          ),
        );
      } catch {
        setItems((prev) =>
          prev.map((i) =>
            i.slug === slug ? { ...i, completado: !i.completado } : i,
          ),
        );
      }
    });
  };

  return (
    <div style={ESTILO_TARJETA}>
      <div
        className="flex items-center justify-between"
        style={{ marginBottom: 24 }}
      >
        <span className="flex items-center gap-2 font-mono uppercase tracking-[2px] text-gris" style={{ fontSize: 13, fontWeight: 500 }}>
          <svg
            className="h-4 w-4 opacity-65"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
          </svg>
          Checklist de tu proyecto
        </span>
        <span
          className="font-mono text-oro"
          style={{ fontSize: 14, fontWeight: 500, letterSpacing: 1 }}
        >
          {completados} de {total} · {porcentaje}%
        </span>
      </div>

      <div
        className="grid"
        style={{
          gridTemplateColumns: "1fr 1fr",
          rowGap: 6,
          columnGap: 40,
        }}
      >
        {/* Reordenamos: 1,5,2,6,3,7,4,8 para que row-first dé col-izq 1-4 y col-der 5-8 */}
        {Array.from({ length: 4 }).flatMap((_, fila) => {
          const izq = items[fila];
          const der = items[fila + 4];
          return [izq, der].filter(Boolean).map((item) => (
            <button
              key={item.slug}
              type="button"
              onClick={() => alternar(item.slug)}
              aria-label={`${item.numero} · ${item.titulo} — ${
                item.completado ? "completado" : "pendiente"
              }`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                width: "100%",
                padding: "12px 0",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                fontFamily: "var(--font-grotesk), 'Space Grotesk', sans-serif",
                fontSize: 16,
                color: item.completado ? "#8590a0" : "#f5f0e6",
              }}
            >
              {/* Checkbox redondo */}
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  flexShrink: 0,
                  border: "2px solid",
                  borderColor: item.completado ? "#6fd089" : "#f2c14e",
                  background: item.completado ? "#6fd089" : "transparent",
                  transition: "all 0.2s ease",
                }}
              >
                {item.completado ? (
                  <svg
                    width={13}
                    height={13}
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="#04060d"
                    strokeWidth={2.2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 6l3 3 5-6" />
                  </svg>
                ) : null}
              </span>
              {/* Número */}
              <span
                style={{
                  fontFamily:
                    "var(--font-jetbrains), 'JetBrains Mono', monospace",
                  fontSize: 13,
                  color: "#5a6472",
                  minWidth: 16,
                  flexShrink: 0,
                }}
              >
                {item.numero}
              </span>
              {/* Texto */}
              <span style={{ flex: 1 }}>{item.titulo}</span>
            </button>
          ));
        })}
      </div>

      {/* Barra de progreso */}
      <div
        className="overflow-hidden"
        style={{
          height: 6,
          marginTop: 24,
          borderRadius: 6,
          background: "rgba(95, 184, 230, 0.1)",
        }}
      >
        <div
          className="h-full transition-[width] duration-700"
          style={{
            width: `${porcentaje}%`,
            background: "linear-gradient(90deg, #6fd089, #f2c14e)",
            borderRadius: 6,
          }}
        />
      </div>
    </div>
  );
}
