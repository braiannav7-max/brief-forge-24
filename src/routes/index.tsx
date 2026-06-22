import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/brand/Logo";
import { ArrowRight, Play, Sparkles, FileText, FolderArchive, Layers, Check } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Client Portal — Transforma ideas en proyectos digitales" },
      { name: "description", content: "Plataforma premium para agencias y desarrolladores: briefings inteligentes, gestión documental y análisis con IA." },
    ],
  }),
  component: Landing,
});

const benefits = [
  { icon: FileText,     title: "Briefings inteligentes",  desc: "Formularios dinámicos que guían a tus clientes para obtener la información correcta." },
  { icon: Sparkles,     title: "Análisis con IA",          desc: "Nuestra inteligencia artificial analiza y transforma datos en estrategias accionables." },
  { icon: FolderArchive,title: "Gestión documental",       desc: "Centraliza archivos, recursos y entregables en un sistema organizado y seguro." },
  { icon: Layers,       title: "Blueprints automáticos",   desc: "Genera documentos técnicos y propuestas listas para presentar a tus clientes." },
];

const logos = ["Agencia Digital", "Studio Creativo", "Desarrollo Web", "Marketing Pro", "Brand Makers"];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 h-[68px] flex items-center">
          <Logo />
          <nav className="ml-12 hidden md:flex items-center gap-7 text-[13.5px] text-muted-foreground">
            <a href="#funciones" className="hover:text-foreground">Funciones</a>
            <a href="#beneficios" className="hover:text-foreground">Beneficios</a>
            <a href="#precios" className="hover:text-foreground">Precios</a>
            <a href="#recursos" className="hover:text-foreground">Recursos</a>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <Link to="/login" className="px-4 py-2 rounded-lg text-[13.5px] font-medium text-foreground hover:bg-muted">Iniciar sesión</Link>
            <Link to="/register" className="px-4 py-2 rounded-lg text-[13.5px] font-medium bg-primary text-primary-foreground hover:opacity-90 transition shadow-soft">
              Solicitar acceso
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[480px] w-[900px] rounded-full bg-gradient-to-b from-primary/10 via-lavender/8 to-transparent blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-24 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/60 border border-lavender/20 text-[11.5px] font-medium text-accent-foreground tracking-wide uppercase">
              <Sparkles className="h-3 w-3" /> Plataforma para agencias y desarrolladores
            </div>
            <h1 className="mt-6 text-5xl md:text-6xl font-extrabold tracking-tight text-balance leading-[1.05]">
              Transforma ideas en proyectos digitales <span className="bg-gradient-to-r from-primary to-lavender bg-clip-text text-transparent">perfectamente definidos.</span>
            </h1>
            <p className="mt-6 text-[15.5px] text-muted-foreground max-w-xl leading-relaxed">
              Centraliza clientes, archivos, estrategia e inteligencia artificial en un único lugar.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/dashboard" className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-primary text-primary-foreground text-[14px] font-medium hover:opacity-90 transition shadow-card">
                Solicitar acceso <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#funciones" className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-border bg-surface-elevated text-[14px] font-medium hover:bg-muted transition">
                <Play className="h-4 w-4" /> Ver demostración
              </a>
            </div>
            <div className="mt-10 flex items-center gap-6 text-[12px] text-muted-foreground">
              <div className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Sin tarjeta de crédito</div>
              <div className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Configuración en 2 minutos</div>
            </div>
          </div>

          {/* Mock device */}
          <div className="relative">
            <div className="absolute -inset-6 bg-gradient-to-br from-primary/15 to-lavender/15 rounded-3xl blur-2xl" />
            <DashboardMock />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="beneficios" className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance">
            Todo lo que necesitas para crear experiencias digitales excepcionales
          </h2>
        </div>
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {benefits.map((b) => (
            <div key={b.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft hover:shadow-card transition group">
              <div className="h-10 w-10 rounded-xl bg-accent/60 flex items-center justify-center text-accent-foreground group-hover:scale-105 transition">
                <b.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-[15px] font-semibold">{b.title}</h3>
              <p className="mt-2 text-[13px] text-muted-foreground leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Showcase */}
      <section id="funciones" className="mx-auto max-w-7xl px-6 pb-24">
        <div className="rounded-3xl border border-border bg-card p-3 shadow-elevated">
          <DashboardMock wide />
        </div>
      </section>

      {/* Logos */}
      <section className="border-y border-border/60 bg-surface">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <p className="text-[11px] tracking-[0.2em] text-muted-foreground text-center uppercase">Confiado por agencias y freelancers de todo el mundo</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-muted-foreground/80">
            {logos.map((l) => (
              <div key={l} className="flex items-center gap-2 text-[13.5px] font-medium">
                <div className="h-5 w-5 rounded-md border border-current opacity-60" /> {l}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[oklch(0.2_0.025_265)] text-[oklch(0.85_0.01_265)]">
        <div className="mx-auto max-w-7xl px-6 py-10 flex flex-wrap items-center gap-6">
          <Logo />
          <nav className="ml-auto flex items-center gap-7 text-[13px] text-white/70">
            <a href="#" className="hover:text-white">Privacidad</a>
            <a href="#" className="hover:text-white">Términos</a>
            <a href="#" className="hover:text-white">Soporte</a>
          </nav>
          <div className="w-full text-center text-[12px] text-white/50 pt-4 border-t border-white/10">
            © 2026 AI Client Portal. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}

function DashboardMock({ wide = false }: { wide?: boolean }) {
  return (
    <div className={`relative rounded-2xl border border-border bg-surface-elevated overflow-hidden shadow-card ${wide ? "" : "rotate-[1.5deg]"}`}>
      <div className="h-9 border-b border-border bg-surface flex items-center gap-1.5 px-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.7_0.18_25)]/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.8_0.15_85)]/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.7_0.15_150)]/70" />
        <div className="ml-3 text-[10.5px] text-muted-foreground">app.aiclientportal.com/dashboard</div>
      </div>
      <div className="grid grid-cols-[140px_1fr]">
        <div className="border-r border-border p-3 space-y-1.5 bg-surface/60">
          <div className="text-[10.5px] font-semibold mb-2">AI CLIENT PORTAL</div>
          {["Dashboard","Proyectos","Clientes","Briefings","IA","Documentos","Archivos"].map((l, i) => (
            <div key={l} className={`px-2 py-1.5 rounded-md text-[10.5px] ${i === 0 ? "bg-primary/10 text-primary" : "text-muted-foreground"}`}>{l}</div>
          ))}
        </div>
        <div className="p-4">
          <div className="text-[13px] font-semibold">Bienvenido, Braian.</div>
          <div className="text-[10.5px] text-muted-foreground">Gestiona proyectos y deja que la IA transforme ideas.</div>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {[
              { l: "Clientes", v: "24" },
              { l: "Proyectos", v: "12" },
              { l: "Revisión", v: "5" },
              { l: "Ingresos", v: "$24.5k" },
            ].map((k) => (
              <div key={k.l} className="rounded-lg border border-border p-2.5 bg-card">
                <div className="text-[9px] text-muted-foreground">{k.l}</div>
                <div className="text-[14px] font-bold mt-1">{k.v}</div>
              </div>
            ))}
          </div>
          <div className="mt-3 space-y-1.5">
            {["Restaurantes Del Mar","Innova Studio","Mueblería Estilo","Clínica Vitalis"].map((n, i) => (
              <div key={n} className="flex items-center gap-2 rounded-lg border border-border p-2 bg-card">
                <div className="h-5 w-5 rounded-full bg-gradient-to-br from-primary to-lavender" />
                <div className="text-[10.5px] flex-1 truncate">{n}</div>
                <div className="text-[9px] px-1.5 py-0.5 rounded-full bg-accent text-accent-foreground">{["Diseño","Briefing","Desarrollo","Testing"][i]}</div>
                <div className="w-16 h-1 rounded-full bg-muted overflow-hidden"><div className="h-full bg-primary" style={{ width: `${[60,30,75,90][i]}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
