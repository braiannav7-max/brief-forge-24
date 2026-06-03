import { createFileRoute, Link } from "@tanstack/react-router";
import { projects } from "@/lib/mock-data";
import { StatusBadge } from "@/components/app/Badge";
import { FileText } from "lucide-react";

export const Route = createFileRoute("/_app/briefings")({
  component: Page,
});

function Page() {
  return (
    <div className="space-y-6 max-w-[1400px]">
      <div>
        <h1 className="text-[26px] font-bold tracking-tight">Briefings</h1>
        <p className="text-[13.5px] text-muted-foreground">Formularios inteligentes recibidos de tus clientes</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((p) => (
          <Link to="/proyectos/$id" params={{ id: p.id }} key={p.id} className="rounded-2xl border border-border bg-card p-5 shadow-soft hover:shadow-card transition flex items-center gap-4">
            <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${p.accent} flex items-center justify-center text-white font-semibold`}>{p.initials}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <div className="text-[14px] font-semibold truncate">{p.name}</div>
                <StatusBadge status={p.status} />
              </div>
              <div className="text-[12px] text-muted-foreground mt-0.5">Briefing actualizado · {p.updated}</div>
              <div className="mt-3 h-1.5 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-lavender" style={{ width: `${p.progress}%` }} />
              </div>
            </div>
            <FileText className="h-5 w-5 text-muted-foreground" />
          </Link>
        ))}
      </div>
    </div>
  );
}
