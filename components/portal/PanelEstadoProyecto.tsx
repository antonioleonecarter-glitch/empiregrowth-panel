import { FASES_EJEMPLO, type FaseProyecto } from "@/lib/contenido";

export default function PanelEstadoProyecto() {
  return (
    <section className="hud-corte relative border border-borde bg-gradient-to-br from-superficie to-superficie-profunda p-5 md:p-7">
      <TagMono>EMG-001 · ONLINE</TagMono>
      <Label>◢ Estado de tu proyecto</Label>
      <LineaDeFases fases={FASES_EJEMPLO} />
      <MiniStats />
    </section>
  );
}

function TagMono({ children }: { children: React.ReactNode }) {
  return (
    <span className="eg-blink absolute right-3.5 top-2.5 font-mono text-[8px] tracking-[1px] text-oro/60">
      {children}
    </span>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-[14px] font-sans text-[9px] uppercase tracking-[2px] text-oro-oscuro">
      {children}
    </p>
  );
}

function LineaDeFases({ fases }: { fases: FaseProyecto[] }) {
  return (
    <div className="mb-4 flex items-center gap-1.5">
      {fases.map((fase, i) => (
        <div key={fase.slug} className="contents">
          <Fase fase={fase} />
          {i < fases.length - 1 && (
            <Linea
              tenue={fase.estado !== "completada"}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function Fase({ fase }: { fase: FaseProyecto }) {
  const completada = fase.estado === "completada";
  const activa = fase.estado === "activa";

  return (
    <div className="flex-1 text-center">
      {completada && (
        <div
          className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-oro text-[11px] font-medium text-[#1a1505]"
          style={{ boxShadow: "0 0 12px rgba(242, 193, 78, 0.5)" }}
        >
          ✓
        </div>
      )}
      {activa && (
        <div
          className="mx-auto flex h-6 w-6 items-center justify-center rounded-full border border-oro bg-oro/15"
          style={{ boxShadow: "0 0 14px rgba(242, 193, 78, 0.4)" }}
        >
          <span className="eg-dot-anim block h-2 w-2 rounded-full bg-oro" />
        </div>
      )}
      {fase.estado === "pendiente" && (
        <div className="mx-auto h-6 w-6 rounded-full border border-texto-sombra/50 bg-[#1c1c1f]" />
      )}
      <small
        className={`mt-1 block font-sans text-[9px] ${
          activa ? "text-oro" : "text-texto-tenue"
        }`}
      >
        {fase.titulo}
      </small>
    </div>
  );
}

function Linea({ tenue }: { tenue: boolean }) {
  return (
    <span
      aria-hidden
      className={`h-[2px] flex-1 ${tenue ? "bg-oro/30" : "bg-oro"}`}
    />
  );
}

function MiniStats() {
  return (
    <div className="grid grid-cols-2 gap-2.5">
      <Stat etiqueta="ESTADO DE CAMPAÑA" valor="En preparación" acento />
      <Stat etiqueta="LEADS · 7 DÍAS" valor="— (pronto)" />
    </div>
  );
}

function Stat({
  etiqueta,
  valor,
  acento = false,
}: {
  etiqueta: string;
  valor: string;
  acento?: boolean;
}) {
  return (
    <div className="rounded-[9px] border border-borde-tenue bg-fondo p-[11px]">
      <small className="font-sans text-[9px] tracking-[1px] text-texto-tenue">
        {etiqueta}
      </small>
      <div
        className={`mt-[3px] font-sans text-[13px] font-medium ${
          acento ? "text-oro" : "text-texto"
        }`}
      >
        {valor}
      </div>
    </div>
  );
}
