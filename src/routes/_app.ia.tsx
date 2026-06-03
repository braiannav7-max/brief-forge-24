import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, ClipboardCheck, Lightbulb, FileCode2, Calculator } from "lucide-react";

export const Route = createFileRoute("/_app/ia")({
  component: Page,
});

const cards = [
  { icon: ClipboardCheck, title: "Auditor del Brief",      desc: "Detecta información faltante y te guía para completarla.", tone: "from-primary/10 to-primary/0" },
  { icon: Lightbulb,      title: "Consultor UX",            desc: "Sugiere estructura, funcionalidades y mejoras para tu proyecto.", tone: "from-lavender/15 to-lavender/0" },
  { icon: FileCode2,      title: "Generador de Blueprint",  desc: "Convierte respuestas en un documento técnico completo.", tone: "from-[oklch(0.7_0.12_160)]/15 to-transparent" },
  { icon: Calculator,     title: "Estimador Inteligente",   desc: "Calcula complejidad, tiempo y presupuesto del proyecto.", tone: "from-[oklch(0.75_0.13_60)]/15 to-transparent" },
];

function Page() {
  return (
    <div className="space-y-10 max-w-[1300px]">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-10 shadow-soft">
        <div className="absolute top-0 right-0 h-48 w-48 rounded-full bg-gradient-to-br from-primary/15 to-lavender/15 blur-3xl" />
        <div className="relative max-w-2xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-accent text-accent-foreground text-[11px] font-medium">
            <Sparkles className="h-3 w-3" /> Inteligencia Artificial
          </div>
          <h1 className="mt-4 text-[30px] font-bold tracking-tight leading-tight">
            La IA analiza cada briefing y transforma información dispersa en una estrategia digital clara.
          </h1>
          <p className="mt-3 text-[14px] text-muted-foreground max-w-xl">
            Cuatro módulos inteligentes trabajando en conjunto para acelerar el descubrimiento, diseño y planificación de cada proyecto.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {cards.map((c) => (
          <div key={c.title} className={`relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-soft hover:shadow-card transition`}>
            <div className={`absolute inset-0 bg-gradient-to-br ${c.tone} pointer-events-none`} />
            <div className="relative">
              <div className="h-11 w-11 rounded-xl bg-surface-elevated border border-border flex items-center justify-center text-primary">
                <c.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-[16px] font-semibold">{c.title}</h3>
              <p className="mt-1.5 text-[13px] text-muted-foreground leading-relaxed">{c.desc}</p>
              <button className="mt-5 text-[12.5px] text-primary font-medium hover:underline">Abrir módulo →</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
