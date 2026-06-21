// Núcleos reutilizables del panel — "módulos clonables".
//
// Componentes presentacionales, data-driven, sin lógica de negocio adentro.
// Las pantallas de cada rubro (inmobiliaria, gastronomía, …) los componen.
//
// Para reusar en otra plataforma: copiá toda la carpeta `cores/` (depende solo
// de @/lib/utils `cn`, lucide-react y los tokens de Tailwind del proyecto).

export { Panel, SectionHeader } from "./Panel";
export { EmptyState } from "./EmptyState";
export { MetricGrid, type Metric } from "./MetricGrid";
export { EntityList, type EntityRow } from "./EntityList";
export { PipelineBoard, type PipelineColumn, type PipelineCard } from "./PipelineBoard";
export { AgendaList, type AgendaItem } from "./AgendaList";
export { toneClass, toneDot, type Tone } from "./tone";
