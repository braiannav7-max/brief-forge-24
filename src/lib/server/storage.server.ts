import process from "node:process";
import { promises as fs } from "node:fs";
import path from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { BriefingData, FieldValue } from "../briefing-types";
import { getCompanyByToken } from "../companies";

/**
 * Capa de datos INTERCAMBIABLE (server-only, nunca llega al cliente).
 *
 * - Si están definidas SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY → usa Supabase.
 * - Si no → guarda en archivos JSON locales en .data/ (solo para dev).
 *
 * El resto de la app no sabe cuál está activa. Cuando pegues las credenciales
 * de Supabase en .env, migra solo.
 */

function env() {
  return {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_SERVICE_ROLE_KEY,
  };
}

export function usingSupabase(): boolean {
  const { url, key } = env();
  return Boolean(url && key);
}

let cached: SupabaseClient | null = null;
function supa(): SupabaseClient {
  if (!cached) {
    const { url, key } = env();
    cached = createClient(url!, key!, { auth: { persistSession: false } });
  }
  return cached;
}

const DATA_DIR = path.join(process.cwd(), ".data", "briefings");

function emptyBriefing(token: string): BriefingData {
  const now = new Date().toISOString();
  return {
    token,
    companySlug: getCompanyByToken(token)?.slug ?? "",
    answers: {},
    submitted: false,
    createdAt: now,
    updatedAt: now,
  };
}

// ---------- Backend local (JSON) ----------
async function localRead(token: string): Promise<BriefingData | null> {
  try {
    const raw = await fs.readFile(path.join(DATA_DIR, `${token}.json`), "utf8");
    return JSON.parse(raw) as BriefingData;
  } catch {
    return null;
  }
}
async function localWrite(data: BriefingData): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(path.join(DATA_DIR, `${data.token}.json`), JSON.stringify(data, null, 2), "utf8");
}
async function localList(): Promise<BriefingData[]> {
  try {
    const files = await fs.readdir(DATA_DIR);
    const all = await Promise.all(files.filter((f) => f.endsWith(".json")).map((f) => localRead(f.replace(/\.json$/, ""))));
    return all.filter((b): b is BriefingData => b !== null);
  } catch {
    return [];
  }
}

// ---------- Backend Supabase ----------
// Tabla `briefings` (ver SQL en SETUP_SUPABASE.md).
function rowToBriefing(row: Record<string, unknown>): BriefingData {
  return {
    token: row.token as string,
    companySlug: (row.company_slug as string) ?? "",
    answers: (row.answers as Record<string, FieldValue>) ?? {},
    submitted: Boolean(row.submitted),
    createdAt: (row.created_at as string) ?? new Date().toISOString(),
    updatedAt: (row.updated_at as string) ?? new Date().toISOString(),
  };
}
async function supaRead(token: string): Promise<BriefingData | null> {
  const { data, error } = await supa().from("vc_briefings").select("*").eq("token", token).maybeSingle();
  if (error) throw error;
  return data ? rowToBriefing(data) : null;
}
async function supaWrite(d: BriefingData): Promise<void> {
  const { error } = await supa().from("vc_briefings").upsert(
    { token: d.token, company_slug: d.companySlug, answers: d.answers, submitted: d.submitted, created_at: d.createdAt, updated_at: d.updatedAt },
    { onConflict: "token" },
  );
  if (error) throw error;
}
async function supaList(): Promise<BriefingData[]> {
  const { data, error } = await supa().from("vc_briefings").select("*");
  if (error) throw error;
  return (data ?? []).map(rowToBriefing);
}

// ---------- API pública del módulo ----------
export async function readBriefing(token: string): Promise<BriefingData> {
  const existing = usingSupabase() ? await supaRead(token) : await localRead(token);
  return existing ?? emptyBriefing(token);
}

export async function saveBriefing(
  token: string,
  patch: { answers?: Record<string, FieldValue>; submitted?: boolean },
): Promise<BriefingData> {
  const current = await readBriefing(token);
  const next: BriefingData = {
    ...current,
    answers: patch.answers ?? current.answers,
    submitted: patch.submitted ?? current.submitted,
    updatedAt: new Date().toISOString(),
  };
  if (usingSupabase()) await supaWrite(next);
  else await localWrite(next);
  return next;
}

export async function listBriefings(): Promise<BriefingData[]> {
  return usingSupabase() ? await supaList() : await localList();
}
