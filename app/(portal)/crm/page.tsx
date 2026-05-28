import { requireCliente } from "@/lib/auth";
import CardHud from "@/components/ui/CardHud";
import { Boton } from "@/components/ui/Boton";
import { CRM_PLACEHOLDER } from "@/lib/contenido";

export default async function CrmPage() {
  const cliente = await requireCliente();

  return (
    <div className="space-y-4">
      <CardHud
        tag={`EMG-${String(cliente.id).padStart(3, "0")} · CRM`}
        label="◢ Tu sub-cuenta"
      >
        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h1 className="font-sans text-3xl font-light tracking-[0.5px] text-texto md:text-4xl">
              Tus números y tu sub-cuenta
            </h1>
            <p className="mt-3 max-w-2xl font-sans text-[13px] leading-[1.6] text-texto-tenue">
              Aquí verás un resumen leído en vivo desde tu sub-cuenta de
              GoHighLevel, con marca EmpireGrowth.AI. La conexión real entra en
              Fase 2.
            </p>
          </div>
          <div className="flex items-center justify-end gap-3">
            <span className="eg-blink font-sans text-[10px] uppercase tracking-[2px] text-oro-oscuro">
              ◌ FASE 2 · PRÓXIMAMENTE
            </span>
          </div>
        </div>
      </CardHud>

      <CardHud
        tag="◌ EN VIVO · FASE 2"
        label="◢ Resumen de tu operación"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {CRM_PLACEHOLDER.tilesEjemplo.map((t) => (
            <Tile key={t.etiqueta} etiqueta={t.etiqueta} valor={t.valor} />
          ))}
        </div>
      </CardHud>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.4fr_1fr]">
        <CardHud
          tag="ACCESO COMPLETO"
          label="◢ GoHighLevel personalizado"
        >
          <h2 className="font-sans text-2xl font-light text-texto">
            Entra a tus funcionalidades completas
          </h2>
          <p className="mt-3 max-w-xl font-sans text-[13px] leading-[1.6] text-texto-tenue">
            Tu sub-cuenta de GHL white-label, con marca EmpireGrowth.AI. Ahí
            operas a fondo: pipeline, mensajes, calendario y todo el resto.
          </p>
          <ul className="mt-5 space-y-2 font-sans text-[12px] text-[#d8d2c4]">
            <li className="flex items-center gap-2">
              <span className="text-oro">◢</span> Pipeline completo de leads.
            </li>
            <li className="flex items-center gap-2">
              <span className="text-oro">◢</span> Mensajería SMS · Email · WhatsApp.
            </li>
            <li className="flex items-center gap-2">
              <span className="text-oro">◢</span> Calendario y disponibilidad.
            </li>
            <li className="flex items-center gap-2">
              <span className="text-oro">◢</span> Reportes detallados.
            </li>
          </ul>
        </CardHud>

        <CardHud
          tag="EN ESPERA"
          label="◢ Acceso GHL"
          variante="inv"
          estiloCustom={{
            background:
              "radial-gradient(circle at 50% 30%, rgba(242, 193, 78, 0.1), #121214 70%)",
          }}
        >
          <div className="flex h-full flex-col justify-center gap-4 text-center">
            <p className="font-sans text-[13px] leading-[1.6] text-[#d8d2c4]">
              {CRM_PLACEHOLDER.notaGHL}
            </p>
            <Boton
              variante="primario"
              tamano="md"
              disabled
              className="w-full"
            >
              {CRM_PLACEHOLDER.botonGHL}
            </Boton>
            <p className="font-sans text-[9px] uppercase tracking-[2px] text-texto-tenue">
              Disponible al completar onboarding
            </p>
          </div>
        </CardHud>
      </div>
    </div>
  );
}

function Tile({ etiqueta, valor }: { etiqueta: string; valor: string }) {
  return (
    <div className="rounded-[12px] border border-borde-tenue bg-fondo p-5">
      <p className="font-sans text-[9px] uppercase tracking-[2px] text-oro-oscuro">
        {etiqueta}
      </p>
      <p className="mt-3 font-sans text-[40px] font-light leading-none text-texto-tenue">
        {valor}
      </p>
      <p className="eg-blink mt-2 font-sans text-[9px] uppercase tracking-[2px] text-oro/65">
        [EJEMPLO]
      </p>
    </div>
  );
}
