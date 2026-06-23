import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { projects, roadmap } from "@/lib/mock-data";
import { getCompanyBySlug } from "@/lib/companies";
import { getBriefing } from "@/lib/api/briefings.functions";
import { briefingSchema } from "@/lib/briefing-schema";
import { computeProgress } from "@/lib/briefing-progress";
import { BriefingView } from "@/components/briefing/BriefingView";
import { TrendsPanel } from "@/components/briefing/TrendsPanel";
import { StatusBadge } from "@/components/app/Badge";
import {
  ArrowLeft,
  Pencil,
  Copy,
  Check,
  ExternalLink,
  FileWarning,
  CheckCircle2,
  Circle,
  Loader2,
  Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/_app/proyectos/$id")({
  loader: async ({ params }) => {
    const project = projects.find((p) => p.id === params.id);
    if (!project) throw notFound();
    const company = getCompanyBySlug(params.id) ?? null;
    const briefing = company ? await getBriefing({ data: { token: company.token } }) : null;
    return { project, company, briefing };
  },
  errorComponent: ({ error }) => (
    <div className="p-6 text-sm text-destructive">{error.message}</div>
  ),
  notFoundComponent: () => <div className="p-6 text-sm">Proyecto no encontrado.</div>,
  component: Page,
});

function Page() {
  const { project, company, briefing } = Route.useLoaderData();
  const answers = briefing?.answers ?? {};
  const progress = briefing ? computeProgress(answers) : 0;

  return (
    <div className="space-y-6 max-w-[1500px]">
      <Link
        to="/proyectos"
        className="inline-flex items-center gap-2 text-[12.5px] text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Proyecto: {project.name}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_320px] gap-6">
        {/* LEFT */}
        <aside className="space-y-4">
          <div className="rounded-2xl border border-border bg-card shadow-soft p-5">
            <div className="flex items-center gap-3">
              <div
                className={`h-12 w-12 rounded-xl bg-gradient-to-br ${project.accent} flex items-center justify-center text-white font-semibold`}
              >
                {project.initials}
              </div>
              <div className="min-w-0">
                <div className="text-[14px] font-semibold truncate">{project.name}</div>
                <StatusBadge status={project.status} />
              </div>
            </div>
            <dl className="mt-5 space-y-3 text-[12.5px]">
              {[
                ["Contacto", project.contact],
                ["Email", project.email],
                ["Teléfono", project.phone],
                ["Presupuesto", project.budget],
                ["Inicio", project.start],
                ["Entrega", project.delivery],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="flex justify-between gap-3 border-b border-border/70 pb-2 last:border-0"
                >
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="font-medium text-right truncate">{v}</dd>
                </div>
              ))}
            </dl>
            {project.siteUrl && (
              <a
                href={project.siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[12.5px] font-semibold hover:bg-emerald-500/20 transition-colors"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Sitio en vivo
                <ExternalLink className="h-3.5 w-3.5 ml-1" />
              </a>
            )}
            <button
              className={`${project.siteUrl ? "mt-2" : "mt-5"} w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-lg border border-border bg-surface-elevated text-[12.5px] font-medium hover:bg-muted`}
            >
              <Pencil className="h-3.5 w-3.5" /> Editar proyecto
            </button>
          </div>

          {company && (
            <nav className="rounded-2xl border border-border bg-card p-2 shadow-soft">
              <div className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Secciones del briefing
              </div>
              {briefingSchema.map((s) => (
                <a
                  href={`#${s.id}`}
                  key={s.id}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12.5px] text-muted-foreground hover:bg-muted hover:text-foreground transition"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
                  {s.title}
                </a>
              ))}
              <a
                href="#tendencias"
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12.5px] text-rose-400/90 hover:bg-muted hover:text-rose-400 transition"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
                Tendencias
              </a>
            </nav>
          )}
        </aside>

        {/* CENTER — Briefing real */}
        <div className="space-y-5">
          {company ? (
            <>
              <BriefingHeader
                token={company.token}
                submitted={briefing?.submitted ?? false}
                updatedAt={briefing?.updatedAt}
              />
              <BriefingView answers={answers} />
              <TrendsPanel token={company.token} />
            </>
          ) : (
            <div className="rounded-2xl border border-border bg-card shadow-soft p-10 text-center">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-muted text-muted-foreground">
                <FileWarning className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-[15px] font-semibold">
                Esta empresa no tiene briefing configurado
              </h3>
              <p className="mt-1.5 text-[12.5px] text-muted-foreground">
                Agregá la empresa en <code className="text-foreground">src/lib/companies.ts</code>{" "}
                con su <code className="text-foreground">slug</code> ={" "}
                <code className="text-foreground">{project.id}</code>.
              </p>
            </div>
          )}
        </div>

        {/* RIGHT — STICKY */}
        <aside className="space-y-4 lg:sticky lg:top-[88px] lg:self-start">
          <div className="rounded-2xl border border-border bg-card shadow-soft p-5">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-primary to-lavender flex items-center justify-center">
                <Sparkles className="h-3.5 w-3.5 text-white" />
              </div>
              <h3 className="text-[14px] font-semibold">Análisis IA</h3>
              <span className="ml-auto rounded-full bg-accent px-2 py-0.5 text-[10px] font-medium text-accent-foreground">
                Próximamente
              </span>
            </div>
            <p className="mt-3 text-[12.5px] text-muted-foreground leading-relaxed">
              Cuando conectemos Claude, acá vas a ver el análisis automático del briefing:
              faltantes, sugerencias de UX y un resumen ejecutivo.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card shadow-soft p-5">
            <h3 className="text-[14px] font-semibold">Compleción del briefing</h3>
            <div className="mt-4 flex items-center gap-5">
              <CircularProgress value={progress} />
              <div className="text-[12px] text-muted-foreground">
                <div>
                  {briefing?.submitted
                    ? "Briefing enviado por el cliente"
                    : `${progress}% completado`}
                </div>
                {briefing?.updatedAt && (
                  <div className="mt-1 text-[11px]">
                    Última edición: {new Date(briefing.updatedAt).toLocaleString("es-AR")}
                  </div>
                )}
              </div>
            </div>
          </div>

          <RoadmapCard />
        </aside>
      </div>
    </div>
  );
}

