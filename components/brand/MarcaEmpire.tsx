/**
 * Wordmark EmpireGrowth.AI
 * - tamano="topbar": "EMPIRE GROWTH" en mayúsculas con GROWTH en oro (estilo header)
 * - tamano="sm/md/lg/xl": "EmpireGrowth.AI" en estilo elegante con glow (landing/pantallas)
 */
export default function MarcaEmpire({
  tamano = "md",
  className = "",
}: {
  tamano?: "topbar" | "sm" | "md" | "lg" | "xl";
  className?: string;
}) {
  if (tamano === "topbar") {
    return (
      <span
        className={`font-sans text-[24px] font-bold leading-none tracking-[0.5px] ${className}`}
      >
        <span className="text-crema">EMPIRE</span>
        <span className="text-oro">GROWTH</span>
        <span
          className="ml-[1px] align-super text-[15px] text-cel"
          style={{ verticalAlign: "super" }}
        >
          .AI
        </span>
      </span>
    );
  }

  const tamanos = {
    sm: "text-[18px] tracking-[0.06em]",
    md: "text-[26px] tracking-[0.05em]",
    lg: "text-[42px] tracking-[0.04em]",
    xl: "text-[64px] tracking-[0.04em]",
  };

  return (
    <span
      className={`inline-flex items-baseline font-light leading-none ${tamanos[tamano]} ${className}`}
      style={{
        textShadow:
          "0 0 14px rgba(242, 193, 78, 0.35), 0 0 32px rgba(242, 193, 78, 0.18)",
      }}
    >
      <span className="text-texto">Empire</span>
      <span className="text-oro">Growth</span>
      <span className="text-texto-tenue">.AI</span>
    </span>
  );
}
