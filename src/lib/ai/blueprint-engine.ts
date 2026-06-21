// Motor de generación de Workspace (LÓGICA pura, sin red, GRATIS).
//
// Toma las respuestas de un briefing y devuelve un WorkspaceBlueprint:
// detecta el rubro, mapea lo pedido a módulos del catálogo del cotizador,
// y suma KPIs / pipeline / automatizaciones / widgets pensados para ese rubro.
//
// Funciona sin ninguna API key. La capa de Groq solo lo refina si hay key.

import type { FieldValue } from "../briefing-types";
import { getModule } from "../pricing/modules";
import { computeQuote } from "../pricing/quote";
import type {
  BlueprintAutomation,
  BlueprintKPI,
  BlueprintModule,
  BlueprintWidget,
  RubroKey,
  WorkspaceBlueprint,
} from "./blueprint-types";

// ---------- Lectura segura de respuestas del briefing ----------
function asString(v?: FieldValue): string {
  return typeof v === "string" ? v : "";
}
function asSelected(v?: FieldValue): string[] {
  if (Array.isArray(v)) return v;
  if (v && typeof v === "object" && "selected" in v) {
    const arr = [...v.selected];
    if (v.other?.trim()) arr.push(v.other.trim());
    return arr;
  }
  return [];
}

// ---------- Detección de rubro ----------
const RUBRO_KEYWORDS: Record<Exclude<RubroKey, "generico">, string[]> = {
  inmobiliaria: [
    "inmobil",
    "propiedad",
    "real estate",
    "bienes raic",
    "alquiler",
    "loteo",
    "broker",
  ],
  trading: ["trading", "trader", "cripto", "crypto", "forex", "inversi", "bolsa", "acciones"],
  marketing: ["marketing", "agencia", "publicid", "branding", "social media", "comunicaci", "ads"],
  ecommerce: [
    "ecommerce",
    "e-commerce",
    "tienda",
    "shop",
    "venta online",
    "retail",
    "indumentaria",
  ],
  gastronomia: [
    "gastronom",
    "restaur",
    "resto",
    "bar ",
    "cafe",
    "comida",
    "beach club",
    "lounge",
    "cocina",
    "catering",
  ],
  eventos: ["evento", "fiesta", "party", "nightlife", "boliche", "discoteca", "show", "festival"],
  servicios: [
    "servicio",
    "consultor",
    "estudio",
    "abogad",
    "clinic",
    "salud",
    "spa",
    "estetica",
    "coach",
  ],
};

export const RUBRO_LABELS: Record<RubroKey, string> = {
  inmobiliaria: "Inmobiliaria",
  trading: "Trading / Inversiones",
  marketing: "Marketing / Agencia",
  ecommerce: "Ecommerce",
  gastronomia: "Gastronomía",
  eventos: "Eventos / Nightlife",
  servicios: "Servicios profesionales",
  generico: "Negocio general",
};

export function detectRubro(haystack: string): RubroKey {
  const h = haystack.toLowerCase();
  for (const [key, words] of Object.entries(RUBRO_KEYWORDS) as [RubroKey, string[]][]) {
    if (words.some((w) => h.includes(w))) return key;
  }
  return "generico";
}

// ---------- Presets por rubro ----------
interface RubroPreset {
  baseModules: string[]; // ids del catálogo de pricing
  kpis: BlueprintKPI[];
  pipeline: string[];
  automations: BlueprintAutomation[];
  widgets: BlueprintWidget[];
}

