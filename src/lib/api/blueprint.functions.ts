import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { getCompanyByToken } from "../companies";
import { readBriefing } from "../server/storage.server";
import { generateBlueprint } from "../ai/blueprint-engine";
import { refineBlueprintWithGroq } from "../ai/groq.server";

// Server function del Generador de Workspace.
//
// 1. Lee el briefing del cliente (Supabase o local).
// 2. Genera el blueprint con el motor determinístico (gratis, siempre corre).
// 3. Si hay GROQ_API_KEY, lo refina con Groq (free tier); si no, lo deja igual.
//
// La capa de IA nunca puede romper la respuesta: ante cualquier fallo se
// devuelve el blueprint del motor.

export const generateBlueprintFn = createServerFn({ method: "POST" })
  .inputValidator(z.object({ token: z.string().min(1) }))
  .handler(async ({ data }) => {
    if (!getCompanyByToken(data.token)) throw new Error("Token inválido");

    const briefing = await readBriefing(data.token);
    const base = generateBlueprint(briefing.answers);

    const refined = await refineBlueprintWithGroq(base, briefing.answers);
    return refined ?? base;
  });
