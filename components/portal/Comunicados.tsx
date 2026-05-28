import { COMUNICADOS } from "@/lib/contenido";

export default function Comunicados() {
  return (
    <div className="flex h-full flex-col gap-3">
      {COMUNICADOS.map((c) => (
        <article
          key={c.id}
          className="relative flex-1 border-l-2 border-oro bg-gradient-to-br from-superficie to-superficie-profunda px-5 py-5"
        >
          <p className="mb-[14px] font-sans text-[9px] uppercase tracking-[2px] text-oro-oscuro">
            ◢ Comunicado del equipo
          </p>
          <p className="font-sans text-[12px] leading-[1.5] text-[#d8d2c4]">
            &ldquo;{c.cuerpo}&rdquo;
          </p>
          <div className="mt-[6px] flex items-center gap-3">
            <span className="font-sans text-[9px] tracking-[1px] text-texto-sombra">
              {c.fecha}
            </span>
            {c.videoUrl && (
              <a
                href={c.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[9px] uppercase tracking-[1.5px] text-oro hover:text-oro-claro"
              >
                VER VIDEO ↗
              </a>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
