import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? "";

let cached: ReturnType<typeof createClient> | null = null;

export function getBrowserClient() {
  if (!cached) {
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error(
        "Faltan VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en .env. " +
        "Copialas de Supabase > Project Settings > API."
      );
    }
    cached = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        storageKey: "bf-auth",
      },
    });
  }
  return cached;
}
