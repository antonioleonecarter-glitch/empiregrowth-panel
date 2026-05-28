"use client";

import { useActionState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import TopbarPublica from "@/components/portal/TopbarPublica";
import CardHud from "@/components/ui/CardHud";
import { Campo } from "@/components/ui/Campo";
import { Boton } from "@/components/ui/Boton";
import { PUERTA_1 } from "@/lib/contenido";
import { validarClaveAcceso, type AccesoState } from "./actions";

const NucleoJarvis = dynamic(
  () => import("@/components/brand/NucleoJarvis"),
  { ssr: false },
);

const initial: AccesoState = { ok: false };

export default function AccesoPage() {
  const [state, formAction, pending] = useActionState(
    validarClaveAcceso,
    initial,
  );

  return (
    <div className="relative z-10 mx-auto max-w-[1400px] px-5 pb-16 pt-7 md:px-8 lg:px-10">
      <TopbarPublica nivel="ACCESO · NIVEL 1" />

      <CardHud
        tag="EMG-PUERTA-01 · ACTIVA"
        label="◢ Identificación inicial"
        className="md:!p-10 lg:!p-12"
      >
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div className="flex flex-col items-center gap-6 lg:items-start">
            <NucleoJarvis size="md" />
            <div className="text-center lg:text-left">
              <h1 className="font-sans text-3xl font-light tracking-[0.5px] text-texto md:text-4xl">
                {PUERTA_1.acceso.titulo}
              </h1>
              <p className="mt-3 max-w-md font-sans text-[14px] leading-[1.6] text-texto-tenue">
                {PUERTA_1.acceso.descripcion}
              </p>
              <p className="eg-blink mt-5 font-sans text-[9px] uppercase tracking-[2px] text-oro-oscuro">
                ● CANAL · SEGURO
              </p>
            </div>
          </div>

          <form action={formAction} className="space-y-5">
            <Campo
              label="Clave de acceso"
              name="clave"
              type="password"
              required
              autoFocus
              autoComplete="off"
              placeholder={PUERTA_1.acceso.placeholderInput}
              error={state.error}
            />

            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
              <Link
                href="/"
                className="font-sans text-[10px] uppercase tracking-[1.5px] text-texto-tenue hover:text-oro"
              >
                ← Volver al portal
              </Link>
              <Boton type="submit" disabled={pending} tamano="md">
                {pending ? "VALIDANDO..." : PUERTA_1.acceso.botonValidar + " →"}
              </Boton>
            </div>

            <p className="border-t border-borde pt-5 font-sans text-[10px] uppercase tracking-[1.5px] text-texto-tenue">
              ¿Eres cliente activo?{" "}
              <Link
                href="/login"
                className="text-oro hover:text-oro-claro"
              >
                Entrar con tu correo
              </Link>
            </p>
          </form>
        </div>
      </CardHud>
    </div>
  );
}
