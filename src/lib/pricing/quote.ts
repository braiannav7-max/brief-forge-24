// Cálculo del Cotizador (LÓGICA pura). La UI importa estas funciones.

import { getModule, pricingModules, type Complexity, type PricingModule } from "./modules";

export interface QuoteItem {
  module: PricingModule;
}

export interface Quote {
  items: PricingModule[];
  subtotal: number; // R$
  totalDays: number;
  weeks: number; // semanas estimadas (jornadas en paralelo)
  complexityScore: number; // suma ponderada
  level: "Simple" | "Intermedio" | "Avanzado" | "Enterprise";
}

const complexityWeight: Record<Complexity, number> = {
  Baja: 1,
  Media: 3,
  Alta: 7,
  Premium: 12,
};

/** Construye el presupuesto a partir de los ids seleccionados. */
export function computeQuote(selectedIds: string[]): Quote {
  const items = selectedIds
    .map(getModule)
    .filter((m): m is PricingModule => Boolean(m));

  const subtotal = items.reduce((acc, m) => acc + m.basePrice, 0);
  const totalDays = items.reduce((acc, m) => acc + m.timeDays, 0);
  const complexityScore = items.reduce((acc, m) => acc + complexityWeight[m.complexity], 0);

  // Estimación de calendario: ~5 días útiles por semana, con algo de paralelismo.
  const weeks = Math.max(1, Math.ceil(totalDays / 5 / 1.4));

  let level: Quote["level"] = "Simple";
  if (complexityScore >= 45) level = "Enterprise";
  else if (complexityScore >= 22) level = "Avanzado";
  else if (complexityScore >= 9) level = "Intermedio";

  return { items, subtotal, totalDays, weeks, complexityScore, level };
}

export interface UpsellSuggestion {
  module: PricingModule;
  /** cuánto sube el ticket si lo agregan */
  delta: number;
  /** por qué se sugiere (qué módulo seleccionado lo gatilló) */
  becauseOf: string;
}

/**
 * Recomienda módulos para aumentar el ticket, según lo ya seleccionado.
 * No invasivo: solo sugiere lo que tiene sentido con la selección actual.
 */
export function recommendUpsells(selectedIds: string[], limit = 5): UpsellSuggestion[] {
  const selected = new Set(selectedIds);
  const seen = new Set<string>();
  const out: UpsellSuggestion[] = [];

  for (const id of selectedIds) {
    const mod = getModule(id);
    if (!mod?.suggests) continue;
    for (const sugId of mod.suggests) {
      if (selected.has(sugId) || seen.has(sugId)) continue;
      const sug = getModule(sugId);
      if (!sug) continue;
      seen.add(sugId);
      out.push({ module: sug, delta: sug.basePrice, becauseOf: mod.name });
    }
  }

  // Orden: primero lo de mayor valor (mejor para subir ticket).
  out.sort((a, b) => b.delta - a.delta);
  return out.slice(0, limit);
}

/** Formatea un monto en R$ (es-AR usa puntos de miles). */
export function formatBRL(amount: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(amount);
}

export const totalCatalogValue = pricingModules.reduce((acc, m) => acc + m.basePrice, 0);
