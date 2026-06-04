import { Bell, Search, HelpCircle } from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export function AppTopbar({ title }: { title?: string }) {
  return (
    <header className="sticky top-0 z-20 h-[68px] border-b border-border bg-background/80 backdrop-blur-md flex items-center gap-4 px-8">
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Buscar proyectos, ideas, archivos…"
            className="w-full h-10 rounded-lg border border-border bg-surface-elevated pl-10 pr-3 text-[13px] placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-ring"
          />
        </div>
      </div>
      {title && <h2 className="text-sm font-medium text-muted-foreground hidden md:block">{title}</h2>}
      <div className="ml-auto flex items-center gap-2">
        <ThemeToggle />
        <button className="h-10 w-10 rounded-lg hover:bg-muted flex items-center justify-center text-muted-foreground">
          <HelpCircle className="h-[18px] w-[18px]" />
        </button>
        <button className="relative h-10 w-10 rounded-lg hover:bg-muted flex items-center justify-center text-muted-foreground">
          <Bell className="h-[18px] w-[18px]" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary ring-2 ring-background" />
        </button>
        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-lavender flex items-center justify-center text-primary-foreground text-xs font-semibold">
          BA
        </div>
      </div>
    </header>
  );
}
