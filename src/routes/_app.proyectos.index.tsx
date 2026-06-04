import { createFileRoute, Link } from "@tanstack/react-router";
import { projects } from "@/lib/mock-data";
import { StatusBadge } from "@/components/app/Badge";
import { Plus, Filter, Search, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/_app/proyectos/")({
  component: Page,
});

function Page() {
  return (
    <div className="space-y-6 max-w-[1400px]">
      <div className="flex items-start justify-between gap-6 flex-wrap">
        <div>
          <h1 className="text-[26px] font-bold tracking-tight">Proyectos</h1>
          <p className="text-[13.5px] text-muted-foreground">Administra todos los proyectos activos</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-[13.5px] font-medium shadow-soft hover:opacity-90">
          <Plus className="h-4 w-4" /> Nuevo proyecto
        </button>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input placeholder="Buscar…" className="w-full h-10 pl-10 pr-3 rounded-lg border border-border bg-card text-[13px] focus:outline-none focus:ring-2 focus:ring-ring/30" />
        </div>
        <button className="h-10 px-3.5 inline-flex items-center gap-2 rounded-lg border border-border bg-card text-[13px]"><Filter className="h-4 w-4" /> Filtros</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {projects.map((p) => (
          <div key={p.id} className="rounded-2xl border border-border bg-card shadow-soft hover:shadow-card hover:-translate-y-0.5 transition flex flex-col">
            <Link to="/proyectos/$id" params={{ id: p.id }} className="p-5 flex-1 block">
              <div className="flex items-start gap-3">
                <div className={`h-11 w-11 rounded-xl bg-gradient-to-br ${p.accent} flex items-center justify-center text-white text-[13px] font-semibold shrink-0`}>
                  {p.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[14.5px] font-semibold truncate">{p.name}</div>
                  <div className="text-[12px] text-muted-foreground truncate">{p.contact}</div>
                </div>
                <StatusBadge status={p.status} />
              </div>
              <div className="mt-5 space-y-2">
                <div className="flex items-center justify-between text-[11.5px] text-muted-foreground">
                  <span>Progreso</span><span className="tabular-nums font-medium text-foreground">{p.progress}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-lavender rounded-full" style={{ width: `${p.progress}%` }} />
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-[11.5px]">
                <span className="text-muted-foreground">Entrega · {p.delivery}</span>
                <span className="font-medium">{p.budget}</span>
              </div>
            </Link>
            {p.siteUrl && (
              <div className="px-5 pb-4">
                <a
                  href={p.siteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-2 text-[12.5px] font-semibold hover:bg-emerald-500/20 transition-colors"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Sitio en vivo
                  <ExternalLink className="h-3.5 w-3.5 ml-auto" />
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
