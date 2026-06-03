import { cn } from "@/lib/utils";

export type ProjectStatus =
  | "Pendiente" | "Briefing" | "Diseño" | "Desarrollo" | "Testing" | "Finalizado";

const map: Record<string, string> = {
  Pendiente:   "bg-warning text-warning-foreground",
  Briefing:    "bg-info text-info-foreground",
  Diseño:      "bg-accent text-accent-foreground",
  Desarrollo:  "bg-primary/10 text-primary",
  Testing:     "bg-[oklch(0.95_0.05_50)] text-[oklch(0.5_0.15_50)]",
  Finalizado:  "bg-success text-success-foreground",
};

export function StatusBadge({ status, className }: { status: ProjectStatus | string; className?: string }) {
  return (
    <span className={cn(
      "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium",
      map[status] ?? "bg-muted text-muted-foreground",
      className
    )}>
      {status}
    </span>
  );
}
