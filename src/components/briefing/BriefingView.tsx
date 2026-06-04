import {
  Building2, Target, Link as LinkIcon, Palette, LayoutGrid, Sparkles,
  FileText, TrendingUp, Plug, Lightbulb, MessageSquare,
  CheckCircle2, Circle, ExternalLink, Tag, Zap, User, Globe,
} from "lucide-react";
import { briefingSchema } from "@/lib/briefing-schema";
import { formatValue, isAnswered } from "@/lib/briefing-progress";
import type { FieldValue } from "@/lib/briefing-types";

type CheckboxValue = { selected: string[]; other?: string };

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2, Target, Link: LinkIcon, Palette, LayoutGrid, Sparkles,
  FileText, TrendingUp, Plug, Lightbulb, MessageSquare,
};

const SECTION_COLORS: Record<string, string> = {
  general:          "bg-blue-500/10 text-blue-400",
  objetivo:         "bg-violet-500/10 text-violet-400",
  referencias:      "bg-cyan-500/10 text-cyan-400",
  identidad:        "bg-amber-500/10 text-amber-400",
  estructura:       "bg-indigo-500/10 text-indigo-400",
  funcionalidades:  "bg-pink-500/10 text-pink-400",
  contenido:        "bg-orange-500/10 text-orange-400",
  seo:              "bg-emerald-500/10 text-emerald-400",
  integraciones:    "bg-teal-500/10 text-teal-400",
  "marketing-ideas":"bg-rose-500/10 text-rose-400",
  libre:            "bg-slate-500/10 text-slate-400",
};

function Tags({ items, color = "bg-primary/10 text-primary" }: { items: string[]; color?: string }) {
  return (
    <div className="flex flex-wrap gap-1.5 mt-1">
      {items.map((item) => (
        <span key={item} className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11.5px] font-medium ${color}`}>
          <Tag className="h-2.5 w-2.5 opacity-60" />{item}
        </span>
      ))}
    </div>
  );
}

function SwitchList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2 mt-1">
      {items.map((item) => (
        <span key={item} className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 text-[11.5px] font-semibold">
          <Zap className="h-3 w-3" />{item}
        </span>
      ))}
    </div>
  );
}

function UrlList({ urls }: { urls: string[] }) {
  const valid = urls.filter((u) => u.trim());
  if (!valid.length) return <Empty />;
  return (
    <div className="space-y-1.5 mt-1">
      {valid.map((url) => (
        <a
          key={url}
          href={url.startsWith("http") ? url : `https://${url}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[12.5px] text-primary hover:underline"
        >
          <Globe className="h-3.5 w-3.5 shrink-0" />
          {url}
          <ExternalLink className="h-3 w-3 opacity-50" />
        </a>
      ))}
    </div>
  );
}

function RadioBadge({ value }: { value: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-500/10 text-violet-300 px-3 py-1 text-[12.5px] font-semibold mt-1">
      <CheckCircle2 className="h-3.5 w-3.5" />{value}
    </span>
  );
}

function TextBlock({ value }: { value: string }) {
  return (
    <p className="text-[13px] text-foreground leading-relaxed whitespace-pre-wrap mt-1 rounded-xl bg-muted/40 p-3 border border-border/50">
      {value}
    </p>
  );
}

function Empty() {
  return <span className="text-[12px] italic text-muted-foreground/40 mt-1 block">Sin completar</span>;
}

function FieldValue({ sectionId, fieldId, value }: { sectionId: string; fieldId: string; value: FieldValue }) {
  const ok = isAnswered(value);

  // URLs
  if (value && typeof value === "object" && "urls" in value) {
    return ok ? <UrlList urls={(value as { urls: string[] }).urls} /> : <Empty />;
  }

  // Checkboxes
  if (value && typeof value === "object" && "selected" in value) {
    const cv = value as CheckboxValue;
    const all = [...(cv.selected ?? []), ...(cv.other?.trim() ? [`Otro: ${cv.other.trim()}`] : [])];
    return all.length ? <Tags items={all} /> : <Empty />;
  }

  // Arrays (switches)
  if (Array.isArray(value)) {
    return value.length ? <SwitchList items={value as string[]} /> : <Empty />;
  }

  // Radio fields
  const radioFields = ["proveedor", "accion"];
  if (typeof value === "string" && radioFields.includes(fieldId)) {
    return ok ? <RadioBadge value={value} /> : <Empty />;
  }

  // Long text / textarea
  const longFields = ["historia", "mision", "vision", "valores", "publico", "esencia", "porque", "notas", "detalle", "keywords", "competidores"];
  if (typeof value === "string" && longFields.includes(fieldId)) {
    return ok ? <TextBlock value={value} /> : <Empty />;
  }

  // Short text
  if (typeof value === "string") {
    return ok ? <p className="text-[13px] text-foreground mt-1 font-medium">{value}</p> : <Empty />;
  }

  return ok ? <p className="text-[13px] text-foreground mt-1">{formatValue(value)}</p> : <Empty />;
}

