import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { projects, chat, roadmap } from "@/lib/mock-data";
import { StatusBadge } from "@/components/app/Badge";
import {
  ArrowLeft, Pencil, Check, Upload, Paperclip, Send,
  CheckCircle2, Circle, Loader2,
} from "lucide-react";

export const Route = createFileRoute("/_app/proyectos/$id")({
  loader: ({ params }) => {
    const project = projects.find((p) => p.id === params.id);
    if (!project) throw notFound();
    return { project };
  },
  errorComponent: ({ error }) => <div className="p-6 text-sm text-destructive">{error.message}</div>,
  notFoundComponent: () => <div className="p-6 text-sm">Proyecto no encontrado.</div>,
  component: Page,
});

const moduleSections = [
  { id: "general",  label: "Información general" },
  { id: "objetivos", label: "Objetivos" },
  { id: "identidad", label: "Identidad visual" },
  { id: "estructura", label: "Estructura del sitio" },
  { id: "marketing", label: "Marketing" },
  { id: "funcionalidades", label: "Funcionalidades" },
  { id: "comentarios", label: "Comentarios" },
];

const objetivos = ["Generar ventas", "Captar leads", "Reservas", "Branding", "Ecommerce", "Landing", "CRM", "SaaS", "Aplicación móvil", "Otro"];
const estructura = ["Inicio", "Nosotros", "Servicios", "Productos", "Galería", "Blog", "FAQ", "Testimonios", "Contacto", "WhatsApp", "Mapa", "Reservas", "Tienda online", "Área privada", "Panel cliente", "Chat IA", "Automatizaciones", "Otro"];

const iaInsights = [
  "Se detectó orientación a conversión.",
  "Se recomienda Landing con Video Hero.",
  "Faltan archivos de branding.",
  "Agregar sección de testimonios.",
  "Recomendada integración WhatsApp.",
];

