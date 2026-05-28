import TarjetaEspacial from "@/components/ui/TarjetaEspacial";

// Comunicado del equipo.
// ⚠️ Fase 1: contenido de ejemplo. Fase 2: leer del CMS/admin del equipo.

export default function ComunicadoEquipo({
  nombre,
}: {
  nombre: string;
}) {
  return (
    <TarjetaEspacial variante="oro" style={{ padding: 24 }}>
      <span
        className="flex items-center gap-2 font-mono uppercase tracking-[2px] text-gris"
        style={{ fontSize: 13, fontWeight: 500 }}
      >
        <svg
          className="h-4 w-4 opacity-65"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
        Comunicado del equipo
      </span>
      <p
        className="m-0 font-sans"
        style={{
          fontSize: 16,
          lineHeight: 1.55,
          marginTop: 12,
          color: "#f5f0e6",
        }}
      >
        {nombre}, pausamos tus campañas: el costo por lead subió. Mira el video
        corto de qué ajustamos.
      </p>
      <div
        className="font-mono uppercase text-gris-tenue"
        style={{ fontSize: 12, letterSpacing: 1, marginTop: 14 }}
      >
        EQUIPO EMPIREGROWTH · HACE 2H
      </div>
    </TarjetaEspacial>
  );
}
