import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

/** Botón para alternar entre tema claro y oscuro. */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      title={theme === "dark" ? "Modo claro" : "Modo oscuro"}
      className={`h-10 w-10 rounded-lg hover:bg-muted flex items-center justify-center text-muted-foreground transition-colors ${className}`}
    >
      {theme === "dark" ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
    </button>
  );
}
