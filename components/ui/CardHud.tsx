import type { ReactNode } from "react";

type Variante = "principal" | "inv" | "borde-izq" | "simple";

const variantes: Record<Variante, string> = {
  principal:
    "hud-corte border border-borde bg-gradient-to-br from-superficie to-superficie-profunda",
  inv: "hud-corte-inv border border-oro/40",
  "borde-izq":
    "border-l-2 border-oro bg-gradient-to-br from-superficie to-superficie-profunda",
  simple: "rounded-[14px] border border-oro/30 bg-superficie",
};

export default function CardHud({
  tag,
  label,
  variante = "principal",
  className = "",
  children,
  estiloCustom,
}: {
  tag?: string;
  label?: string;
  variante?: Variante;
  className?: string;
  children: ReactNode;
  estiloCustom?: React.CSSProperties;
}) {
  return (
    <section
      className={`relative p-5 md:p-7 ${variantes[variante]} ${className}`}
      style={estiloCustom}
    >
      {tag && (
        <span className="eg-blink absolute right-3.5 top-2.5 font-mono text-[8px] tracking-[1px] text-oro/60">
          {tag}
        </span>
      )}
      {label && (
        <p className="mb-[14px] font-sans text-[9px] uppercase tracking-[2px] text-oro-oscuro">
          {label}
        </p>
      )}
      {children}
    </section>
  );
}
