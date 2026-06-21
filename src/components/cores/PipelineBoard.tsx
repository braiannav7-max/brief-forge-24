import { cn } from "@/lib/utils";
import { toneDot, type Tone } from "./tone";

export interface PipelineCard {
  id: string;
  title: string;
  subtitle?: string;
  tag?: string;
}

export interface PipelineColumn {
  id: string;
  title: string;
  tone?: Tone;
  cards: PipelineCard[];
}

/**
 * Tablero kanban reutilizable: leads, pedidos, operaciones de trading, visitas…
 * Solo presentación; el drag&drop / mutaciones los agrega quien lo use.
 */
export function PipelineBoard({ columns }: { columns: PipelineColumn[] }) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-1">
      {columns.map((col) => (
        <div key={col.id} className="w-[230px] shrink-0">
          <div className="flex items-center gap-2 px-1 mb-2">
            <span className={cn("h-2 w-2 rounded-full", toneDot[col.tone ?? "default"])} />
            <h4 className="text-[12px] font-semibold">{col.title}</h4>
            <span className="text-[11px] text-muted-foreground ml-auto tabular-nums">
              {col.cards.length}
            </span>
          </div>
          <div className="space-y-2">
            {col.cards.map((c) => (
              <div
                key={c.id}
                className="rounded-xl border border-border bg-card p-3 shadow-soft hover:border-primary/30 transition-colors cursor-grab"
              >
                <p className="text-[12.5px] font-semibold leading-tight">{c.title}</p>
                {c.subtitle && (
                  <p className="text-[11px] text-muted-foreground mt-0.5">{c.subtitle}</p>
                )}
                {c.tag && (
                  <span className="inline-block mt-2 rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                    {c.tag}
                  </span>
                )}
              </div>
            ))}
            {col.cards.length === 0 && (
              <div className="rounded-xl border border-dashed border-border py-6 text-center text-[11px] text-muted-foreground/60">
                Vacío
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
