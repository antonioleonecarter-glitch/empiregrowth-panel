import Link from "next/link";
import type { ReactNode } from "react";

type Boton = {
  href: string;
  titulo: string;
  variante: "primary" | "neutra";
  icono: ReactNode;
};

const ICONO_CRM = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: 30, height: 30 }}
  >
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M3 9h18M8 4v16" />
  </svg>
);

const ICONO_CALENDARIO = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: 30, height: 30 }}
  >
    <rect x="3" y="4" width="18" height="17" rx="2" />
    <path d="M3 9h18M8 2v4M16 2v4" />
  </svg>
);

const ICONO_CAPACITACION = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: 30, height: 30 }}
  >
    <path d="M12 3L2 8l10 5 10-5-10-5zM2 8v6M6 10.5V16c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5v-5.5" />
  </svg>
);

const BOTONES: Boton[] = [
  {
    href: "/crm",
    titulo: "Acceder a mi CRM",
    variante: "primary",
    icono: ICONO_CRM,
  },
  {
    href: "/agenda",
    titulo: "Calendario del equipo",
    variante: "neutra",
    icono: ICONO_CALENDARIO,
  },
  {
    href: "/capacitacion",
    titulo: "Capacitación",
    variante: "neutra",
    icono: ICONO_CAPACITACION,
  },
];

export default function BotonesAccion() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {BOTONES.map((b) => {
        const esPrimary = b.variante === "primary";
        return (
          <Link
            key={b.titulo}
            href={b.href}
            className="flex flex-col items-center gap-[14px] no-underline transition-all hover:-translate-y-[3px]"
            style={{
              padding: 24,
              borderRadius: 16,
              border: esPrimary
                ? "1px solid rgba(242, 193, 78, 0.35)"
                : "1px solid rgba(95, 184, 230, 0.16)",
              background: esPrimary
                ? "linear-gradient(135deg, rgba(242, 193, 78, 0.18), rgba(242, 193, 78, 0.06))"
                : "rgba(11, 17, 30, 0.6)",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
              boxShadow: "none",
            }}
          >
            <span
              style={{ color: esPrimary ? "#f2c14e" : "#5fb8e6" }}
            >
              {b.icono}
            </span>
            <span
              className="font-sans"
              style={{
                fontSize: 16,
                fontWeight: 600,
                letterSpacing: 0.3,
                color: esPrimary ? "#f2c14e" : "#f5f0e6",
              }}
            >
              {b.titulo}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
