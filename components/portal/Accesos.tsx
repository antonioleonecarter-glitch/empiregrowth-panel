import Link from "next/link";
import { todosModulos } from "@/lib/capacitacion";
import { obtenerSetProgreso } from "@/lib/progreso";

export default async function Accesos({ clienteId }: { clienteId: number }) {
  const progreso = await obtenerSetProgreso(clienteId);
  const total = todosModulos().length;
  const completados = todosModulos().filter((m) =>
    progreso.has(m.slug),
  ).length;

  return (
    <div className="flex h-full flex-col gap-3">
      <AccesoCard
        href="/capacitacion"
        icono="▤"
        titulo="Capacitación"
        subtitulo={`${completados}/${total} módulos ▸`}
      />
      <AccesoCard
        href="/crm"
        icono="▥"
        titulo="Mi CRM"
        subtitulo="Resumen + acceso ▸"
      />
    </div>
  );
}

function AccesoCard({
  href,
  icono,
  titulo,
  subtitulo,
}: {
  href: string;
  icono: string;
  titulo: string;
  subtitulo: string;
}) {
  return (
    <Link
      href={href}
      className="flex flex-1 items-center gap-[11px] rounded-[14px] border border-oro/30 bg-gradient-to-br from-superficie to-superficie-profunda p-5 transition-all hover:border-oro/65 hover:bg-oro/[0.04]"
    >
      <span className="text-[20px] text-oro">{icono}</span>
      <div className="flex-1">
        <div className="font-sans text-[12px] font-medium text-[#d8d2c4]">
          {titulo}
        </div>
        <div className="font-sans text-[9px] text-texto-sombra">
          {subtitulo}
        </div>
      </div>
    </Link>
  );
}
