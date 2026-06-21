import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  LayoutDashboard, Building2, FolderKanban, Settings,
  TrendingUp, Lightbulb, FolderArchive, Receipt,
} from "lucide-react";
import { projects, kpis, type Project } from "@/lib/mock-data";
import { StatusBadge } from "@/components/app/Badge";
import { AdminGate } from "@/components/admin/AdminGate";
import { AdminPanel } from "@/components/admin/AdminPanel";
import { MetricCard } from "@/components/admin/MetricCard";
import { ResourceManager } from "@/components/admin/ResourceManager";
import type { AdminSection, ResourceColumn } from "@/components/admin/types";

export const Route = createFileRoute("/_app/admin")({
  component: AdminPage,
});

// ─── Overview ───────────────────────────────────────────────────────────────
const METRIC_VISUALS = [
  { icon: Building2,     color: "indigo"  as const },
  { icon: FolderKanban,  color: "violet"  as const },
  { icon: Lightbulb,     color: "emerald" as const },
  { icon: FolderArchive, color: "sky"     as const },
  { icon: Receipt,       color: "amber"   as const },
  { icon: TrendingUp,    color: "violet"  as const },
];

function OverviewSection({ navigate }: { navigate: (id: string) => void }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
      {kpis.map((k, i) => {
        const v = METRIC_VISUALS[i] ?? METRIC_VISUALS[0];
        const onClick =
          i === 0 ? () => navigate("empresas") : i === 1 ? () => navigate("proyectos") : undefined;
        return (
          <MetricCard
            key={k.label}
            icon={v.icon}
            color={v.color}
            label={k.label}
            value={k.value}
            delta={k.delta}
            onClick={onClick}
          />
        );
      })}
    </div>
  );
}

// ─── Empresas (clientes) ──────────────────────────────────────────────────────
function EmpresasSection() {
  const [rows, setRows] = useState<Project[]>(projects);
  const columns: ResourceColumn<Project>[] = [
    {
      key: "name",
      label: "Empresa",
      render: (p) => (
        <div className="flex items-center gap-3">
          <div className={`h-8 w-8 rounded-lg bg-gradient-to-br ${p.accent} flex items-center justify-center text-white text-[11px] font-semibold`}>
            {p.initials}
          </div>
          <span className="font-medium">{p.name}</span>
        </div>
      ),
    },
    { key: "contact", label: "Contacto" },
    { key: "email", label: "Email", render: (p) => <span className="text-muted-foreground">{p.email}</span> },
    { key: "status", label: "Estado", render: (p) => <StatusBadge status={p.status} /> },
    { key: "updated", label: "Última actividad", render: (p) => <span className="text-muted-foreground">{p.updated}</span> },
  ];
  return (
    <ResourceManager
      title="Empresas"
      description="Listado de empresas y contactos."
      createLabel="Nueva empresa"
      columns={columns}
      rows={rows}
      onCreate={() => alert("Abrir alta de empresa")}
      onEdit={(p) => alert(`Editar ${p.name}`)}
      onDelete={(p) => setRows((prev) => prev.filter((x) => x.id !== p.id))}
    />
  );
}

// ─── Proyectos ────────────────────────────────────────────────────────────────
function ProyectosSection() {
  const [rows, setRows] = useState<Project[]>(projects);
  const columns: ResourceColumn<Project>[] = [
    { key: "name", label: "Proyecto", render: (p) => <span className="font-medium">{p.name}</span> },
    { key: "category", label: "Categoría", render: (p) => <span className="text-muted-foreground">{p.category}</span> },
    { key: "status", label: "Estado", render: (p) => <StatusBadge status={p.status} /> },
    {
      key: "progress",
      label: "Progreso",
      render: (p) => (
        <div className="flex items-center gap-2 min-w-[120px]">
          <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary to-lavender rounded-full" style={{ width: p.progress + "%" }} />
          </div>
          <span className="text-[12px] font-semibold tabular-nums shrink-0">{p.progress}%</span>
        </div>
      ),
    },
    { key: "budget", label: "Presupuesto", align: "right" },
  ];
  return (
    <ResourceManager
      title="Proyectos"
      description="Todos los proyectos del workspace."
      createLabel="Nuevo proyecto"
      columns={columns}
      rows={rows}
      onCreate={() => alert("Abrir alta de proyecto")}
      onEdit={(p) => alert(`Editar ${p.name}`)}
      onDelete={(p) => setRows((prev) => prev.filter((x) => x.id !== p.id))}
    />
  );
}

// ─── Configuración ────────────────────────────────────────────────────────────
function ConfigSection() {
  const fields = [
    ["Nombre", "Braian Aranda"],
    ["Email", "braian@aiclientportal.com"],
    ["Empresa", "AI Client Portal"],
    ["Rol", "Administrador"],
  ];
  const prefs: [string, boolean][] = [
    ["Notificaciones por email", true],
    ["Resúmenes semanales con IA", true],
    ["Modo oscuro automático", false],
  ];
  return (
    <div className="space-y-6 max-w-[900px]">
      <div className="rounded-2xl border border-border bg-card shadow-soft p-6 space-y-5">
        <h3 className="text-[15px] font-semibold">Perfil</h3>
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-lavender flex items-center justify-center text-primary-foreground font-semibold">BA</div>
          <div>
            <div className="text-[14px] font-medium">Braian Aranda</div>
            <div className="text-[12px] text-muted-foreground">Administrador del workspace</div>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 pt-2">
          {fields.map(([label, value]) => (
            <div key={label}>
              <label className="text-[11.5px] text-muted-foreground">{label}</label>
              <div className="mt-1 rounded-xl border border-border bg-background px-3.5 py-2.5 text-[13px]">{value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card shadow-soft p-6 space-y-4">
        <h3 className="text-[15px] font-semibold">Preferencias</h3>
        {prefs.map(([label, on]) => (
          <div key={label} className="flex items-center justify-between py-2 border-t border-border first:border-0 first:pt-0">
            <span className="text-[13px]">{label}</span>
            <span className={`h-6 w-10 rounded-full relative transition ${on ? "bg-primary" : "bg-muted"}`}>
              <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${on ? "left-[18px]" : "left-0.5"}`} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
function AdminPage() {
  const sections: AdminSection[] = [
    { id: "overview",  label: "Resumen",       icon: LayoutDashboard, render: ({ navigate }) => <OverviewSection navigate={navigate} /> },
    { id: "empresas",  label: "Empresas",      icon: Building2,        render: () => <EmpresasSection /> },
    { id: "proyectos", label: "Proyectos",     icon: FolderKanban,     render: () => <ProyectosSection /> },
    { id: "config",    label: "Configuración", icon: Settings,         render: () => <ConfigSection /> },
  ];
  return (
    <AdminGate>
      <AdminPanel title="Panel de administración" subtitle="Gestión central del workspace" sections={sections} />
    </AdminGate>
  );
}
