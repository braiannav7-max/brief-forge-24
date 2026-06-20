import { useState } from "react";
import {
  LayoutDashboard,
  Newspaper,
  MessageSquare,
  Users,
  FolderArchive,
  Building2,
  CalendarClock,
  HeartHandshake,
  Calculator,
  UtensilsCrossed,
  CalendarCheck,
  ShoppingBag,
  Star,
  Megaphone,
  CalendarDays,
  BarChart3,
  Filter,
  BookOpen,
  Radio,
  LineChart,
  Boxes,
  ShoppingCart,
  Warehouse,
  Ticket,
  UserCheck,
  ClipboardList,
  FileText,
  Globe,
  FormInput,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { getVerticalProfile, inferVertical } from "@/lib/verticals";
import type { VerticalFeature, VerticalKey } from "@/lib/verticals";

// Resolver de iconos: los nombres del catálogo → componente lucide.
const ICONS: Record<string, LucideIcon> = {
  LayoutDashboard,
  Newspaper,
  MessageSquare,
  Users,
  FolderArchive,
  Building2,
  CalendarClock,
  HeartHandshake,
  Calculator,
  UtensilsCrossed,
  CalendarCheck,
  ShoppingBag,
  Star,
  Megaphone,
  CalendarDays,
  BarChart3,
  Filter,
  BookOpen,
  Radio,
  LineChart,
  Boxes,
  ShoppingCart,
  Warehouse,
  Ticket,
  UserCheck,
  ClipboardList,
  FileText,
  Globe,
  FormInput,
};

function iconOf(name: string): LucideIcon {
  return ICONS[name] ?? Sparkles;
}

/**
 * Renderiza las funcionalidades de un comercio según su vertical (rubro).
 * Desacoplado del tipo Comercio: acepta lo mínimo para inferir el rubro, así
 * la ruta /comercios/$id puede pasarle el comercio entero sin fricción.
 */
export function VerticalWorkspace({
  name,
  category,
  vertical,
}: {
  name: string;
  category?: string;
  vertical?: VerticalKey;
}) {
  const profile = getVerticalProfile(inferVertical({ name, category, vertical }));
  const all = [...profile.base, ...profile.specific];
  const [activeId, setActiveId] = useState(all[0]?.id ?? "");
  const active = all.find((f) => f.id === activeId) ?? all[0];

  return (
    <div className="space-y-5">
      {/* Cabecera del vertical */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary px-3 py-1 text-[12px] font-semibold">
            <Sparkles className="h-3.5 w-3.5" /> {profile.label}
          </span>
          <p className="text-[12.5px] text-muted-foreground">
            {profile.specific.length} funcionalidades propias del rubro
          </p>
        </div>
      </div>

      {/* Tabs de funcionalidades */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {all.map((f) => {
          const Icon = iconOf(f.icon);
          const isActive = f.id === active?.id;
          return (
            <button
              key={f.id}
              onClick={() => setActiveId(f.id)}
              className={cn(
                "inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-[12.5px] font-medium whitespace-nowrap transition-colors border",
                isActive
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-muted-foreground border-border hover:bg-muted",
              )}
            >
              <Icon className="h-4 w-4" />
              {f.label}
              {f.scope === "base" && (
                <span
                  className={cn(
                    "ml-0.5 rounded px-1 py-0.5 text-[9px] font-bold uppercase tracking-wide",
                    isActive ? "bg-white/20" : "bg-muted-foreground/15",
                  )}
                >
                  base
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Grilla completa de funcionalidades */}
      <FeatureGroup
        title="Base (todos los comercios)"
        features={profile.base}
        activeId={active?.id}
        onPick={setActiveId}
      />
      <FeatureGroup
        title={`Específicas de ${profile.label}`}
        features={profile.specific}
        activeId={active?.id}
        onPick={setActiveId}
      />

      {/* Panel de la funcionalidad activa */}
      {active && <FeaturePanel feature={active} comercio={name} />}
    </div>
  );
}

function FeatureGroup({
  title,
  features,
  activeId,
  onPick,
}: {
  title: string;
  features: VerticalFeature[];
  activeId?: string;
  onPick: (id: string) => void;
}) {
  if (features.length === 0) return null;
  return (
    <div>
      <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60 mb-2.5">
        {title}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {features.map((f) => {
          const Icon = iconOf(f.icon);
          return (
            <button
              key={f.id}
              onClick={() => onPick(f.id)}
              className={cn(
                "text-left rounded-2xl border bg-card p-4 shadow-soft transition-all hover:shadow-elevated hover:border-primary/30",
                f.id === activeId ? "border-primary/50 ring-1 ring-primary/20" : "border-border",
              )}
            >
              <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3">
                <Icon className="h-5 w-5" />
              </div>
              <p className="text-[13.5px] font-semibold">{f.label}</p>
              <p className="text-[12px] text-muted-foreground mt-1 leading-relaxed">
                {f.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function FeaturePanel({ feature, comercio }: { feature: VerticalFeature; comercio: string }) {
  const Icon = iconOf(feature.icon);
  return (
    <div className="rounded-2xl border border-border bg-surface-elevated p-5 shadow-soft">
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
          <Icon className="h-6 w-6" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-bold">{feature.label}</p>
          <p className="text-[12.5px] text-muted-foreground mt-0.5">
            {feature.description} · {comercio}
          </p>
        </div>
        <button className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-[12.5px] font-semibold text-primary-foreground hover:opacity-90 transition-opacity shrink-0">
          Abrir <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
