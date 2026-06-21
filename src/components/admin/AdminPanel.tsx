import { useState } from "react";
import type { AdminSection } from "./types";

/**
 * Shell del panel admin, config-driven. Vive dentro del layout `_app` (ya autenticado),
 * por eso no incluye gate de acceso: usa una sub-navegación por tabs.
 * Agregar un módulo al panel = agregar un item al array `sections`.
 * Patrón graduado de `bloques-react/dashboards/panel-admin` (Workspace-).
 */
export function AdminPanel({
  title,
  subtitle,
  sections,
}: {
  title: string;
  subtitle?: string;
  sections: AdminSection[];
}) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const active = sections.find((s) => s.id === activeId) ?? sections[0];

  return (
    <div className="space-y-6 max-w-[1400px]">
      <div>
        <h1 className="text-[26px] font-bold tracking-tight">{title}</h1>
        {subtitle && <p className="text-[13.5px] text-muted-foreground">{subtitle}</p>}
      </div>

      <nav className="flex flex-wrap gap-1.5 border-b border-border pb-px">
        {sections.map((s) => {
          const Icon = s.icon;
          const on = s.id === active?.id;
          return (
            <button
              key={s.id}
              onClick={() => setActiveId(s.id)}
              className={
                "inline-flex items-center gap-2 rounded-t-xl px-3.5 py-2.5 text-[13px] font-medium transition-colors " +
                (on
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50")
              }
            >
              <Icon className="h-4 w-4" />
              {s.label}
            </button>
          );
        })}
      </nav>

      <div>{active?.render({ navigate: setActiveId })}</div>
    </div>
  );
}
