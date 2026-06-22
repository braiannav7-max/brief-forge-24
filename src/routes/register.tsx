import { useState } from "react";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { UserPlus } from "lucide-react";
import { useAuth } from "@/lib/auth/AuthContext";

export const Route = createFileRoute("/register")({
  component: RegisterPage,
});

function RegisterPage() {
  const { signUp, user, loading, authAvailable, authError } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!loading && user) {
    router.navigate({ to: "/dashboard" });
    return null;
  }

  if (!authAvailable) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 text-center">
        <p className="text-muted-foreground text-[13px] max-w-sm">
          {authError ?? "Auth no disponible."} — agregalas en tu <code className="bg-muted px-1.5 py-0.5 rounded text-[12px]">.env</code> y reiniciá el servidor.
        </p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const { error } = await signUp(email, password);
    setSubmitting(false);
    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="w-full max-w-sm rounded-2xl border border-border bg-card shadow-soft p-7 text-center">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-400 text-white">
            <UserPlus className="h-6 w-6" />
          </span>
          <h1 className="mt-4 text-[18px] font-bold tracking-tight">Cuenta creada</h1>
          <p className="mt-2 text-[13px] text-muted-foreground">
            Revisá tu correo <strong>{email}</strong> para confirmar la cuenta.
            Si no ves el email, revisá la carpeta de spam.
          </p>
          <Link
            to="/login"
            className="mt-5 inline-flex rounded-xl bg-primary px-6 py-2.5 text-[13px] font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Ir a iniciar sesión
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="rounded-2xl border border-border bg-card shadow-soft p-7">
          <div className="text-center">
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary to-lavender text-primary-foreground">
              <UserPlus className="h-6 w-6" />
            </span>
            <h1 className="mt-4 text-[18px] font-bold tracking-tight">Crear cuenta</h1>
            <p className="mt-1 text-[13px] text-muted-foreground">
              Registrate para acceder a VIVA CORE.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-5 space-y-3">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                autoComplete="email"
                required
                className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-[13px] focus:border-primary/50 focus:outline-none"
              />
            </div>
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña (mín. 6 caracteres)"
                autoComplete="new-password"
                required
                minLength={6}
                className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-[13px] focus:border-primary/50 focus:outline-none"
              />
            </div>

            {error && (
              <p className="text-[12px] text-red-400 text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-xl bg-primary px-4 py-2.5 text-[13px] font-semibold text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {submitting ? "Creando cuenta…" : "Crear cuenta"}
            </button>
          </form>

          <p className="mt-5 text-center text-[12px] text-muted-foreground">
            ¿Ya tenés cuenta?{" "}
            <Link to="/login" className="text-primary hover:underline font-medium">
              Iniciar sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
