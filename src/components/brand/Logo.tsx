import { cn } from "@/lib/utils";

export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="relative h-9 w-9 shrink-0">
        <div className="absolute inset-0 rounded-[10px] bg-gradient-to-br from-primary to-lavender" />
        <div className="absolute inset-[3px] rounded-[7px] bg-surface-elevated flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
            <path d="M12 3 L20 8 V16 L12 21 L4 16 V8 Z" stroke="url(#g)" strokeWidth="1.8" strokeLinejoin="round"/>
            <circle cx="12" cy="12" r="2.4" fill="url(#g)"/>
            <defs>
              <linearGradient id="g" x1="0" y1="0" x2="24" y2="24">
                <stop offset="0" stopColor="oklch(0.46 0.18 266)"/>
                <stop offset="1" stopColor="oklch(0.72 0.12 290)"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      {!compact && (
        <div className="leading-tight">
          <div className="text-[13px] font-bold tracking-tight text-foreground">VIVA CORE</div>
          <div className="text-[10.5px] text-muted-foreground tracking-wide">AI Agency Operating System</div>
        </div>
      )}
    </div>
  );
}
