// Tipos del dominio admin (VIVA CORE). Client-safe: sin imports de server.

export interface Empresa {
  id: string;
  name: string;
  contact: string;
  email: string;
  phone: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface Proyecto {
  id: string;
  name: string;
  category: string;
  status: string;
  progress: number;
  budget: string;
  empresaId: string | null;
  createdAt: string;
  updatedAt: string;
}

export type EmpresaInput = Partial<Omit<Empresa, "id" | "createdAt" | "updatedAt">>;
export type ProyectoInput = Partial<Omit<Proyecto, "id" | "createdAt" | "updatedAt">>;
