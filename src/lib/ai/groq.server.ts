import process from "node:process";

import type { WorkspaceBlueprint } from "./blueprint-types";

/**
 * Capa de IA con Groq — GRATIS (free tier de Groq, endpoint compatible OpenAI).
 *
 * Solo se activa si existe GROQ_API_KEY. Si no hay key, o si algo falla, se
 * devuelve null y el llamador se queda con el blueprint del motor gratis.
 * Nunca lanza: la generación nunca debe romperse por la capa de IA.
 *
 * server-only: el .server.ts evita que Vite mande esto (y la key) al cliente.
 */

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.3-70b-versatile";

export function groqEnabled(): boolean {
  return Boolean(process.env.GROQ_API_KEY);
}

/**
 * Refina un blueprint ya generado: mejora el resumen y puede sumar KPIs y
 * automatizaciones extra pensadas para este negocio puntual. Mantiene los
 * módulos y la cotización del motor (la lógica de precios no la toca la IA).
 */
export async function refineBlueprintWithGroq(
  base: WorkspaceBlueprint,
  answers: Record<string, unknown>,
): Promise<WorkspaceBlueprint | null> {
  const key = process.env.GROQ_API_KEY;
  if (!key) return null;

  const system =
    "Sos un consultor que diseña espacios de trabajo digitales para PyMEs. " +
    "Recibís un blueprint base y el briefing de un cliente. Devolvés SOLO JSON válido " +
    'con esta forma: {"summary": string, "extraKpis": [{"label": string, "hint": string}], ' +
    '"extraAutomations": [{"name": string, "trigger": string, "action": string, "tool": string}]}. ' +
    "El summary, en español rioplatense, claro y concreto (máx 320 caracteres). " +
    "extraKpis y extraAutomations: hasta 2 cada uno, específicos del negocio, sin repetir los que ya existen. " +
    "No inventes módulos ni precios.";

  const user = JSON.stringify({
    rubro: base.rubroLabel,
    blueprintActual: {
      summary: base.summary,
      kpis: base.kpis,
      automations: base.automations,
      modules: base.modules.map((m) => m.name),
    },
    briefing: answers,
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
        temperature: 0.4,
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
      summary?: string;
      extraKpis?: { label?: string; hint?: string }[];
      extraAutomations?: { name?: string; trigger?: string; action?: string; tool?: string }[];
    };

    const extraKpis = (parsed.extraKpis ?? [])
      .filter((k) => k.label)
      .map((k) => ({ label: String(k.label), hint: String(k.hint ?? "") }));

    const extraAutomations = (parsed.extraAutomations ?? [])
      .filter((a) => a.name && a.action)
      .map((a) => ({
        name: String(a.name),
        trigger: String(a.trigger ?? ""),
        action: String(a.action),
        tool: String(a.tool ?? "n8n"),
      }));

    return {
      ...base,
      summary: parsed.summary?.trim() ? parsed.summary.trim() : base.summary,
      kpis: [...base.kpis, ...extraKpis],
      automations: [...base.automations, ...extraAutomations],
      source: "groq",
    };
  } catch {
    return null;
  }
}
