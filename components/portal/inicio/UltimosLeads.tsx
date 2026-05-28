import TarjetaEspacial from "@/components/ui/TarjetaEspacial";
import type { LeadGHL } from "@/lib/ghl";

type Lead = {
  id: string;
  nombre: string;
  iniciales: string;
  estado: string;
  cuando: string;
  color: "oro" | "cel" | "verde";
};

const LEADS_DEMO: Lead[] = [
  { id: "1", iniciales: "MG", nombre: "María González", estado: "Florida", cuando: "hace 2h", color: "oro" },
  { id: "2", iniciales: "JR", nombre: "Juan Ramírez", estado: "Maryland", cuando: "hace 5h", color: "cel" },
  { id: "3", iniciales: "CS", nombre: "Carmen Soto", estado: "Georgia", cuando: "ayer", color: "verde" },
];

const AVATAR: Record<Lead["color"], { bg: string; border: string; text: string }> = {
  oro: { bg: "rgba(242, 193, 78, 0.15)", border: "rgba(242, 193, 78, 0.3)", text: "#f2c14e" },
  cel: { bg: "rgba(95, 184, 230, 0.15)", border: "rgba(95, 184, 230, 0.3)", text: "#5fb8e6" },
  verde: { bg: "rgba(111, 208, 137, 0.15)", border: "rgba(111, 208, 137, 0.3)", text: "#6fd089" },
};

export default function UltimosLeads({ leads }: { leads: LeadGHL[] | null }) {
  const datos: Lead[] = leads ?? LEADS_DEMO;
  const esDemo = leads === null;

  return (
    <TarjetaEspacial style={{ padding: 24 }}>
      <div style={{ marginBottom: 24 }} className="flex items-center justify-between">
        <span className="flex items-center gap-2 font-mono uppercase tracking-[2px] text-gris" style={{ fontSize: 13, fontWeight: 500 }}>
          <svg className="h-4 w-4 opacity-65" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          Últimos leads · GoHighLevel
        </span>
        {esDemo && (
          <span className="font-mono text-gris-tenue" style={{ fontSize: 11, letterSpacing: 1 }}>
            DEMO
          </span>
        )}
      </div>

      {datos.length === 0 ? (
        <div className="flex flex-1 items-center justify-center py-8 font-sans italic text-gris-tenue" style={{ fontSize: 14 }}>
          Sin leads esta semana.
        </div>
      ) : (
        datos.map((l, i) => {
          const c = AVATAR[l.color];
          const ultimo = i === datos.length - 1;
          return (
            <div
              key={l.id}
              className="flex items-center gap-4"
              style={{ padding: "14px 0", borderBottom: ultimo ? "none" : "1px solid rgba(95, 184, 230, 0.08)" }}
            >
              <div
                className="flex flex-shrink-0 items-center justify-center font-mono font-bold"
                style={{ width: 44, height: 44, borderRadius: 11, background: c.bg, border: `1px solid ${c.border}`, color: c.text, fontSize: 15 }}
              >
                {l.iniciales}
              </div>
              <div className="flex-1">
                <b className="block font-sans" style={{ fontSize: 19, fontWeight: 600, lineHeight: 1.3 }}>
                  {l.nombre}
                </b>
                <span className="font-mono text-gris" style={{ fontSize: 13 }}>
                  {l.estado} · {l.cuando}
                </span>
              </div>
            </div>
          );
        })
      )}

      <a href="/crm" className="mt-4 inline-block cursor-pointer font-mono text-cel tracking-[0.5px] hover:text-oro" style={{ fontSize: 13 }}>
        Ver todos los leads ›
      </a>
    </TarjetaEspacial>
  );
}
