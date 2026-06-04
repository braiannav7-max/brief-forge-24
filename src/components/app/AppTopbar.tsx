import { Bell, MessageCircle, ChevronDown, Search } from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export function AppTopbar({ title }: { title?: string }) {
  return (
    <header className="sticky top-0 z-20 h-[64px] border-b border-border bg-background/80 backdrop-blur-md flex items-center gap-4 px-6 shrink-0">
      <div className="flex-1 max-w-[460px]">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Buscar proyectos, ideas, archivos..."
            className="w-full h-10 rounded-xl border border-border bg-surface-elevated pl-10 pr-16 text-[13px] placeholder:text-muted-foreground/55 focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-ring"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10.5px] text-muted-foreground/50 font-medium bg-muted rounded-md px-1.5 py-0.5 select-none">
            ⌘K
          </span>
        </div>
      </div>

      {title && (
        <h2 className="text-sm font-medium text-muted-foreground hidden md:block">{title}</h2>
      )}

      <div className="ml-auto flex items-center gap-1">
        <ThemeToggle />

        <button className="relative h-9 w-9 rounded-lg hover:bg-muted flex items-center justify-center text-muted-foreground">
          <Bell className="h-[18px] w-[18px]" />
          <span className="absolute top-1.5 right-1.5 h-[15px] min-w-[15px] rounded-full bg-red-500 flex items-center justify-center text-[9px] font-bold text-white px-0.5 leading-none">
            3
          </span>
        </button>

        <button className="h-9 w-9 rounded-lg hover:bg-muted flex items-center justify-center text-muted-foreground">
          <MessageCircle className="h-[18px] w-[18px]" />
        </button>

        <div className="flex items-center gap-2 ml-1 rounded-xl hover:bg-muted px-2.5 py-1.5 cursor-pointer transition-colors">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-xs font-bold select-none shrink-0">
            BS
          </div>
          <div className="hidden sm:block leading-tight">
            <div className="text-[13px] font-semibold">Braian</div>
            <div className="text-[10.5px] text-muted-foreground">Administrador</div>
          </div>
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
        </div>
      </div>
    </header>
  );
}