function Page() {
  const { project } = Route.useLoaderData();
  return (
    <div className="space-y-6 max-w-[1500px]">
      <Link to="/proyectos" className="inline-flex items-center gap-2 text-[12.5px] text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Proyecto: {project.name}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_320px] gap-6">
        {/* LEFT */}
        <aside className="space-y-4">
          <div className="rounded-2xl border border-border bg-card shadow-soft p-5">
            <div className="flex items-center gap-3">
              <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${project.accent} flex items-center justify-center text-white font-semibold`}>{project.initials}</div>
              <div className="min-w-0">
                <div className="text-[14px] font-semibold truncate">{project.name}</div>
                <StatusBadge status={project.status} />
              </div>
            </div>
            <dl className="mt-5 space-y-3 text-[12.5px]">
              {[
                ["Contacto", project.contact],
                ["Email", project.email],
                ["Teléfono", project.phone],
                ["Presupuesto", project.budget],
                ["Inicio", project.start],
                ["Entrega", project.delivery],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-3 border-b border-border/70 pb-2 last:border-0">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="font-medium text-right truncate">{v}</dd>
                </div>
              ))}
            </dl>
            <button className="mt-5 w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-lg border border-border bg-surface-elevated text-[12.5px] font-medium hover:bg-muted">
              <Pencil className="h-3.5 w-3.5" /> Editar proyecto
            </button>
          </div>

          <nav className="rounded-2xl border border-border bg-card p-2 shadow-soft">
            {moduleSections.map((s, i) => (
              <a
                href={`#${s.id}`}
                key={s.id}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12.5px] transition ${i === 0 ? "bg-primary/8 text-primary font-medium" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
                {s.label}
              </a>
            ))}
          </nav>
        </aside>

        {/* CENTER */}
        <div className="space-y-5">
          <ModuleCard id="general" title="Información general">
            <Field label="Nombre comercial" value={project.name} />
            <Field label="Historia de la empresa" textarea value="Somos una cadena de restaurantes especializada en mariscos frescos y cocina mediterránea. Nacimos en 2010 con la misión de ofrecer experiencias gastronómicas únicas frente al mar." />
            <Field label="Misión" textarea value="Brindar experiencias gastronómicas únicas con ingredientes frescos y un servicio excepcional." />
            <Field label="Valores" value="Calidad, Pasión, Sostenibilidad, Innovación, Cercanía." />
            <Field label="Público objetivo" textarea value="Personas de 25 a 55 años que buscan experiencias gastronómicas de calidad en ambientes únicos." />
            <Field label="¿Cómo describirían la esencia de la marca?" textarea value="Fresca, elegante, acogedora y auténtica. Queremos que cada visita se sienta como una experiencia memorable." />
          </ModuleCard>

          <ModuleCard id="objetivos" title="Objetivos">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {objetivos.map((o, i) => (
                <Checkbox key={o} label={o} defaultChecked={[0, 2, 3].includes(i)} />
              ))}
            </div>
          </ModuleCard>

          <ModuleCard id="identidad" title="Identidad visual">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {["Logo", "Manual de marca", "Fotografías", "Videos", "Paleta de colores", "Referencias"].map((l) => (
                <button key={l} className="aspect-[5/3] rounded-xl border-2 border-dashed border-border bg-muted/30 hover:bg-muted/60 hover:border-primary/40 transition flex flex-col items-center justify-center gap-1.5 text-muted-foreground hover:text-foreground">
                  <Upload className="h-4 w-4" />
                  <span className="text-[11.5px] font-medium">{l}</span>
                </button>
              ))}
            </div>
          </ModuleCard>

          <ModuleCard id="estructura" title="Estructura del sitio">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {estructura.map((s, i) => <Checkbox key={s} label={s} defaultChecked={i < 7} />)}
            </div>
          </ModuleCard>

          <ModuleCard id="marketing" title="Marketing">
            <Field label="Dolor principal del cliente" textarea value="Pocas reservas online y baja visibilidad en buscadores locales." />
            <div className="grid sm:grid-cols-2 gap-3">
              <Field label="Público objetivo" value="25-55 años, foodies, turismo local" />
              <Field label="Competidores" value="La Marina, Puerto Azul, Costa Brava" />
              <Field label="Palabras clave" value="restaurante mariscos, cena romántica, reservas" />
              <Field label="Campañas activas" value="Instagram Ads, Google Local" />
              <Field label="Redes sociales" value="@delmar.restaurantes" />
            </div>
          </ModuleCard>

          <ModuleCard id="funcionalidades" title="Funcionalidades especiales">
            <textarea
              className="w-full min-h-[140px] rounded-lg border border-border bg-surface-elevated p-3 text-[13px] resize-y focus:outline-none focus:ring-2 focus:ring-ring/30"
              placeholder="Describe cualquier idea especial para este proyecto."
              defaultValue="Reservas en tiempo real con confirmación por WhatsApp, menú interactivo con maridajes sugeridos y sistema de fidelización por niveles."
            />
          </ModuleCard>

          <ModuleCard id="comentarios" title="Comentarios generales">
            <textarea
              className="w-full min-h-[160px] rounded-lg border border-border bg-surface-elevated p-3 text-[13px] resize-y focus:outline-none focus:ring-2 focus:ring-ring/30"
              placeholder="Escribe cualquier comentario adicional…"
            />
          </ModuleCard>

          {/* Documents + Chat + Roadmap row */}
          <div className="grid lg:grid-cols-3 gap-5">
            <DocsCard />
            <ChatCard />
            <RoadmapCard />
          </div>
        </div>

        {/* RIGHT — STICKY */}
        <aside className="space-y-4 lg:sticky lg:top-[88px] lg:self-start">
          <div className="rounded-2xl border border-border bg-card shadow-soft p-5">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-primary to-lavender flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-white" fill="currentColor"><path d="M12 2l2 6h6l-5 4 2 7-5-4-5 4 2-7-5-4h6z"/></svg>
              </div>
              <h3 className="text-[14px] font-semibold">Análisis IA</h3>
            </div>
            <ul className="mt-4 space-y-2.5">
              {iaInsights.map((t) => (
                <li key={t} className="flex items-start gap-2 text-[12.5px] leading-relaxed">
                  <span className="mt-0.5 h-4 w-4 rounded-full bg-success flex items-center justify-center shrink-0">
                    <Check className="h-2.5 w-2.5 text-success-foreground" />
                  </span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-card shadow-soft p-5">
            <h3 className="text-[14px] font-semibold">Resumen Ejecutivo</h3>
            <p className="mt-3 text-[12.5px] text-muted-foreground leading-relaxed">
              Restaurantes Del Mar es una marca orientada a experiencias premium en gastronomía marina.
              El objetivo principal es aumentar reservas online y fortalecer presencia digital con una
              identidad visual fresca y elegante.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card shadow-soft p-5">
            <h3 className="text-[14px] font-semibold">Compleción del proyecto</h3>
            <div className="mt-4 flex items-center gap-5">
              <CircularProgress value={78} />
              <div className="text-[12px] text-muted-foreground">
                <div>5 de 7 módulos completados</div>
                <div className="mt-1 text-[11px]">Faltan archivos de branding y comentarios.</div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function ModuleCard({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="rounded-2xl border border-border bg-card shadow-soft p-6 scroll-mt-24">
      <h3 className="text-[15px] font-semibold mb-5">{title}</h3>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Field({ label, value, textarea }: { label: string; value: string; textarea?: boolean }) {
  return (
    <div>
      <label className="block text-[11.5px] font-medium text-muted-foreground mb-1.5">{label}</label>
      {textarea ? (
        <textarea defaultValue={value} className="w-full min-h-[80px] rounded-lg border border-border bg-surface-elevated p-3 text-[13px] resize-y focus:outline-none focus:ring-2 focus:ring-ring/30" />
      ) : (
        <input defaultValue={value} className="w-full h-10 rounded-lg border border-border bg-surface-elevated px-3 text-[13px] focus:outline-none focus:ring-2 focus:ring-ring/30" />
      )}
    </div>
  );
}

function Checkbox({ label, defaultChecked }: { label: string; defaultChecked?: boolean }) {
  return (
    <label className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg border border-border bg-surface-elevated hover:bg-muted cursor-pointer transition">
      <input type="checkbox" defaultChecked={defaultChecked} className="h-4 w-4 rounded border-border accent-[oklch(0.46_0.18_266)]" />
      <span className="text-[12.5px]">{label}</span>
    </label>
  );
}

function CircularProgress({ value }: { value: number }) {
  const r = 30; const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <div className="relative h-20 w-20">
      <svg viewBox="0 0 80 80" className="-rotate-90">
        <circle cx="40" cy="40" r={r} stroke="oklch(0.92 0.008 270)" strokeWidth="7" fill="none" />
        <circle cx="40" cy="40" r={r} stroke="url(#pg)" strokeWidth="7" strokeLinecap="round" fill="none" strokeDasharray={c} strokeDashoffset={offset} />
        <defs>
          <linearGradient id="pg" x1="0" y1="0" x2="80" y2="80">
            <stop offset="0" stopColor="oklch(0.46 0.18 266)" />
            <stop offset="1" stopColor="oklch(0.72 0.12 290)" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-[15px] font-bold">{value}%</div>
    </div>
  );
}

function DocsCard() {
  const docs = ["Blueprint del Proyecto", "Resumen Ejecutivo", "Arquitectura Web", "SEO Inicial", "Propuesta Comercial"];
  return (
    <div className="rounded-2xl border border-border bg-card shadow-soft p-5">
      <h3 className="text-[14px] font-semibold mb-3">Documentos</h3>
      <ul className="divide-y divide-border">
        {docs.map((d) => (
          <li key={d} className="py-2.5 flex items-center gap-3">
            <div className="h-8 w-8 rounded-md bg-info flex items-center justify-center text-info-foreground text-[9px] font-bold">PDF</div>
            <div className="flex-1 min-w-0">
              <div className="text-[12.5px] font-medium truncate">{d}</div>
              <div className="text-[10.5px] text-muted-foreground">PDF · Generado el 15 May 2026</div>
            </div>
            <button className="text-[11.5px] text-primary font-medium hover:underline">Descargar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ChatCard() {
  return (
    <div className="rounded-2xl border border-border bg-card shadow-soft p-5 flex flex-col">
      <h3 className="text-[14px] font-semibold mb-3">Chat del proyecto</h3>
      <div className="space-y-3 flex-1 min-h-[260px]">
        {chat.map((m, i) => (
          <div key={i} className={`flex gap-2.5 ${m.me ? "" : ""}`}>
            <div className={`h-7 w-7 rounded-full shrink-0 flex items-center justify-center text-[10px] font-semibold text-white bg-gradient-to-br ${m.me ? "from-primary to-lavender" : "from-[oklch(0.7_0.13_200)] to-[oklch(0.55_0.15_220)]"}`}>
              {m.me ? "BA" : "C"}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2">
                <span className="text-[12px] font-semibold">{m.who}</span>
                <span className="text-[10.5px] text-muted-foreground">{m.time}</span>
              </div>
              <p className="text-[12.5px] text-muted-foreground leading-relaxed mt-0.5">{m.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2 rounded-lg border border-border bg-surface-elevated px-3 py-2">
        <input placeholder="Escribe un mensaje…" className="flex-1 bg-transparent text-[12.5px] focus:outline-none" />
        <button className="text-muted-foreground hover:text-foreground"><Paperclip className="h-4 w-4" /></button>
        <button className="text-primary"><Send className="h-4 w-4" /></button>
      </div>
    </div>
  );
}

function RoadmapCard() {
  return (
    <div className="rounded-2xl border border-border bg-card shadow-soft p-5">
      <h3 className="text-[14px] font-semibold mb-4">Roadmap del proyecto</h3>
      <ol className="space-y-3">
        {roadmap.map((r, i) => (
          <li key={r.label} className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              {r.status === "done" && <CheckCircle2 className="h-5 w-5 text-success-foreground" />}
              {r.status === "current" && <Loader2 className="h-5 w-5 text-primary animate-spin" />}
              {r.status === "todo" && <Circle className="h-5 w-5 text-muted-foreground/40" />}
              {i < 6 && <div className={`w-px flex-1 my-1 ${r.status === "done" ? "bg-success-foreground/30" : "bg-border"}`} style={{ minHeight: 14 }} />}
            </div>
            <div className="pb-2">
              <div className={`text-[12.5px] font-medium ${r.status === "current" ? "text-primary" : ""}`}>{r.label}</div>
              <div className="text-[11px] text-muted-foreground">{r.date}</div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
