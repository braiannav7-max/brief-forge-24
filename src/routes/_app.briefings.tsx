import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Check, Copy, FileText, Send, Clock, CheckCircle2, Circle } from "lucide-react";
import { companies } from "@/lib/companies";
import { listBriefingsFn } from "@/lib/api/briefings.functions";
import { computeProgress } from "@/lib/briefing-progress";
import type { BriefingData } from "@/lib/briefing-types";

export const Route = createFileRoute("/_app/briefings")({
  loader: async () => {
    const briefings = await listBriefingsFn();
    return { briefings };
  },
  component: Page,
});

const companyMeta: Record<string, { logoClass: string; gradientFrom: string; coverImage: string }> = {
  "bah-gastronomia": {
    logoClass: "bg-red-600 text-white",
    gradientFrom: "from-red-950/80",
    coverImage: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=75",
  },
  "movida-buzios": {
    logoClass: "bg-black text-amber-300 ring-1 ring-amber-400/40",
    gradientFrom: "from-violet-950/80",
    coverImage: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=800&q=75",
  },
  "silk-beach-club": {
    logoClass: "bg-white text-slate-900",
    gradientFrom: "from-sky-950/80",
    coverImage: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=75",
  },
  "buda-beach-buzios": {
    logoClass: "bg-white text-orange-900",
    gradientFrom: "from-amber-950/80",
    coverImage: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=75",
  },
  "buzios-gastro-group": {
    logoClass: "bg-black text-white ring-1 ring-white/20",
    gradientFrom: "from-slate-950/80",
    coverImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=75",
  },
  "mondo-khan": {
    logoClass: "bg-zinc-950 text-white ring-1 ring-white/20",
    gradientFrom: "from-zinc-950/80",
    coverImage: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=800&q=75",
  },
};

function statusInfo(progress: number, submitted: boolean) {
  if (submitted)  return { text: "Enviado",     cls: "bg-emerald-500/10 text-emerald-400", Icon: CheckCircle2 };
  if (progress > 0) return { text: "En progreso", cls: "bg-indigo-500/10 text-indigo-400",   Icon: Clock };
  return               { text: "Pendiente",    cls: "bg-amber-500/10 text-amber-400",    Icon: Circle };
}

function CopyLinkButton({ token }: { token: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    const url = `${window.location.origin}/briefing/${token}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };
  return (
    <button
      onClick={copy}
      className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-border bg-muted/50 px-3 py-2 text-[12px] font-medium hover:bg-muted transition-colors"
    >
      {copied
        ? <><Check className="h-3.5 w-3.5 text-emerald-400" /> Copiado</>
        : <><Copy className="h-3.5 w-3.5" /> Copiar link</>
      }
    </button>
  );
}

function Page() {
  const { briefings } = Route.useLoaderData();
  const byToken = new Map((briefings as BriefingData[]).map((b) => [b.token, b]));

  const totalEnviados   = (briefings as BriefingData[]).filter((b) => b.submitted).length;
  const totalEnProgreso = (briefings as BriefingData[]).filter((b) => !b.submitted && computeProgress(b.answers) > 0).length;
  const totalPendientes = companies.length - totalEnviados - totalEnProgreso;

  return (
    <div className="space-y-6 max-w-[1400px]">

      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-[26px] font-bold tracking-tight">Ideas & Briefings</h1>
          <p className="text-[13.5px] text-muted-foreground mt-1">
            Enviá a cada empresa su link privado. El avance se actualiza en tiempo real.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-[13px] font-semibold text-primary-foreground hover:opacity-90 transition-opacity shrink-0">
          <Send className="h-4 w-4" />
          Enviar todos los links
        </button>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-2xl border border-border bg-card p-4 flex items-center gap-3 shadow-soft">
          <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <FileText className="h-[18px] w-[18px] text-primary" />
          </div>
          <div>
            <p className="text-[12px] text-muted-foreground">Total</p>
            <p className="text-[22px] font-bold leading-tight">{companies.length}</p>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 flex items-center gap-3 shadow-soft">
          <div className="h-9 w-9 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
            <CheckCircle2 className="h-[18px] w-[18px] text-emerald-400" />
          </div>
          <div>
            <p className="text-[12px] text-muted-foreground">Enviados</p>
            <p className="text-[22px] font-bold leading-tight text-emerald-400">{totalEnviados}</p>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 flex items-center gap-3 shadow-soft">
          <div className="h-9 w-9 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
            <Clock className="h-[18px] w-[18px] text-amber-400" />
          </div>
          <div>
            <p className="text-[12px] text-muted-foreground">Pendientes</p>
            <p className="text-[22px] font-bold leading-tight text-amber-400">{totalPendientes + totalEnProgreso}</p>
          </div>
        </div>
      </div>

      {/* Company cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {companies.map((c) => {
          const data      = byToken.get(c.token);
          const progress  = data ? computeProgress(data.answers) : 0;
          const st        = statusInfo(progress, data?.submitted ?? false);
          const meta      = companyMeta[c.slug] ?? {
            logoClass: "bg-primary/20 text-primary",
            gradientFrom: "from-primary/20",
            coverImage: "",
          };
          const StIcon = st.Icon;

          return (
            <div
              key={c.token}
              className="rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/30 hover:shadow-elevated transition-all duration-200 group flex flex-col"
            >
              {/* Cover header */}
              <div className="relative h-[88px] overflow-hidden">
                {meta.coverImage && (
                  <img
                    src={meta.coverImage}
                    alt={c.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 group-hover:scale-105 transition-all duration-500"
                  />
                )}
                <div className={`absolute inset-0 bg-gradient-to-br ${meta.gradientFrom} to-black/60`} />
                <div className="absolute bottom-0 left-0 right-0 p-3.5 flex items-end gap-3">
                  <div className={`h-11 w-11 rounded-xl ${meta.logoClass} flex items-center justify-center text-[11px] font-black shrink-0 ring-2 ring-white/10 shadow-lg`}>
                    {c.initials}
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 flex-1 flex flex-col gap-3">
                {/* Name + status */}
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="text-[14px] font-semibold leading-tight truncate">{c.name}</h3>
                    <p className="text-[11.5px] text-muted-foreground mt-0.5 line-clamp-1">{c.tagline}</p>
                  </div>
                  <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10.5px] font-semibold shrink-0 ${st.cls}`}>
                    <StIcon className="h-3 w-3" />
                    {st.text}
                  </span>
                </div>

                {/* Progress */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-muted-foreground">Progreso del briefing</span>
                    <span className="text-[12px] font-bold tabular-nums">{progress}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-lavender rounded-full transition-all duration-700"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Last update */}
                <p className="text-[11px] text-muted-foreground/60">
                  {data?.updatedAt
                    ? `Actualizado · ${new Date(data.updatedAt).toLocaleString("es-AR")}`
                    : "Sin respuestas todavía"}
                </p>

                {/* Actions */}
                <div className="flex items-center gap-2 mt-auto pt-1">
                  <CopyLinkButton token={c.token} />
                  <Link
                    to="/briefing/$token"
                    params={{ token: c.token }}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary px-3 py-2 text-[12px] font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
                  >
                    Abrir <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
