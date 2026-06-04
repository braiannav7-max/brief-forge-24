import {
  Building2, Target, Link as LinkIcon, Palette, LayoutGrid, Sparkles,
  FileText, TrendingUp, Plug, Lightbulb, MessageSquare,
} from "lucide-react";
import { briefingSchema } from "@/lib/briefing-schema";
import { formatValue, isAnswered } from "@/lib/briefing-progress";
import type { FieldValue } from "@/lib/briefing-types";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2, Target, Link: LinkIcon, Palette, LayoutGrid, Sparkles,
  FileText, TrendingUp, Plug, Lightbulb, MessageSquare,
};

/** Vista de solo lectura del briefing, ordenada por sección. */
export function BriefingView({ answers }: { answers: Record<string, FieldValue> }) {
  return (
    <div className="space-y-5">
      {briefingSchema.map((section) => {
        const Icon = ICONS[section.icon] ?? FileText;
        const answeredCount = section.fields.filter((f) => isAnswered(answers[`${section.id}.${f.id}`])).length;
        return (
          <section id={section.id} key={section.id} className="rounded-2xl border border-border bg-card shadow-soft p-6 scroll-mt-24">
            <div className="flex items-center gap-3 mb-5">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-4 w-4" />
              </span>
              <div className="flex-1">
                <h3 className="text-[15px] font-semibold leading-tight">{section.title}</h3>
                {section.description && <p className="text-[11.5px] text-muted-foreground">{section.description}</p>}
              </div>
              <span className="text-[11px] text-muted-foreground tabular-nums">
                {answeredCount}/{section.fields.length}
              </span>
            </div>

            <dl className="space-y-3.5">
              {section.fields.map((f) => {
                const v = answers[`${section.id}.${f.id}`];
                const ok = isAnswered(v);
                return (
                  <div key={f.id} className="grid gap-1 sm:grid-cols-[230px_1fr] sm:gap-4">
                    <dt className="text-[12.5px] text-muted-foreground">{f.label}</dt>
                    <dd className={`text-[13px] whitespace-pre-wrap ${ok ? "text-foreground" : "italic text-muted-foreground/50"}`}>
                      {ok ? formatValue(v) : "Sin completar"}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </section>
        );
      })}
    </div>
  );
}
