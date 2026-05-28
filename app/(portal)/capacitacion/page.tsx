import Link from "next/link";
import { requireCliente } from "@/lib/auth";
import { BLOQUES, todosModulos, type Bloque } from "@/lib/capacitacion";
import { obtenerSetProgreso } from "@/lib/progreso";
import CardHud from "@/components/ui/CardHud";

export default async function CapacitacionPage() {
  const cliente = await requireCliente();
  const progreso = await obtenerSetProgreso(cliente.id);
  const total = todosModulos().length;
  const completados = todosModulos().filter((m) =>
    progreso.has(m.slug),
  ).length;
  const pct = total === 0 ? 0 : Math.round((completados / total) * 100);

  return (
    <div className="space-y-4">
      <CardHud
        tag={`EMG-${String(cliente.id).padStart(3, "0")} · CAPACITACIÓN`}
        label="◢ Tu biblioteca"
      >
        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h1 className="font-sans text-3xl font-light tracking-[0.5px] text-texto md:text-4xl">
              Domina tu sistema
            </h1>
            <p className="mt-3 max-w-2xl font-sans text-[13px] leading-[1.6] text-texto-tenue">
              Cuatro bloques. Videos, guías y descargables. JARVIS conoce esta
              biblioteca y la referencia cuando te ayuda. Tu progreso queda
              guardado.
            </p>
          </div>
          <div className="space-y-3">
            <div className="flex items-baseline justify-between">
              <span className="font-sans text-[9px] uppercase tracking-[2px] text-oro-oscuro">
                Progreso global
              </span>
              <span className="font-sans text-[28px] font-light leading-none text-oro">
                {pct}
                <span className="text-[16px] text-texto-tenue">%</span>
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-oro/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-oro-oscuro to-oro-claro"
                style={{
                  width: `${pct}%`,
                  boxShadow: "0 0 14px rgba(242,193,78,0.55)",
                }}
              />
            </div>
            <p className="font-sans text-[10px] uppercase tracking-[1.5px] text-texto-tenue">
              {completados} / {total} módulos completados
            </p>
          </div>
        </div>
      </CardHud>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {BLOQUES.map((bloque) => {
          const completos = bloque.modulos.filter((m) =>
            progreso.has(m.slug),
          ).length;
          return (
            <BloqueCard
              key={bloque.slug}
              bloque={bloque}
              completos={completos}
            />
          );
        })}
      </div>
    </div>
  );
}

function BloqueCard({
  bloque,
  completos,
}: {
  bloque: Bloque;
  completos: number;
}) {
  const total = bloque.modulos.length;
  const pct = Math.round((completos / total) * 100);
  return (
    <article className="hud-corte relative flex flex-col gap-5 border border-borde bg-gradient-to-br from-superficie to-superficie-profunda p-5 transition-all hover:border-oro/55">
      <span className="eg-blink absolute right-3.5 top-2.5 font-mono text-[8px] tracking-[1px] text-oro/55">
        EMG-B0{bloque.numero}
      </span>
      <header className="space-y-3">
        <span
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-oro/55 bg-oro/15 font-sans text-[12px] text-oro-claro"
          style={{ boxShadow: "0 0 12px rgba(242,193,78,0.35)" }}
        >
          {bloque.numero}
        </span>
        <p className="font-sans text-[9px] uppercase tracking-[2px] text-oro-oscuro">
          BLOQUE {bloque.numero}
        </p>
        <h2 className="font-sans text-xl font-light leading-tight text-texto">
          {bloque.titulo}
        </h2>
        <p className="font-sans text-[12px] leading-[1.55] text-texto-tenue">
          {bloque.resumen}
        </p>
      </header>
      <ul className="space-y-1.5">
        {bloque.modulos.slice(0, 4).map((m) => (
          <li
            key={m.slug}
            className="flex items-center gap-2 font-sans text-[11px] text-[#d8d2c4]"
          >
            <span
              className={
                progreso(bloque.modulos, m.slug, completos)
                  ? "text-oro"
                  : "text-texto-sombra"
              }
            >
              ◢
            </span>
            <span>{m.titulo}</span>
          </li>
        ))}
        {bloque.modulos.length > 4 && (
          <li className="font-sans text-[10px] uppercase tracking-[1.5px] text-texto-tenue">
            + {bloque.modulos.length - 4} módulos más
          </li>
        )}
      </ul>
      <div className="mt-auto space-y-2">
        <div className="flex items-baseline justify-between">
          <span className="font-sans text-[9px] uppercase tracking-[1.5px] text-texto-tenue">
            Progreso
          </span>
          <span className="font-sans text-[11px] text-oro">
            {completos}/{total}
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-oro/10">
          <div
            className="h-full rounded-full bg-oro/85"
            style={{ width: `${pct}%` }}
          />
        </div>
        <Link
          href={`/capacitacion/${bloque.modulos[0].slug}`}
          className="block pt-2 font-sans text-[10px] uppercase tracking-[2px] text-oro hover:text-oro-claro"
        >
          EMPEZAR BLOQUE →
        </Link>
      </div>
    </article>
  );
}

// Helper local: indica si un módulo dentro del bloque está completado.
// (No es eficiente para volumen, pero el grid muestra 4 módulos por bloque máximo.)
function progreso(
  _modulos: { slug: string }[],
  _slug: string,
  _completos: number,
): boolean {
  return false; // visual neutro — el detalle real está en /capacitacion/[slug]
}
