import { createContext, useContext, useState, type ReactNode } from "react";

export type Lang = "es" | "pt";

const translations = {
  es: {
    nav: {
      dashboard: "Dashboard",
      projects: "Proyectos",
      briefings: "Ideas & Briefings",
      files: "Archivos",
      budgets: "Presupuestos",
      calendar: "Calendario",
      messages: "Mensajes",
      tasks: "Tareas",
      documents: "Documentos",
      reports: "Reportes",
      ai: "Análisis Inteligente",
      aiSuggestions: "Sugerencias IA",
      briefGenerator: "Generador de Brief",
      blueprints: "Blueprints",
      aiTools: "HERRAMIENTAS IA",
      generalProgress: "Progreso general",
      averageAdvance: "Avance promedio",
    },
    topbar: {
      search: "Buscar proyectos, ideas, archivos...",
      administrator: "Administrador",
      langSwitch: "PT",
    },
    dashboard: {
      welcome: "Bienvenido, Braian 👋",
      subtitle: "Gestiona todos los proyectos del Grupo Viva Búzios desde un solo lugar.",
      kpis: [
        { label: "Proyectos activos",     delta: "+1 esta semana" },
        { label: "Progreso promedio",     delta: "+12% vs. semana pasada" },
        { label: "Ideas registradas",     delta: "+8 esta semana" },
        { label: "Presupuestos enviados", delta: "+1 pendiente aprobación" },
      ],
      groupProjects: "Proyectos del Grupo",
      viewAll: "Ver todos los proyectos",
      progress: "Progreso",
      stage: "Etapa",
      lastAct: "Última act.",
      newProject: "Nuevo proyecto",
      newProjectSub: "Crear un nuevo proyecto para el grupo",
      recentActivity: "Actividad reciente",
      viewAllActivity: "Ver toda la actividad",
      pendingTasks: "Tareas pendientes",
      viewAllTasks: "Ver todas las tareas",
      upcomingMeetings: "Próximas reuniones",
      viewCalendar: "Ver calendario completo",
    },
    briefings: {
      title: "Ideas & Briefings",
      subtitle: "Enviá a cada empresa su link privado. El avance se actualiza en tiempo real.",
      sendAll: "Enviar todos los links",
      total: "Total",
      sent: "Enviados",
      pending: "Pendientes",
      sentStatus: "Enviado",
      inProgress: "En progreso",
      pendingStatus: "Pendiente",
      briefingProgress: "Progreso del briefing",
      copyLink: "Copiar link",
      copied: "Copiado",
      open: "Abrir",
      noAnswers: "Sin respuestas todavía",
      updatedAt: "Actualizado",
    },
  },
  pt: {
    nav: {
      dashboard: "Painel",
      projects: "Projetos",
      briefings: "Ideias & Briefings",
      files: "Arquivos",
      budgets: "Orçamentos",
      calendar: "Calendário",
      messages: "Mensagens",
      tasks: "Tarefas",
      documents: "Documentos",
      reports: "Relatórios",
      ai: "Análise Inteligente",
      aiSuggestions: "Sugestões IA",
      briefGenerator: "Gerador de Brief",
      blueprints: "Blueprints",
      aiTools: "FERRAMENTAS IA",
      generalProgress: "Progresso geral",
      averageAdvance: "Avanço médio",
    },
    topbar: {
      search: "Buscar projetos, ideias, arquivos...",
      administrator: "Administrador",
      langSwitch: "ES",
    },
    dashboard: {
      welcome: "Bem-vindo, Braian 👋",
      subtitle: "Gerencie todos os projetos do Grupo Viva Búzios em um só lugar.",
      kpis: [
        { label: "Projetos ativos",       delta: "+1 esta semana" },
        { label: "Progresso médio",       delta: "+12% vs. semana passada" },
        { label: "Ideias registradas",    delta: "+8 esta semana" },
        { label: "Orçamentos enviados",   delta: "+1 pendente aprovação" },
      ],
      groupProjects: "Projetos do Grupo",
      viewAll: "Ver todos os projetos",
      progress: "Progresso",
      stage: "Etapa",
      lastAct: "Última atv.",
      newProject: "Novo projeto",
      newProjectSub: "Criar um novo projeto para o grupo",
      recentActivity: "Atividade recente",
      viewAllActivity: "Ver toda a atividade",
      pendingTasks: "Tarefas pendentes",
      viewAllTasks: "Ver todas as tarefas",
      upcomingMeetings: "Próximas reuniões",
      viewCalendar: "Ver calendário completo",
    },
    briefings: {
      title: "Ideias & Briefings",
      subtitle: "Envie para cada empresa seu link privado. O progresso é atualizado em tempo real.",
      sendAll: "Enviar todos os links",
      total: "Total",
      sent: "Enviados",
      pending: "Pendentes",
      sentStatus: "Enviado",
      inProgress: "Em andamento",
      pendingStatus: "Pendente",
      briefingProgress: "Progresso do briefing",
      copyLink: "Copiar link",
      copied: "Copiado",
      open: "Abrir",
      noAnswers: "Sem respostas ainda",
      updatedAt: "Atualizado",
    },
  },
} as const;

export type Translations = typeof translations.es;

interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
}

const LangContext = createContext<LangContextValue | null>(null);
const LANG_KEY = "viva-lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "pt";
    return (localStorage.getItem(LANG_KEY) as Lang) ?? "pt";
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem(LANG_KEY, l); } catch { /* noop */ }
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] as Translations }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang debe usarse dentro de <LanguageProvider>");
  return ctx;
}
