import { cn } from "@/lib/utils";

export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="h-9 w-9 shrink-0 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md">
        <span className="text-white font-black text-[13px] tracking-tight select-none">VB</span>
      </div>
      {!compact && (
        <div className="leading-[1.25]">
          <div className="text-[13px] font-bold tracking-tight text-foreground">VIVA BÚZIOS</div>
          <div className="text-[9.5px] text-muted-foreground tracking-widest uppercase">Grupo Gastronómico</div>
        </div>
      )}
    </div>
  );
}