function BriefingHeader({
  token,
  submitted,
  updatedAt,
}: {
  token: string;
  submitted: boolean;
  updatedAt?: string;
}) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(`${window.location.origin}/briefing/${token}`).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };
  return (
    <div className="rounded-2xl border border-border bg-card shadow-soft p-5 flex flex-wrap items-center gap-3">
      <div className="flex-1 min-w-0">
        <h2 className="text-[15px] font-semibold">Briefing del cliente</h2>
        <p className="text-[12px] text-muted-foreground">
          {submitted ? "Enviado por el cliente" : "En progreso"}
          {updatedAt && ` · actualizado ${new Date(updatedAt).toLocaleString("es-AR")}`}
        </p>
      </div>
      <button
        onClick={copy}
        className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface-elevated px-3.5 py-2 text-[12.5px] font-medium hover:bg-muted"
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-success-foreground" />
        ) : (
          <Copy className="h-3.5 w-3.5" />
        )}
        {copied ? "Link copiado" : "Copiar link"}
      </button>
      <Link
        to="/briefing/$token"
        params={{ token }}
        className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-[12.5px] font-medium text-primary-foreground hover:opacity-90"
      >
        Abrir / editar <ExternalLink className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}

function CircularProgress({ value }: { value: number }) {
  const r = 30;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <div className="relative h-20 w-20">
      <svg viewBox="0 0 80 80" className="-rotate-90">
        <circle cx="40" cy="40" r={r} stroke="oklch(0.92 0.008 270)" strokeWidth="7" fill="none" />
        <circle
          cx="40"
          cy="40"
          r={r}
          stroke="url(#pg)"
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
          strokeDasharray={c}
          strokeDashoffset={offset}
        />
        <defs>
          <linearGradient id="pg" x1="0" y1="0" x2="80" y2="80">
            <stop offset="0" stopColor="oklch(0.46 0.18 266)" />
            <stop offset="1" stopColor="oklch(0.72 0.12 290)" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-[15px] font-bold">
        {value}%
      </div>
    </div>
  );
}

function RoadmapCard() {
  return (
    <div className="rounded-2xl border border-border bg-card shadow-soft p-5">
      <h3 className="text-[14px] font-semibold mb-4">Roadmap del proyecto</h3>
      <ol className="space-y-3">
        {roadmap.map((r, i) => (
          <li key={r.label} className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              {r.status === "done" && <CheckCircle2 className="h-5 w-5 text-success-foreground" />}
              {r.status === "current" && <Loader2 className="h-5 w-5 text-primary animate-spin" />}
              {r.status === "todo" && <Circle className="h-5 w-5 text-muted-foreground/40" />}
              {i < 6 && (
                <div
                  className={`w-px flex-1 my-1 ${r.status === "done" ? "bg-success-foreground/30" : "bg-border"}`}
                  style={{ minHeight: 14 }}
                />
              )}
            </div>
            <div className="pb-2">
              <div
                className={`text-[12.5px] font-medium ${r.status === "current" ? "text-primary" : ""}`}
              >
                {r.label}
              </div>
              <div className="text-[11px] text-muted-foreground">{r.date}</div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
