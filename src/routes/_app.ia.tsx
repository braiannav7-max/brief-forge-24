import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Sparkles,
  ClipboardCheck,
  Lightbulb,
  FileCode2,
  Calculator,
  Loader2,
  Wand2,
  Target,
  GaugeCircle,
  Workflow,
  LayoutDashboard,
  Boxes,
  GitBranch,
  Zap,
  AlertCircle,
} from "lucide-react";
import { companies } from "@/lib/companies";
import { listBriefingsFn } from "@/lib/api/briefings.functions";
import { generateBlueprintFn } from "@/lib/api/blueprint.functions";
import { computeProgress } from "@/lib/briefing-progress";
import { formatBRL } from "@/lib/pricing/quote";
import type { BriefingData } from "@/lib/briefing-types";
import type { WorkspaceBlueprint } from "@/lib/ai/blueprint-types";

export const Route = createFileRoute("/_app/ia")({
  loader: async () => ({ briefings: await listBriefingsFn() }),
  component: Page,
});

const cards = [
  {
    icon: ClipboardCheck,
    title: "Auditor del Brief",
    desc: "Detecta información faltante y te guía para completarla.",
    tone: "from-primary/10 to-primary/0",
  },
  {
    icon: Lightbulb,
    title: "Consultor UX",
    desc: "Sugiere estructura, funcionalidades y mejoras para tu proyecto.",
    tone: "from-lavender/15 to-lavender/0",
  },
  {
    icon: FileCode2,
    title: "Generador de Blueprint",
    desc: "Convierte el briefing en un workspace completo por rubro.",
    tone: "from-[oklch(0.7_0.12_160)]/15 to-transparent",
  },
  {
    icon: Calculator,
    title: "Estimador Inteligente",
    desc: "Calcula complejidad, tiempo y presupuesto del proyecto.",
    tone: "from-[oklch(0.75_0.13_60)]/15 to-transparent",
  },
];

const widgetIcon = {
  metric: GaugeCircle,
  chart: LayoutDashboard,
  list: Workflow,
  table: Boxes,
} as const;

