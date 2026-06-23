import { useState } from "react";
import { TrendingUp, Sparkles, RefreshCw, Loader2, Flame, ArrowUpRight } from "lucide-react";

import { getTrendsFn } from "@/lib/api/trends.functions";
import type { TrendItem, TrendsResult } from "@/lib/ai/trends-types";

const IMPACT_STYLE: Record<TrendItem["impact"], { cls: string; label: string }> = {
  alto: { cls: "bg-rose-500/10 text-rose-400 border-rose-500/20", label: "Alto impacto" },
  medio: { cls: "bg-amber-500/10 text-amber-400 border-amber-500/20", label: "Impacto medio" },
  bajo: { cls: "bg-slate-500/10 text-slate-400 border-slate-500/20", label: "Impacto bajo" },
};

const CATEGORY_STYLE: Record<string, string> = {
  Diseño: "bg-pink-500/10 text-pink-400",
  Marketing: "bg-violet-500/10 text-violet-400",
  Contenido: "bg-orange-500/10 text-orange-400",
  Tecnología: "bg-cyan-500/10 text-cyan-400",
  UX: "bg-indigo-500/10 text-indigo-400",
};

function categoryClass(cat: string): string {
  return CATEGORY_STYLE[cat] ?? "bg-primary/10 text-primary";
}

export function TrendsPanel({ token }: { token: string }) {
  const [data, setData] = useState<TrendsResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const result = await getTrendsFn({ data: { token } });
      setData(result);
    } catch {
      setError("No se pudieron cargar las tendencias. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="tendencias"
      className="rounded-2xl border border-border bg-card shadow-soft overflow-hidden"
    >
      <div className="flex flex-wrap items-center gap-3 p-5 border-b border-border">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-rose-500/15 to-orange-500/10 text-rose-400">
          <TrendingUp className="h-[18px] w-[18px]" />
        </div>
        <div className="min-w-0">
          <h3 className="text-[15px] font-semibold flex items-center gap-2">
            Tendencias del rubro
            {data && (
              <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-[10px] font-medium text-accent-foreground">
                <Sparkles className="h-2.5 w-2.5" />
                {data.source === "groq" ? "IA · Groq" : "Base"}
              </span>
            )}
          </h3>
          <p className="text-[12px] text-muted-foreground">
            {data
              ? `Lo que está marcando tendencia hoy en ${data.rubroLabel.toLowerCase()}.`
              : "Generá con IA las tendencias actuales para este negocio."}
          </p>
        </div>
        <button
          onClick={load}
          disabled={loading}
          className="ml-auto inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-[12.5px] font-medium text-primary-foreground hover:opacity-90 disabled:opacity-60"
        >
          {loading ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : data ? (
            <RefreshCw className="h-3.5 w-3.5" />
          ) : (
            <Flame className="h-3.5 w-3.5" />
          )}
          {loading ? "Buscando…" : data ? "Actualizar" : "Ver tendencias"}
        </button>
      </div>

      <div className="p-5">
        {error && (
          <div className="rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-[12.5px] text-destructive">
            {error}
          </div>
        )}

        {!data && !error && !loading && (
          <div className="text-center py-8">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-muted text-muted-foreground">
              <Flame className="h-6 w-6" />
            </div>
            <p className="mt-3 text-[12.5px] text-muted-foreground max-w-sm mx-auto">
              Detectamos el rubro del cliente y la IA te muestra las tendencias de diseño, marketing
              y tecnología más relevantes para el proyecto.
            </p>
          </div>
        )}

        {loading && !data && (
          <div className="space-y-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-20 rounded-xl bg-muted/50 animate-pulse" />
            ))}
          </div>
        )}

        {data && (
          <div className="grid gap-3 sm:grid-cols-2">
            {data.items.map((t, i) => {
              const impact = IMPACT_STYLE[t.impact];
              return (
                <article
                  key={`${t.title}-${i}`}
                  className="group rounded-xl border border-border bg-surface-elevated p-4 hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10.5px] font-medium ${categoryClass(t.category)}`}
                    >
                      {t.category}
                    </span>
                    <span
                      className={`ml-auto inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold ${impact.cls}`}
                    >
                      {impact.label}
                    </span>
                  </div>
                  <h4 className="text-[13.5px] font-semibold flex items-start gap-1.5">
                    {t.title}
                    <ArrowUpRight className="h-3.5 w-3.5 mt-0.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition" />
                  </h4>
                  <p className="mt-1 text-[12px] text-muted-foreground leading-relaxed">
                    {t.description}
                  </p>
                </article>
              );
            })}
          </div>
        )}

        {data && (
          <p className="mt-4 text-[11px] text-muted-foreground">
            Generado {new Date(data.generatedAt).toLocaleString("es-AR")}
            {data.source === "base" && " · activá GROQ_API_KEY para tendencias a medida con IA"}
          </p>
        )}
      </div>
    </section>
  );
}
