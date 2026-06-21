import { cn } from "@/lib/utils";
import { toneClass, type Tone } from "./tone";

export interface AgendaItem {
  id: string;
  title: string;
  subtitle?: string;
  /** Fecha legible (ej. "14 Jun"). */
  date: string;
  time?: string;
  status?: { label: string; tone?: Tone };
}

/**
 * Lista de citas por fecha, reutilizable: visitas, reservas, turnos, eventos…
 */
export function AgendaList({
  items,
  onSelect,
}: {
  items: AgendaItem[];
  onSelect?: (id: string) => void;
}) {
  return (
    <div className="space-y-2">
      {items.map((it) => (
        <button
          key={it.id}
          onClick={() => onSelect?.(it.id)}
          className={cn(
            "w-full flex items-center gap-3 rounded-xl border border-border bg-card p-3 text-left transition-colors",
            onSelect && "hover:border-primary/30",
          )}
        >
          <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex flex-col items-center justify-center shrink-0 leading-none">
            <span className="text-[14px] font-bold">{it.date.split(" ")[0]}</span>
            <span className="text-[9px] uppercase mt-0.5">{it.date.split(" ")[1] ?? ""}</span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-semibold leading-tight truncate">{it.title}</p>
            <p className="text-[11.5px] text-muted-foreground mt-0.5 truncate">
              {it.time ? it.time + " · " : ""}
              {it.subtitle}
            </p>
          </div>
          {it.status && (
            <span
              className={cn(
                "rounded-full px-2.5 py-1 text-[10.5px] font-semibold shrink-0",
                toneClass[it.status.tone ?? "default"],
              )}
            >
              {it.status.label}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
