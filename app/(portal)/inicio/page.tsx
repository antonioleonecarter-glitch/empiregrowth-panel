import { requireCliente } from "@/lib/auth";
import { obtenerChecklistDelCliente } from "@/lib/checklist";
import { obtenerLeads, obtenerCitas, obtenerMetricas } from "@/lib/ghl";
import { ghlConectado } from "@/lib/ghl-oauth";
import JarvisAsistente from "@/components/portal/JarvisAsistente";
import ResumenCuenta from "@/components/portal/inicio/ResumenCuenta";
import UltimosLeads from "@/components/portal/inicio/UltimosLeads";
import CitasSemana from "@/components/portal/inicio/CitasSemana";
import ChecklistProyecto from "@/components/portal/inicio/ChecklistProyecto";
import BotonesAccion from "@/components/portal/inicio/BotonesAccion";
import ComunicadoEquipo from "@/components/portal/inicio/ComunicadoEquipo";
import BannerGHL from "@/components/portal/inicio/BannerGHL";

export default async function InicioPage({
  searchParams,
}: {
  searchParams: Promise<{ ghl?: string }>;
}) {
  const cliente = await requireCliente();
  const primerNombre = cliente.nombre.split(" ")[0];
  const jarvisHabilitado = process.env.JARVIS_DISABLED !== "true";
  const { ghl } = await searchParams;

  const [itemsChecklist, conectado, leads, citas, metricas] = await Promise.all([
    obtenerChecklistDelCliente(cliente.id),
    ghlConectado(),
    obtenerLeads(5),
    obtenerCitas(),
    obtenerMetricas(),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <BannerGHL conectado={conectado} estado={ghl} />
      <JarvisAsistente
        primerNombre={primerNombre}
        jarvisHabilitado={jarvisHabilitado}
      />
      <ResumenCuenta metricas={metricas} />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <UltimosLeads leads={leads} />
        <CitasSemana citas={citas} />
      </div>
      <ChecklistProyecto itemsIniciales={itemsChecklist} />
      <BotonesAccion />
      <ComunicadoEquipo nombre={primerNombre} />
    </div>
  );
}
