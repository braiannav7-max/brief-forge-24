import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { getCompanyByToken } from "../companies";
import { readBriefing } from "../server/storage.server";
import { detectRubro, RUBRO_LABELS } from "../ai/blueprint-engine";
import { baseTrends, fetchTrendsWithGroq } from "../ai/trends.server";
import type { FieldValue } from "../briefing-types";
import type { TrendsResult } from "../ai/trends-types";

// Server function de la sección "Tendencias" del brief.
//
// 1. Lee el briefing del cliente (Supabase o local).
// 2. Detecta el rubro a partir de las respuestas.
// 3. Devuelve tendencias frescas de Groq (si hay GROQ_API_KEY) o, ante
//    cualquier fallo / sin key, el set base gratis. Nunca rompe.

function asString(v: FieldValue | undefined): string {
  if (typeof v === "string") return v;
  if (v == null) return "";
  if (typeof v === "object" && "selected" in (v as Record<string, unknown>)) {
    const sel = (v as { selected?: unknown }).selected;
    return Array.isArray(sel) ? sel.join(" ") : "";
  }
  return "";
}

export const getTrendsFn = createServerFn({ method: "POST" })
  .inputValidator(z.object({ token: z.string().min(1) }))
  .handler(async ({ data }): Promise<TrendsResult> => {
    if (!getCompanyByToken(data.token)) throw new Error("Token inválido");

    const briefing = await readBriefing(data.token);
    const answers = briefing.answers;

    const haystack = [
      asString(answers["general.rubro"]),
      asString(answers["general.esencia"]),
      asString(answers["general.historia"]),
      asString(answers["general.nombre"]),
    ].join(" ");

    const rubro = detectRubro(haystack);
    const rubroLabel = RUBRO_LABELS[rubro];

    const refined = await fetchTrendsWithGroq({
      rubro,
      rubroLabel,
      marca: asString(answers["general.nombre"]),
      publico: asString(answers["general.publico"]),
    });

    return {
      rubroLabel,
      source: refined ? "groq" : "base",
      generatedAt: new Date().toISOString(),
      items: refined ?? baseTrends(rubro),
    };
  });
