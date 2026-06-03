import type { ProjectStatus } from "@/components/app/Badge";

export type Project = {
  id: string;
  name: string;
  contact: string;
  email: string;
  phone: string;
  budget: string;
  start: string;
  delivery: string;
  status: ProjectStatus;
  progress: number;
  updated: string;
  initials: string;
  accent: string;
};

export const projects: Project[] = [
  { id: "restaurantes-del-mar", name: "Restaurantes Del Mar", contact: "Laura Méndez", email: "laura@delmar.com", phone: "+54 11 5555 1100", budget: "$8.400", start: "01 May 2026", delivery: "30 Jun 2026", status: "Diseño", progress: 60, updated: "Hoy 10:24 AM", initials: "DM", accent: "from-[oklch(0.7_0.13_25)] to-[oklch(0.6_0.16_25)]" },
  { id: "innova-studio",        name: "Innova Studio",        contact: "Marco Ruiz",   email: "marco@innova.io",  phone: "+54 11 5555 2200", budget: "$6.200", start: "12 May 2026", delivery: "22 Jul 2026", status: "Briefing", progress: 30, updated: "Ayer 03:15 PM", initials: "IS", accent: "from-[oklch(0.6_0.15_260)] to-[oklch(0.5_0.18_270)]" },
  { id: "muebleria-estilo",     name: "Mueblería Estilo",     contact: "Sofía Torres", email: "sofia@estilo.com", phone: "+54 11 5555 3300", budget: "$11.900", start: "20 Abr 2026", delivery: "18 Jul 2026", status: "Desarrollo", progress: 75, updated: "Ayer 11:42 AM", initials: "ME", accent: "from-[oklch(0.65_0.13_60)] to-[oklch(0.55_0.15_55)]" },
  { id: "clinica-vitalis",      name: "Clínica Vitalis",      contact: "Dr. Pablo Gómez", email: "pablo@vitalis.health", phone: "+54 11 5555 4400", budget: "$15.500", start: "05 Mar 2026", delivery: "05 Jun 2026", status: "Testing", progress: 90, updated: "12 May 09:30 AM", initials: "CV", accent: "from-[oklch(0.7_0.12_160)] to-[oklch(0.55_0.14_165)]" },
  { id: "viajes-andina",        name: "Viajes Andina",        contact: "Camila Ríos",  email: "camila@andina.tur", phone: "+54 11 5555 5500", budget: "$4.800", start: "25 May 2026", delivery: "30 Ago 2026", status: "Pendiente", progress: 10, updated: "10 May 04:20 PM", initials: "VA", accent: "from-[oklch(0.7_0.13_220)] to-[oklch(0.55_0.15_230)]" },
];

export const kpis = [
  { label: "Clientes activos",    value: "24",      delta: "+12% este mes", trend: "up" },
  { label: "Proyectos abiertos",  value: "12",      delta: "+8% este mes",  trend: "up" },
  { label: "Pendientes de revisión", value: "5",    delta: "+15% este mes", trend: "up" },
  { label: "Ingresos proyectados", value: "$24.500", delta: "+18% este mes", trend: "up" },
];

export const documents = [
  { name: "Blueprint del Proyecto",  date: "15 May 2024", size: "2.4 MB" },
  { name: "Resumen Ejecutivo",        date: "15 May 2024", size: "840 KB" },
  { name: "Arquitectura Web",         date: "15 May 2024", size: "1.6 MB" },
  { name: "SEO Inicial",              date: "15 May 2024", size: "612 KB" },
  { name: "Propuesta Comercial",      date: "15 May 2024", size: "1.1 MB" },
];

export const roadmap = [
  { label: "Briefing recibido", status: "done",    date: "10 May 2026" },
  { label: "Análisis IA",       status: "done",    date: "11 May 2026" },
  { label: "Diseño UX",         status: "current", date: "En progreso" },
  { label: "Diseño UI",         status: "todo",    date: "Pendiente" },
  { label: "Desarrollo",        status: "todo",    date: "Pendiente" },
  { label: "Testing",           status: "todo",    date: "Pendiente" },
  { label: "Entrega",           status: "todo",    date: "Pendiente" },
];

export const chat = [
  { who: "Braian (Tú)", time: "10:24 AM", me: true,  text: "Hola equipo, ya completé la sección de objetivos. Por favor revisen." },
  { who: "Cliente",     time: "10:28 AM", me: false, text: "Perfecto Braian, lo estamos revisando ahora. Te confirmo si necesitamos algo más." },
  { who: "Braian (Tú)", time: "10:30 AM", me: true,  text: "Genial, también agregué algunas referencias en la sección de identidad visual." },
];
