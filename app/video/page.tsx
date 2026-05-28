"use client";

import { useState } from "react";
import Link from "next/link";
import TopbarPublica from "@/components/portal/TopbarPublica";
import CardHud from "@/components/ui/CardHud";
import VideoReproductor from "./VideoReproductor";
import { PUERTA_1 } from "@/lib/contenido";

export default function VideoPage() {
  const [terminado, setTerminado] = useState(false);

  return (
    <div className="relative z-10 mx-auto max-w-[1400px] px-5 pb-16 pt-7 md:px-8 lg:px-10">
      <TopbarPublica nivel="BIENVENIDA · NIVEL 1" />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.55fr_1fr]">
        <CardHud
          tag="EMG-VIDEO · 01/01"
          label="◢ Bienvenida de Tony"
        >
          <VideoReproductor onTerminar={() => setTerminado(true)} />
          <p className="mt-5 font-sans text-[13px] leading-[1.55] text-texto-tenue">
            {PUERTA_1.video.descripcion}
          </p>
        </CardHud>

        {terminado ? <CardCalendario /> : <CardInstrucciones />}
      </div>
    </div>
  );
}

function CardInstrucciones() {
  return (
    <CardHud
      tag="EN ESPERA"
      label="◢ Siguiente paso"
      variante="borde-izq"
    >
      <div className="space-y-5">
        <p className="font-sans text-[14px] leading-[1.6] text-[#d8d2c4]">
          Cuando termines el video de bienvenida, en este mismo recuadro se
          revelará el <span className="text-oro">calendario</span> para que
          agendes tu reunión de onboarding.
        </p>
        <ul className="space-y-2 font-sans text-[12px] text-texto-tenue">
          <li className="flex items-center gap-2">
            <span className="text-oro">◢</span> Reunión de ~60 minutos.
          </li>
          <li className="flex items-center gap-2">
            <span className="text-oro">◢</span> El equipo se conecta contigo en
            vivo.
          </li>
          <li className="flex items-center gap-2">
            <span className="text-oro">◢</span> Al terminar, recibes tu acceso
            personal.
          </li>
        </ul>
        <p className="eg-blink font-sans text-[9px] uppercase tracking-[2px] text-oro-oscuro">
          ● Mira el video · El calendario se desbloquea al final
        </p>
      </div>
    </CardHud>
  );
}

function CardCalendario() {
  return (
    <CardHud
      tag="◉ DESBLOQUEADO"
      label="◢ Agenda tu onboarding"
      variante="inv"
      estiloCustom={{
        background:
          "radial-gradient(circle at 50% 30%, rgba(242, 193, 78, 0.12), #121214 70%)",
      }}
    >
      <div className="space-y-4">
        <h2 className="font-sans text-2xl font-light text-texto">
          {PUERTA_1.video.calendarioTitulo}
        </h2>
        <div className="rounded-[10px] border border-dashed border-oro/45 bg-oro/[0.04] p-5 text-center">
          <p className="font-mono text-[9px] uppercase tracking-[2.5px] text-oro-claro">
            ⚠ PLACEHOLDER
          </p>
          <p className="mt-3 font-sans text-[14px] text-texto/90">
            {PUERTA_1.video.placeholderCalendario}
          </p>
          <p className="mt-3 font-mono text-[8px] uppercase tracking-[2px] text-texto-tenue">
            {PUERTA_1.video.calendarioNota}
          </p>
        </div>
        <div className="flex items-center justify-between font-sans text-[10px] uppercase tracking-[1.5px]">
          <Link href="/" className="text-texto-tenue hover:text-oro">
            ← Volver al portal
          </Link>
          <span className="text-texto-tenue/65">
            Confirmamos por correo
          </span>
        </div>
      </div>
    </CardHud>
  );
}
