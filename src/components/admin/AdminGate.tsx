import { useState, type ReactNode } from "react";
import { ShieldCheck } from "lucide-react";

const ADMIN_USER = import.meta.env.VITE_ADMIN_USER ?? "";
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD ?? "";
const STORAGE_KEY = "bf_admin_ok";

function isUnlocked(): boolean {
  return typeof window !== "undefined" && sessionStorage.getItem(STORAGE_KEY) === "1";
}

/**
 * Gate de acceso al panel (usuario + contraseña). Lee credenciales de env
 * (VITE_ADMIN_USER / VITE_ADMIN_PASSWORD) — nunca hardcodeadas en el repo.
 *
 * ⚠️ Es protección de UI, no de datos: las VITE_* quedan en el bundle. La
 * seguridad real va en Supabase Auth + RLS (siguiente fase).
 */
export function AdminGate({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState(isUnlocked);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState(false);

  if (unlocked) return <>{children}</>;

  const submit = () => {
    const ok =
      !!ADMIN_USER &&
      !!ADMIN_PASSWORD &&
      user.trim() === ADMIN_USER &&
      pass === ADMIN_PASSWORD;
    if (ok) {
      sessionStorage.setItem(STORAGE_KEY, "1");
      setUnlocked(true);
    } else {
      setErr(true);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card shadow-soft p-7 text-center">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary to-lavender text-primary-foreground">
          <ShieldCheck className="h-6 w-6" />
        </span>
        <h1 className="mt-4 text-[18px] font-bold tracking-tight">Panel de administración</h1>
        <p className="mt-1 text-[13px] text-muted-foreground">Ingresá tus credenciales.</p>

        {(!ADMIN_USER || !ADMIN_PASSWORD) && (
          <p className="mt-3 rounded-xl border border-amber-500/30 bg-amber-500/5 px-3 py-2 text-[11.5px] text-amber-500">
            Faltan <code>VITE_ADMIN_USER</code> / <code>VITE_ADMIN_PASSWORD</code> en tu <code>.env</code>.
          </p>
        )}

        <div className="mt-5 space-y-2.5 text-left">
          <input
            type="text"
            value={user}
            autoFocus
            autoComplete="username"
            onChange={(e) => { setUser(e.target.value); setErr(false); }}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder="Usuario"
            className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-[13px] focus:border-primary/50 focus:outline-none"
          />
          <input
            type="password"
            value={pass}
            autoComplete="current-password"
            onChange={(e) => { setPass(e.target.value); setErr(false); }}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder="Contraseña"
            className={`w-full rounded-xl border bg-background px-3.5 py-2.5 text-[13px] focus:outline-none ${
              err ? "border-red-500/60" : "border-border focus:border-primary/50"
            }`}
          />
        </div>
        {err && <p className="mt-2 text-[12px] text-red-400">Usuario o contraseña incorrectos.</p>}

        <button
          onClick={submit}
          className="mt-4 w-full rounded-xl bg-primary px-4 py-2.5 text-[13px] font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
        >
          Entrar
        </button>
      </div>
    </div>
  );
}
