import type { Section } from "./briefing-types";

/**
 * ESQUEMA DEL BRIEFING (data-driven).
 *
 * Todo el formulario se renderiza desde este array. Para cambiar el
 * cuestionario en cualquier proyecto futuro, editás solo este archivo: el
 * frontend, el progreso y el guardado se adaptan automáticamente.
 */
export const briefingSchema: Section[] = [
  {
    id: "general",
    title: "Información general",
    icon: "Building2",
    description: "Lo esencial de la marca para entender quiénes son.",
    fields: [
      { id: "nombre", label: "Nombre comercial", type: "text", placeholder: "Ej: Sushi House Premium" },
      { id: "rubro", label: "Rubro", type: "text", placeholder: "Ej: Gastronomía / Restaurante" },
      { id: "historia", label: "Historia de la empresa", type: "textarea", placeholder: "¿Cómo nació? ¿Qué la hace especial?" },
      { id: "mision", label: "Misión", type: "textarea" },
      { id: "vision", label: "Visión", type: "textarea" },
      { id: "valores", label: "Valores", type: "textarea", placeholder: "Ej: cercanía, excelencia, innovación" },
      { id: "publico", label: "Público objetivo", type: "textarea", placeholder: "¿A quién le hablan? Edad, intereses, poder adquisitivo…" },
      { id: "esencia", label: "¿Cómo describirían la esencia de esta marca?", type: "longtext", placeholder: "Escriban con total libertad. Cuanto más detallado, mejor." },
    ],
  },
  {
    id: "objetivo",
    title: "Objetivo de la página",
    icon: "Target",
    description: "¿Para qué tiene que servir el sitio?",
    fields: [
      {
        id: "objetivos",
        label: "Seleccionen todos los que apliquen",
        type: "checkboxes",
        allowOther: true,
        options: ["Generar ventas", "Conseguir contactos / leads", "Mostrar portfolio", "Posicionamiento de marca", "Reservas online", "Catálogo de productos"],
      },
    ],
  },
  {
    id: "referencias",
    title: "Referencias visuales",
    icon: "Link",
    description: "Páginas que les gustan y por qué.",
    fields: [
      { id: "urls", label: "Páginas de referencia", type: "urls", help: "Agreguen sitios que admiren, aunque sean de otros rubros." },
      { id: "porque", label: "¿Qué les gusta de esas referencias?", type: "textarea", placeholder: "Ej: la tipografía, las animaciones, los colores, la sensación premium…" },
    ],
  },
  {
    id: "identidad",
    title: "Identidad visual",
    icon: "Palette",
    description: "¿Con qué material de marca ya cuentan?",
    fields: [
      {
        id: "activos",
        label: "Ya cuentan con…",
        type: "checkboxes",
        options: ["Logo vectorial", "Manual de marca", "Paleta de colores", "Tipografías definidas", "Fotografías profesionales", "Videos institucionales"],
      },
      { id: "archivos", label: "Subí los archivos que tengas (logo, manual, fotos…)", type: "files", help: "Con Supabase Storage activo se suben de verdad; en local queda registrado el nombre." },
    ],
  },
  {
    id: "estructura",
    title: "Estructura deseada",
    icon: "LayoutGrid",
    description: "¿Qué secciones debería tener el sitio?",
    fields: [
      {
        id: "secciones",
        label: "Marquen todo lo que quieran incluir",
        type: "checkboxes",
        allowOther: true,
        options: ["Inicio", "Nosotros", "Servicios", "Productos", "Galería", "Blog", "Testimonios", "Preguntas frecuentes", "Contacto", "Integración WhatsApp", "Instagram Feed", "Mapa", "Reservas", "Ecommerce", "Área privada", "CRM", "Automatizaciones IA"],
      },
    ],
  },
  {
    id: "funcionalidades",
    title: "Funcionalidades especiales",
    icon: "Sparkles",
    description: "Lo que llevaría el sitio a otro nivel.",
    fields: [
      {
        id: "switches",
        label: "Activen lo que les interese",
        type: "switches",
        options: ["Animaciones premium", "Scroll cinematográfico", "Videos de fondo (Hero)", "Configurador de productos", "Cotizador automático", "Integración con sistemas internos", "Panel administrativo", "Inteligencia Artificial", "Chatbot", "Multiidioma"],
      },
      { id: "detalle", label: "¿Existe alguna funcionalidad específica que quieran implementar?", type: "textarea", placeholder: "Describan con sus palabras cualquier idea técnica o de experiencia." },
    ],
  },
  {
    id: "contenido",
    title: "Contenido",
    icon: "FileText",
    description: "¿Quién provee los textos, imágenes y videos?",
    fields: [
      { id: "proveedor", label: "¿Quién proveerá el contenido?", type: "radio", options: ["La empresa", "La agencia de marketing", "El desarrollador puede ayudar"] },
      { id: "disponible", label: "¿Qué material ya tienen disponible?", type: "checkboxes", options: ["Textos", "Imágenes", "Videos", "PDFs", "Catálogos"] },
    ],
  },
  {
    id: "seo",
    title: "SEO y Marketing",
    icon: "TrendingUp",
    description: "Para posicionar y conectar con las campañas.",
    fields: [
      { id: "keywords", label: "Palabras clave importantes", type: "textarea", placeholder: "Una por línea o separadas por coma" },
      { id: "competidores", label: "Competidores principales", type: "textarea" },
      { id: "regiones", label: "Ciudades o regiones objetivo", type: "text" },
      { id: "google_ads", label: "Campañas de Google Ads activas", type: "text", placeholder: "Sí / No / Detalle" },
      { id: "meta_ads", label: "Campañas Meta Ads activas", type: "text", placeholder: "Sí / No / Detalle" },
    ],
  },
  {
    id: "integraciones",
    title: "Integraciones",
    icon: "Plug",
    description: "Herramientas a conectar con el sitio.",
    fields: [
      {
        id: "integraciones",
        label: "Seleccionen las que usen o quieran usar",
        type: "checkboxes",
        allowOther: true,
        options: ["Google Analytics", "Meta Pixel", "Google Tag Manager", "WhatsApp", "CRM", "Mercado Pago", "Stripe", "Mailchimp", "n8n", "Make", "HubSpot"],
      },
    ],
  },
  {
    id: "marketing-ideas",
    title: "Ideas del equipo de marketing",
    icon: "Lightbulb",
    description: "La dirección creativa que casi nunca se documenta.",
    fields: [
      { id: "sensacion", label: "¿Qué sensación debe transmitir la página al visitante?", type: "text", placeholder: "Ej: lujo, exclusividad, confianza, innovación, cercanía, premium…" },
      { id: "accion", label: "¿Qué acción quieren que haga el usuario al entrar?", type: "radio", options: ["Comprar", "Pedir presupuesto", "Reservar", "Contactar", "Conocer la marca"] },
      { id: "persona", label: "Si esta página fuera una persona, ¿cómo sería?", type: "text", placeholder: "Ej: elegante, moderna, tecnológica, minimalista, sofisticada, disruptiva…" },
    ],
  },
  {
    id: "libre",
    title: "Comentarios libres",
    icon: "MessageSquare",
    description: "El espacio para todo lo demás.",
    fields: [
      { id: "notas", label: "Escriban cualquier idea, inspiración o detalle importante", type: "longtext", placeholder: "Tirá todo lo que tengas en mente, sin filtro." },
    ],
  },
];

/** Total de campos del esquema — base para el % de progreso. */
export function totalFields(): number {
  return briefingSchema.reduce((acc, s) => acc + s.fields.length, 0);
}