function SummaryCard({ answers }: { answers: Record<string, FieldValue> }) {
  const nombre    = answers["general.nombre"] as string | undefined;
  const rubro     = answers["general.rubro"] as string | undefined;
  const publico   = answers["general.publico"] as string | undefined;
  const sensacion = answers["marketing-ideas.sensacion"] as string | undefined;
  const accion    = answers["marketing-ideas.accion"] as string | undefined;
  const persona   = answers["marketing-ideas.persona"] as string | undefined;
  const objetivos = answers["objetivo.objetivos"] as CheckboxValue | undefined;
  const regiones  = answers["seo.regiones"] as string | undefined;

  const hasData = nombre || rubro || sensacion || accion;
  if (!hasData) return null;

  return (
    <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5 space-y-4">
      <div className="flex items-center gap-2.5">
        <div className="h-8 w-8 rounded-lg bg-primary/15 flex items-center justify-center">
          <User className="h-4 w-4 text-primary" />
        </div>
        <h3 className="text-[14px] font-bold text-primary">Ficha del Lead</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {nombre && (
          <div>
            <p className="text-[10.5px] text-muted-foreground uppercase tracking-wider mb-0.5">Empresa</p>
            <p className="text-[14px] font-bold">{nombre}</p>
          </div>
        )}
        {rubro && (
          <div>
            <p className="text-[10.5px] text-muted-foreground uppercase tracking-wider mb-0.5">Rubro</p>
            <p className="text-[13px] font-medium">{rubro}</p>
          </div>
        )}
        {regiones && (
          <div>
            <p className="text-[10.5px] text-muted-foreground uppercase tracking-wider mb-0.5">Región objetivo</p>
            <p className="text-[13px] font-medium">{regiones}</p>
          </div>
        )}
        {accion && (
          <div>
            <p className="text-[10.5px] text-muted-foreground uppercase tracking-wider mb-0.5">Acción deseada</p>
            <RadioBadge value={accion} />
          </div>
        )}
      </div>

      {objetivos && isAnswered(objetivos) && (
        <div>
          <p className="text-[10.5px] text-muted-foreground uppercase tracking-wider mb-1">Objetivos del sitio</p>
          <Tags items={[...(objetivos.selected ?? []), ...(objetivos.other?.trim() ? [`Otro: ${objetivos.other}`] : [])]} color="bg-violet-500/10 text-violet-300" />
        </div>
      )}

      {(sensacion || persona) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-border/40">
          {sensacion && (
            <div>
              <p className="text-[10.5px] text-muted-foreground uppercase tracking-wider mb-0.5">Sensación a transmitir</p>
              <p className="text-[13px] font-semibold text-amber-300">{sensacion}</p>
            </div>
          )}
          {persona && (
            <div>
              <p className="text-[10.5px] text-muted-foreground uppercase tracking-wider mb-0.5">La página como persona</p>
              <p className="text-[13px] font-semibold text-rose-300">{persona}</p>
            </div>
          )}
          {publico && (
            <div className="sm:col-span-2">
              <p className="text-[10.5px] text-muted-foreground uppercase tracking-wider mb-0.5">Público objetivo</p>
              <p className="text-[12.5px] text-foreground/80 leading-relaxed">{publico}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function BriefingView({ answers }: { answers: Record<string, FieldValue> }) {
  const totalAnswered = Object.values(answers).filter(isAnswered).length;

  return (
    <div className="space-y-4">
      <SummaryCard answers={answers} />

      {briefingSchema.map((section) => {
        const Icon = ICONS[section.icon] ?? FileText;
        const colorCls = SECTION_COLORS[section.id] ?? "bg-primary/10 text-primary";
        const answeredCount = section.fields.filter((f) => isAnswered(answers[`${section.id}.${f.id}`])).length;
        const complete = answeredCount === section.fields.length;

        return (
          <section id={section.id} key={section.id} className="rounded-2xl border border-border bg-card shadow-soft overflow-hidden scroll-mt-24">
            {/* Section header */}
            <div className="flex items-center gap-3 px-5 py-3.5 border-b border-border/60 bg-muted/20">
              <span className={`grid h-8 w-8 place-items-center rounded-lg ${colorCls}`}>
                <Icon className="h-3.5 w-3.5" />
              </span>
              <div className="flex-1 min-w-0">
                <h3 className="text-[13.5px] font-semibold leading-tight">{section.title}</h3>
                {section.description && <p className="text-[11px] text-muted-foreground truncate">{section.description}</p>}
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                {complete
                  ? <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  : <Circle className="h-4 w-4 text-muted-foreground/40" />
                }
                <span className={`text-[11px] font-semibold tabular-nums ${complete ? "text-emerald-400" : "text-muted-foreground"}`}>
                  {answeredCount}/{section.fields.length}
                </span>
              </div>
            </div>

            {/* Fields */}
            <div className="p-5 space-y-4">
              {section.fields.map((f) => {
                const v = answers[`${section.id}.${f.id}`];
                const ok = isAnswered(v);
                return (
                  <div key={f.id} className={`pb-4 border-b border-border/40 last:border-0 last:pb-0 ${!ok ? "opacity-50" : ""}`}>
                    <p className="text-[11.5px] font-semibold text-muted-foreground uppercase tracking-wide">{f.label}</p>
                    <FieldValue sectionId={section.id} fieldId={f.id} value={v} />
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
