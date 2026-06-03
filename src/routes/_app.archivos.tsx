import { createFileRoute } from "@tanstack/react-router";
import { Image, Video, FileText, Layers, BookOpen, Layout, Upload } from "lucide-react";

export const Route = createFileRoute("/_app/archivos")({
  component: Page,
});

const groups = [
  { icon: Image,    label: "Logos",     count: 12, hint: "PNG, SVG" },
  { icon: Video,    label: "Videos",    count: 5,  hint: "MP4, MOV" },
  { icon: Image,    label: "Imágenes",  count: 84, hint: "JPG, PNG" },
  { icon: FileText, label: "PDFs",      count: 17, hint: "Documentos" },
  { icon: BookOpen, label: "Manuales",  count: 4,  hint: "Brand books" },
  { icon: Layout,   label: "Wireframes",count: 9,  hint: "Figma, PDF" },
];

function Page() {
  return (
    <div className="space-y-6 max-w-[1300px]">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-[26px] font-bold tracking-tight">Archivos</h1>
          <p className="text-[13.5px] text-muted-foreground">Tu gestor documental centralizado</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {groups.map((g) => (
          <div key={g.label} className="rounded-2xl border border-border bg-card p-5 shadow-soft hover:shadow-card transition">
            <div className="flex items-start justify-between">
              <div className="h-11 w-11 rounded-xl bg-accent/60 text-accent-foreground flex items-center justify-center"><g.icon className="h-5 w-5" /></div>
              <span className="text-[11px] text-muted-foreground">{g.hint}</span>
            </div>
            <div className="mt-5 flex items-end justify-between">
              <div>
                <div className="text-[14px] font-semibold">{g.label}</div>
                <div className="text-[12px] text-muted-foreground">{g.count} archivos</div>
              </div>
              <button className="text-[12px] font-medium text-primary hover:underline">Abrir</button>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border-2 border-dashed border-border bg-card/50 p-10 text-center hover:border-primary/40 hover:bg-card transition">
        <div className="h-12 w-12 mx-auto rounded-xl bg-accent/60 text-accent-foreground flex items-center justify-center">
          <Upload className="h-5 w-5" />
        </div>
        <h3 className="mt-4 text-[15px] font-semibold">Arrastra y suelta archivos aquí</h3>
        <p className="mt-1 text-[12.5px] text-muted-foreground">o haz click para seleccionar desde tu computadora</p>
      </div>
    </div>
  );
}
