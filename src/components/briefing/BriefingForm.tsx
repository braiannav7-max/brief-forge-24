import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowLeft, ArrowRight, Building2, Check, CheckCircle2, Cloud, CloudOff,
  FileText, LayoutGrid, Lightbulb, Link as LinkIcon, Loader2, MessageSquare,
  Palette, Plug, Send, Sparkles, Target, TrendingUp,
} from "lucide-react";
import { briefingSchema } from "@/lib/briefing-schema";
import { computeProgress, isAnswered } from "@/lib/briefing-progress";
import type { FieldValue } from "@/lib/briefing-types";
import type { Company } from "@/lib/companies";
import { saveBriefingFn } from "@/lib/api/briefings.functions";
import { FieldRenderer } from "./FieldRenderer";
import { useLang } from "@/lib/i18n";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2, Target, Link: LinkIcon, Palette, LayoutGrid, Sparkles,
  FileText, TrendingUp, Plug, Lightbulb, MessageSquare,
};

type SaveState = "idle" | "saving" | "saved" | "error";

export function BriefingForm({
  company,
  initialAnswers,
  initialSubmitted,
}: {
  company: Pick<Company, "name" | "token" | "initials">;
  initialAnswers: Record<string, FieldValue>;
  initialSubmitted: boolean;
}) {
  const [answers, setAnswers] = useState(initialAnswers);
  const [current, setCurrent] = useState(0);
  const [submitted, setSubmitted] = useState(initialSubmitted);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { t } = useLang();
  const f = t.form;

  const progress = computeProgress(answers);
  const section = briefingSchema[current];
  const isLast = current === briefingSchema.length - 1;

  type SectionKey = keyof typeof f.sections;
  const sectionT = (id: string) => f.sections[id as SectionKey] ?? { title: id, description: "" };
  const fieldT = (sectionId: string, fieldId: string) => {
    const key = `${sectionId}.${fieldId}` as keyof typeof f.fields;
    return f.fields[key] ?? { label: fieldId, help: "" };
  };

  const persist = useCallback(
    async (next: Record<string, FieldValue>, markSubmitted?: boolean) => {
      setSaveState("saving");
      try {
        await saveBriefingFn({ data: { token: company.token, answers: next, submitted: markSubmitted } });
        setSaveState("saved");
      } catch {
        setSaveState("error");
      }
    },
    [company.token],
  );

  const update = (key: string, value: FieldValue) => {
    setAnswers((prev) => {
      const next = { ...prev, [key]: value };
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => persist(next), 800);
      return next;
    });
  };

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const sectionDone = (idx: number) =>
    briefingSchema[idx].fields.every((f) => isAnswered(answers[`${briefingSchema[idx].id}.${f.id}`]));

  const handleSubmit = async () => {
    if (timer.current) clearTimeout(timer.current);
    await persist(answers, true);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // -------- Pantalla final --------
  if (submitted) {
    return (
      <div className="mx-auto flex min-h-screen w-full max-w-2xl flex-col items-center justify-center px-6 text-center">
        <div className="grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-primary to-lavender shadow-elevated animate-in zoom-in duration-300">
          <CheckCircle2 className="h-10 w-10 text-white" />
        </div>
        <h1 className="mt-8 text-3xl font-bold tracking-tight">{f.received}</h1>
        <p className="mt-3 max-w-md text-[14.5px] text-muted-foreground leading-relaxed">
          {f.receivedSub.replace("{name}", company.name)}
        </p>
        <button onClick={() => setSubmitted(false)} className="mt-8 rounded-lg border border-border bg-card px-5 py-2.5 text-[13.5px] font-medium hover:bg-muted">
          {f.editAnswers}
        </button>
      </div>
    );
  }

  const saveMap = {
    idle:   { Icon: Cloud,    text: f.saveIdle,  cls: "text-muted-foreground" },
    saving: { Icon: Loader2,  text: f.saving,    cls: "text-muted-foreground" },
    saved:  { Icon: Check,    text: f.saved,     cls: "text-success-foreground" },
    error:  { Icon: CloudOff, text: f.unsaved,   cls: "text-destructive" },
  }[saveState];

  return (
    <div className="mx-auto w-full max-w-6xl px-6 pb-24">
      {/* Top */}
      <header className="flex items-center justify-between py-6">
        <div className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-primary to-lavender text-[13px] font-bold text-white">
            {company.initials}
          </span>
          <span className="text-[14px] font-semibold tracking-tight">{company.name}</span>
        </div>
        <span className={`inline-flex items-center gap-1.5 text-[12px] ${saveMap.cls}`}>
          <saveMap.Icon className={`h-3.5 w-3.5 ${saveState === "saving" ? "animate-spin" : ""}`} />
          {saveMap.text}
        </span>
      </header>

      {/* Cabecera + progreso */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Briefing <span className="text-muted-foreground">· {company.name}</span>
        </h1>
        <div className="mt-4 flex items-center gap-3">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-gradient-to-r from-primary to-lavender transition-all" style={{ width: `${progress}%` }} />
          </div>
          <span className="text-[13px] font-medium text-muted-foreground tabular-nums">{progress}%</span>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        {/* Nav secciones */}
        <nav className="hidden lg:block">
          <ul className="sticky top-6 space-y-1">
            {briefingSchema.map((s, i) => {
              const Icon = ICONS[s.icon] ?? FileText;
              const active = i === current;
              const done = sectionDone(i);
              return (
                <li key={s.id}>
                  <button
                    onClick={() => setCurrent(i)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-[13px] transition ${
                      active ? "bg-card shadow-soft text-foreground" : "text-muted-foreground hover:bg-card/60"
                    }`}
                  >
                    <span className={`grid h-6 w-6 flex-none place-items-center rounded-md ${
                      done ? "bg-success text-success-foreground" : active ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                    }`}>
                      {done ? <Check className="h-3.5 w-3.5" /> : <Icon className="h-3.5 w-3.5" />}
                    </span>
                    <span className="truncate">{sectionT(s.id).title}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Sección actual */}
        <div>
          <section key={section.id} className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-primary">
              {f.sectionOf.replace("{cur}", String(current + 1)).replace("{tot}", String(briefingSchema.length))}
            </p>
            <h2 className="mt-2 text-xl font-bold tracking-tight">{sectionT(section.id).title}</h2>
            {section.description && <p className="mt-1.5 text-[13.5px] text-muted-foreground">{sectionT(section.id).description}</p>}

            <div className="mt-8 space-y-7">
              {section.fields.map((field) => {
                const ft = fieldT(section.id, field.id);
                return (
                  <div key={field.id}>
                    <label className="mb-2 block text-[13.5px] font-medium">{ft.label || field.label}</label>
                    {(ft.help || field.help) && <p className="-mt-1 mb-2 text-[12px] text-muted-foreground">{ft.help || field.help}</p>}
                    <FieldRenderer field={field} value={answers[`${section.id}.${field.id}`]} onChange={(v) => update(`${section.id}.${field.id}`, v)} />
                  </div>
                );
              })}
            </div>
          </section>

          {/* Nav inferior */}
          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={() => setCurrent((c) => Math.max(0, c - 1))}
              disabled={current === 0}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 text-[13.5px] font-medium hover:bg-muted disabled:opacity-40"
            >
              <ArrowLeft className="h-4 w-4" /> {f.previous}
            </button>

            {isLast ? (
              <button onClick={handleSubmit} className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-[13.5px] font-semibold text-primary-foreground hover:opacity-90 shadow-soft">
                {f.submitFinish} <Send className="h-4 w-4" />
              </button>
            ) : (
              <button onClick={() => setCurrent((c) => Math.min(briefingSchema.length - 1, c + 1))} className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-[13.5px] font-semibold text-primary-foreground hover:opacity-90 shadow-soft">
                {f.next} <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
