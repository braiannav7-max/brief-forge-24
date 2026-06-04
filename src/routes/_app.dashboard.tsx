import { createFileRoute, Link } from "@tanstack/react-router";
import { projects, activities, tasks, meetings } from "@/lib/mock-data";
import { StatusBadge } from "@/components/app/Badge";
import {
  Plus, Play, ArrowUpRight, Calendar,
  FolderKanban, TrendingUp, Lightbulb, Receipt,
  FileText, Upload, MessageSquare, DollarSign,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const Route = createFileRoute("/_app/dashboard")({
  component: Dashboard,
});

const dashKpis = [
  {
    label: "Proyectos activos",
    value: "6",
    delta: "+1 esta semana",
    points: "0,20 13,16 26,18 40,10 53,13 66,8 80,6",
    color: "#818cf8",
    Icon: FolderKanban,
    bg: "bg-indigo-500/10 text-indigo-400 dark:text-indigo-300",
  },
  {
    label: "Progreso promedio",
    value: "67%",
    delta: "+12% vs. semana pasada",
    points: "0,18 13,15 26,13 40,11 53,9 66,7 80,5",
    color: "#a78bfa",
    Icon: TrendingUp,
    bg: "bg-violet-500/10 text-violet-400 dark:text-violet-300",
  },
  {
    label: "Ideas registradas",
    value: "48",
    delta: "+8 esta semana",
    points: "0,20 13,13 26,17 40,9 53,12 66,5 80,3",
    color: "#34d399",
    Icon: Lightbulb,
    bg: "bg-emerald-500/10 text-emerald-400 dark:text-emerald-300",
  },
  {
    label: "Presupuestos enviados",
    value: "3",
    delta: "+1 pendiente aprobación",
    points: "0,22 13,22 26,20 40,20 53,14 66,10 80,7",
    color: "#f59e0b",
    Icon: Receipt,
    bg: "bg-amber-500/10 text-amber-400 dark:text-amber-300",
  },
];

const activityMeta: Record<string, { bg: string; color: string; Icon: LucideIcon }> = {
  briefing: { bg: "bg-orange-500/10", color: "text-orange-400",  Icon: FileText },
  file:     { bg: "bg-indigo-500/10", color: "text-indigo-400",  Icon: Upload },
  comment:  { bg: "bg-violet-500/10", color: "text-violet-400",  Icon: MessageSquare },
  budget:   { bg: "bg-emerald-500/10",color: "text-emerald-400", Icon: DollarSign },
  idea:     { bg: "bg-amber-500/10",  color: "text-amber-400",   Icon: Lightbulb },
};

const priorityCls: Record<string, string> = {
  Alta:  "bg-red-500/10 text-red-400",
  Media: "bg-orange-500/10 text-orange-400",
  Baja:  "bg-emerald-500/10 text-emerald-400",
};

function Sparkline({ points, color }: { points: string; color: string }) {
  return (
    <svg viewBox="0 0 80 24" className="w-20 h-6 shrink-0" preserveAspectRatio="none">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.8"
      />
    </svg>
  );
}

function ProjectCard({ p }: { p: typeof projects[0] }) {
  return (
    <Link
      to="/proyectos/$id"
      params={{ id: p.id }}
      className="block rounded-2xl overflow-hidden border border-border bg-card hover:border-primary/30 hover:shadow-elevated transition-all duration-200 group"
    >
      <div className="relative h-44 overflow-hidden">
        {p.coverImage && (
          <img
            src={p.coverImage}
            alt={p.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {p.hasVideo && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-10 w-10 rounded-full border-2 border-white/60 bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Play className="h-4 w-4 text-white fill-white ml-0.5" />
            </div>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-3 flex items-end gap-2.5">
          <div
            className={`h-9 w-9 rounded-full ${p.logoClass} flex items-center justify-center text-[10px] font-bold shrink-0 ring-2 ring-white/20`}
          >
            {p.initials}
          </div>
          <div className="min-w-0">
            <div className="text-white font-semibold text-[13.5px] leading-tight truncate">{p.name}</div>
            <div className="text-white/55 text-[11px] truncate">{p.category}</div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-2.5">
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-muted-foreground shrink-0 w-[58px]">Progreso</span>
          <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-lavender rounded-full"
              style={{ width: `${p.progress}%` }}
            />
          </div>
          <span className="text-[12px] font-semibold tabular-nums text-foreground ml-1 shrink-0">
            {p.progress}%
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] text-muted-foreground shrink-0 w-[58px]">Etapa</span>
          <StatusBadge status={p.status} />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] text-muted-foreground shrink-0 w-[58px]">Última act.</span>
          <span className="text-[11px] text-muted-foreground truncate">{p.updated}</span>
        </div>
      </div>
    </Link>
  );
}

function NewProjectCard() {
  return (
    <button className="rounded-2xl border border-dashed border-border bg-card hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 flex flex-col items-center justify-center gap-3 min-h-[260px] w-full group">
      <div className="h-12 w-12 rounded-full border-2 border-dashed border-border group-hover:border-primary/60 flex items-center justify-center transition-colors">
        <Plus className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>
      <div className="text-center">
        <p className="text-[14px] font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
          Nuevo proyecto
        </p>
        <p className="text-[11.5px] text-muted-foreground/60 mt-0.5">
          Crear un nuevo proyecto para el grupo
        </p>
      </div>
    </button>
  );
}

function Dashboard() {
  return (
    <div className="flex gap-6 max-w-[1600px]">
      {/* ── Main content ── */}
      <div className="flex-1 min-w-0 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-[26px] font-bold tracking-tight">Bienvenido, Braian 👋</h1>
            <p className="mt-1 text-[13.5px] text-muted-foreground">
              Gestiona todos los proyectos del Grupo Viva Búzios desde un solo lugar.
            </p>
          </div>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {dashKpis.map((k) => (
            <div
              key={k.label}
              className="rounded-2xl border border-border bg-card p-5 shadow-soft"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`h-9 w-9 rounded-xl flex items-center justify-center ${k.bg}`}>
                  <k.Icon className="h-[18px] w-[18px]" />
                </div>
                <Sparkline points={k.points} color={k.color} />
              </div>
              <p className="text-[12.5px] text-muted-foreground">{k.label}</p>
              <p className="mt-1 text-[28px] font-bold tracking-tight leading-none">{k.value}</p>
              <p className="mt-1.5 text-[11.5px] text-emerald-500 font-medium">{k.delta}</p>
            </div>
          ))}
        </div>

        {/* Project cards */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[16px] font-semibold">Proyectos del Grupo</h2>
            <Link
              to="/proyectos"
              className="text-[12.5px] text-primary font-medium inline-flex items-center gap-1 hover:underline"
            >
              Ver todos los proyectos <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((p) => (
              <ProjectCard key={p.id} p={p} />
            ))}
            <NewProjectCard />
          </div>
        </div>
      </div>

      {/* ── Right column ── */}
      <div className="w-[268px] shrink-0 space-y-4">

        {/* Actividad reciente */}
        <div className="rounded-2xl border border-border bg-card p-4 shadow-soft">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[14px] font-semibold">Actividad reciente</h3>
          </div>
          <div className="space-y-3">
            {activities.map((a, i) => {
              const meta = activityMeta[a.type];
              const Icon = meta.Icon;
              return (
                <div key={i} className="flex items-start gap-3">
                  <div className={`h-7 w-7 rounded-lg ${meta.bg} ${meta.color} flex items-center justify-center shrink-0 mt-0.5`}>
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[12.5px] font-medium leading-tight">{a.label}</p>
                    <p className="text-[11px] text-muted-foreground">{a.sub}</p>
                  </div>
                  <span className="text-[10.5px] text-muted-foreground/60 shrink-0">{a.time}</span>
                </div>
              );
            })}
          </div>
          <button className="mt-4 w-full text-[12px] text-primary font-medium hover:underline text-center">
            Ver toda la actividad
          </button>
        </div>

        {/* Tareas pendientes */}
        <div className="rounded-2xl border border-border bg-card p-4 shadow-soft">
          <h3 className="text-[14px] font-semibold mb-3">Tareas pendientes</h3>
          <div className="space-y-2.5">
            {tasks.map((t, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="h-5 w-5 rounded-md border-2 border-border shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <p className="text-[12.5px] font-medium leading-tight">{t.label}</p>
                  <p className="text-[11px] text-muted-foreground">{t.project}</p>
                </div>
                <span className={`text-[10.5px] font-semibold px-1.5 py-0.5 rounded-md shrink-0 ${priorityCls[t.priority]}`}>
                  {t.priority}
                </span>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full text-[12px] text-primary font-medium hover:underline text-center">
            Ver todas las tareas
          </button>
        </div>

        {/* Próximas reuniones */}
        <div className="rounded-2xl border border-border bg-card p-4 shadow-soft">
          <h3 className="text-[14px] font-semibold mb-3">Próximas reuniones</h3>
          <div className="space-y-3">
            {meetings.map((m, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Calendar className="h-3.5 w-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[12.5px] font-medium leading-tight truncate">{m.label}</p>
                  <p className="text-[11px] text-muted-foreground">{m.date}</p>
                </div>
                <div className="flex -space-x-1.5 shrink-0">
                  {m.avatars.map((av, j) => (
                    <div
                      key={j}
                      className="h-6 w-6 rounded-full border-2 border-card bg-gradient-to-br from-primary/80 to-lavender flex items-center justify-center text-[8px] font-bold text-white"
                    >
                      {av}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full text-[12px] text-primary font-medium hover:underline text-center">
            Ver calendario completo
          </button>
        </div>

      </div>
    </div>
  );
}
