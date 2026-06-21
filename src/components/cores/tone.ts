// Paleta de "tonos" compartida por los núcleos. Translúcida, estilo del panel.
export type Tone = "default" | "primary" | "success" | "warning" | "danger" | "info";

export const toneClass: Record<Tone, string> = {
  default: "bg-muted text-muted-foreground",
  primary: "bg-primary/10 text-primary",
  success: "bg-emerald-500/10 text-emerald-400",
  warning: "bg-amber-500/10 text-amber-400",
  danger: "bg-red-500/10 text-red-400",
  info: "bg-indigo-500/10 text-indigo-400",
};

export const toneDot: Record<Tone, string> = {
  default: "bg-muted-foreground/40",
  primary: "bg-primary",
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  danger: "bg-red-500",
  info: "bg-indigo-500",
};
