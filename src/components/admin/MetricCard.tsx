import type { AdminIcon } from "./types";

const COLORS: Record<string, string> = {
  indigo: "bg-indigo-500/10 text-indigo-400 dark:text-indigo-300",
  violet: "bg-violet-500/10 text-violet-400 dark:text-violet-300",
  emerald: "bg-emerald-500/10 text-emerald-400 dark:text-emerald-300",
  amber: "bg-amber-500/10 text-amber-400 dark:text-amber-300",
  sky: "bg-sky-500/10 text-sky-400 dark:text-sky-300",
  red: "bg-red-500/10 text-red-400 dark:text-red-300",
};

/** Tarjeta de métrica. Reutilizable; tematizada con los tokens de brief-forge-24. */
export function MetricCard({
  icon: Icon,
  color = "indigo",
  label,
  value,
  delta,
  onClick,
}: {
  icon: AdminIcon;
  color?: keyof typeof COLORS;
  label: string;
  value?: number | string;
  delta?: string;
  onClick?: () => void;
}) {
  const Tag = onClick ? "button" : "div";
  return (
    <Tag
      onClick={onClick}
      className={
        "rounded-2xl border border-border bg-card p-4 md:p-5 shadow-soft text-left w-full " +
        (onClick ? "hover:border-primary/30 hover:shadow-elevated transition-all duration-200" : "")
      }
    >
      <div className="flex items-start justify-between mb-3">
        <div className={"h-9 w-9 rounded-xl flex items-center justify-center " + COLORS[color]}>
          <Icon className="h-[18px] w-[18px]" />
        </div>
      </div>
      <p className="text-[11.5px] md:text-[12.5px] text-muted-foreground">{label}</p>
      <p className="mt-1 text-[24px] md:text-[28px] font-bold tracking-tight leading-none">
        {value ?? "—"}
      </p>
      {delta && <p className="mt-1.5 text-[11px] md:text-[11.5px] text-emerald-500 font-medium">{delta}</p>}
    </Tag>
  );
}
