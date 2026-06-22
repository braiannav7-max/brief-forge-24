import { useState, type ReactNode } from "react";
import { ShieldCheck, ShieldX } from "lucide-react";
import { useAuth } from "@/lib/auth/AuthContext";

const ADMIN_USER = import.meta.env.VITE_ADMIN_USER ?? "";
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD ?? "";
const STORAGE_KEY = "bf_admin_ok";

function isUnlocked(): boolean {
  return typeof window !== "undefined" && sessionStorage.getItem(STORAGE_KEY) === "1";
}

function isAdminByEnv(user: string, pass: string): boolean {
  return !!ADMIN_USER && !!ADMIN_PASSWORD && user.trim() === ADMIN_USER && pass === ADMIN_PASSWORD;
}

export function AdminGate({ children }: { children: ReactNode }) {
  const { user: authUser } = useAuth();
  const [unlocked, setUnlocked] = useState(isUnlocked);
  const [formUser, setFormUser] = useState("");
  const [formPass, setFormPass] = useState("");
  const [err, setErr] = useState(false);

  const isAdminByMeta = authUser?.user_metadata?.role === "admin";

  if (unlocked || isAdminByMeta) return <>{children}</>;

  if (authUser && !isAdminByMeta) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="w-full max-w-sm rounded-2xl border border-border bg-card shadow-soft p-7 text-center">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-red-500/10 text-red-400">
            <ShieldX className="h-6 w-6" />
          </span>
          <h1 className="mt-4 text-[18px] font-bold tracking-tight">Acceso restringido</h1>
          <p className="mt-2 text-[13px] text-muted-foreground">
            No tenés permisos de administrador. Contactá al administrador del workspace.
          </p>
        </div>
      </div>
    );
  }

  const submit = () => {
    if (isAdminByEnv(formUser, formPass)) {
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
            value={formUser}
            autoFocus
            autoComplete="username"
            onChange={(e) => { setFormUser(e.target.value); setErr(false); }}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder="Usuario"
            className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-[13px] focus:border-primary/50 focus:outline-none"
          />
          <input
            type="password"
            value={formPass}
            autoComplete="current-password"
            onChange={(e) => { setFormPass(e.target.value); setErr(false); }}
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
