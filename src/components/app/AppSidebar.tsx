import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, FolderKanban, Lightbulb, FolderArchive, Receipt,
  Calendar, MessageSquare, CheckSquare, Files, BarChart3,
  Brain, Sparkles, FileText, Map, MoreHorizontal,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { cn } from "@/lib/utils";

type ValidTo = "/dashboard" | "/proyectos" | "/briefings" | "/archivos" | "/documentos" | "/ia";

function LinkItem({ to, label, icon: Icon, active }: { to: ValidTo; label: string; icon: LucideIcon; active: boolean }) {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium transition-all",
        active
          ? "bg-primary/10 text-primary"
          : "text-sidebar-foreground/65 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      )}
    >
      <Icon className="h-[17px] w-[17px] shrink-0" />
      <span>{label}</span>
      {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />}
    </Link>
  );
}

function BtnItem({ label, icon: Icon }: { label: string; icon: LucideIcon }) {
  return (
    <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium text-sidebar-foreground/45 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all">
      <Icon className="h-[17px] w-[17px] shrink-0" />
      <span>{label}</span>
    </button>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="pt-4 pb-1 px-3">
      <p className="text-[10px] font-semibold tracking-widest text-muted-foreground/50 uppercase">{children}</p>
    </div>
  );
}

function ProgressCircle({ value = 67 }: { value?: number }) {
  const r = 24;
  const circ = 2 * Math.PI * r;
  const dash = (value / 100) * circ;

  return (
    <div className="mx-3 mb-3">
      <div className="rounded-xl bg-sidebar-accent/40 border border-sidebar-border p-4">
        <p className="text-[10px] font-semibold tracking-widest text-muted-foreground/50 uppercase mb-3">
          Progreso general
        </p>
        <div className="flex items-center gap-4">
          <svg width="60" height="60" viewBox="0 0 60 60">
            <circle
              cx="30" cy="30" r={r}
              fill="none"
              stroke="var(--color-border)"
              strokeWidth="4.5"
            />
            <circle
              cx="30" cy="30" r={r}
              fill="none"
              stroke="url(#prog-grad)"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeDasharray={`${dash} ${circ}`}
              transform="rotate(-90, 30, 30)"
            />
            <defs>
              <linearGradient id="prog-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="oklch(0.46 0.18 266)" />
                <stop offset="100%" stopColor="oklch(0.72 0.12 290)" />
              </linearGradient>
            </defs>
            <text
              x="30" y="34"
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill="var(--color-foreground)"
            >
              {value}%
            </text>
          </svg>
          <div>
            <div className="text-[24px] font-bold leading-none text-foreground">{value}%</div>
            <div className="text-[11px] text-muted-foreground mt-1">Avance promedio</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const active = (to: string) =>
    to === "/dashboard" ? pathname === "/dashboard" : pathname === to || pathname.startsWith(to + "/");

  return (
    <aside className="sticky top-0 h-screen w-[218px] shrink-0 border-r border-sidebar-border bg-sidebar flex flex-col">
      <div className="h-[64px] flex items-center px-4 border-b border-sidebar-border shrink-0">
        <Logo />
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5">
        <LinkItem to="/dashboard"  label="Dashboard"        icon={LayoutDashboard} active={active("/dashboard")} />
        <LinkItem to="/proyectos"  label="Proyectos"        icon={FolderKanban}    active={active("/proyectos")} />
        <LinkItem to="/briefings"  label="Ideas & Briefings" icon={Lightbulb}      active={active("/briefings")} />
        <LinkItem to="/archivos"   label="Archivos"         icon={FolderArchive}   active={active("/archivos")} />
        <BtnItem label="Presupuestos" icon={Receipt} />
        <BtnItem label="Calendario"   icon={Calendar} />
        <BtnItem label="Mensajes"     icon={MessageSquare} />
        <BtnItem label="Tareas"       icon={CheckSquare} />
        <LinkItem to="/documentos" label="Documentos"      icon={Files}           active={active("/documentos")} />
        <BtnItem label="Reportes"     icon={BarChart3} />

        <SectionLabel>Herramientas IA</SectionLabel>

        <LinkItem to="/ia" label="Análisis Inteligente" icon={Brain}    active={active("/ia")} />
        <BtnItem label="Sugerencias IA"      icon={Sparkles} />
        <BtnItem label="Generador de Brief"  icon={FileText} />
        <BtnItem label="Blueprints"          icon={Map} />
      </nav>

      <ProgressCircle value={67} />

      <div className="border-t border-sidebar-border p-3 shrink-0">
        <div className="flex items-center gap-3 rounded-lg p-2 hover:bg-sidebar-accent transition cursor-pointer">
          <div className="h-9 w-9 shrink-0 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-sm font-bold select-none">
            BS
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[13px] font-semibold truncate">Braian Stortz</div>
            <div className="text-[11px] text-muted-foreground truncate">Desarrollador Web</div>
          </div>
          <MoreHorizontal className="h-4 w-4 text-muted-foreground shrink-0" />
        </div>
      </div>
    </aside>
  );
}
