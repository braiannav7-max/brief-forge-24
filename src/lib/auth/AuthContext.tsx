import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { User, Session, AuthError } from "@supabase/supabase-js";
import { getBrowserClient } from "../supabase/client";

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  loading: boolean;
  authAvailable: boolean;
  authError: string | null;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signUp: (
    email: string,
    password: string,
    fullName: string,
  ) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function missingEnvError() {
  return {
    user: null as User | null,
    session: null as Session | null,
    loading: false,
  };
}

let _client: ReturnType<typeof getBrowserClient> | null = null;
function getClient() {
  if (!_client) {
    try {
      _client = getBrowserClient();
    } catch {
      return null;
    }
  }
  return _client;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [authAvailable, setAuthAvailable] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = getClient();

    if (!supabase) {
      setAuthAvailable(false);
      setAuthError("VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY requeridas en .env");
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const supabase = getClient();
    if (!supabase) return { error: new Error("Auth no disponible") as unknown as AuthError };
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    const supabase = getClient();
    if (!supabase) return { error: new Error("Auth no disponible") as unknown as AuthError };
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // Queda en raw_user_meta_data; el trigger handle_new_user lo copia
        // a la tabla public.profiles al crear el usuario.
        data: { full_name: fullName.trim() },
      },
    });
    return { error };
  };

  const signOut = async () => {
    const supabase = getClient();
    if (supabase) await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{ user, session, loading, authAvailable, authError, signIn, signUp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}

/** Nombre a mostrar: full_name del metadata, o el prefijo del email. */
export function displayName(user: User | null): string {
  const meta = (user?.user_metadata?.full_name as string | undefined)?.trim();
  if (meta) return meta;
  const email = user?.email;
  return email ? email.split("@")[0] : "Usuario";
}

/** Iniciales (máx 2) derivadas del nombre a mostrar. */
export function initials(user: User | null): string {
  const name = displayName(user);
  const parts = name.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}
