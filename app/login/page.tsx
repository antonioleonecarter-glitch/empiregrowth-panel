"use client";

import { useActionState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import TopbarPublica from "@/components/portal/TopbarPublica";
import CardHud from "@/components/ui/CardHud";
import { Campo } from "@/components/ui/Campo";
import { Boton } from "@/components/ui/Boton";
import { iniciarSesion, type LoginState } from "./actions";

const NucleoJarvis = dynamic(
  () => import("@/components/brand/NucleoJarvis"),
  { ssr: false },
);

const initial: LoginState = { ok: false };

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(iniciarSesion, initial);

  return (
    <div className="relative z-10 mx-auto max-w-[1400px] px-5 pb-16 pt-7 md:px-8 lg:px-10">
      <TopbarPublica nivel="ACCESO · NIVEL 2" />

      <CardHud
        tag="EMG-PUERTA-02 · CLIENTE"
        label="◢ Identificación de cliente"
        className="md:!p-10 lg:!p-12"
      >
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div className="flex flex-col items-center gap-6 lg:items-start">
            <NucleoJarvis size="md" />
            <div className="text-center lg:text-left">
              <h1 className="font-sans text-3xl font-light tracking-[0.5px] text-texto md:text-4xl">
                Identifícate
              </h1>
              <p className="mt-3 max-w-md font-sans text-[14px] leading-[1.6] text-texto-tenue">
                Usa el correo y contraseña que definiste en tu reunión de
                onboarding.
              </p>
              <p className="eg-blink mt-5 font-sans text-[9px] uppercase tracking-[2px] text-oro-oscuro">
                ● CANAL · SEGURO
              </p>
            </div>
          </div>

          <form action={formAction} className="space-y-5">
            <Campo
              label="Correo electrónico"
              name="email"
              type="email"
              required
              autoComplete="email"
              autoFocus
              placeholder="tu@correo.com"
            />
            <Campo
              label="Contraseña"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="········"
            />

            {state.error && (
              <p className="rounded-[10px] border border-alerta/40 bg-alerta/[0.06] px-3 py-2 font-sans text-[10px] uppercase tracking-[1.5px] text-alerta">
                ⚠ {state.error}
              </p>
            )}

            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
              <Link
                href="/"
                className="font-sans text-[10px] uppercase tracking-[1.5px] text-texto-tenue hover:text-oro"
              >
                ← Volver al portal
              </Link>
              <Boton type="submit" disabled={pending} tamano="md">
                {pending ? "VERIFICANDO..." : "ACCEDER →"}
              </Boton>
            </div>

            <p className="border-t border-borde pt-5 font-sans text-[10px] uppercase tracking-[1.5px] text-texto-tenue">
              ¿Aún no completas tu onboarding?{" "}
              <Link
                href="/acceso"
                className="text-oro hover:text-oro-claro"
              >
                Entra con tu clave inicial
              </Link>
            </p>
          </form>
        </div>
      </CardHud>
    </div>
  );
}
