// API pública del sistema de verticales.
//
// - inferVertical(input): deduce el rubro de un comercio (reusa la detección
//   del motor de IA). Si el comercio ya trae `vertical`, lo respeta.
// - getVerticalProfile(key): base + funcionalidades específicas listas para la UI.
// - hasFeature(key, id): feature flag por vertical.

import { detectRubro, RUBRO_LABELS } from "../ai/blueprint-engine";
import { BASE_FEATURES, VERTICAL_FEATURES } from "./catalog";
import type { VerticalFeature, VerticalInput, VerticalKey, VerticalProfile } from "./types";

export type { VerticalFeature, VerticalKey, VerticalProfile } from "./types";
export { BASE_FEATURES, VERTICAL_FEATURES } from "./catalog";

/** Deduce el vertical de un comercio. Acepta el comercio o un string suelto. */
export function inferVertical(input: VerticalInput | string): VerticalKey {
  if (typeof input === "string") return detectRubro(input);
  if (input.vertical) return input.vertical;
  return detectRubro([input.category, input.name].filter(Boolean).join(" "));
}

/** Perfil completo (base + específicas) de un vertical, listo para renderizar. */
export function getVerticalProfile(key: VerticalKey): VerticalProfile {
  return {
    key,
    label: RUBRO_LABELS[key],
    base: BASE_FEATURES,
    specific: VERTICAL_FEATURES[key] ?? [],
  };
}

/** Todas las funcionalidades (base + específicas) de un comercio. */
export function featuresFor(input: VerticalInput | string): VerticalFeature[] {
  const profile = getVerticalProfile(inferVertical(input));
  return [...profile.base, ...profile.specific];
}

/** ¿Este vertical tiene esta funcionalidad? (feature flag) */
export function hasFeature(input: VerticalInput | string, featureId: string): boolean {
  return featuresFor(input).some((f) => f.id === featureId);
}
