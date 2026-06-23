import process from "node:process";

import type { RubroKey } from "./blueprint-types";
import type { TrendItem } from "./trends-types";

/**
 * Tendencias del rubro — GRATIS por defecto, con enriquecimiento opcional vía Groq.
 *
 * Filosofía igual que el resto de la capa de IA del proyecto:
 *   1. `baseTrends(rubro)` siempre devuelve algo útil, sin API ni costo.
 *   2. Si existe GROQ_API_KEY, `fetchTrendsWithGroq` trae tendencias frescas y
 *      a medida del negocio (free tier de Groq, endpoint compatible OpenAI).
 *   3. Ante cualquier fallo se vuelve a la base: la sección nunca se rompe.
 *
 * server-only: el .server.ts evita que Vite mande esto (y la key) al cliente.
 */

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.3-70b-versatile";

export function groqEnabled(): boolean {
  return Boolean(process.env.GROQ_API_KEY);
}

export interface TrendContext {
  rubro: RubroKey;
  rubroLabel: string;
  marca?: string;
  publico?: string;
}

// ---------- Base gratis por rubro ----------
//
// Tendencias de diseño / marketing / tech relevantes para construir la
// presencia digital de cada tipo de negocio. Si no hay Groq, esto es lo que se
// muestra; con Groq, se reemplaza por algo más fresco y específico.

const BASE_TRENDS: Record<RubroKey, TrendItem[]> = {
  inmobiliaria: [
    {
      title: "Tours virtuales 360°",
      description:
        "Recorridos inmersivos de propiedades que reducen visitas en frío y aceleran la decisión.",
      category: "Tecnología",
      impact: "alto",
    },
    {
      title: "Mapas interactivos por zona",
      description: "Filtros por barrio, precio y servicios con vista de mapa en vivo.",
      category: "UX",
      impact: "medio",
    },
    {
      title: "Lead magnets con tasación online",
      description: "Calculadora de valor estimado a cambio del contacto del visitante.",
      category: "Marketing",
      impact: "alto",
    },
  ],
  trading: [
    {
      title: "Dashboards de datos en tiempo real",
      description: "Gráficos en vivo y tickers que transmiten autoridad y transparencia.",
      category: "Tecnología",
      impact: "alto",
    },
    {
      title: "Contenido educativo en formato corto",
      description: "Reels y carruseles explicando conceptos: generan confianza y comunidad.",
      category: "Contenido",
      impact: "alto",
    },
    {
      title: "Pruebas sociales verificables",
      description: "Resultados y testimonios con disclaimers claros para credibilidad.",
      category: "Marketing",
      impact: "medio",
    },
  ],
  marketing: [
    {
      title: "Casos de éxito con métricas",
      description:
        "Portfolios que muestran números reales (ROAS, leads, ventas) por encima de lo estético.",
      category: "Contenido",
      impact: "alto",
    },
    {
      title: "IA generativa como servicio",
      description: "Posicionar la agencia ofreciendo contenido y automatizaciones con IA.",
      category: "Tecnología",
      impact: "alto",
    },
    {
      title: "Landing pages modulares",
      description: "Bloques reutilizables para lanzar campañas rápido y testear variantes.",
      category: "Diseño",
      impact: "medio",
    },
  ],
  ecommerce: [
    {
      title: "Checkout en un paso",
      description: "Menos fricción = más conversión; pago express y wallets integradas.",
      category: "UX",
      impact: "alto",
    },
    {
      title: "Social shopping / shoppable posts",
      description: "Vender directo desde Instagram y TikTok con catálogo sincronizado.",
      category: "Marketing",
      impact: "alto",
    },
    {
      title: "Reseñas con foto y video",
      description: "Prueba social visual generada por clientes que sube la confianza.",
      category: "Contenido",
      impact: "medio",
    },
  ],
  gastronomia: [
    {
      title: "Menú digital con QR y fotos",
      description: "Carta visual, actualizable al instante y optimizada para mobile.",
      category: "UX",
      impact: "alto",
    },
    {
      title: "Reservas online integradas",
      description: "Booking con confirmación automática por WhatsApp y recordatorios.",
      category: "Tecnología",
      impact: "alto",
    },
    {
      title: "Contenido food-porn vertical",
      description: "Video corto del plato y la experiencia: el formato que más engancha hoy.",
      category: "Contenido",
      impact: "alto",
    },
  ],
  eventos: [
    {
      title: "Aftermovies y teasers verticales",
      description: "Video corto de alta energía que vende la próxima fecha.",
      category: "Contenido",
      impact: "alto",
    },
    {
      title: "Venta de tickets y listas online",
      description: "Cupos, mesas VIP y RSVP gestionados desde el sitio.",
      category: "Tecnología",
      impact: "alto",
    },
    {
      title: "Estética dark + neón animada",
      description: "Hero con movimiento y tipografía expresiva para transmitir la vibra nocturna.",
      category: "Diseño",
      impact: "medio",
    },
  ],
  servicios: [
    {
      title: "Agendá una consulta en el sitio",
      description: "Calendario embebido para reservar reuniones sin ida y vuelta.",
      category: "UX",
      impact: "alto",
    },
    {
      title: "Autoridad vía contenido experto",
      description: "Blog y guías que posicionan en Google y nutren leads.",
      category: "Marketing",
      impact: "medio",
    },
    {
      title: "Casos y testimonios en home",
      description: "Prueba social temprana para acortar el ciclo de venta.",
      category: "Contenido",
      impact: "medio",
    },
  ],
  generico: [
    {
      title: "Diseño mobile-first",
      description: "La mayoría llega desde el celular: la experiencia móvil define la conversión.",
      category: "UX",
      impact: "alto",
    },
    {
      title: "Microinteracciones y motion sutil",
      description: "Animaciones pequeñas que dan sensación de producto pulido y premium.",
      category: "Diseño",
      impact: "medio",
    },
    {
      title: "Integración con WhatsApp",
      description: "Canal directo de contacto que la mayoría del público ya usa a diario.",
      category: "Marketing",
      impact: "alto",
    },
  ],
};

