import { createFileRoute } from "@tanstack/react-router";
import { projects } from "@/lib/mock-data";
import { StatusBadge } from "@/components/app/Badge";

export const Route = createFileRoute("/_app/clientes")({
  component: Page,
});

function Page() {
  return (
    <div className="space-y-6 max-w-[1400px]">
      <div>
        <h1 className="text-[26px] font-bold tracking-tight">Clientes</h1>
        <p className="text-[13.5px] text-muted-foreground">Listado de empresas y contactos</p>
      </div>

      <div className="rounded-2xl border border-border bg-card shadow-soft overflow-hidden">
        <table className="w-full text-[13px]">
          <thead className="bg-muted/50 text-[11.5px] uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="text-left font-medium px-6 py-3">Empresa</th>
              <th className="text-left font-medium px-6 py-3">Contacto</th>
              <th className="text-left font-medium px-6 py-3">Email</th>
              <th className="text-left font-medium px-6 py-3">Proyectos</th>
              <th className="text-left font-medium px-6 py-3">Estado</th>
              <th className="text-left font-medium px-6 py-3">Última actividad</th>
              <th className="text-right font-medium px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {projects.map((p) => (
              <tr key={p.id} className="hover:bg-muted/30">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`h-8 w-8 rounded-lg bg-gradient-to-br ${p.accent} flex items-center justify-center text-white text-[11px] font-semibold`}>{p.initials}</div>
                    <span className="font-medium">{p.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">{p.contact}</td>
                <td className="px-6 py-4 text-muted-foreground">{p.email}</td>
                <td className="px-6 py-4 tabular-nums">{Math.floor(Math.random() * 3) + 1}</td>
                <td className="px-6 py-4"><StatusBadge status={p.status} /></td>
                <td className="px-6 py-4 text-muted-foreground">{p.updated}</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-[12px] font-medium text-primary hover:underline">Ver</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
