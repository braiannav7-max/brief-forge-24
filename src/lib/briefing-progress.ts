import { briefingSchema, totalFields } from "./briefing-schema";
import type { FieldValue } from "./briefing-types";

/** ¿Tiene contenido real este valor? (client + server safe) */
export function isAnswered(value: FieldValue | undefined): boolean {
  if (value == null) return false;
  if (typeof value === "string") return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  if ("selected" in value) return value.selected.length > 0 || !!value.other?.trim();
  if ("urls" in value) return value.urls.some((u) => u.trim().length > 0);
  if ("files" in value) return value.files.length > 0;
  return false;
}

/** % de avance del briefing (0–100). */
export function computeProgress(answers: Record<string, FieldValue>): number {
  let done = 0;
  for (const section of briefingSchema) {
    for (const field of section.fields) {
      if (isAnswered(answers[`${section.id}.${field.id}`])) done++;
    }
  }
  return Math.round((done / totalFields()) * 100);
}

/** Texto legible de un valor (para vistas de lectura). */
export function formatValue(v: FieldValue | undefined): string {
  if (v == null) return "—";
  if (typeof v === "string") return v.trim() || "—";
  if (Array.isArray(v)) return v.join(", ") || "—";
  if ("selected" in v) {
    const parts = [...v.selected];
    if (v.other?.trim()) parts.push(`Otro: ${v.other.trim()}`);
    return parts.join(", ") || "—";
  }
  if ("urls" in v) return v.urls.filter((u) => u.trim()).join("  ·  ") || "—";
  if ("files" in v) return v.files.map((f) => f.name).join(", ") || "—";
  return "—";
}
