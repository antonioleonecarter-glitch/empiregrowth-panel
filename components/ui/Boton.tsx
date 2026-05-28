import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

type Variante = "primario" | "secundario" | "fantasma";
type Tamano = "sm" | "md" | "lg";

const VARIANTES: Record<Variante, string> = {
  primario:
    "border-0 bg-gradient-to-r from-oro-claro to-oro-oscuro text-[#2a1e08] font-medium tracking-[1px] shadow-[0_0_18px_rgba(242,193,78,0.45)] hover:shadow-[0_0_28px_rgba(242,193,78,0.6)] hover:brightness-110",
  secundario:
    "border border-oro/40 bg-transparent text-texto hover:border-oro hover:bg-oro/10 hover:text-oro-claro",
  fantasma:
    "border border-transparent bg-transparent text-texto-tenue hover:text-oro hover:bg-oro/[0.04]",
};

const TAMANOS: Record<Tamano, string> = {
  sm: "px-4 py-2 text-[11px]",
  md: "px-5 py-3 text-[13px]",
  lg: "px-7 py-3.5 text-[14px]",
};

function clases(variante: Variante, tamano: Tamano, extra = "") {
  return `inline-flex items-center justify-center gap-2 rounded-[10px] font-sans uppercase transition-all disabled:cursor-not-allowed disabled:opacity-50 ${VARIANTES[variante]} ${TAMANOS[tamano]} ${extra}`;
}

export function Boton({
  variante = "primario",
  tamano = "md",
  className = "",
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variante?: Variante;
  tamano?: Tamano;
  children: ReactNode;
}) {
  return (
    <button className={clases(variante, tamano, className)} {...props}>
      {children}
    </button>
  );
}

export function BotonLink({
  variante = "primario",
  tamano = "md",
  className = "",
  href,
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variante?: Variante;
  tamano?: Tamano;
  children: ReactNode;
}) {
  return (
    <Link href={href} className={clases(variante, tamano, className)} {...props}>
      {children}
    </Link>
  );
}
