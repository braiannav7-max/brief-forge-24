import { useState, type ReactNode } from "react";
import { X } from "lucide-react";

export interface FieldDef {
  name: string;
  label: string;
  type?: "text" | "email" | "number" | "select";
  options?: { value: string; label: string }[];
  required?: boolean;
  placeholder?: string;
}

/**
 * Modal de formulario genérico (crear/editar). Reutilizable para cualquier entidad:
 * le pasás los campos y los valores iniciales, devuelve el objeto al guardar.
 */
export function FormModal({
  title,
  fields,
  initial,
  onClose,
  onSubmit,
}: {
  title: string;
  fields: FieldDef[];
  initial: Record<string, string>;
  onClose: () => void;
  onSubmit: (values: Record<string, string>) => Promise<void>;
}) {
  const [values, setValues] = useState<Record<string, string>>(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (k: string, v: string) => setValues((p) => ({ ...p, [k]: v }));

  const submit = async () => {
    for (const f of fields) {
      if (f.required && !String(values[f.name] ?? "").trim()) {
        setError(`El campo "${f.label}" es obligatorio.`);
        return;
      }
    }
    setSaving(true);
    setError(null);
    try {
      await onSubmit(values);
      onClose();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al guardar.");
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-2xl border border-border bg-card shadow-elevated p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[16px] font-semibold tracking-tight">{title}</h3>
          <button onClick={onClose} className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors" aria-label="Cerrar">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-3">
          {fields.map((f) => (
            <Field key={f.name} f={f} value={values[f.name] ?? ""} onChange={(v) => set(f.name, v)} onEnter={submit} />
          ))}
        </div>

        {error && <p className="mt-3 text-[12px] text-red-400">{error}</p>}

        <div className="mt-5 flex justify-end gap-2">
          <button onClick={onClose} className="rounded-xl border border-border px-3.5 py-2 text-[13px] font-medium text-muted-foreground hover:bg-muted transition-colors">
            Cancelar
          </button>
          <button onClick={submit} disabled={saving} className="rounded-xl bg-primary px-3.5 py-2 text-[13px] font-semibold text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50">
            {saving ? "Guardando…" : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ f, value, onChange, onEnter }: { f: FieldDef; value: string; onChange: (v: string) => void; onEnter: () => void }): ReactNode {
  const cls = "w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-[13px] focus:border-primary/50 focus:outline-none";
  return (
    <div>
      <label className="text-[11.5px] text-muted-foreground">{f.label}{f.required && " *"}</label>
      {f.type === "select" ? (
        <select value={value} onChange={(e) => onChange(e.target.value)} className={cls + " mt-1"}>
          {(f.options ?? []).map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      ) : (
        <input
          type={f.type ?? "text"}
          value={value}
          placeholder={f.placeholder}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && f.type !== "number" && onEnter()}
          className={cls + " mt-1"}
        />
      )}
    </div>
  );
}
