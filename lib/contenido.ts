// CONTENIDO EDITABLE · EmpireGrowth.AI
// =====================================
// Tony: este archivo concentra todos los textos y placeholders del producto.
// Cámbialos aquí sin tocar componentes.

export const MARCA = {
  nombre: "EmpireGrowth.AI",
  tagline: "Plataforma privada para agentes de seguros de vida",
  copyrightNombre: "EmpireGrowth.AI",
};

// -------------------------------------------------------
// PUERTA 1 — Clave genérica + video + calendario
// -------------------------------------------------------

export const CORREO_CLAVE_GENERICA = {
  // Lo que el equipo envía al cliente DESPUÉS de comprar y ANTES del onboarding.
  asunto: "Tu acceso a EmpireGrowth.AI",
  cuerpo: `Bienvenido a EmpireGrowth.AI.

Para empezar, entra en https://empiregrowth.ai/acceso e introduce la clave:

    [CLAVE]

Verás el video de bienvenida de Tony y al terminar podrás agendar tu reunión de onboarding.

— El equipo de EmpireGrowth.AI`,
};

export const PUERTA_1 = {
  acceso: {
    eyebrow: "ACCESO · NIVEL 1",
    titulo: "Introduce tu clave",
    descripcion:
      "Es la clave que recibiste por correo después de tu compra.",
    placeholderInput: "● ● ● ● ● ● ● ●",
    botonValidar: "ACCEDER",
    errorClave: "Clave incorrecta",
  },
  video: {
    eyebrow: "BIENVENIDA · TONY",
    titulo: "Antes de continuar",
    descripcion:
      "Mira el video completo. Al terminar se revelará el calendario para tu reunión de onboarding.",
    placeholderVideo: "[Aquí va el video de bienvenida de Tony]",
    placeholderVideoNota:
      "Reemplaza esta caja por el reproductor real (Vimeo/YouTube/HLS) cuando tengas el video.",
    calendarioTitulo: "Agenda tu reunión de onboarding",
    placeholderCalendario:
      "[Aquí se conecta el calendario (Calendly o GHL) para que el cliente agende su reunión de onboarding]",
    calendarioNota:
      "Reemplaza esta caja por el <iframe> de Calendly o el embed de GHL.",
  },
};

// -------------------------------------------------------
// INICIO — Panel de estado del proyecto
// -------------------------------------------------------

export type EstadoFase = "completada" | "activa" | "pendiente";
export type FaseProyecto = {
  slug: string;
  titulo: string;
  estado: EstadoFase;
};

// [EJEMPLO] — el equipo actualiza esto a mano por cliente (Fase 1).
export const FASES_EJEMPLO: FaseProyecto[] = [
  { slug: "onboarding", titulo: "Onboarding", estado: "completada" },
  { slug: "crm-listo", titulo: "CRM listo", estado: "activa" },
  { slug: "campana", titulo: "Campaña", estado: "pendiente" },
  { slug: "optimizacion", titulo: "Optimización", estado: "pendiente" },
];

export const ESTADO_CAMPANA_EJEMPLO = {
  estado: "EN PREPARACIÓN",
  detalle:
    "[EJEMPLO] El equipo está afinando segmentación y creativos. Activación prevista esta semana.",
  marcaEjemplo: true,
};

export type Comunicado = {
  id: string;
  fecha: string;
  titulo: string;
  cuerpo: string;
  videoUrl?: string;
};

// [EJEMPLO] — el equipo agrega/edita comunicados aquí (Fase 1).
export const COMUNICADOS: Comunicado[] = [
  {
    id: "ej-1",
    fecha: "[EJEMPLO · 20 MAY 2026]",
    titulo: "[Aquí va el título del comunicado]",
    cuerpo:
      "Pausamos temporalmente tus campañas porque el costo por lead subió por arriba del rango aceptable. Estamos ajustando segmentación y creativos. Mira el video corto para entender qué hicimos y por qué.",
    videoUrl: undefined, // ej. "https://vimeo.com/..."
  },
  {
    id: "ej-2",
    fecha: "[EJEMPLO · 18 MAY 2026]",
    titulo: "[Recordatorio de mejor práctica]",
    cuerpo:
      "Tip rápido: contesta los leads dentro de los primeros 5 minutos. Sube la conversión hasta 8×. Revisa el módulo de Capacitación → Primer contacto.",
  },
];

// -------------------------------------------------------
// MI CRM (Fase 2 conecta con GHL)
// -------------------------------------------------------

export const CRM_PLACEHOLDER = {
  eyebrow: "MI CRM · FASE 2",
  titulo: "Resumen próximamente",
  descripcion:
    "Aquí verás tus leads, citas y números clave leídos en vivo desde tu sub-cuenta de GoHighLevel. Mientras tanto, puedes entrar a tus funcionalidades completas.",
  tilesEjemplo: [
    { etiqueta: "Leads · Hoy", valor: "—" },
    { etiqueta: "Leads · 7 días", valor: "—" },
    { etiqueta: "Citas · 7 días", valor: "—" },
  ],
  botonGHL: "Entrar a mi CRM completo →",
  notaGHL:
    "Disponible al completar onboarding. Conexión real a GHL en Fase 2.",
};
