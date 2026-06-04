import { createFileRoute, Link } from "@tanstack/react-router";
import { kpis, projects } from "@/lib/mock-data";
import { StatusBadge } from "@/components/app/Badge";
import { ArrowUpRight, Plus, Building2, FolderKanban, Lightbulb, FolderArchive, FileText, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/_app/dashboard")({
  component: Dashboard,
});

// Un ícono por KPI (en el mismo orden que `kpis` en mock-data.ts).
const kpiIcons = [Building2, FolderKanban, Lightbulb, FolderArchive, FileText, TrendingUp];

function Dashboard() {
  return (
    <div className="space-y-8 max-w-[1400px]">
      <div className="flex items-start justify-between gap-6 flex-wrap">
        <div>
          <h1 className="text-[28px] font-bold tracking-tight">¡Bienvenido, Braian! 👋</h1>
          <p className="mt-1.5 text-[14px] text-muted-foreground max-w-xl">
            Gestiona todos los proyectos del Grupo Viva Búzios desde un solo lugar.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-[13.5px] font-medium hover:opacity-90 shadow-soft">
          <Plus className="h-4 w-4" /> Nuevo proyecto
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {kpis.map((k, i) => {
          const Icon = kpiIcons[i] ?? TrendingUp;
          return (
            <div key={k.label} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <div className="flex items-start justify-between">
                <div className="text-[13px] text-muted-foreground">{k.label}</div>
                <div className="h-8 w-8 rounded-lg bg-accent/60 flex items-center justify-center text-accent-foreground">
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-4 text-[26px] font-bold tracking-tight">{k.value}</div>
              <div className="mt-1 text-[11.5px] text-success-foreground font-medium">{k.delta}</div>
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl border border-border bg-card shadow-soft overflow-hidden">
        <div className="px-6 py-5 flex items-center justify-between border-b border-border">
          <div>
            <h3 className="text-[15px] font-semibold">Proyectos recientes</h3>
            <p className="text-[12.5px] text-muted-foreground">Tus proyectos más actualizados</p>
          </div>
          <Link to="/proyectos" className="text-[12.5px] text-primary font-medium inline-flex items-center gap-1 hover:underline">
            Ver todos <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="divide-y divide-border">
          {projects.map((p) => (
            <div key={p.id} className="px-6 py-4 flex items-center gap-4 hover:bg-muted/40 transition">
              <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${p.accent} flex items-center justify-center text-white text-[12px] font-semibold shrink-0`}>
                {p.initials}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[14px] font-medium truncate">{p.name}</div>
                <div className="text-[11.5px] text-muted-foreground">{p.contact}</div>
              </div>
              <div className="hidden md:block w-24"><StatusBadge status={p.status} /></div>
              <div className="hidden lg:flex items-center gap-3 w-48">
                <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-lavender rounded-full" style={{ width: `${p.progress}%` }} />
                </div>
                <div className="text-[11.5px] text-muted-foreground tabular-nums">{p.progress}%</div>
              </div>
              <div className="hidden xl:block text-[11.5px] text-muted-foreground w-32 text-right">{p.updated}</div>
              <Link
                to="/proyectos/$id" params={{ id: p.id }}
                className="ml-2 px-3.5 py-1.5 rounded-lg border border-border bg-surface-elevated text-[12px] font-medium hover:bg-muted shrink-0"
              >
                Abrir proyecto
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
