import { Pencil, Trash2, Plus } from "lucide-react";
import type { ResourceColumn } from "./types";

/**
 * Tabla CRUD genérica reutilizable. No conoce ninguna entidad concreta: recibe
 * columnas + filas + handlers opcionales. Sin onEdit/onDelete → solo lectura.
 * Graduado del módulo `panel-admin` (Workspace-), tematizado a brief-forge-24.
 */
export function ResourceManager<T extends { id: string | number }>({
  title,
  description,
  columns,
  rows,
  onCreate,
  createLabel = "Nuevo",
  onEdit,
  onDelete,
  emptyLabel = "Sin registros.",
}: {
  title?: string;
  description?: string;
  columns: ResourceColumn<T>[];
  rows: T[];
  onCreate?: () => void;
  createLabel?: string;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  emptyLabel?: string;
}) {
  const hasActions = !!onEdit || !!onDelete;
  return (
    <div className="space-y-4">
      {(title || onCreate) && (
        <div className="flex items-end justify-between gap-4">
          <div>
            {title && <h2 className="text-[18px] font-semibold tracking-tight">{title}</h2>}
            {description && <p className="mt-0.5 text-[13px] text-muted-foreground">{description}</p>}
          </div>
          {onCreate && (
            <button
              onClick={onCreate}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-3.5 py-2 text-[13px] font-medium text-primary-foreground hover:opacity-90 transition-opacity"
            >
              <Plus className="h-4 w-4" /> {createLabel}
            </button>
          )}
        </div>
      )}

      <div className="rounded-2xl border border-border bg-card shadow-soft overflow-x-auto">
        <table className="w-full text-[13px]">
          <thead className="bg-muted/50 text-[11.5px] uppercase tracking-wide text-muted-foreground">
            <tr>
              {columns.map((c) => (
                <th
                  key={c.key}
                  className={"font-medium px-6 py-3 " + (c.align === "right" ? "text-right" : "text-left")}
                >
                  {c.label}
                </th>
              ))}
              {hasActions && <th className="font-medium px-6 py-3 text-right">Acciones</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length + (hasActions ? 1 : 0)}
                  className="px-6 py-10 text-center text-muted-foreground"
                >
                  {emptyLabel}
                </td>
              </tr>
            )}
            {rows.map((row) => (
              <tr key={String(row.id)} className="hover:bg-muted/30">
                {columns.map((c) => (
                  <td
                    key={c.key}
                    className={"px-6 py-4 " + (c.align === "right" ? "text-right tabular-nums" : "")}
                  >
                    {c.render ? c.render(row) : String(row[c.key] ?? "—")}
                  </td>
                ))}
                {hasActions && (
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-1.5">
                      {onEdit && (
                        <button
                          onClick={() => onEdit(row)}
                          className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                          aria-label="Editar"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(row)}
                          className="rounded-lg p-2 text-muted-foreground hover:bg-red-500/10 hover:text-red-400 transition-colors"
                          aria-label="Eliminar"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
