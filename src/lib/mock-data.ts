import type { ProjectStatus } from "@/components/app/Badge";

export type Project = {
  id: string;
  name: string;
  category: string;
  description: string;
  contact: string;
  email: string;
  phone: string;
  budget: string;
  start: string;
  delivery: string;
  status: ProjectStatus;
  stage: string;
  progress: number;
  updated: string;
  lastActivity: string;
  initials: string;
  accent: string;
  logoClass: string;
  coverImage?: string;
  hasVideo?: boolean;
  team: string[];
};

export const projects: Project[] = [
  {
    id: "bah-gastronomia",
    name: "BAH Gastronomía",
    category: "Hamburguería & Pizzería Artesanal",
    description: "Marca gastronómica con foco en delivery, reservas y campañas locales.",
    contact: "Equipo BAH",
    email: "marketing@bahbuzios.com",
    phone: "+55 22 99999 1100",
    budget: "R$ 18.500",
    start: "13 May 2026",
    delivery: "28 Jun 2026",
    status: "Diseño",
    stage: "Diseño",
    progress: 72,
    updated: "Hoy, 18:42",
    lastActivity: "Nuevo briefing completado",
    initials: "BAH",
    accent: "from-[oklch(0.58_0.19_28)] to-[oklch(0.5_0.2_22)]",
    logoClass: "bg-red-600 text-white",
    coverImage: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=85",
    hasVideo: true,
    team: ["BS", "MV", "LC", "+2"],
  },
  {
    id: "movida-buzios",
    name: "Movida Búzios",
    category: "Bar, Mixología & Club",
    description: "Experiencia nocturna premium con contenido audiovisual y reservas.",
    contact: "Equipo Movida",
    email: "brand@movidabuzios.com",
    phone: "+55 22 99999 2200",
    budget: "R$ 22.000",
    start: "15 May 2026",
    delivery: "12 Jul 2026",
    status: "Desarrollo",
    stage: "Desarrollo",
    progress: 65,
    updated: "Hoy, 17:30",
    lastActivity: "Comentario agregado",
    initials: "M",
    accent: "from-[oklch(0.63_0.2_305)] to-[oklch(0.58_0.18_245)]",
    logoClass: "bg-black text-amber-300 ring-1 ring-amber-400/40",
    coverImage: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1200&q=85",
    hasVideo: true,
    team: ["BS", "AG", "FR", "+3"],
  },
  {
    id: "silk-beach-club",
    name: "Silk Beach Club",
    category: "Restaurante & Beach Club",
    description: "Portal visual para gastronomía, eventos, beach service y reservas.",
    contact: "Dirección Silk",
    email: "contacto@silkbeachclub.com",
    phone: "+55 22 99999 3300",
    budget: "R$ 26.400",
    start: "10 May 2026",
    delivery: "30 Jun 2026",
    status: "Contenido",
    stage: "Contenido",
    progress: 80,
    updated: "Ayer, 21:15",
    lastActivity: "Presupuesto enviado",
    initials: "silk",
    accent: "from-[oklch(0.78_0.06_225)] to-[oklch(0.58_0.1_230)]",
    logoClass: "bg-white text-slate-900",
    coverImage: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=85",
    hasVideo: true,
    team: ["BS", "MV", "RN", "+4"],
  },
  {
    id: "buda-beach-buzios",
    name: "Buda Beach Búzios",
    category: "Restaurante & Lounge",
    description: "Sitio inmersivo para propuesta gastronómica, eventos y marca.",
    contact: "Equipo Buda Beach",
    email: "hello@budabeachbuzios.com",
    phone: "+55 22 99999 4400",
    budget: "R$ 16.800",
    start: "20 May 2026",
    delivery: "18 Jul 2026",
    status: "Briefing",
    stage: "Briefing",
    progress: 60,
    updated: "Ayer, 16:20",
    lastActivity: "Idea aprobada",
    initials: "BB",
    accent: "from-[oklch(0.72_0.14_52)] to-[oklch(0.52_0.13_35)]",
    logoClass: "bg-white text-orange-900",
    coverImage: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1200&q=85",
    hasVideo: true,
    team: ["BS", "LC", "RN", "+2"],
  },
  {
    id: "buzios-gastro-group",
    name: "Búzios Gastro Group",
    category: "Proyecto Corporativo",
    description: "Hub institucional para ordenar marcas, activos y oportunidades.",
    contact: "Dirección Grupo Viva",
    email: "core@vivabuzios.com",
    phone: "+55 22 99999 5500",
    budget: "R$ 31.000",
    start: "25 May 2026",
    delivery: "30 Ago 2026",
    status: "Planeación",
    stage: "Planeación",
    progress: 48,
    updated: "12 Jun, 11:05",
    lastActivity: "Arquitectura inicial creada",
    initials: "B",
    accent: "from-[oklch(0.65_0.1_215)] to-[oklch(0.45_0.08_230)]",
    logoClass: "bg-black text-white ring-1 ring-white/20",
    coverImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85",
    team: ["BS", "MV", "AG", "+2"],
  },
  {
    id: "mondo-khan",
    name: "Mondo Khan",
    category: "Galería de Arte & Cultura",
    description: "Experiencia editorial para arte, agenda cultural y colecciones.",
    contact: "Curaduría Mondo Khan",
    email: "studio@mondokhan.com",
    phone: "+55 22 99999 6600",
    budget: "R$ 20.600",
    start: "01 Jun 2026",
    delivery: "21 Jul 2026",
    status: "Desarrollo",
    stage: "Avanzado",
    progress: 80,
    updated: "Hoy, 12:10",
    lastActivity: "Video de portada subido",
    initials: "MK",
    accent: "from-[oklch(0.5_0.05_70)] to-[oklch(0.25_0.03_65)]",
    logoClass: "bg-zinc-950 text-white ring-1 ring-white/20",
    coverImage: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=1200&q=85",
    hasVideo: true,
    team: ["BS", "FR", "LC", "+1"],
  },
];

