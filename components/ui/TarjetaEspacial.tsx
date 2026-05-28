import type { CSSProperties, ReactNode } from "react";

// Tarjeta espacial — equivalente a .card de inicio.html (paso 2).
// Estilos inline para garantizar que `backdrop-filter` (sin prefijo) llegue
// al navegador. Lightning CSS strippea el unprefixed cuando solo está en CSS.

type Variante = "neutra" | "oro";

const ESTILOS_BASE: Record<Variante, CSSProperties> = {
  neutra: {
    background: "rgba(11, 17, 30, 0.6)",
    border: "1px solid rgba(95, 184, 230, 0.16)",
    borderRadius: 16,
    backdropFilter: "blur(6px)",
    WebkitBackdropFilter: "blur(6px)",
  },
  oro: {
    background: "rgba(242, 193, 78, 0.06)",
    borderTop: "1px solid rgba(95, 184, 230, 0.16)",
    borderRight: "1px solid rgba(95, 184, 230, 0.16)",
    borderBottom: "1px solid rgba(95, 184, 230, 0.16)",
    borderLeft: "4px solid #f2c14e",
    borderRadius: 16,
    backdropFilter: "blur(6px)",
    WebkitBackdropFilter: "blur(6px)",
  },
};

export default function TarjetaEspacial({
  children,
  variante = "neutra",
  className = "",
  style,
}: {
  children: ReactNode;
  variante?: Variante;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={className}
      style={{ ...ESTILOS_BASE[variante], ...style }}
    >
      {children}
    </div>
  );
}
