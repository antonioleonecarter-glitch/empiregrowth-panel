export default function Eyebrow({
  children,
  parpadeo = false,
  acento = "oro",
}: {
  children: React.ReactNode;
  parpadeo?: boolean;
  acento?: "oro" | "tenue" | "brillante";
}) {
  const color =
    acento === "brillante"
      ? "text-oro-brillante"
      : acento === "tenue"
        ? "text-texto-tenue"
        : "text-oro";
  return (
    <span
      className={`font-mono text-[10px] uppercase tracking-[0.45em] ${color} ${
        parpadeo ? "eg-blink-soft" : ""
      }`}
    >
      {children}
    </span>
  );
}
