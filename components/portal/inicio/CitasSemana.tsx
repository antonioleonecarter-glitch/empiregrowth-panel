import TarjetaEspacial from "@/components/ui/TarjetaEspacial";
import type { CitaGHL } from "@/lib/ghl";

type Cita = {
  id: string;
  dia: string;
  fecha: string;
  mes: string;
  titulo: string;
  hora: string;
};

const CITAS_DEMO: Cita[] = [
  { id: "1", dia: "LUN", fecha: "26", mes: "MAY", titulo: "Llamada · María G.", hora: "10:00 AM" },
  { id: "2", dia: "MIÉ", fecha: "28", mes: "MAY", titulo: "Cierre · Juan R.", hora: "3:00 PM" },
  { id: "3", dia: "VIE", fecha: "30", mes: "MAY", titulo: "Seguimiento · Carmen S.", hora: "11:30 AM" },
];

export default function CitasSemana({ citas }: { citas: CitaGHL[] | null }) {
  const datos: Cita[] = citas ?? CITAS_DEMO;
  const esDemo = citas === null;

  return (
    <TarjetaEspacial style={{ padding: 24 }}>
      <div style={{ marginBottom: 24 }} className="flex items-center justify-between">
        <span className="flex items-center gap-2 font-mono uppercase tracking-[2px] text-gris" style={{ fontSize: 13, fontWeight: 500 }}>
          <svg className="h-4 w-4 opacity-65" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
          </svg>
          Citas de esta semana
        </span>
        {esDemo && (
          <span className="font-mono text-gris-tenue" style={{ fontSize: 11, letterSpacing: 1 }}>
            DEMO
          </span>
        )}
      </div>

      {datos.length === 0 ? (
        <div className="flex flex-1 items-center justify-center py-8 font-sans italic text-gris-tenue" style={{ fontSize: 14 }}>
          Sin citas agendadas esta semana.
        </div>
      ) : (
        datos.map((c, i) => {
          const ultimo = i === datos.length - 1;
          return (
            <div
              key={c.id}
              className="flex items-center gap-4"
              style={{ padding: "14px 0", borderBottom: ultimo ? "none" : "1px solid rgba(95, 184, 230, 0.08)" }}
            >
              <div className="flex-shrink-0 text-center" style={{ width: 48 }}>
                <div className="font-sans" style={{ fontSize: 26, fontWeight: 700, color: "#5fb8e6", lineHeight: 1 }}>
                  {c.fecha}
                </div>
                <div className="font-mono uppercase text-gris-tenue" style={{ fontSize: 11, letterSpacing: 1, marginTop: 3 }}>
                  {c.dia}
                </div>
              </div>
              <div className="flex-1">
                <b className="block font-sans" style={{ fontSize: 19, fontWeight: 600, lineHeight: 1.3 }}>
                  {c.titulo}
                </b>
                <span className="font-mono text-gris" style={{ fontSize: 13 }}>
                  {c.hora}
                </span>
              </div>
            </div>
          );
        })
      )}

      <a href="/agenda" className="mt-4 inline-block cursor-pointer font-mono text-cel tracking-[0.5px] hover:text-oro" style={{ fontSize: 13 }}>
        Ver calendario completo ›
      </a>
    </TarjetaEspacial>
  );
}
