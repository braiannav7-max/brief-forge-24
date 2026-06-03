import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/configuracion")({
  component: Page,
});

function Page() {
  return (
    <div className="space-y-6 max-w-[900px]">
      <div>
        <h1 className="text-[26px] font-bold tracking-tight">Configuración</h1>
        <p className="text-[13.5px] text-muted-foreground">Administra tu cuenta y preferencias del workspace</p>
      </div>

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
          <Field label="Nombre" value="Braian Aranda" />
          <Field label="Email" value="braian@aiclientportal.com" />
          <Field label="Empresa" value="AI Client Portal" />
          <Field label="Rol" value="Administrador" />
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card shadow-soft p-6 space-y-4">
        <h3 className="text-[15px] font-semibold">Preferencias</h3>
        {[
          ["Notificaciones por email", true],
          ["Resúmenes semanales con IA", true],
          ["Modo oscuro automático", false],
        ].map(([label, on]) => (
          <div key={label as string} className="flex items-center justify-between py-2 border-t border-border first:border-0 first:pt-0">
            <span className="text-[13px]">{label as string}</span>
            <span className={`h-6 w-10 rounded-full relative transition ${on ? "bg-primary" : "bg-muted"}`}>
              <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${on ? "left-[18px]" : "left-0.5"}`} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="block text-[11.5px] font-medium text-muted-foreground mb-1.5">{label}</label>
      <input defaultValue={value} className="w-full h-10 rounded-lg border border-border bg-surface-elevated px-3 text-[13px] focus:outline-none focus:ring-2 focus:ring-ring/30" />
    </div>
  );
}
