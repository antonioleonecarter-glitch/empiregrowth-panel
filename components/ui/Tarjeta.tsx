import type { ReactNode } from "react";

export default function Tarjeta({
  eyebrow,
  titulo,
  subtitulo,
  acento,
  children,
  pie,
  ancho = "completo",
  variante = "default",
}: {
  eyebrow?: string;
  titulo?: string;
  subtitulo?: string;
  acento?: string;
  children: ReactNode;
  pie?: ReactNode;
  ancho?: "completo" | "estrecho";
  variante?: "default" | "destacada" | "tenue";
}) {
  const variantes = {
    default:
      "border border-oro/25 bg-carbon-claro/70 backdrop-blur-md hud-corte-todo",
    destacada:
      "border border-oro/55 bg-gradient-to-br from-oro/[0.08] via-carbon-claro/80 to-carbon/90 backdrop-blur-md hud-corte-todo shadow-[0_0_48px_rgba(242,193,78,0.08)]",
    tenue:
      "border border-oro/15 bg-carbon-claro/40 backdrop-blur-md hud-corte-todo",
  };
  const max = ancho === "estrecho" ? "max-w-md" : "max-w-3xl";

  return (
    <section
      className={`relative ${variantes[variante]} ${max} mx-auto w-full px-6 py-7 md:px-10 md:py-9`}
    >
      {(eyebrow || titulo || subtitulo || acento) && (
        <header className="mb-7 flex flex-col gap-2 border-b border-oro/15 pb-5">
          <div className="flex items-center justify-between">
            {eyebrow && (
              <span className="font-mono text-[9px] uppercase tracking-[0.45em] text-oro/85">
                {eyebrow}
              </span>
            )}
            {acento && (
              <span className="eg-blink-soft font-mono text-[9px] uppercase tracking-[0.45em] text-oro-brillante/80">
                {acento}
              </span>
            )}
          </div>
          {titulo && (
            <h1 className="font-sans text-2xl font-light leading-tight tracking-[0.04em] text-texto-base md:text-3xl">
              {titulo}
            </h1>
          )}
          {subtitulo && (
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-texto-tenue">
              {subtitulo}
            </p>
          )}
        </header>
      )}
      <div>{children}</div>
      {pie && (
        <footer className="mt-7 border-t border-oro/15 pt-5">{pie}</footer>
      )}
    </section>
  );
}