export const kpis = [
  { label: "Empresas activas", value: "6", delta: "100% del grupo", trend: "up" },
  { label: "Proyectos activos", value: "6", delta: "+1 esta semana", trend: "up" },
  { label: "Ideas registradas", value: "48", delta: "+8 esta semana", trend: "up" },
  { label: "Archivos subidos", value: "128", delta: "+22 esta semana", trend: "up" },
  { label: "Presupuestos enviados", value: "3", delta: "+1 pendiente aprobación", trend: "up" },
  { label: "Progreso promedio", value: "67%", delta: "+12% vs. semana pasada", trend: "up" },
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

export type ActivityType = "briefing" | "file" | "comment" | "budget" | "idea";

export const activities = [
  { type: "briefing" as ActivityType, label: "Nuevo briefing completado", sub: "BAH Gastronomía", time: "Hace 2h" },
  { type: "file" as ActivityType, label: "Archivo subido", sub: "Logo_nuevo_bah.png", time: "Hace 4h" },
  { type: "comment" as ActivityType, label: "Comentario agregado", sub: "Movida Búzios", time: "Hace 6h" },
  { type: "budget" as ActivityType, label: "Presupuesto enviado", sub: "Silk Beach Club", time: "Hace 1d" },
  { type: "idea" as ActivityType, label: "Idea aprobada", sub: "Buda Beach Búzios", time: "Hace 1d" },
];

export type TaskPriority = "Alta" | "Media" | "Baja";

export const tasks = [
  { label: "Revisar contenido home", project: "BAH Gastronomía", priority: "Alta" as TaskPriority },
  { label: "Aprobar presupuesto", project: "Silk Beach Club", priority: "Media" as TaskPriority },
  { label: "Subir fotos del local", project: "Movida Búzios", priority: "Media" as TaskPriority },
  { label: "Revisión de menú digital", project: "Buda Beach Búzios", priority: "Baja" as TaskPriority },
];

export const meetings = [
  { label: "Reunión BAH Gastronomía", date: "14 Jun, 15:00", avatars: ["BS", "MV", "+2"] },
  { label: "Reunión Movida Búzios", date: "15 Jun, 16:00", avatars: ["BS", "AG"] },
];
