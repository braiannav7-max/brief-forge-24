// Tipos del briefing — CRM para Agencias

export type FieldType =
  | "text"
  | "textarea"
  | "longtext"
  | "checkboxes"
  | "radio"
  | "switches"
  | "urls"
  | "files";

export interface Field {
  id: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  help?: string;
  options?: string[];
  allowOther?: boolean;
}

export interface Section {
  id: string;
  title: string;
  icon: string; // nombre de icono lucide-react
  description?: string;
  fields: Field[];
}

export type FieldValue =
  | string
  | string[]
  | { selected: string[]; other?: string }
  | { urls: string[] }
  | { files: { name: string; size: number }[] };

export interface BriefingData {
  token: string;
  companySlug: string;
  answers: Record<string, FieldValue>; // clave = `${sectionId}.${fieldId}`
  submitted: boolean;
  updatedAt: string;
  createdAt: string;
}