export function baseTrends(rubro: RubroKey): TrendItem[] {
  return BASE_TRENDS[rubro] ?? BASE_TRENDS.generico;
}

// ---------- Enriquecimiento con Groq ----------

const VALID_IMPACT = new Set(["alto", "medio", "bajo"]);

export async function fetchTrendsWithGroq(ctx: TrendContext): Promise<TrendItem[] | null> {
  const key = process.env.GROQ_API_KEY;
  if (!key) return null;

  const system =
    "Sos un estratega digital que asesora a una agencia web. A partir del rubro y el público " +
    "de un negocio, listás las tendencias actuales (diseño, marketing, contenido, tecnología, UX) " +
    "más relevantes para construir su presencia digital. " +
    'Devolvés SOLO JSON válido con esta forma: {"trends": [{"title": string, "description": string, ' +
    '"category": string, "impact": "alto"|"medio"|"bajo"}]}. ' +
    "Entre 4 y 6 tendencias, en español rioplatense. " +
    "title: máx 6 palabras, concreto. description: 1 frase de por qué importa para ESTE negocio (máx 180 caracteres). " +
    "category: una sola palabra (Diseño, Marketing, Contenido, Tecnología o UX). " +
    "Nada de texto fuera del JSON, sin inventar datos de plataformas específicas.";

  const user = JSON.stringify({
    rubro: ctx.rubroLabel,
    marca: ctx.marca ?? "",
    publico: ctx.publico ?? "",
  });

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    const res = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        temperature: 0.7,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
      }),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!res.ok) return null;
    const json = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const content = json.choices?.[0]?.message?.content;
    if (!content) return null;

    const parsed = JSON.parse(content) as {
      trends?: { title?: string; description?: string; category?: string; impact?: string }[];
    };

    const items = (parsed.trends ?? [])
      .filter((t) => t.title && t.description)
      .map((t) => {
        const impact = String(t.impact ?? "").toLowerCase();
        return {
          title: String(t.title).trim(),
          description: String(t.description).trim(),
          category: String(t.category ?? "General").trim(),
          impact: (VALID_IMPACT.has(impact) ? impact : "medio") as TrendItem["impact"],
        };
      });

    return items.length ? items : null;
  } catch {
    return null;
  }
}
