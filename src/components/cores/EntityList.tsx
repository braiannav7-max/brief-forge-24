import { cn } from "@/lib/utils";
import { toneClass, type Tone } from "./tone";

export interface EntityRow {
  id: string;
  title: string;
  subtitle?: string;
  /** Imagen (producto, propiedad…) o iniciales (cliente). */
  thumbnail?: string;
  initials?: string;
  /** Valor a la derecha (precio, monto…). */
  value?: string;
  badge?: { label: string; tone?: Tone };
}

/**
 * Lista de entidades reutilizable: propiedades, productos, clientes, reservas…
 * Cada rubro le pasa sus filas; el núcleo no sabe de negocio.
 */
export function EntityList({
  items,
  onSelect,
}: {
  items: EntityRow[];
  onSelect?: (id: string) => void;
}) {
  return (
    <div className="divide-y divide-border">
      {items.map((it) => (
        <button
          key={it.id}
          onClick={() => onSelect?.(it.id)}
          className={cn(
            "w-full flex items-center gap-3 py-3 text-left transition-colors",
            onSelect && "hover:bg-muted/50 -mx-2 px-2 rounded-lg",
          )}
        >
          {it.thumbnail ? (
            <img
              src={it.thumbnail}
              alt={it.title}
              className="h-11 w-11 rounded-xl object-cover shrink-0"
            />
          ) : (
            <span className="h-11 w-11 rounded-xl bg-gradient-to-br from-primary/80 to-lavender text-white flex items-center justify-center text-[12px] font-bold shrink-0">
              {it.initials ?? it.title.slice(0, 2).toUpperCase()}
            </span>
          )}
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-semibold leading-tight truncate">{it.title}</p>
            {it.subtitle && (
              <p className="text-[11.5px] text-muted-foreground truncate mt-0.5">{it.subtitle}</p>
            )}
          </div>
          {it.badge && (
            <span
              className={cn(
                "rounded-full px-2.5 py-1 text-[10.5px] font-semibold shrink-0",
                toneClass[it.badge.tone ?? "default"],
              )}
            >
              {it.badge.label}
            </span>
          )}
          {it.value && (
            <span className="text-[13px] font-bold tabular-nums shrink-0 ml-1">{it.value}</span>
          )}
        </button>
      ))}
    </div>
  );
}
