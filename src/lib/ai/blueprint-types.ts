// Tipos del "Workspace Blueprint": el sistema que la IA genera a partir de un
// briefing. La idea del producto: el cliente cuenta a qué se dedica y la
// plataforma le construye módulos, KPIs, pipeline y automatizaciones.
//
// Estos tipos son compartidos entre el motor determinístico (gratis, sin API),
// la capa de Groq (enriquecimiento opcional) y la UI.

export type RubroKey =
  | "inmobiliaria"
  | "trading"
  | "marketing"
  | "ecommerce"
  | "gastronomia"
  | "eventos"
  | "servicios"
  | "generico";

export interface BlueprintModule {
  id: string;
  name: string;
  category: string;
  basePrice: number;
  /** Por qué la IA lo recomienda (rubro o pedido explícito del briefing). */
  reason: string;
}

export interface BlueprintKPI {
  label: string;
  hint: string;
}

export interface BlueprintAutomation {
  name: string;
  /** Qué la dispara. */
  trigger: string;
  /** Qué hace. */
  action: string;
  /** Herramienta sugerida (n8n / Make / nativa). */
  tool: string;
}

export interface BlueprintWidget {
  title: string;
  type: "metric" | "chart" | "list" | "table";
}

export interface WorkspaceBlueprint {
  rubro: RubroKey;
  rubroLabel: string;
  /** Resumen en lenguaje natural de la propuesta. */
  summary: string;
  /** Etapas del pipeline comercial sugerido. */
  pipeline: string[];
  modules: BlueprintModule[];
  kpis: BlueprintKPI[];
  automations: BlueprintAutomation[];
  widgets: BlueprintWidget[];
  quote: {
    subtotal: number;
    weeks: number;
    level: string;
  };
  /** Quién generó/refinó este blueprint. */
  source: "engine" | "groq";
}