const PRESETS: Record<RubroKey, RubroPreset> = {
  inmobiliaria: {
    baseModules: [
      "corporativa",
      "sistema-usuarios",
      "portal-clientes",
      "whatsapp-api",
      "automatizaciones",
      "seo-tecnico",
    ],
    kpis: [
      { label: "Leads por propiedad", hint: "Consultas generadas por cada inmueble publicado" },
      { label: "Tasa de visitas", hint: "Leads que agendan una visita presencial" },
      { label: "Tiempo de cierre", hint: "Días promedio desde el lead hasta la operación" },
      { label: "Propiedades activas", hint: "Inventario disponible en cartera" },
    ],
    pipeline: ["Nuevo lead", "Calificado", "Visita agendada", "Negociación", "Reserva", "Cerrado"],
    automations: [
      {
        name: "Captura de lead 24/7",
        trigger: "Formulario o WhatsApp de una propiedad",
        action: "Crea el lead y asigna al asesor de turno",
        tool: "n8n",
      },
      {
        name: "Seguimiento automático",
        trigger: "Lead sin respuesta a las 48h",
        action: "Envía recordatorio por WhatsApp con propiedades similares",
        tool: "n8n",
      },
    ],
    widgets: [
      { title: "Leads por propiedad", type: "chart" },
      { title: "Pipeline comercial", type: "list" },
      { title: "Propiedades destacadas", type: "table" },
    ],
  },
  trading: {
    baseModules: [
      "landing-premium",
      "sistema-usuarios",
      "dashboard-privado",
      "chat-ia",
      "automatizaciones",
    ],
    kpis: [
      { label: "Win rate", hint: "Porcentaje de operaciones ganadoras" },
      { label: "Profit factor", hint: "Ganancia bruta sobre pérdida bruta" },
      { label: "Drawdown máx.", hint: "Mayor caída desde un pico de capital" },
      { label: "Operaciones / semana", hint: "Volumen de actividad" },
    ],
    pipeline: [
      "Idea / setup",
      "En análisis",
      "Operación abierta",
      "En gestión",
      "Cerrada",
      "Registrada en diario",
    ],
    automations: [
      {
        name: "Diario de trading",
        trigger: "Operación cerrada",
        action: "Registra resultado, R:R y screenshot en el diario",
        tool: "n8n",
      },
      {
        name: "Alerta de riesgo",
        trigger: "Drawdown supera el umbral",
        action: "Notifica para frenar la operativa",
        tool: "Make",
      },
    ],
    widgets: [
      { title: "Curva de capital", type: "chart" },
      { title: "Estadísticas de la cuenta", type: "metric" },
      { title: "Diario de operaciones", type: "table" },
    ],
  },
  marketing: {
    baseModules: [
      "landing-premium",
      "blog",
      "seo-avanzado",
      "copywriting",
      "automatizaciones",
      "dashboard-privado",
    ],
    kpis: [
      { label: "CPL", hint: "Costo por lead generado" },
      { label: "ROAS", hint: "Retorno sobre la inversión publicitaria" },
      { label: "CTR de campañas", hint: "Clics sobre impresiones" },
      { label: "Leads calificados", hint: "Contactos con intención real" },
    ],
    pipeline: [
      "Brief de campaña",
      "Creatividades",
      "En aprobación",
      "Activa",
      "Optimización",
      "Reporte",
    ],
    automations: [
      {
        name: "Reporte semanal",
        trigger: "Cada lunes",
        action: "Arma y envía el reporte de métricas al cliente",
        tool: "n8n",
      },
      {
        name: "Lead a CRM",
        trigger: "Conversión de campaña Meta/Google",
        action: "Inserta el lead y dispara secuencia de email",
        tool: "Make",
      },
    ],
    widgets: [
      { title: "Performance por campaña", type: "chart" },
      { title: "Presupuesto consumido", type: "metric" },
      { title: "Clientes y cuentas", type: "table" },
    ],
  },
  ecommerce: {
    baseModules: [
      "ecommerce",
      "mercado-pago",
      "panel-admin",
      "sistema-usuarios",
      "seo-tecnico",
      "whatsapp-api",
    ],
    kpis: [
      { label: "Tasa de conversión", hint: "Compras sobre visitas" },
      { label: "Ticket promedio", hint: "Valor medio por pedido" },
      { label: "Carritos abandonados", hint: "Checkouts no completados" },
      { label: "Stock crítico", hint: "Productos por debajo del mínimo" },
    ],
    pipeline: ["Carrito", "Checkout", "Pago confirmado", "Preparación", "Enviado", "Entregado"],
    automations: [
      {
        name: "Recupero de carrito",
        trigger: "Carrito abandonado 1h",
        action: "Envía email/WhatsApp con el producto y un incentivo",
        tool: "n8n",
      },
      {
        name: "Aviso de stock",
        trigger: "Producto bajo el mínimo",
        action: "Notifica al equipo para reponer",
        tool: "Make",
      },
    ],
    widgets: [
      { title: "Ventas por día", type: "chart" },
      { title: "Productos más vendidos", type: "table" },
      { title: "Estado del stock", type: "list" },
    ],
  },
  gastronomia: {
    baseModules: [
      "landing-premium",
      "reserva-online",
      "whatsapp-api",
      "instagram",
      "galerias",
      "seo-tecnico",
    ],
    kpis: [
      { label: "Reservas / semana", hint: "Volumen de reservas confirmadas" },
      { label: "Tasa de ocupación", hint: "Mesas ocupadas sobre disponibles" },
      { label: "Ticket promedio", hint: "Consumo medio por mesa" },
      { label: "Reseñas nuevas", hint: "Valoraciones de clientes" },
    ],
    pipeline: ["Consulta", "Reserva solicitada", "Confirmada", "Asistió", "Fidelizado"],
    automations: [
      {
        name: "Confirmación de reserva",
        trigger: "Nueva reserva online",
        action: "Envía confirmación y recordatorio por WhatsApp",
        tool: "n8n",
      },
      {
        name: "Pedido de reseña",
        trigger: "24h después de la visita",
        action: "Invita a dejar una reseña en Google",
        tool: "Make",
      },
    ],
    widgets: [
      { title: "Reservas por día", type: "chart" },
      { title: "Próximas reservas", type: "list" },
      { title: "Menú destacado", type: "table" },
    ],
  },
  eventos: {
    baseModules: ["landing-premium", "reserva-online", "video-hero", "instagram", "whatsapp-api"],
    kpis: [
      { label: "Entradas vendidas", hint: "Tickets colocados por evento" },
      { label: "Ocupación del venue", hint: "Capacidad cubierta" },
      { label: "Costo por asistente", hint: "Inversión en difusión por persona" },
      { label: "Recurrencia", hint: "Asistentes que vuelven" },
    ],
    pipeline: ["Interesado", "Lista / RSVP", "Entrada reservada", "Pagada", "Asistió"],
    automations: [
      {
        name: "Recordatorio de evento",
        trigger: "Día previo al evento",
        action: "Envía recordatorio con ubicación y horario",
        tool: "n8n",
      },
      {
        name: "Lista de espera",
        trigger: "Cupo agotado",
        action: "Suma a lista de espera y avisa si se libera lugar",
        tool: "Make",
      },
    ],
    widgets: [
      { title: "Ventas por evento", type: "chart" },
      { title: "Próximos eventos", type: "list" },
      { title: "Asistentes", type: "table" },
    ],
  },
  servicios: {
    baseModules: ["corporativa", "reserva-online", "whatsapp-api", "blog", "seo-tecnico"],
    kpis: [
      { label: "Consultas nuevas", hint: "Solicitudes de contacto recibidas" },
      { label: "Turnos agendados", hint: "Citas confirmadas" },
      { label: "Tasa de retención", hint: "Clientes que vuelven" },
      { label: "Ingreso por cliente", hint: "Valor medio por cuenta" },
    ],
    pipeline: ["Consulta", "Presupuesto", "Turno agendado", "Atendido", "Seguimiento"],
    automations: [
      {
        name: "Agenda de turnos",
        trigger: "Reserva online",
        action: "Confirma el turno y agenda recordatorio",
        tool: "n8n",
      },
      {
        name: "Reactivación",
        trigger: "Cliente inactivo 60 días",
        action: "Envía mensaje de reactivación con oferta",
        tool: "Make",
      },
    ],
    widgets: [
      { title: "Consultas por semana", type: "chart" },
      { title: "Agenda de turnos", type: "list" },
      { title: "Cartera de clientes", type: "table" },
    ],
  },
  generico: {
    baseModules: ["landing-premium", "seo-tecnico", "copywriting", "automatizaciones"],
    kpis: [
      { label: "Visitas", hint: "Tráfico total del sitio" },
      { label: "Leads", hint: "Contactos generados" },
      { label: "Tasa de conversión", hint: "Leads sobre visitas" },
      { label: "Tiempo de respuesta", hint: "Demora en contactar al lead" },
    ],
    pipeline: ["Nuevo lead", "Contactado", "Calificado", "Propuesta", "Cerrado"],
    automations: [
      {
        name: "Captura de lead",
        trigger: "Formulario de contacto",
        action: "Crea el lead y notifica al equipo",
        tool: "n8n",
      },
      {
        name: "Bienvenida automática",
        trigger: "Nuevo lead",
        action: "Envía email/WhatsApp de bienvenida",
        tool: "Make",
      },
    ],
    widgets: [
      { title: "Tráfico y leads", type: "chart" },
      { title: "Embudo comercial", type: "list" },
      { title: "Últimos contactos", type: "table" },
    ],
  },
};

