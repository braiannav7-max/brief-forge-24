import { useState } from "react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import {
  LayoutDashboard, Building2, FolderKanban, Settings,
  TrendingUp, Activity, Briefcase,
} from "lucide-react";
import { StatusBadge, type ProjectStatus } from "@/components/app/Badge";
import { AdminGate } from "@/components/admin/AdminGate";
import { AdminPanel } from "@/components/admin/AdminPanel";
import { MetricCard } from "@/components/admin/MetricCard";
import { ResourceManager } from "@/components/admin/ResourceManager";
import { FormModal, type FieldDef } from "@/components/admin/FormModal";
import type { AdminSection, ResourceColumn } from "@/components/admin/types";
import type { Empresa, Proyecto } from "@/lib/admin-types";
import {
  getAdminMetricsFn,
  listEmpresasFn, createEmpresaFn, updateEmpresaFn, deleteEmpresaFn,
  listProyectosFn, createProyectoFn, updateProyectoFn, deleteProyectoFn,
} from "@/lib/api/admin.functions";

export const Route = createFileRoute("/_app/admin")({
  loader: async () => {
    const [metrics, empresas, proyectos] = await Promise.all([
      getAdminMetricsFn(),
      listEmpresasFn(),
      listProyectosFn(),
    ]);
    return { metrics, empresas, proyectos };
  },
  component: AdminPage,
});

