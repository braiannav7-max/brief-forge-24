import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  listEmpresas, createEmpresa, updateEmpresa, deleteEmpresa,
  listProyectos, createProyecto, updateProyecto, deleteProyecto,
  adminMetrics,
} from "../server/admin-store.server";

// Server functions del admin. El body de .handler corre solo en el server;
// admin-store.server.ts (service-role de Supabase) nunca llega al cliente.

const empresaInput = z.object({
  name: z.string().min(1).optional(),
  contact: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  status: z.string().optional(),
});
const proyectoInput = z.object({
  name: z.string().min(1).optional(),
  category: z.string().optional(),
  status: z.string().optional(),
  progress: z.number().int().min(0).max(100).optional(),
  budget: z.string().optional(),
  empresaId: z.string().nullable().optional(),
});

// ── Overview ──
export const getAdminMetricsFn = createServerFn({ method: "GET" }).handler(async () => adminMetrics());

// ── Empresas ──
export const listEmpresasFn = createServerFn({ method: "GET" }).handler(async () => listEmpresas());
export const createEmpresaFn = createServerFn({ method: "POST" })
  .inputValidator(empresaInput)
  .handler(async ({ data }) => createEmpresa(data));
export const updateEmpresaFn = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.string().min(1), patch: empresaInput }))
  .handler(async ({ data }) => updateEmpresa(data.id, data.patch));
export const deleteEmpresaFn = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.string().min(1) }))
  .handler(async ({ data }) => { await deleteEmpresa(data.id); return { ok: true }; });

// ── Proyectos ──
export const listProyectosFn = createServerFn({ method: "GET" }).handler(async () => listProyectos());
export const createProyectoFn = createServerFn({ method: "POST" })
  .inputValidator(proyectoInput)
  .handler(async ({ data }) => createProyecto(data));
export const updateProyectoFn = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.string().min(1), patch: proyectoInput }))
  .handler(async ({ data }) => updateProyecto(data.id, data.patch));
export const deleteProyectoFn = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.string().min(1) }))
  .handler(async ({ data }) => { await deleteProyecto(data.id); return { ok: true }; });