// ---------- Mapeo de lo pedido en el briefing → módulos del catálogo ----------
const LABEL_TO_MODULE: Record<string, string> = {
  // estructura.secciones
  ecommerce: "ecommerce",
  blog: "blog",
  reservas: "reserva-online",
  "área privada": "portal-clientes",
  "area privada": "portal-clientes",
  galería: "galerias",
  galeria: "galerias",
  "integración whatsapp": "whatsapp-api",
  "instagram feed": "instagram",
  "automatizaciones ia": "automatizaciones",
  crm: "dashboard-privado",
  // funcionalidades.switches
  "animaciones premium": "animaciones-premium",
  "scroll cinematográfico": "scroll-cinematico",
  "scroll cinematografico": "scroll-cinematico",
  "videos de fondo (hero)": "video-hero",
  "panel administrativo": "panel-admin",
  "inteligencia artificial": "chat-ia",
  chatbot: "chat-ia",
  multiidioma: "multiidioma",
  // integraciones.integraciones
  whatsapp: "whatsapp-api",
  "mercado pago": "mercado-pago",
  stripe: "stripe",
  "meta pixel": "meta-pixel",
  "google analytics": "google-analytics",
  n8n: "automatizaciones",
  make: "automatizaciones",
};

function modulesFromBriefing(labels: string[]): string[] {
  const ids: string[] = [];
  for (const label of labels) {
    const id = LABEL_TO_MODULE[label.trim().toLowerCase()];
    if (id) ids.push(id);
  }
  return ids;
}

