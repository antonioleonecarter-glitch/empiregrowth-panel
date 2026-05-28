import { BotonLink } from "@/components/ui/Boton";
import MarcaEmpire from "@/components/brand/MarcaEmpire";
import { MARCA } from "@/lib/contenido";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-6 py-12">
      <BordeSuperior />
      <BordeInferior />

      <div className="flex flex-col items-center gap-6 text-center">
        <span className="eg-blink-soft font-mono text-[10px] uppercase tracking-[0.5em] text-oro/80">
          ● Sistema activo
        </span>

        <MarcaEmpire tamano="xl" />

        <p className="max-w-md font-mono text-[11px] uppercase tracking-[0.35em] text-texto-tenue">
          {MARCA.tagline}
        </p>

        <div className="mt-12 flex flex-col items-stretch gap-4 md:flex-row md:items-center">
          <BotonLink href="/acceso" variante="primario" tamano="md">
            ACCEDER CON CLAVE →
          </BotonLink>
          <BotonLink href="/login" variante="secundario" tamano="md">
            SOY CLIENTE
          </BotonLink>
        </div>

        <p className="mt-10 font-mono text-[9px] uppercase tracking-[0.5em] text-texto-tenue/55">
          v0.1 · EMG-PORTAL
        </p>
      </div>
    </main>
  );
}

function BordeSuperior() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between px-8 py-6">
      <span className="font-mono text-[9px] uppercase tracking-[0.45em] text-oro/70">
        EmpireGrowth.AI
      </span>
      <span className="eg-blink-slow font-mono text-[9px] uppercase tracking-[0.45em] text-texto-tenue/70">
        ENLACE · SEGURO
      </span>
    </div>
  );
}

function BordeInferior() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between px-8 py-6">
      <span className="font-mono text-[9px] uppercase tracking-[0.45em] text-texto-tenue/55">
        © 2026 · EmpireGrowth.AI
      </span>
      <span className="font-mono text-[9px] uppercase tracking-[0.45em] text-texto-tenue/55">
        PORTAL · PRIVADO
      </span>
    </div>
  );
}
