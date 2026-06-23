import { Bell, MessageCircle, ChevronDown, Search, Menu, Globe } from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useLang } from "@/lib/i18n";
import { useAuth, displayName, initials } from "@/lib/auth/AuthContext";

interface AppTopbarProps {
  title?: string;
  onMenuClick: () => void;
}

export function AppTopbar({ title, onMenuClick }: AppTopbarProps) {
  const { t, lang, setLang } = useLang();
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-20 h-[64px] border-b border-border bg-background/80 backdrop-blur-md flex items-center gap-3 px-4 md:px-6 shrink-0">
      {/* Hamburger — mobile only */}
      <button
        onClick={onMenuClick}
        className="md:hidden h-9 w-9 rounded-lg hover:bg-muted flex items-center justify-center text-muted-foreground shrink-0"
        aria-label="Abrir menú"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Search */}
      <div className="flex-1 max-w-[460px]">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            placeholder={t.topbar.search}
            className="w-full h-10 rounded-xl border border-border bg-surface-elevated pl-10 pr-16 text-[13px] placeholder:text-muted-foreground/55 focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-ring"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10.5px] text-muted-foreground/50 font-medium bg-muted rounded-md px-1.5 py-0.5 select-none hidden sm:block">
            ⌘K
          </span>
        </div>
      </div>

      {title && (
        <h2 className="text-sm font-medium text-muted-foreground hidden lg:block">{title}</h2>
      )}

      <div className="ml-auto flex items-center gap-1">
        {/* Language toggle */}
        <button
          onClick={() => setLang(lang === "pt" ? "es" : "pt")}
          className="h-9 px-2.5 rounded-lg hover:bg-muted flex items-center gap-1.5 text-[11.5px] font-bold text-muted-foreground transition-colors"
          title={lang === "pt" ? "Cambiar a español" : "Mudar para português"}
        >
          <Globe className="h-3.5 w-3.5" />
          <span className="hidden sm:block">{t.topbar.langSwitch}</span>
        </button>

        <ThemeToggle />

        <button className="relative h-9 w-9 rounded-lg hover:bg-muted flex items-center justify-center text-muted-foreground">
          <Bell className="h-[18px] w-[18px]" />
          <span className="absolute top-1.5 right-1.5 h-[15px] min-w-[15px] rounded-full bg-red-500 flex items-center justify-center text-[9px] font-bold text-white px-0.5 leading-none">
            3
          </span>
        </button>

        <button className="h-9 w-9 rounded-lg hover:bg-muted items-center justify-center text-muted-foreground hidden sm:flex">
          <MessageCircle className="h-[18px] w-[18px]" />
        </button>

        <div className="flex items-center gap-2 ml-1 rounded-xl hover:bg-muted px-2 py-1.5 cursor-pointer transition-colors">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-xs font-bold select-none shrink-0">
            {user ? initials(user) : "??"}
          </div>
          <div className="hidden md:block leading-tight">
            <div className="text-[13px] font-semibold">{displayName(user)}</div>
            <div className="text-[10.5px] text-muted-foreground">{t.topbar.administrator}</div>
          </div>
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground hidden md:block" />
        </div>
      </div>
    </header>
  );
}