// ─── Overview ───────────────────────────────────────────────────────────────
function OverviewSection({
  metrics,
  navigate,
}: {
  metrics: { empresas: number; proyectos: number; activos: number; progresoPromedio: number };
  navigate: (id: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
      <MetricCard icon={Building2}   color="indigo"  label="Empresas"          value={metrics.empresas}   onClick={() => navigate("empresas")} />
      <MetricCard icon={FolderKanban} color="violet" label="Proyectos"         value={metrics.proyectos}  onClick={() => navigate("proyectos")} />
      <MetricCard icon={Activity}    color="emerald" label="Proyectos activos" value={metrics.activos}    onClick={() => navigate("proyectos")} />
      <MetricCard icon={TrendingUp}  color="amber"   label="Progreso promedio" value={metrics.progresoPromedio + "%"} />
    </div>
  );
}

// ─── Empresas ─────────────────────────────────────────────────────────────────
const EMPRESA_FIELDS: FieldDef[] = [
  { name: "name", label: "Empresa", required: true, placeholder: "Nombre de la empresa" },
  { name: "contact", label: "Contacto", placeholder: "Persona de contacto" },
  { name: "email", label: "Email", type: "email", placeholder: "correo@empresa.com" },
  { name: "phone", label: "Teléfono", placeholder: "+55 ..." },
  { name: "status", label: "Estado", type: "select", options: [
    { value: "Activo", label: "Activo" }, { value: "Inactivo", label: "Inactivo" },
  ] },
];

function EmpresasSection({ rows }: { rows: Empresa[] }) {
  const router = useRouter();
  const [modal, setModal] = useState<{ row: Empresa | null } | null>(null);

  const columns: ResourceColumn<Empresa>[] = [
    { key: "name", label: "Empresa", render: (e) => <span className="font-medium">{e.name}</span> },
    { key: "contact", label: "Contacto" },
    { key: "email", label: "Email", render: (e) => <span className="text-muted-foreground">{e.email}</span> },
    { key: "phone", label: "Teléfono", render: (e) => <span className="text-muted-foreground">{e.phone}</span> },
    {
      key: "status",
      label: "Estado",
      render: (e) => (
        <span className={`rounded-full px-2 py-0.5 text-[11px] ${e.status === "Activo" ? "bg-emerald-500/10 text-emerald-400" : "bg-muted text-muted-foreground"}`}>
          {e.status}
        </span>
      ),
    },
  ];

  return (
    <>
      <ResourceManager
        title="Empresas"
        description="Listado de empresas y contactos — guardado en Supabase."
        createLabel="Nueva empresa"
        columns={columns}
        rows={rows}
        onCreate={() => setModal({ row: null })}
        onEdit={(e) => setModal({ row: e })}
        onDelete={async (e) => {
          if (!confirm(`¿Eliminar "${e.name}"?`)) return;
          await deleteEmpresaFn({ data: { id: e.id } });
          router.invalidate();
        }}
      />
      {modal && (
        <FormModal
          title={modal.row ? "Editar empresa" : "Nueva empresa"}
          fields={EMPRESA_FIELDS}
          initial={{
            name: modal.row?.name ?? "",
            contact: modal.row?.contact ?? "",
            email: modal.row?.email ?? "",
            phone: modal.row?.phone ?? "",
            status: modal.row?.status ?? "Activo",
          }}
          onClose={() => setModal(null)}
          onSubmit={async (v) => {
            if (modal.row) await updateEmpresaFn({ data: { id: modal.row.id, patch: v } });
            else await createEmpresaFn({ data: v });
            router.invalidate();
          }}
        />
      )}
    </>
  );
}

// ─── Proyectos ────────────────────────────────────────────────────────────────
const PROYECTO_FIELDS: FieldDef[] = [
  { name: "name", label: "Proyecto", required: true, placeholder: "Nombre del proyecto" },
  { name: "category", label: "Categoría", placeholder: "Rubro / tipo" },
  { name: "status", label: "Estado", type: "select", options: [
    { value: "Briefing", label: "Briefing" }, { value: "Planeación", label: "Planeación" },
    { value: "Diseño", label: "Diseño" }, { value: "Desarrollo", label: "Desarrollo" },
    { value: "Contenido", label: "Contenido" }, { value: "Finalizado", label: "Finalizado" },
  ] },
  { name: "progress", label: "Progreso (%)", type: "number", placeholder: "0-100" },
  { name: "budget", label: "Presupuesto", placeholder: "R$ ..." },
];

function ProyectosSection({ rows }: { rows: Proyecto[] }) {
  const router = useRouter();
  const [modal, setModal] = useState<{ row: Proyecto | null } | null>(null);

  const columns: ResourceColumn<Proyecto>[] = [
    { key: "name", label: "Proyecto", render: (p) => <span className="font-medium">{p.name}</span> },
    { key: "category", label: "Categoría", render: (p) => <span className="text-muted-foreground">{p.category}</span> },
    { key: "status", label: "Estado", render: (p) => <StatusBadge status={p.status as ProjectStatus} /> },
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
    <>
      <ResourceManager
        title="Proyectos"
        description="Todos los proyectos del workspace — guardado en Supabase."
        createLabel="Nuevo proyecto"
        columns={columns}
        rows={rows}
        onCreate={() => setModal({ row: null })}
        onEdit={(p) => setModal({ row: p })}
        onDelete={async (p) => {
          if (!confirm(`¿Eliminar "${p.name}"?`)) return;
          await deleteProyectoFn({ data: { id: p.id } });
          router.invalidate();
        }}
      />
      {modal && (
        <FormModal
          title={modal.row ? "Editar proyecto" : "Nuevo proyecto"}
          fields={PROYECTO_FIELDS}
          initial={{
            name: modal.row?.name ?? "",
            category: modal.row?.category ?? "",
            status: modal.row?.status ?? "Briefing",
            progress: String(modal.row?.progress ?? 0),
            budget: modal.row?.budget ?? "",
          }}
          onClose={() => setModal(null)}
          onSubmit={async (v) => {
            const patch = {
              name: v.name,
              category: v.category,
              status: v.status,
              progress: Math.max(0, Math.min(100, parseInt(v.progress || "0", 10) || 0)),
              budget: v.budget,
            };
            if (modal.row) await updateProyectoFn({ data: { id: modal.row.id, patch } });
            else await createProyectoFn({ data: patch });
            router.invalidate();
          }}
        />
      )}
    </>
  );
}

// ─── Configuración ────────────────────────────────────────────────────────────
function ConfigSection() {
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
  const { metrics, empresas, proyectos } = Route.useLoaderData();

  const sections: AdminSection[] = [
    { id: "overview",  label: "Resumen",       icon: LayoutDashboard, render: ({ navigate }) => <OverviewSection metrics={metrics} navigate={navigate} /> },
    { id: "empresas",  label: "Empresas",      icon: Building2,        render: () => <EmpresasSection rows={empresas} /> },
    { id: "proyectos", label: "Proyectos",     icon: Briefcase,        render: () => <ProyectosSection rows={proyectos} /> },
    { id: "config",    label: "Configuración", icon: Settings,         render: () => <ConfigSection /> },
  ];

  return (
    <AdminGate>
      <AdminPanel title="Panel de administración" subtitle="Gestión central del workspace · Supabase" sections={sections} />
    </AdminGate>
  );
}
