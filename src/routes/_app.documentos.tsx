import { createFileRoute } from "@tanstack/react-router";
import { documents } from "@/lib/mock-data";
import { Download, FileText } from "lucide-react";

export const Route = createFileRoute("/_app/documentos")({
  component: Page,
});

function Page() {
  return (
    <div className="space-y-6 max-w-[1300px]">
      <div>
        <h1 className="text-[26px] font-bold tracking-tight">Documentos</h1>
        <p className="text-[13.5px] text-muted-foreground">Documentos generados automáticamente por la IA</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.map((d) => (
          <div key={d.name} className="rounded-2xl border border-border bg-card p-5 shadow-soft hover:shadow-card transition group">
            <div className="flex items-start gap-3">
              <div className="h-11 w-11 rounded-xl bg-info flex items-center justify-center text-info-foreground"><FileText className="h-5 w-5" /></div>
              <div className="min-w-0 flex-1">
                <div className="text-[14px] font-semibold truncate">{d.name}</div>
                <div className="text-[11.5px] text-muted-foreground mt-0.5">PDF · {d.size} · {d.date}</div>
              </div>
            </div>
            <button className="mt-5 w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-lg bg-primary text-primary-foreground text-[12.5px] font-medium hover:opacity-90">
              <Download className="h-3.5 w-3.5" /> Descargar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
