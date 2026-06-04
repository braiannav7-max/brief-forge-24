import { Check, Plus, X, Upload } from "lucide-react";
import type { Field, FieldValue } from "@/lib/briefing-types";

interface Props {
  field: Field;
  value: FieldValue | undefined;
  onChange: (value: FieldValue) => void;
}

function asMulti(v: FieldValue | undefined): { selected: string[]; other?: string } {
  if (v && typeof v === "object" && "selected" in v) return v;
  return { selected: [] };
}
function asUrls(v: FieldValue | undefined): string[] {
  if (v && typeof v === "object" && "urls" in v) return v.urls;
  return [""];
}
function asFiles(v: FieldValue | undefined): { name: string; size: number }[] {
  if (v && typeof v === "object" && "files" in v) return v.files;
  return [];
}
function asString(v: FieldValue | undefined): string {
  return typeof v === "string" ? v : "";
}

const inputCls =
  "w-full rounded-lg border border-input bg-card px-3.5 py-2.5 text-[13.5px] text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-ring transition";

export function FieldRenderer({ field, value, onChange }: Props) {
  switch (field.type) {
    case "text":
      return (
        <input className={inputCls} placeholder={field.placeholder} value={asString(value)} onChange={(e) => onChange(e.target.value)} />
      );

    case "textarea":
      return (
        <textarea className={`${inputCls} resize-y`} rows={3} placeholder={field.placeholder} value={asString(value)} onChange={(e) => onChange(e.target.value)} />
      );

    case "longtext":
      return (
        <textarea className={`${inputCls} resize-y leading-relaxed`} rows={8} placeholder={field.placeholder} value={asString(value)} onChange={(e) => onChange(e.target.value)} />
      );

    case "radio":
      return (
        <div className="grid gap-2 sm:grid-cols-2">
          {field.options?.map((opt) => {
            const active = asString(value) === opt;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => onChange(opt)}
                className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-[13.5px] transition ${
                  active ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/40"
                }`}
              >
                <span className={`grid h-4 w-4 flex-none place-items-center rounded-full border ${active ? "border-primary" : "border-muted-foreground/50"}`}>
                  {active && <span className="h-2 w-2 rounded-full bg-primary" />}
                </span>
                {opt}
              </button>
            );
          })}
        </div>
      );

    case "checkboxes":
    case "switches": {
      const { selected, other } = asMulti(value);
      const toggle = (opt: string) => {
        const next = selected.includes(opt) ? selected.filter((s) => s !== opt) : [...selected, opt];
        onChange({ selected: next, other });
      };
      const isSwitch = field.type === "switches";
      return (
        <div className="space-y-2">
          <div className="grid gap-2 sm:grid-cols-2">
            {field.options?.map((opt) => {
              const active = selected.includes(opt);
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => toggle(opt)}
                  className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-2.5 text-left text-[13.5px] transition ${
                    active ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/40"
                  }`}
                >
                  <span>{opt}</span>
                  {isSwitch ? (
                    <span className={`relative h-5 w-9 flex-none rounded-full transition-colors ${active ? "bg-primary" : "bg-muted"}`}>
                      <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${active ? "left-[18px]" : "left-0.5"}`} />
                    </span>
                  ) : (
                    <span className={`grid h-4 w-4 flex-none place-items-center rounded border ${active ? "border-primary bg-primary" : "border-muted-foreground/50"}`}>
                      {active && <Check className="h-3 w-3 text-white" />}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          {field.allowOther && (
            <input className={inputCls} placeholder="Otro (especificar)…" value={other ?? ""} onChange={(e) => onChange({ selected, other: e.target.value })} />
          )}
        </div>
      );
    }

    case "urls": {
      const urls = asUrls(value);
      const setUrls = (next: string[]) => onChange({ urls: next });
      return (
        <div className="space-y-2">
          {urls.map((url, i) => (
            <div key={i} className="flex gap-2">
              <input
                className={inputCls}
                placeholder="https://…"
                value={url}
                onChange={(e) => {
                  const next = [...urls];
                  next[i] = e.target.value;
                  setUrls(next);
                }}
              />
              {urls.length > 1 && (
                <button type="button" onClick={() => setUrls(urls.filter((_, j) => j !== i))} className="grid w-11 flex-none place-items-center rounded-lg border border-border bg-card hover:bg-muted" aria-label="Quitar">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={() => setUrls([...urls, ""])} className="inline-flex items-center gap-1.5 text-[13px] font-medium text-primary hover:underline">
            <Plus className="h-4 w-4" /> Agregar otra referencia
          </button>
        </div>
      );
    }

    case "files": {
      const files = asFiles(value);
      return (
        <div className="space-y-3">
          <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-card px-4 py-8 text-center text-[13px] text-muted-foreground transition hover:border-primary">
            <Upload className="h-5 w-5 text-muted-foreground" />
            <span>
              Arrastrá o seleccioná archivos
              <span className="block text-[11.5px] text-muted-foreground/70">logo, manual de marca, fotos, PDFs…</span>
            </span>
            <input
              type="file"
              multiple
              className="hidden"
              onChange={(e) => {
                const picked = Array.from(e.target.files ?? []).map((f) => ({ name: f.name, size: f.size }));
                onChange({ files: [...files, ...picked] });
              }}
            />
          </label>
          {files.length > 0 && (
            <ul className="space-y-1.5">
              {files.map((f, i) => (
                <li key={i} className="flex items-center justify-between rounded-lg bg-muted px-3 py-2 text-[13px]">
                  <span className="truncate">{f.name}</span>
                  <button type="button" onClick={() => onChange({ files: files.filter((_, j) => j !== i) })} className="text-muted-foreground hover:text-destructive" aria-label="Quitar archivo">
                    <X className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    }

    default:
      return null;
  }
}
