// Sistema de CAPACIDADES por vertical (rubro) — el corazón de "cada negocio
// tiene funcionalidades distintas sobre la misma base".
//
// Eje independiente del `kind` del comercio (shopify / página propia / landing):
// el `kind` define CÓMO se entrega; el vertical define QUÉ funcionalidades necesita.
//
// Reutiliza las claves de rubro del motor de IA (RubroKey) para que la detección
// del briefing y las capacidades del comercio hablen el mismo idioma.

import type { RubroKey } from "../ai/blueprint-types";

/** Una vertical de negocio = un rubro. */
export type VerticalKey = RubroKey;

/** Una funcionalidad concreta que un comercio puede tener. */
export interface VerticalFeature {
  /** id estable (sirve para routing futuro y feature flags). */
  id: string;
  label: string;
  description: string;
  /** nombre de icono lucide-react (se resuelve en la UI). */
  icon: string;
  /** "base" = la tienen todos; "vertical" = específica del rubro. */
  scope: "base" | "vertical";
}

/** Lo que necesita una pantalla para renderizar el workspace de un comercio. */
export interface VerticalProfile {
  key: VerticalKey;
  label: string;
  /** Funcionalidades base (comunes a todos los comercios). */
  base: VerticalFeature[];
  /** Funcionalidades propias del rubro. */
  specific: VerticalFeature[];
}

/** Forma mínima para inferir el vertical sin acoplar al tipo Comercio. */
export interface VerticalInput {
  category?: string;
  name?: string;
  vertical?: VerticalKey;
}
