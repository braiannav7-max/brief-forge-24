// Tipos de la sección "Tendencias" del brief.
//
// Compartidos entre la base gratis (trends.server), la capa de Groq y la UI.
// Vive fuera de un .server.ts para que el cliente pueda importar los tipos.

export type TrendImpact = "alto" | "medio" | "bajo";

export interface TrendItem {
  /** Título corto y punchy de la tendencia. */
  title: string;
  /** Por qué importa para este negocio, en una o dos frases. */
  description: string;
  /** Eje: Diseño, Marketing, Contenido, Tecnología, UX… */
  category: string;
  /** Cuán relevante es para el proyecto. */
  impact: TrendImpact;
}

export interface TrendsResult {
  rubroLabel: string;
  /** "groq" si la IA la enriqueció; "base" si vino del set gratis. */
  source: "groq" | "base";
  generatedAt: string;
  items: TrendItem[];
}
