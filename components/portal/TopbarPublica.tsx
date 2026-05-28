import Link from "next/link";
import MarcaEmpire from "@/components/brand/MarcaEmpire";

export default function TopbarPublica({
  nivel,
  volverHref = "/",
  volverLabel = "← VOLVER",
}: {
  nivel?: string;
  volverHref?: string | null;
  volverLabel?: string;
}) {
  return (
    <header className="mb-[18px] flex items-center justify-between px-[6px] py-[4px]">
      <div className="flex items-center gap-2">
        <MarcaEmpire tamano="topbar" />
        <span className="eg-blink border-l border-borde pl-2 font-mono text-[8px] uppercase tracking-[2px] text-oro-oscuro">
          ● SISTEMA ACTIVO
        </span>
        {nivel && (
          <span className="hidden font-mono text-[8px] uppercase tracking-[2px] text-texto-tenue/65 md:inline">
            · {nivel}
          </span>
        )}
      </div>
      {volverHref && (
        <Link
          href={volverHref}
          className="font-sans text-[9px] uppercase tracking-[1.5px] text-texto-tenue hover:text-oro"
        >
          {volverLabel}
        </Link>
      )}
    </header>
  );
}
