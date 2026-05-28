// CAPACITACIÓN · Estructura editable.
// Cada bloque tiene módulos con video y descargable opcionales.
// Los videos/PDFs reales se cargan después — aquí solo placeholders.

export type Modulo = {
  slug: string;
  titulo: string;
  descripcion: string;
  conPDF?: boolean;
};

export type Bloque = {
  slug: string;
  numero: string;
  titulo: string;
  resumen: string;
  modulos: Modulo[];
};

export const BLOQUES: Bloque[] = [
  {
    slug: "plataforma",
    numero: "01",
    titulo: "Cómo usar la plataforma",
    resumen:
      "Domina EmpireGrowth.AI en pocos minutos: el portal, JARVIS y la capacitación.",
    modulos: [
      {
        slug: "bienvenida",
        titulo: "Bienvenida",
        descripcion: "Qué es EmpireGrowth.AI y cómo te acompañamos.",
      },
      {
        slug: "tour-portal",
        titulo: "Tour del portal",
        descripcion: "Cada pantalla, qué hay donde y cómo navegarlo.",
      },
      {
        slug: "hablar-con-jarvis",
        titulo: "Cómo hablar con JARVIS",
        descripcion: "Activarlo con dos aplausos y aprovecharlo al máximo.",
      },
      {
        slug: "estado-proyecto",
        titulo: "Ver el estado del proyecto",
        descripcion: "Fases, campaña y comunicados de tu equipo.",
      },
      {
        slug: "navegar-capacitacion",
        titulo: "Navegar la capacitación",
        descripcion: "Bloques, progreso y descargables.",
      },
    ],
  },
  {
    slug: "ghl",
    numero: "02",
    titulo: "Dominar el sistema",
    resumen:
      "Tu sub-cuenta GoHighLevel personalizada: CRM, mensajes, calendario y el guion de venta.",
    modulos: [
      {
        slug: "explicacion-crm",
        titulo: "Explicación del CRM",
        descripcion: "Cómo está organizado tu CRM y por qué.",
      },
      {
        slug: "encontrar-leads",
        titulo: "Encontrar y ver leads",
        descripcion: "Dónde están y cómo leerlos en segundos.",
      },
      {
        slug: "contactar-rapido",
        titulo: "Contactar un lead rápido",
        descripcion: "Llamar, escribir y registrar todo desde un solo lugar.",
      },
      {
        slug: "mover-pipeline",
        titulo: "Mover lead por el pipeline",
        descripcion: "Etapa por etapa, sin saltarte pasos.",
      },
      {
        slug: "calendario",
        titulo: "Ver y manejar el calendario",
        descripcion: "Tu agenda en un vistazo.",
      },
      {
        slug: "agendar-reagendar",
        titulo: "Agendar y reagendar citas",
        descripcion: "Sin fricción para ti ni para el lead.",
      },
      {
        slug: "mensajes",
        titulo: "Mensajes: SMS, email y WhatsApp",
        descripcion: "Un solo hilo por lead, todos los canales.",
      },
      {
        slug: "disponibilidad",
        titulo: "Configurar tu disponibilidad",
        descripcion: "Horarios reales, sin choques.",
      },
      {
        slug: "app-movil",
        titulo: "App móvil",
        descripcion: "Tu CRM en el bolsillo, sin perder un lead.",
      },
      {
        slug: "guion-de-venta",
        titulo: "Guion de venta",
        descripcion: "Video explicativo + guion descargable en PDF.",
        conPDF: true,
      },
    ],
  },
  {
    slug: "resolver",
    numero: "03",
    titulo: "Resolver problemas",
    resumen:
      "Si algo se atasca: pago, leads, métricas, automatizaciones y cuándo pedir ayuda.",
    modulos: [
      {
        slug: "metodo-de-pago",
        titulo: "Resolver método de pago",
        descripcion: "Pasos claros para corregirlo solo.",
      },
      {
        slug: "pocos-leads",
        titulo: "Qué hacer con pocos leads",
        descripcion: "Cómo distinguir expectativa de problema real.",
      },
      {
        slug: "leer-metricas",
        titulo: "Leer tus métricas",
        descripcion: "Qué números importan y cuáles ignorar.",
      },
      {
        slug: "automatizacion-falla",
        titulo: "Si una automatización falla",
        descripcion: "Cómo detectarlo y qué pasos seguir.",
      },
      {
        slug: "contactar-equipo",
        titulo: "Cuándo contactar al equipo",
        descripcion: "El criterio para escalar al humano.",
      },
    ],
  },
  {
    slug: "cierre",
    numero: "04",
    titulo: "Resultados — cerrar pólizas",
    resumen:
      "Del primer contacto al cierre: lo que separa un lead caliente de una póliza firmada.",
    modulos: [
      {
        slug: "primer-contacto",
        titulo: "Primer contacto con el lead",
        descripcion: "Los primeros 5 minutos lo cambian todo.",
      },
      {
        slug: "guion-llamada",
        titulo: "Guion de llamada para agendar",
        descripcion: "Estructura paso a paso para tu llamada inicial.",
        conPDF: true,
      },
      {
        slug: "objeciones",
        titulo: "Manejo de objeciones",
        descripcion: "Las 5 más comunes y cómo responderlas.",
      },
      {
        slug: "seguimiento",
        titulo: "Seguimiento que convierte",
        descripcion: "Cadencia y mensajes que no se sienten insistentes.",
      },
      {
        slug: "reporte-semanal",
        titulo: "Entender el reporte semanal",
        descripcion: "Qué te dice de verdad y qué hacer con eso.",
      },
      {
        slug: "mejores-practicas",
        titulo: "Mejores prácticas de cierre",
        descripcion: "Lo que hacen los agentes que más cierran.",
      },
    ],
  },
];

export function todosModulos(): Modulo[] {
  return BLOQUES.flatMap((b) => b.modulos);
}

export function moduloPorSlug(
  slug: string,
): { modulo: Modulo; bloque: Bloque } | null {
  for (const bloque of BLOQUES) {
    const modulo = bloque.modulos.find((m) => m.slug === slug);
    if (modulo) return { modulo, bloque };
  }
  return null;
}

export function totalModulos(): number {
  return todosModulos().length;
}
