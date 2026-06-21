import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Metric {
  label: string;
  value: string;
  /** Variación opcional (ej. "+12%"). */
  delta?: string;
  trend?: "up" | "down";
  icon?: LucideIcon;
}

/**
 * Grilla de KPIs reutilizable. La usan todos los rubros (ventas, reservas,
 * leads, operaciones…) — solo cambian los datos.
 */
export function MetricGrid({ metrics, cols = 4 }: { metrics: Metric[]; cols?: 2 | 3 | 4 }) {
  const colCls =
    cols === 2
      ? "grid-cols-2"
      : cols === 3
        ? "grid-cols-2 lg:grid-cols-3"
        : "grid-cols-2 lg:grid-cols-4";
  return (
    <div className={cn("grid gap-3", colCls)}>
      {metrics.map((m) => {
        const Icon = m.icon;
        return (
          <div key={m.label} className="rounded-2xl border border-border bg-card p-4 shadow-soft">
            <div className="flex items-start justify-between gap-2">
              {Icon && (
                <span className="h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Icon className="h-[18px] w-[18px]" />
                </span>
              )}
              {m.delta && (
                <span
                  className={cn(
                    "text-[11px] font-semibold",
                    m.trend === "down" ? "text-red-400" : "text-emerald-500",
                  )}
                >
                  {m.delta}
                </span>
              )}
            </div>
            <p className="mt-3 text-[22px] md:text-[24px] font-bold tracking-tight leading-none">
              {m.value}
            </p>
            <p className="mt-1.5 text-[11.5px] text-muted-foreground">{m.label}</p>
          </div>
        );
      })}
    </div>
  );
}
