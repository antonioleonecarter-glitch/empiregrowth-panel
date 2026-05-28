// Banner de estado de conexión GoHighLevel.
// Si no está conectado: botón para iniciar OAuth.
// Si se acaba de conectar: mensaje de éxito que desaparece.

export default function BannerGHL({
  conectado,
  estado,
}: {
  conectado: boolean;
  estado?: string;
}) {
  if (estado === "conectado") {
    return (
      <div
        role="status"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "12px 20px",
          borderRadius: 12,
          background: "rgba(111, 208, 137, 0.1)",
          border: "1px solid rgba(111, 208, 137, 0.3)",
        }}
      >
        <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#6fd089" strokeWidth={2.5}>
          <polyline points="20 6 9 17 4 12" />
        </svg>
        <span className="font-mono text-verde" style={{ fontSize: 13, letterSpacing: 0.5 }}>
          GoHighLevel conectado — los datos de tu cuenta ya aparecen en el portal.
        </span>
      </div>
    );
  }

  if (estado === "error") {
    return (
      <div
        role="alert"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "12px 20px",
          borderRadius: 12,
          background: "rgba(239, 68, 68, 0.08)",
          border: "1px solid rgba(239, 68, 68, 0.3)",
        }}
      >
        <span className="font-mono" style={{ fontSize: 13, color: "#f87171" }}>
          ⚠ No se pudo conectar con GoHighLevel. Intenta de nuevo.
        </span>
        <a
          href="/api/oauth/connect"
          className="font-mono"
          style={{ marginLeft: "auto", fontSize: 12, color: "#f2c14e", textDecoration: "underline" }}
        >
          Reintentar ›
        </a>
      </div>
    );
  }

  if (conectado) return null;

  // No conectado y sin estado → mostrar botón de conexión
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        padding: "16px 24px",
        borderRadius: 12,
        background: "rgba(95, 184, 230, 0.06)",
        border: "1px solid rgba(95, 184, 230, 0.2)",
      }}
    >
      <div>
        <p className="font-mono uppercase tracking-[1.5px] text-cel" style={{ fontSize: 12, fontWeight: 600 }}>
          GoHighLevel — no conectado
        </p>
        <p className="font-sans text-gris" style={{ fontSize: 14, marginTop: 4 }}>
          Conecta tu cuenta para ver leads y citas reales en el portal.
        </p>
      </div>
      <a
        href="/api/oauth/connect"
        className="flex-shrink-0 font-mono font-semibold tracking-[1px] transition-opacity hover:opacity-80"
        style={{
          padding: "10px 24px",
          borderRadius: 32,
          background: "linear-gradient(135deg, #f2c14e, #d4a43c)",
          color: "#04060d",
          fontSize: 13,
          textDecoration: "none",
        }}
      >
        Conectar GHL ›
      </a>
    </div>
  );
}
