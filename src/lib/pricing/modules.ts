// Catálogo del Cotizador Inteligente (LÓGICA — sin UI).
//
// La UI (cards + switches) la construye la capa visual e importa de acá.
// Para ajustar precios/tiempos, editás solo este archivo.
//
// Moneda: R$ (reales) — el grupo opera en Búzios, Brasil.

export type Complexity = "Baja" | "Media" | "Alta" | "Premium";

export type ModuleCategory =
  | "Tipo de sitio"
  | "Funcionalidad"
  | "Integración"
  | "Marketing & SEO"
  | "Experiencia premium"
  | "Sistema & Backend";

export interface PricingModule {
  id: string;
  name: string;
  description: string;
  category: ModuleCategory;
  basePrice: number; // en R$
  complexity: Complexity;
  timeDays: number; // días estimados de trabajo
  /** ids de módulos sugeridos como upsell cuando este se selecciona */
  suggests?: string[];
}

export const pricingModules: PricingModule[] = [
  // ── Tipo de sitio ──────────────────────────────────────────────
  { id: "landing-basica", name: "Landing básica", description: "Una página de presentación con secciones esenciales y contacto.", category: "Tipo de sitio", basePrice: 2500, complexity: "Baja", timeDays: 4, suggests: ["video-hero", "copywriting", "seo-tecnico"] },
  { id: "landing-premium", name: "Landing premium", description: "Landing de alto impacto con animaciones, video y diseño a medida.", category: "Tipo de sitio", basePrice: 5500, complexity: "Media", timeDays: 8, suggests: ["video-hero", "animaciones-premium", "scroll-cinematico", "seo-avanzado", "copywriting"] },
  { id: "corporativa", name: "Página corporativa", description: "Sitio institucional multipágina: nosotros, servicios, blog y contacto.", category: "Tipo de sitio", basePrice: 7000, complexity: "Media", timeDays: 12, suggests: ["blog", "seo-tecnico", "cms", "multiidioma"] },
  { id: "ecommerce", name: "Ecommerce", description: "Tienda online con catálogo, carrito, checkout y gestión de pedidos.", category: "Tipo de sitio", basePrice: 14000, complexity: "Alta", timeDays: 22, suggests: ["mercado-pago", "stripe", "sistema-usuarios", "panel-admin"] },
  { id: "saas", name: "Sistema SaaS", description: "Aplicación web con suscripciones, paneles y lógica de negocio.", category: "Tipo de sitio", basePrice: 28000, complexity: "Premium", timeDays: 45, suggests: ["sistema-usuarios", "dashboard-privado", "api-externa", "stripe"] },
  { id: "marketplace", name: "Marketplace", description: "Plataforma multivendedor con perfiles, pagos y comisiones.", category: "Tipo de sitio", basePrice: 35000, complexity: "Premium", timeDays: 60, suggests: ["sistema-usuarios", "mercado-pago", "panel-admin", "api-externa"] },

  // ── Funcionalidad ──────────────────────────────────────────────
  { id: "blog", name: "Blog", description: "Sección de notas con categorías, editor y SEO por artículo.", category: "Funcionalidad", basePrice: 2200, complexity: "Baja", timeDays: 4, suggests: ["cms", "seo-tecnico"] },
  { id: "reserva-online", name: "Reserva online", description: "Sistema de reservas con disponibilidad y confirmación automática.", category: "Funcionalidad", basePrice: 4800, complexity: "Media", timeDays: 8, suggests: ["whatsapp-api", "sistema-usuarios"] },
  { id: "chat-ia", name: "Chat IA", description: "Asistente con IA entrenado con la info del negocio.", category: "Funcionalidad", basePrice: 6000, complexity: "Alta", timeDays: 10, suggests: ["automatizaciones"] },
  { id: "automatizaciones", name: "Automatizaciones", description: "Flujos automáticos (n8n/Make): leads, emails, notificaciones.", category: "Funcionalidad", basePrice: 4500, complexity: "Media", timeDays: 7, suggests: ["whatsapp-api", "chat-ia"] },
  { id: "carga-archivos", name: "Carga de archivos", description: "Subida y gestión de documentos, imágenes y videos.", category: "Funcionalidad", basePrice: 2600, complexity: "Media", timeDays: 5 },
  { id: "generacion-pdf", name: "Generación de PDF", description: "Exportación automática de documentos/propuestas a PDF.", category: "Funcionalidad", basePrice: 2400, complexity: "Media", timeDays: 4 },
  { id: "multiidioma", name: "Multiidioma", description: "Sitio en varios idiomas con selector y contenido traducible.", category: "Funcionalidad", basePrice: 3800, complexity: "Media", timeDays: 6 },

  // ── Integración ────────────────────────────────────────────────
  { id: "whatsapp-api", name: "WhatsApp API", description: "Integración oficial de WhatsApp para mensajes y notificaciones.", category: "Integración", basePrice: 3200, complexity: "Media", timeDays: 5 },
  { id: "mercado-pago", name: "Mercado Pago", description: "Cobros online con Mercado Pago (tarjetas, Pix, cuotas).", category: "Integración", basePrice: 3000, complexity: "Media", timeDays: 5 },
  { id: "stripe", name: "Stripe", description: "Pasarela de pagos internacional con suscripciones.", category: "Integración", basePrice: 3400, complexity: "Media", timeDays: 5 },
  { id: "instagram", name: "Integración Instagram", description: "Feed de Instagram embebido y actualizado automáticamente.", category: "Integración", basePrice: 1800, complexity: "Baja", timeDays: 3 },
  { id: "api-externa", name: "API externa", description: "Conexión con sistemas o APIs de terceros del cliente.", category: "Integración", basePrice: 5200, complexity: "Alta", timeDays: 9 },

  // ── Marketing & SEO ────────────────────────────────────────────
  { id: "seo-tecnico", name: "SEO técnico", description: "Optimización técnica: metadatos, sitemap, velocidad, schema.", category: "Marketing & SEO", basePrice: 2800, complexity: "Media", timeDays: 5 },
  { id: "seo-avanzado", name: "SEO avanzado", description: "Estrategia de keywords, contenido y posicionamiento sostenido.", category: "Marketing & SEO", basePrice: 4600, complexity: "Alta", timeDays: 8, suggests: ["copywriting", "blog"] },
  { id: "copywriting", name: "Copywriting profesional", description: "Redacción persuasiva de todos los textos del sitio.", category: "Marketing & SEO", basePrice: 3200, complexity: "Media", timeDays: 6 },
  { id: "meta-pixel", name: "Meta Pixel", description: "Instalación y configuración del píxel de Meta para campañas.", category: "Marketing & SEO", basePrice: 1200, complexity: "Baja", timeDays: 2 },
  { id: "google-analytics", name: "Google Analytics", description: "Medición de tráfico y conversiones con GA4 + Tag Manager.", category: "Marketing & SEO", basePrice: 1200, complexity: "Baja", timeDays: 2 },

  // ── Experiencia premium ────────────────────────────────────────
  { id: "video-hero", name: "Video Hero", description: "Sección principal con video de fondo de alto impacto.", category: "Experiencia premium", basePrice: 2400, complexity: "Media", timeDays: 4 },
  { id: "background-video", name: "Background Video", description: "Videos de fondo en secciones clave del sitio.", category: "Experiencia premium", basePrice: 2000, complexity: "Media", timeDays: 3 },
  { id: "scroll-cinematico", name: "Scroll cinematográfico", description: "Animaciones al hacer scroll tipo storytelling.", category: "Experiencia premium", basePrice: 3600, complexity: "Alta", timeDays: 6 },
  { id: "animaciones-premium", name: "Animaciones premium", description: "Microinteracciones y transiciones de calidad de estudio.", category: "Experiencia premium", basePrice: 3000, complexity: "Alta", timeDays: 5 },
  { id: "carruseles", name: "Carruseles interactivos", description: "Sliders y carruseles dinámicos para productos o galerías.", category: "Experiencia premium", basePrice: 1600, complexity: "Baja", timeDays: 3 },
  { id: "galerias", name: "Galerías dinámicas", description: "Galerías fullscreen con filtros y lightbox.", category: "Experiencia premium", basePrice: 1800, complexity: "Baja", timeDays: 3 },

  // ── Sistema & Backend ──────────────────────────────────────────
  { id: "sistema-usuarios", name: "Sistema de usuarios", description: "Registro, login y roles con autenticación segura.", category: "Sistema & Backend", basePrice: 5000, complexity: "Alta", timeDays: 9, suggests: ["dashboard-privado", "portal-clientes"] },
  { id: "dashboard-privado", name: "Dashboard privado", description: "Panel interno con métricas y gestión para el equipo.", category: "Sistema & Backend", basePrice: 6500, complexity: "Alta", timeDays: 12 },
  { id: "portal-clientes", name: "Portal de clientes", description: "Área privada para que cada cliente vea su información.", category: "Sistema & Backend", basePrice: 6000, complexity: "Alta", timeDays: 11 },
  { id: "panel-admin", name: "Panel administrador", description: "Backoffice para administrar contenido, pedidos y usuarios.", category: "Sistema & Backend", basePrice: 7000, complexity: "Alta", timeDays: 13, suggests: ["cms"] },
  { id: "cms", name: "CMS", description: "Gestor de contenidos para que el cliente edite sin código.", category: "Sistema & Backend", basePrice: 4200, complexity: "Media", timeDays: 7 },
];

export const moduleCategories: ModuleCategory[] = [
  "Tipo de sitio",
  "Funcionalidad",
  "Integración",
  "Marketing & SEO",
  "Experiencia premium",
  "Sistema & Backend",
];

export function getModule(id: string): PricingModule | undefined {
  return pricingModules.find((m) => m.id === id);
}
