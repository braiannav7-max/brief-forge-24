import type { ComponentType, ReactNode } from "react";

/** Icono compatible con lucide-react. */
export type AdminIcon = ComponentType<{ className?: string }>;

/**
 * Sección del panel admin. Agregar un módulo = agregar un item al array `sections`.
 * Patrón graduado del módulo reutilizable `bloques-react/dashboards/panel-admin` (Workspace-).
 */
export interface AdminSection {
  id: string;
  label: string;
  icon: AdminIcon;
  render: (ctx: { navigate: (id: string) => void }) => ReactNode;
}

/** Columna genérica para ResourceManager. */
export interface ResourceColumn<T> {
  key: keyof T & string;
  label: string;
  render?: (row: T) => ReactNode;
  align?: "left" | "right";
}
