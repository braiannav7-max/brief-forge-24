import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Check, Copy, FileText } from "lucide-react";
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

function statusLabel(progress: number, submitted: boolean) {
  if (submitted) return { text: "Enviado", cls: "bg-success text-success-foreground" };
  if (progress > 0) return { text: "En progreso", cls: "bg-info text-info-foreground" };
  return { text: "Pendiente", cls: "bg-warning text-warning-foreground" };
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
      className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface-elevated px-3.5 py-2 text-[12.5px] font-medium hover:bg-muted"
    >
      {copied ? <Check className="h-3.5 w-3.5 text-success-foreground" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? "Link copiado" : "Copiar link"}
    </button>
  );
}

function Page() {
  const { briefings } = Route.useLoaderData();
  const byToken = new Map((briefings as BriefingData[]).map((b) => [b.token, b]));

  return (
    <div className="space-y-6 max-w-[1400px]">
      <div>
        <h1 className="text-[26px] font-bold tracking-tight">Briefings</h1>
        <p className="text-[13.5px] text-muted-foreground">
          Enviá a cada empresa su link privado. El avance se actualiza en tiempo real.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {companies.map((c) => {
          const data = byToken.get(c.token);
          const progress = data ? computeProgress(data.answers) : 0;
          const st = statusLabel(progress, data?.submitted ?? false);
          return (
            <div key={c.token} className="rounded-2xl border border-border bg-card p-5 shadow-soft hover:shadow-card transition">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-lavender flex items-center justify-center text-white font-semibold shrink-0">
                  {c.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <div className="text-[14px] font-semibold truncate">{c.name}</div>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium ${st.cls}`}>{st.text}</span>
                  </div>
                  <div className="text-[12px] text-muted-foreground mt-0.5">
                    {data?.updatedAt ? `Actualizado · ${new Date(data.updatedAt).toLocaleString("es-AR")}` : "Sin respuestas todavía"}
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-lavender" style={{ width: `${progress}%` }} />
                    </div>
                    <span className="text-[11.5px] text-muted-foreground tabular-nums">{progress}%</span>
                  </div>
                </div>
                <FileText className="h-5 w-5 text-muted-foreground shrink-0" />
              </div>

              <div className="mt-4 pt-4 border-t border-border flex items-center gap-2">
                <CopyLinkButton token={c.token} />
                <Link
                  to="/briefing/$token"
                  params={{ token: c.token }}
                  className="ml-auto inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-[12.5px] font-medium text-primary-foreground hover:opacity-90"
                >
                  Abrir briefing <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
