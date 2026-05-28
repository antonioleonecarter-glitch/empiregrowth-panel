import { requireCliente } from "@/lib/auth";
import MarcaEmpire from "@/components/brand/MarcaEmpire";

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cliente = await requireCliente();
  const primerNombre = cliente.nombre.split(" ")[0];
  const inicial = primerNombre.charAt(0).toUpperCase();

  return (
    <div className="relative z-10 mx-auto max-w-[1400px] px-8 pb-10 pt-8 md:px-10">
      <Topbar primerNombre={primerNombre} inicial={inicial} />
      {children}
    </div>
  );
}

function Topbar({
  primerNombre,
  inicial,
}: {
  primerNombre: string;
  inicial: string;
}) {
  return (
    <header
      className="mb-8 flex items-center justify-between pb-6"
      style={{ borderBottom: "1px solid rgba(95, 184, 230, 0.1)" }}
    >
      <div className="flex items-center gap-4">
        <MarcaEmpire tamano="topbar" />
        <span
          className="flex items-center gap-2 font-mono text-[12px] font-medium uppercase tracking-[2px] text-cel"
          style={{
            borderLeft: "1px solid rgba(95, 184, 230, 0.2)",
            paddingLeft: 16,
          }}
        >
          <span
            className="eg-pulse-dot inline-block h-2 w-2 rounded-full"
            style={{
              background: "#6fd089",
              boxShadow: "0 0 12px #6fd089",
            }}
          />
          SISTEMA ACTIVO
        </span>
      </div>
      <div className="flex items-center gap-3 font-mono text-[14px] tracking-[1px] text-gris">
        <span>{primerNombre.toUpperCase()}</span>
        <form action="/api/auth/logout" method="post" className="contents">
          <button
            type="submit"
            aria-label="Cerrar sesión"
            className="flex h-[38px] w-[38px] items-center justify-center rounded-full font-sans text-[16px] font-bold transition-all hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #f2c14e, #c99a3a)",
              color: "#04060d",
            }}
          >
            {inicial}
          </button>
        </form>
      </div>
    </header>
  );
}
