import type { InputHTMLAttributes } from "react";

export function Campo({
  label,
  hint,
  error,
  id,
  className = "",
  ...props
}: {
  label: string;
  hint?: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>) {
  const inputId = id ?? props.name;
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={inputId}
        className="font-sans text-[9px] uppercase tracking-[2px] text-oro-oscuro"
      >
        {label}
        {props.required && <span className="ml-1 text-oro">*</span>}
      </label>
      <input
        id={inputId}
        className={`w-full rounded-[10px] border border-oro/40 bg-fondo px-3 py-3 font-sans text-[14px] text-texto placeholder:text-texto-tenue/55 focus:border-oro focus:bg-oro/[0.05] ${className}`}
        {...props}
      />
      {hint && !error && (
        <p className="font-sans text-[9px] uppercase tracking-[1.5px] text-texto-tenue">
          {hint}
        </p>
      )}
      {error && (
        <p className="font-sans text-[10px] uppercase tracking-[1.5px] text-alerta">
          ⚠ {error}
        </p>
      )}
    </div>
  );
}
