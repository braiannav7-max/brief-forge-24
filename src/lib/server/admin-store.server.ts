import process from "node:process";
import { promises as fs } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Empresa, EmpresaInput, Proyecto, ProyectoInput } from "../admin-types";

/**
 * Capa de datos del admin VIVA CORE (server-only, nunca llega al cliente).
 * Mismo patrón intercambiable que storage.server.ts:
 *   - SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY definidas → Supabase (tablas vc_*).
 *   - Si no → archivos JSON en .data/ (solo dev).
 * La service-role key bypassa RLS y corre solo en el server.
 */

function env() {
  return { url: process.env.SUPABASE_URL, key: process.env.SUPABASE_SERVICE_ROLE_KEY };
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

const now = () => new Date().toISOString();

// ─── Mapeo fila ↔ objeto ──────────────────────────────────────────────────────
function rowToEmpresa(r: Record<string, unknown>): Empresa {
  return {
    id: r.id as string,
    name: (r.name as string) ?? "",
    contact: (r.contact as string) ?? "",
    email: (r.email as string) ?? "",
    phone: (r.phone as string) ?? "",
    status: (r.status as string) ?? "Activo",
    createdAt: (r.created_at as string) ?? now(),
    updatedAt: (r.updated_at as string) ?? now(),
  };
}
function rowToProyecto(r: Record<string, unknown>): Proyecto {
  return {
    id: r.id as string,
    name: (r.name as string) ?? "",
    category: (r.category as string) ?? "",
    status: (r.status as string) ?? "En progreso",
    progress: Number(r.progress ?? 0),
    budget: (r.budget as string) ?? "",
    empresaId: (r.empresa_id as string) ?? null,
    createdAt: (r.created_at as string) ?? now(),
    updatedAt: (r.updated_at as string) ?? now(),
  };
}

// ─── Backend local (JSON) ─────────────────────────────────────────────────────
const DATA_DIR = path.join(process.cwd(), ".data", "vc");
async function localRead<T>(file: string): Promise<T[]> {
  try {
    return JSON.parse(await fs.readFile(path.join(DATA_DIR, file), "utf8")) as T[];
  } catch {
    return [];
  }
}
async function localWrite<T>(file: string, rows: T[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(path.join(DATA_DIR, file), JSON.stringify(rows, null, 2), "utf8");
}

// ─── Empresas ─────────────────────────────────────────────────────────────────
export async function listEmpresas(): Promise<Empresa[]> {
  if (usingSupabase()) {
    const { data, error } = await supa().from("vc_empresas").select("*").order("created_at");
    if (error) throw error;
    return (data ?? []).map(rowToEmpresa);
  }
  return localRead<Empresa>("empresas.json");
}

export async function createEmpresa(input: EmpresaInput): Promise<Empresa> {
  if (usingSupabase()) {
    const { data, error } = await supa().from("vc_empresas")
      .insert({ name: input.name ?? "", contact: input.contact, email: input.email, phone: input.phone, status: input.status ?? "Activo" })
      .select("*").single();
    if (error) throw error;
    return rowToEmpresa(data);
  }
  const rows = await localRead<Empresa>("empresas.json");
  const e: Empresa = { id: randomUUID(), name: input.name ?? "", contact: input.contact ?? "", email: input.email ?? "", phone: input.phone ?? "", status: input.status ?? "Activo", createdAt: now(), updatedAt: now() };
  rows.push(e);
  await localWrite("empresas.json", rows);
  return e;
}

export async function updateEmpresa(id: string, input: EmpresaInput): Promise<Empresa> {
  if (usingSupabase()) {
    const { data, error } = await supa().from("vc_empresas").update({ ...input }).eq("id", id).select("*").single();
    if (error) throw error;
    return rowToEmpresa(data);
  }
  const rows = await localRead<Empresa>("empresas.json");
  const i = rows.findIndex((r) => r.id === id);
  if (i < 0) throw new Error("Empresa no encontrada");
  rows[i] = { ...rows[i], ...input, updatedAt: now() };
  await localWrite("empresas.json", rows);
  return rows[i];
}

export async function deleteEmpresa(id: string): Promise<void> {
  if (usingSupabase()) {
    const { error } = await supa().from("vc_empresas").delete().eq("id", id);
    if (error) throw error;
    return;
  }
  const rows = await localRead<Empresa>("empresas.json");
  await localWrite("empresas.json", rows.filter((r) => r.id !== id));
}

// ─── Proyectos ────────────────────────────────────────────────────────────────
export async function listProyectos(): Promise<Proyecto[]> {
  if (usingSupabase()) {
    const { data, error } = await supa().from("vc_proyectos").select("*").order("created_at");
    if (error) throw error;
    return (data ?? []).map(rowToProyecto);
  }
  return localRead<Proyecto>("proyectos.json");
}

export async function createProyecto(input: ProyectoInput): Promise<Proyecto> {
  if (usingSupabase()) {
    const { data, error } = await supa().from("vc_proyectos")
      .insert({ name: input.name ?? "", category: input.category, status: input.status ?? "En progreso", progress: input.progress ?? 0, budget: input.budget, empresa_id: input.empresaId ?? null })
      .select("*").single();
    if (error) throw error;
    return rowToProyecto(data);
  }
  const rows = await localRead<Proyecto>("proyectos.json");
  const p: Proyecto = { id: randomUUID(), name: input.name ?? "", category: input.category ?? "", status: input.status ?? "En progreso", progress: input.progress ?? 0, budget: input.budget ?? "", empresaId: input.empresaId ?? null, createdAt: now(), updatedAt: now() };
  rows.push(p);
  await localWrite("proyectos.json", rows);
  return p;
}

export async function updateProyecto(id: string, input: ProyectoInput): Promise<Proyecto> {
  if (usingSupabase()) {
    const patch: Record<string, unknown> = { ...input };
    if ("empresaId" in input) { patch.empresa_id = input.empresaId; delete patch.empresaId; }
    const { data, error } = await supa().from("vc_proyectos").update(patch).eq("id", id).select("*").single();
    if (error) throw error;
    return rowToProyecto(data);
  }
  const rows = await localRead<Proyecto>("proyectos.json");
  const i = rows.findIndex((r) => r.id === id);
  if (i < 0) throw new Error("Proyecto no encontrado");
  rows[i] = { ...rows[i], ...input, updatedAt: now() };
  await localWrite("proyectos.json", rows);
  return rows[i];
}

export async function deleteProyecto(id: string): Promise<void> {
  if (usingSupabase()) {
    const { error } = await supa().from("vc_proyectos").delete().eq("id", id);
    if (error) throw error;
    return;
  }
  const rows = await localRead<Proyecto>("proyectos.json");
  await localWrite("proyectos.json", rows.filter((r) => r.id !== id));
}

// ─── Métricas (Overview) ──────────────────────────────────────────────────────
export async function adminMetrics() {
  const [empresas, proyectos] = await Promise.all([listEmpresas(), listProyectos()]);
  const activos = proyectos.filter((p) => p.progress < 100).length;
  const avg = proyectos.length ? Math.round(proyectos.reduce((s, p) => s + p.progress, 0) / proyectos.length) : 0;
  return {
    empresas: empresas.length,
    proyectos: proyectos.length,
    activos,
    progresoPromedio: avg,
  };
}