function Page() {
  const { briefings } = Route.useLoaderData();
  const byToken = new Map((briefings as BriefingData[]).map((d) => [d.token, d]));

  const [token, setToken] = useState<string>(companies[0]?.token ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bp, setBp] = useState<WorkspaceBlueprint | null>(null);

  async function generate() {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const result = await generateBlueprintFn({ data: { token } });
      setBp(result);
    } catch {
      setError("No se pudo generar el workspace. Revisá el briefing e intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8 max-w-[1300px]">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 md:p-10 shadow-soft">
        <div className="absolute top-0 right-0 h-48 w-48 rounded-full bg-gradient-to-br from-primary/15 to-lavender/15 blur-3xl" />
        <div className="relative max-w-2xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-accent text-accent-foreground text-[11px] font-medium">
            <Sparkles className="h-3 w-3" /> Inteligencia Artificial
          </div>
          <h1 className="mt-4 text-[26px] md:text-[30px] font-bold tracking-tight leading-tight">
            Contanos qué hace el cliente y la IA le construye el sistema.
          </h1>
          <p className="mt-3 text-[14px] text-muted-foreground max-w-xl">
            A partir del briefing, la IA detecta el rubro y genera un workspace a medida: módulos,
            KPIs, pipeline comercial y automatizaciones sugeridas.
          </p>
        </div>
      </div>

      {/* Generador de Workspace */}
      <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <Wand2 className="h-[18px] w-[18px]" />
          </div>
          <div>
            <h2 className="text-[16px] font-semibold">Generador de Workspace</h2>
            <p className="text-[12.5px] text-muted-foreground">
              Elegí un cliente y la IA arma su plataforma.
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-col sm:flex-row gap-3">
          <select
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="flex-1 rounded-xl border border-border bg-surface-elevated px-3.5 py-2.5 text-[13.5px] outline-none focus:border-primary/50"
          >
            {companies.map((c) => {
              const progress = computeProgress(byToken.get(c.token)?.answers ?? {});
              return (
                <option key={c.token} value={c.token}>
                  {c.name} — briefing {progress}%
                </option>
              );
            })}
          </select>
          <button
            onClick={generate}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-[13px] font-semibold text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
            {loading ? "Generando…" : "Generar workspace"}
          </button>
        </div>

        {error && (
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-3.5 py-2.5 text-[12.5px] text-red-400">
            <AlertCircle className="h-4 w-4 shrink-0" /> {error}
          </div>
        )}

        {bp && <BlueprintView bp={bp} />}
      </section>

      {/* Los 4 módulos de IA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {cards.map((c) => (
          <div
            key={c.title}
            className={`relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-soft`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${c.tone} pointer-events-none`} />
            <div className="relative">
              <div className="h-11 w-11 rounded-xl bg-surface-elevated border border-border flex items-center justify-center text-primary">
                <c.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-[16px] font-semibold">{c.title}</h3>
              <p className="mt-1.5 text-[13px] text-muted-foreground leading-relaxed">{c.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BlueprintView({ bp }: { bp: WorkspaceBlueprint }) {
  return (
    <div className="mt-6 space-y-6 border-t border-border pt-6">
      {/* Cabecera del resultado */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary px-2.5 py-1 text-[11px] font-semibold">
              <Target className="h-3 w-3" /> {bp.rubroLabel}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
              {bp.source === "groq" ? (
                <>
                  <Sparkles className="h-3 w-3" /> Refinado con IA (Groq)
                </>
              ) : (
                <>Motor inteligente</>
              )}
            </span>
          </div>
          <p className="mt-3 text-[13.5px] text-foreground/90 leading-relaxed">{bp.summary}</p>
        </div>
        <div className="rounded-xl border border-border bg-surface-elevated px-4 py-3 text-right">
          <p className="text-[11px] text-muted-foreground">Inversión estimada</p>
          <p className="text-[20px] font-bold leading-tight">{formatBRL(bp.quote.subtotal)}</p>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            {bp.quote.level} · ~{bp.quote.weeks} semanas
          </p>
        </div>
      </div>

      {/* KPIs */}
      <Block icon={GaugeCircle} title="KPIs recomendados">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {bp.kpis.map((k) => (
            <div
              key={k.label}
              className="rounded-xl border border-border bg-surface-elevated p-3.5"
            >
              <p className="text-[13px] font-semibold">{k.label}</p>
              <p className="text-[11.5px] text-muted-foreground mt-1 leading-relaxed">{k.hint}</p>
            </div>
          ))}
        </div>
      </Block>

      {/* Pipeline */}
      <Block icon={GitBranch} title="Pipeline comercial">
        <div className="flex flex-wrap items-center gap-2">
          {bp.pipeline.map((stage, i) => (
            <div key={stage} className="flex items-center gap-2">
              <span className="rounded-lg border border-border bg-surface-elevated px-3 py-1.5 text-[12px] font-medium">
                {stage}
              </span>
              {i < bp.pipeline.length - 1 && <span className="text-muted-foreground/50">→</span>}
            </div>
          ))}
        </div>
      </Block>

      {/* Módulos */}
      <Block icon={Boxes} title={`Módulos sugeridos (${bp.modules.length})`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {bp.modules.map((m) => (
            <div
              key={m.id}
              className="flex items-start justify-between gap-3 rounded-xl border border-border bg-surface-elevated p-3.5"
            >
              <div className="min-w-0">
                <p className="text-[13px] font-semibold">{m.name}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  {m.category} · {m.reason}
                </p>
              </div>
              <span className="text-[12px] font-semibold tabular-nums shrink-0">
                {formatBRL(m.basePrice)}
              </span>
            </div>
          ))}
        </div>
      </Block>

      {/* Automatizaciones */}
      <Block icon={Zap} title="Automatizaciones sugeridas">
        <div className="space-y-2.5">
          {bp.automations.map((a) => (
            <div key={a.name} className="rounded-xl border border-border bg-surface-elevated p-3.5">
              <div className="flex items-center justify-between gap-2">
                <p className="text-[13px] font-semibold">{a.name}</p>
                <span className="rounded-md bg-primary/10 text-primary px-2 py-0.5 text-[10.5px] font-semibold">
                  {a.tool}
                </span>
              </div>
              <p className="text-[11.5px] text-muted-foreground mt-1.5 leading-relaxed">
                <span className="text-foreground/70 font-medium">Cuando:</span> {a.trigger} ·{" "}
                <span className="text-foreground/70 font-medium">Hace:</span> {a.action}
              </p>
            </div>
          ))}
        </div>
      </Block>

      {/* Widgets del dashboard */}
      <Block icon={LayoutDashboard} title="Dashboard sugerido">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {bp.widgets.map((w) => {
            const Icon = widgetIcon[w.type];
            return (
              <div
                key={w.title}
                className="flex items-center gap-3 rounded-xl border border-border bg-surface-elevated p-3.5"
              >
                <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Icon className="h-[18px] w-[18px]" />
                </div>
                <div className="min-w-0">
                  <p className="text-[12.5px] font-semibold truncate">{w.title}</p>
                  <p className="text-[11px] text-muted-foreground capitalize">{w.type}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Block>
    </div>
  );
}

function Block({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Target;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-wide text-muted-foreground mb-3">
        <Icon className="h-4 w-4 text-primary" /> {title}
      </h3>
      {children}
    </div>
  );
}
