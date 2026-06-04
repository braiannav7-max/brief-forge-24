import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, FolderKanban, Lightbulb, FolderArchive, Receipt,
  Calendar, MessageSquare, CheckSquare, Files, BarChart3,
  Brain, Sparkles, FileText, Map, MoreHorizontal, X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { cn } from "@/lib/utils";
import { useLang } from "@/lib/i18n";

type ValidTo = "/dashboard" | "/proyectos" | "/briefings" | "/archivos" | "/documentos" | "/ia";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function LinkItem({ to, label, icon: Icon, active, onClick }: { to: ValidTo; label: string; icon: LucideIcon; active: boolean; onClick?: () => void }) {
  return (
    <Link
      to={to}
      onClick={onClick}
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

function ProgressCircle({ value = 67, label, sub }: { value?: number; label: string; sub: string }) {
  const r = 24;
  const circ = 2 * Math.PI * r;
  const dash = (value / 100) * circ;

  return (
    <div className="mx-3 mb-3">
      <div className="rounded-xl bg-sidebar-accent/40 border border-sidebar-border p-4">
        <p className="text-[10px] font-semibold tracking-widest text-muted-foreground/50 uppercase mb-3">
          {label}
        </p>
        <div className="flex items-center gap-4">
          <svg width="60" height="60" viewBox="0 0 60 60">
            <circle cx="30" cy="30" r={r} fill="none" stroke="var(--color-border)" strokeWidth="4.5" />
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
            <text x="30" y="34" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--color-foreground)">
              {value}%
            </text>
          </svg>
          <div>
            <div className="text-[24px] font-bold leading-none text-foreground">{value}%</div>
            <div className="text-[11px] text-muted-foreground mt-1">{sub}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AppSidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { t } = useLang();

  const active = (to: string) =>
    to === "/dashboard" ? pathname === "/dashboard" : pathname === to || pathname.startsWith(to + "/");

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "h-screen w-[218px] shrink-0 border-r border-sidebar-border bg-sidebar flex flex-col",
          "transition-transform duration-300 ease-in-out",
          "fixed inset-y-0 left-0 z-50",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "md:sticky md:top-0 md:translate-x-0"
        )}
      >
        <div className="h-[64px] flex items-center px-4 border-b border-sidebar-border shrink-0">
          <Logo />
          <button
            onClick={onClose}
            className="ml-auto h-8 w-8 rounded-lg hover:bg-sidebar-accent flex items-center justify-center text-muted-foreground md:hidden"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5">
          <LinkItem to="/dashboard"  label={t.nav.dashboard}  icon={LayoutDashboard} active={active("/dashboard")} onClick={onClose} />
          <LinkItem to="/proyectos"  label={t.nav.projects}   icon={FolderKanban}    active={active("/proyectos")} onClick={onClose} />
          <LinkItem to="/briefings"  label={t.nav.briefings}  icon={Lightbulb}       active={active("/briefings")} onClick={onClose} />
          <LinkItem to="/archivos"   label={t.nav.files}      icon={FolderArchive}   active={active("/archivos")} onClick={onClose} />
          <BtnItem label={t.nav.budgets}   icon={Receipt} />
          <BtnItem label={t.nav.calendar}  icon={Calendar} />
          <BtnItem label={t.nav.messages}  icon={MessageSquare} />
          <BtnItem label={t.nav.tasks}     icon={CheckSquare} />
          <LinkItem to="/documentos" label={t.nav.documents}  icon={Files}           active={active("/documentos")} onClick={onClose} />
          <BtnItem label={t.nav.reports}   icon={BarChart3} />

          <SectionLabel>{t.nav.aiTools}</SectionLabel>

          <LinkItem to="/ia" label={t.nav.ai} icon={Brain} active={active("/ia")} onClick={onClose} />
          <BtnItem label={t.nav.aiSuggestions}   icon={Sparkles} />
          <BtnItem label={t.nav.briefGenerator}  icon={FileText} />
          <BtnItem label={t.nav.blueprints}      icon={Map} />
        </nav>

        <ProgressCircle value={67} label={t.nav.generalProgress} sub={t.nav.averageAdvance} />

        <div className="border-t border-sidebar-border p-3 shrink-0">
          <div className="flex items-center gap-3 rounded-lg p-2 hover:bg-sidebar-accent transition cursor-pointer">
            <div className="h-9 w-9 shrink-0 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-sm font-bold select-none">
              BS
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[13px] font-semibold truncate">Braian Stortz</div>
              <div className="text-[11px] text-muted-foreground truncate">Desenvolvedor Web</div>
            </div>
            <MoreHorizontal className="h-4 w-4 text-muted-foreground shrink-0" />
          </div>
        </div>
      </aside>
    </>
  );
}
