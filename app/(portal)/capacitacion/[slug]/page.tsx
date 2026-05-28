import Link from "next/link";
import { notFound } from "next/navigation";
import { requireCliente } from "@/lib/auth";
import {
  BLOQUES,
  moduloPorSlug,
  todosModulos,
} from "@/lib/capacitacion";
import { obtenerSetProgreso } from "@/lib/progreso";
import { Boton } from "@/components/ui/Boton";
import CardHud from "@/components/ui/CardHud";
import {
  marcarCompletado,
  desmarcarCompletado,
} from "../actions";

export default async function ModuloPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const found = moduloPorSlug(slug);
  if (!found) return notFound();

  const cliente = await requireCliente();
  const progreso = await obtenerSetProgreso(cliente.id);
  const yaCompletado = progreso.has(slug);

  const { modulo, bloque } = found;
  const todos = todosModulos();
  const idxGlobal = todos.findIndex((m) => m.slug === slug);
  const anterior = idxGlobal > 0 ? todos[idxGlobal - 1] : null;
  const siguiente =
    idxGlobal >= 0 && idxGlobal < todos.length - 1
      ? todos[idxGlobal + 1]
      : null;
  const idxEnBloque = bloque.modulos.findIndex((m) => m.slug === slug) + 1;

  return (
    <div className="space-y-4">
      <nav className="flex items-center justify-between font-sans text-[10px] uppercase tracking-[1.5px]">
        <Link
          href="/capacitacion"
          className="text-texto-tenue hover:text-oro"
        >
          ← Capacitación
        </Link>
        <span className="text-texto-tenue/70">
          Bloque {bloque.numero} · Módulo {idxEnBloque} de {bloque.modulos.length}
        </span>
      </nav>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.55fr_1fr]">
        {/* Columna izquierda: video + descargable */}
        <div className="space-y-4">
          <CardHud
            tag={`EMG-MOD · ${slug.toUpperCase()}`}
            label={`◢ ${bloque.titulo}`}
          >
            <header className="mb-5">
              <h1 className="font-sans text-2xl font-light tracking-[0.5px] text-texto md:text-3xl">
                {modulo.titulo}
              </h1>
              <p className="mt-2 max-w-2xl font-sans text-[13px] leading-[1.6] text-texto-tenue">
                {modulo.descripcion}
              </p>
            </header>
            <PlaceholderVideo titulo={modulo.titulo} />
          </CardHud>

          {modulo.conPDF && (
            <CardHud
              tag="⚠ PLACEHOLDER PDF"
              label="◢ Descargable adjunto"
              variante="borde-izq"
            >
              <PlaceholderDescargable />
            </CardHud>
          )}
        </div>

        {/* Columna derecha: progreso + navegación */}
        <div className="space-y-4">
          <CardHud
            tag={yaCompletado ? "✓ COMPLETADO" : "EN PROGRESO"}
            label={
              yaCompletado
                ? "◢ Módulo terminado"
                : "◢ Marcar tu progreso"
            }
            variante={yaCompletado ? "inv" : "principal"}
            estiloCustom={
              yaCompletado
                ? {
                    background:
                      "radial-gradient(circle at 50% 30%, rgba(242, 193, 78, 0.12), #121214 70%)",
                  }
                : undefined
            }
          >
            <div className="space-y-4">
              <p className="font-sans text-[13px] leading-[1.6] text-[#d8d2c4]">
                {yaCompletado
                  ? "Ya marcaste este módulo como completado. Si quieres revisarlo de nuevo, puedes reabrirlo."
                  : "Cuando termines de ver el video, marca el módulo como completado para reflejar tu progreso."}
              </p>
              <form
                action={
                  yaCompletado
                    ? desmarcarCompletado.bind(null, slug)
                    : marcarCompletado.bind(null, slug)
                }
              >
                <Boton
                  type="submit"
                  variante={yaCompletado ? "secundario" : "primario"}
                  tamano="md"
                  className="w-full"
                >
                  {yaCompletado ? "REABRIR MÓDULO" : "MARCAR COMPLETADO →"}
                </Boton>
              </form>
            </div>
          </CardHud>

          <CardHud
            tag="EMG-NAV"
            label="◢ Navegar"
          >
            <div className="space-y-3">
              {anterior && (
                <Link
                  href={`/capacitacion/${anterior.slug}`}
                  className="flex items-start gap-3 rounded-[10px] border border-oro/20 bg-fondo/55 p-3 transition-all hover:border-oro/55 hover:bg-oro/[0.05]"
                >
                  <span className="font-sans text-[9px] uppercase tracking-[1.5px] text-texto-tenue">
                    ← Anterior
                  </span>
                  <span className="font-sans text-[12px] text-[#d8d2c4]">
                    {anterior.titulo}
                  </span>
                </Link>
              )}
              {siguiente && (
                <Link
                  href={`/capacitacion/${siguiente.slug}`}
                  className="flex items-start gap-3 rounded-[10px] border border-oro/35 bg-oro/[0.05] p-3 transition-all hover:border-oro/65 hover:bg-oro/[0.1]"
                >
                  <span className="font-sans text-[9px] uppercase tracking-[1.5px] text-oro-claro">
                    Siguiente →
                  </span>
                  <span className="font-sans text-[12px] text-texto">
                    {siguiente.titulo}
                  </span>
                </Link>
              )}
              {!siguiente && (
                <p className="eg-blink rounded-[10px] border border-oro/30 bg-oro/[0.06] p-3 text-center font-sans text-[10px] uppercase tracking-[2px] text-oro-claro">
                  ★ FIN DE LA BIBLIOTECA
                </p>
              )}
            </div>
          </CardHud>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return BLOQUES.flatMap((b) => b.modulos.map((m) => ({ slug: m.slug })));
}

function PlaceholderVideo({ titulo }: { titulo: string }) {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-[12px] border border-dashed border-oro/45 bg-fondo">
      <div
        aria-hidden
        className="absolute inset-0 opacity-35"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 45%, rgba(242, 193, 78, 0.2), transparent 65%)",
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
        <span className="font-mono text-[9px] uppercase tracking-[2.5px] text-oro-claro">
          ⚠ PLACEHOLDER VIDEO
        </span>
        <p className="max-w-md font-sans text-[16px] text-texto/90">
          [Aquí va el video del módulo &ldquo;{titulo}&rdquo;]
        </p>
        <p className="font-mono text-[8px] uppercase tracking-[2px] text-texto-tenue">
          Reemplazar embed real en lib/capacitacion.ts
        </p>
      </div>
    </div>
  );
}

function PlaceholderDescargable() {
  return (
    <div className="flex items-center justify-between gap-4 rounded-[10px] border border-dashed border-oro/40 bg-oro/[0.04] px-5 py-4">
      <div>
        <p className="font-sans text-[14px] text-texto">
          [Aquí va el PDF descargable del módulo]
        </p>
        <p className="mt-1 font-sans text-[10px] uppercase tracking-[1.5px] text-texto-tenue">
          Reemplazar enlace real en lib/capacitacion.ts
        </p>
      </div>
      <span className="font-sans text-[10px] uppercase tracking-[1.5px] text-texto-tenue/70">
        no disponible
      </span>
    </div>
  );
}
