import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

/** Estado vacío reutilizable. */
export function EmptyState({
  icon: Icon,
  title,
  hint,
  action,
}: {
  icon: LucideIcon;
  title: string;
  hint?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-10 px-4">
      <div className="h-12 w-12 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground mb-3">
        <Icon className="h-6 w-6" />
      </div>
      <p className="text-[13.5px] font-semibold">{title}</p>
      {hint && <p className="text-[12px] text-muted-foreground mt-1 max-w-xs">{hint}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