// ---------- Generación principal ----------
export function generateBlueprint(answers: Record<string, FieldValue>): WorkspaceBlueprint {
  const rubroText = asString(answers["general.rubro"]);
  const haystack = [
    rubroText,
    asString(answers["general.esencia"]),
    asString(answers["general.historia"]),
    asString(answers["general.nombre"]),
  ].join(" ");

  const rubro = detectRubro(haystack);
  const preset = PRESETS[rubro];

  // Módulos: preset del rubro + lo que el cliente pidió explícitamente.
  const requested = modulesFromBriefing([
    ...asSelected(answers["estructura.secciones"]),
    ...asSelected(answers["funcionalidades.switches"]),
    ...asSelected(answers["integraciones.integraciones"]),
  ]);

  const seen = new Set<string>();
  const modules: BlueprintModule[] = [];
  const orderedIds = [...requested, ...preset.baseModules];
  for (const id of orderedIds) {
    if (seen.has(id)) continue;
    const mod = getModule(id);
    if (!mod) continue;
    seen.add(id);
    modules.push({
      id: mod.id,
      name: mod.name,
      category: mod.category,
      basePrice: mod.basePrice,
      reason: requested.includes(id)
        ? "Pedido en el briefing"
        : `Recomendado para ${RUBRO_LABELS[rubro]}`,
    });
  }

  const quote = computeQuote(modules.map((m) => m.id));

  const objetivos = asSelected(answers["objetivo.objetivos"]);
  const nombre = rubroText ? rubroText : RUBRO_LABELS[rubro];
  const summary =
    `Workspace para un negocio de ${RUBRO_LABELS[rubro].toLowerCase()}` +
    (nombre && nombre !== RUBRO_LABELS[rubro] ? ` (${nombre})` : "") +
    `. Se proponen ${modules.length} módulos, ${preset.kpis.length} KPIs y ` +
    `${preset.automations.length} automatizaciones` +
    (objetivos.length ? `, alineados a: ${objetivos.slice(0, 3).join(", ").toLowerCase()}.` : ".");

  return {
    rubro,
    rubroLabel: RUBRO_LABELS[rubro],
    summary,
    pipeline: preset.pipeline,
    modules,
    kpis: preset.kpis,
    automations: preset.automations,
    widgets: preset.widgets,
    quote: { subtotal: quote.subtotal, weeks: quote.weeks, level: quote.level },
    source: "engine",
  };
}
