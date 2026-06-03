import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, FolderKanban, Users, FileText,
  Sparkles, Files, FolderArchive, Settings, ChevronLeft, ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { cn } from "@/lib/utils";

const items = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/proyectos", label: "Proyectos", icon: FolderKanban },
  { to: "/clientes", label: "Clientes", icon: Users },
  { to: "/briefings", label: "Briefings", icon: FileText },
  { to: "/ia", label: "Inteligencia Artificial", icon: Sparkles },
  { to: "/documentos", label: "Documentos", icon: Files },
  { to: "/archivos", label: "Archivos", icon: FolderArchive },
  { to: "/configuracion", label: "Configuración", icon: Settings },
] as const;

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside
      className={cn(
        "sticky top-0 h-screen shrink-0 border-r border-sidebar-border bg-sidebar flex flex-col transition-[width] duration-300",
        collapsed ? "w-[76px]" : "w-[252px]"
      )}
    >
      <div className="h-[68px] flex items-center px-4 border-b border-sidebar-border">
        <Logo compact={collapsed} />
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {items.map((item) => {
          const active = pathname === item.to || (item.to !== "/dashboard" && pathname.startsWith(item.to));
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13.5px] font-medium transition-all",
                active
                  ? "bg-primary/8 text-primary"
                  : "text-sidebar-foreground/75 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <Icon className={cn("h-[18px] w-[18px] shrink-0", active && "text-primary")} />
              {!collapsed && <span className="truncate">{item.label}</span>}
              {!collapsed && active && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <div className="flex items-center gap-3 rounded-lg p-2 hover:bg-sidebar-accent transition">
          <div className="h-9 w-9 shrink-0 rounded-full bg-gradient-to-br from-primary to-lavender flex items-center justify-center text-primary-foreground text-sm font-semibold">
            BA
          </div>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <div className="text-[13px] font-semibold truncate">Braian Aranda</div>
              <div className="text-[11px] text-muted-foreground truncate">Administrador</div>
            </div>
          )}
        </div>
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="mt-2 w-full flex items-center justify-center gap-2 rounded-lg border border-sidebar-border bg-surface-elevated px-2 py-1.5 text-[11.5px] text-muted-foreground hover:text-foreground transition"
        >
          {collapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <><ChevronLeft className="h-3.5 w-3.5" /> Colapsar</>}
        </button>
      </div>
    </aside>
  );
}
