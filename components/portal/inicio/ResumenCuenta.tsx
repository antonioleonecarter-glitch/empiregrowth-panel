import TarjetaEspacial from "@/components/ui/TarjetaEspacial";
import type { MetricasGHL } from "@/lib/ghl";

type Metrica = {
  etiqueta: string;
  valor: string;
  trend: string;
  color: "oro" | "cel" | "verde";
};

const METRICAS_DEMO: Metrica[] = [
  { etiqueta: "Leads hoy", valor: "3", trend: "↗ vía GoHighLevel", color: "oro" },
  { etiqueta: "Leads · 7 días", valor: "18", trend: "↗ vía GoHighLevel", color: "cel" },
  { etiqueta: "Citas agendadas", valor: "7", trend: "↗ esta semana", color: "verde" },
];

const COLOR_HEX: Record<Metrica["color"], string> = {
  oro: "#f2c14e",
  cel: "#5fb8e6",
  verde: "#6fd089",
};

export default function ResumenCuenta({ metricas }: { metricas: MetricasGHL | null }) {
  const datos: Metrica[] = metricas
    ? [
        { etiqueta: "Leads hoy", valor: String(metricas.leadsHoy), trend: "↗ vía GoHighLevel", color: "oro" },
        { etiqueta: "Leads · 7 días", valor: String(metricas.leads7Dias), trend: "↗ vía GoHighLevel", color: "cel" },
        { etiqueta: "Citas agendadas", valor: String(metricas.citasAgendadas), trend: "↗ esta semana", color: "verde" },
      ]
    : METRICAS_DEMO;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {datos.map((m) => (
        <TarjetaEspacial key={m.etiqueta} className="relative overflow-hidden" style={{ padding: 24 }}>
          <div
            aria-hidden
            className="pointer-events-none absolute"
            style={{ right: -30, top: -30, width: 120, height: 120, borderRadius: "50%", background: COLOR_HEX[m.color], opacity: 0.07 }}
          />
          <div className="font-mono uppercase tracking-[2px] text-gris" style={{ fontSize: 13, fontWeight: 500 }}>
            {m.etiqueta}
          </div>
          <div className="font-sans" style={{ fontSize: 54, fontWeight: 700, lineHeight: 1, marginTop: 16, color: COLOR_HEX[m.color] }}>
            {m.valor}
          </div>
          <div className="font-mono text-gris-tenue" style={{ fontSize: 12, marginTop: 12 }}>
            {m.trend}
            {metricas === null && " (demo)"}
          </div>
        </TarjetaEspacial>
      ))}
    </div>
  );
}
