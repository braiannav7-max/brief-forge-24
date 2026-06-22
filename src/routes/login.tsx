import { useState } from "react";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { LogIn } from "lucide-react";
import { useAuth } from "@/lib/auth/AuthContext";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const { signIn, user, loading } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (!loading && user) {
    router.navigate({ to: "/dashboard" });
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const { error } = await signIn(email, password);
    setSubmitting(false);
    if (error) {
      setError(error.message === "Invalid login credentials"
        ? "Email o contraseña incorrectos."
        : error.message
      );
    } else {
      router.navigate({ to: "/dashboard" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="rounded-2xl border border-border bg-card shadow-soft p-7">
          <div className="text-center">
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary to-lavender text-primary-foreground">
              <LogIn className="h-6 w-6" />
            </span>
            <h1 className="mt-4 text-[18px] font-bold tracking-tight">Iniciar sesión</h1>
            <p className="mt-1 text-[13px] text-muted-foreground">
              Ingresá con tu cuenta de VIVA CORE.
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
                placeholder="Contraseña"
                autoComplete="current-password"
                required
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
              {submitting ? "Ingresando…" : "Entrar"}
            </button>
          </form>

          <p className="mt-5 text-center text-[12px] text-muted-foreground">
            ¿No tenés cuenta?{" "}
            <Link to="/register" className="text-primary hover:underline font-medium">
              Registrarse
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
