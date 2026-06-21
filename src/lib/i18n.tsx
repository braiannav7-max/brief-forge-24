import { createContext, useContext, useState, type ReactNode } from "react";

export type Lang = "es" | "pt";

const translations = {
  es: {
    nav: {
      dashboard: "Dashboard", projects: "Proyectos", briefings: "Ideas & Briefings",
      files: "Archivos", budgets: "Presupuestos", calendar: "Calendario",
      messages: "Mensajes", tasks: "Tareas", documents: "Documentos", reports: "Reportes",
      admin: "Admin",
      ai: "Análisis Inteligente", aiSuggestions: "Sugerencias IA",
      briefGenerator: "Generador de Brief", blueprints: "Blueprints",
      aiTools: "HERRAMIENTAS IA", generalProgress: "Progreso general", averageAdvance: "Avance promedio",
    },
    topbar: { search: "Buscar proyectos, ideas, archivos...", administrator: "Administrador", langSwitch: "PT" },
    dashboard: {
      welcome: "Bienvenido, Braian 👋",
      subtitle: "Gestiona todos los proyectos del Grupo Viva Búzios desde un solo lugar.",
      kpis: [
        { label: "Proyectos activos",     delta: "+1 esta semana" },
        { label: "Progreso promedio",     delta: "+12% vs. semana pasada" },
        { label: "Ideas registradas",     delta: "+8 esta semana" },
        { label: "Presupuestos enviados", delta: "+1 pendiente aprobación" },
      ],
      groupProjects: "Proyectos del Grupo", viewAll: "Ver todos los proyectos",
      progress: "Progreso", stage: "Etapa", lastAct: "Última act.",
      newProject: "Nuevo proyecto", newProjectSub: "Crear un nuevo proyecto para el grupo",
      recentActivity: "Actividad reciente", viewAllActivity: "Ver toda la actividad",
      pendingTasks: "Tareas pendientes", viewAllTasks: "Ver todas las tareas",
      upcomingMeetings: "Próximas reuniones", viewCalendar: "Ver calendario completo",
    },
    briefings: {
      title: "Ideas & Briefings",
      subtitle: "Enviá a cada empresa su link privado. El avance se actualiza en tiempo real.",
      sendAll: "Enviar todos los links", total: "Total", sent: "Enviados", pending: "Pendientes",
      sentStatus: "Enviado", inProgress: "En progreso", pendingStatus: "Pendiente",
      briefingProgress: "Progreso del briefing", copyLink: "Copiar link", copied: "Copiado",
      open: "Abrir", noAnswers: "Sin respuestas todavía", updatedAt: "Actualizado",
    },
    form: {
      previous: "Anterior", next: "Siguiente", submitFinish: "Enviar y finalizar",
      editAnswers: "Editar respuestas", sectionOf: "Sección {cur} de {tot}",
      saveIdle: "Se guarda solo", saving: "Guardando…", saved: "Guardado", unsaved: "Sin guardar",
      received: "Briefing recibido",
      receivedSub: "Gracias por completar la información de {name}. Con estos datos vamos a diseñar una experiencia web alineada con la estrategia de la marca y los objetivos comerciales del grupo.",
      invalidLink: "Link no válido",
      invalidText: "Este enlace de briefing no corresponde a ningún proyecto. Verificá la URL o pedí uno nuevo.",
      goHome: "Ir al inicio",
      sections: {
        general:          { title: "Información general",         description: "Lo esencial de la marca para entender quiénes son." },
        objetivo:         { title: "Objetivo de la página",       description: "¿Para qué tiene que servir el sitio?" },
        referencias:      { title: "Referencias visuales",        description: "Páginas que les gustan y por qué." },
        identidad:        { title: "Identidad visual",            description: "¿Con qué material de marca ya cuentan?" },
        estructura:       { title: "Estructura deseada",          description: "¿Qué secciones debería tener el sitio?" },
        funcionalidades:  { title: "Funcionalidades especiales",  description: "Lo que llevaría el sitio a otro nivel." },
        contenido:        { title: "Contenido",                   description: "¿Quién provee los textos, imágenes y videos?" },
        seo:              { title: "SEO y Marketing",             description: "Para posicionar y conectar con las campañas." },
        integraciones:    { title: "Integraciones",               description: "Herramientas a conectar con el sitio." },
        "marketing-ideas":{ title: "Ideas del equipo de marketing", description: "La dirección creativa que casi nunca se documenta." },
        libre:            { title: "Comentarios libres",          description: "El espacio para todo lo demás." },
      },
      fields: {
        "general.nombre":     { label: "Nombre comercial",              help: "" },
        "general.rubro":      { label: "Rubro",                         help: "" },
        "general.historia":   { label: "Historia de la empresa",        help: "" },
        "general.mision":     { label: "Misión",                        help: "" },
        "general.vision":     { label: "Visión",                        help: "" },
        "general.valores":    { label: "Valores",                       help: "" },
        "general.publico":    { label: "Público objetivo",              help: "" },
        "general.esencia":    { label: "¿Cómo describirían la esencia de esta marca?", help: "" },
        "objetivo.objetivos": { label: "Seleccionen todos los que apliquen", help: "" },
        "referencias.urls":   { label: "Páginas de referencia",         help: "Agreguen sitios que admiren, aunque sean de otros rubros." },
        "referencias.porque": { label: "¿Qué les gusta de esas referencias?", help: "" },
        "identidad.activos":  { label: "Ya cuentan con…",              help: "" },
        "identidad.archivos": { label: "Subí los archivos que tengas (logo, manual, fotos…)", help: "" },
        "estructura.secciones": { label: "Marquen todo lo que quieran incluir", help: "" },
        "funcionalidades.switches": { label: "Activen lo que les interese", help: "" },
        "funcionalidades.detalle":  { label: "¿Existe alguna funcionalidad específica que quieran implementar?", help: "" },
        "contenido.proveedor":  { label: "¿Quién proveerá el contenido?", help: "" },
        "contenido.disponible": { label: "¿Qué material ya tienen disponible?", help: "" },
        "seo.keywords":       { label: "Palabras clave importantes",    help: "" },
        "seo.competidores":   { label: "Competidores principales",      help: "" },
        "seo.regiones":       { label: "Ciudades o regiones objetivo",  help: "" },
        "seo.google_ads":     { label: "Campañas de Google Ads activas", help: "" },
        "seo.meta_ads":       { label: "Campañas Meta Ads activas",     help: "" },
        "integraciones.integraciones": { label: "Seleccionen las que usen o quieran usar", help: "" },
        "marketing-ideas.sensacion": { label: "¿Qué sensación debe transmitir la página al visitante?", help: "" },
        "marketing-ideas.accion":    { label: "¿Qué acción quieren que haga el usuario al entrar?", help: "" },
        "marketing-ideas.persona":   { label: "Si esta página fuera una persona, ¿cómo sería?", help: "" },
        "libre.notas":        { label: "Escriban cualquier idea, inspiración o detalle importante", help: "" },
      },
    },
  },
  pt: {
    nav: {
      dashboard: "Painel", projects: "Projetos", briefings: "Ideias & Briefings",
      files: "Arquivos", budgets: "Orçamentos", calendar: "Calendário",
      messages: "Mensagens", tasks: "Tarefas", documents: "Documentos", reports: "Relatórios",
      admin: "Admin",
      ai: "Análise Inteligente", aiSuggestions: "Sugestões IA",
      briefGenerator: "Gerador de Brief", blueprints: "Blueprints",
      aiTools: "FERRAMENTAS IA", generalProgress: "Progresso geral", averageAdvance: "Avanço médio",
    },
    topbar: { search: "Buscar projetos, ideias, arquivos...", administrator: "Administrador", langSwitch: "ES" },
    dashboard: {
      welcome: "Bem-vindo, Braian 👋",
      subtitle: "Gerencie todos os projetos do Grupo Viva Búzios em um só lugar.",
      kpis: [
        { label: "Projetos ativos",       delta: "+1 esta semana" },
        { label: "Progresso médio",       delta: "+12% vs. semana passada" },
        { label: "Ideias registradas",    delta: "+8 esta semana" },
        { label: "Orçamentos enviados",   delta: "+1 pendente aprovação" },
      ],
      groupProjects: "Projetos do Grupo", viewAll: "Ver todos os projetos",
      progress: "Progresso", stage: "Etapa", lastAct: "Última atv.",
      newProject: "Novo projeto", newProjectSub: "Criar um novo projeto para o grupo",
      recentActivity: "Atividade recente", viewAllActivity: "Ver toda a atividade",
      pendingTasks: "Tarefas pendentes", viewAllTasks: "Ver todas as tarefas",
      upcomingMeetings: "Próximas reuniões", viewCalendar: "Ver calendário completo",
    },
    briefings: {
      title: "Ideias & Briefings",
      subtitle: "Envie para cada empresa seu link privado. O progresso é atualizado em tempo real.",
      sendAll: "Enviar todos os links", total: "Total", sent: "Enviados", pending: "Pendentes",
      sentStatus: "Enviado", inProgress: "Em andamento", pendingStatus: "Pendente",
      briefingProgress: "Progresso do briefing", copyLink: "Copiar link", copied: "Copiado",
      open: "Abrir", noAnswers: "Sem respostas ainda", updatedAt: "Atualizado",
    },
    form: {
      previous: "Anterior", next: "Próximo", submitFinish: "Enviar e finalizar",
      editAnswers: "Editar respostas", sectionOf: "Seção {cur} de {tot}",
      saveIdle: "Salvo automaticamente", saving: "Salvando…", saved: "Salvo", unsaved: "Sem salvar",
      received: "Briefing recebido",
      receivedSub: "Obrigado por preencher as informações de {name}. Com esses dados vamos criar uma experiência web alinhada com a estratégia da marca e os objetivos comerciais do grupo.",
      invalidLink: "Link inválido",
      invalidText: "Este link de briefing não corresponde a nenhum projeto. Verifique a URL ou solicite um novo.",
      goHome: "Ir ao início",
      sections: {
        general:          { title: "Informações gerais",            description: "O essencial da marca para entender quem são." },
        objetivo:         { title: "Objetivo do site",              description: "Para que deve servir o site?" },
        referencias:      { title: "Referências visuais",           description: "Sites que vocês gostam e por quê." },
        identidad:        { title: "Identidade visual",             description: "Que material de marca vocês já têm?" },
        estructura:       { title: "Estrutura desejada",            description: "Quais seções o site deve ter?" },
        funcionalidades:  { title: "Funcionalidades especiais",     description: "O que levaria o site a outro nível." },
        contenido:        { title: "Conteúdo",                      description: "Quem fornece os textos, imagens e vídeos?" },
        seo:              { title: "SEO e Marketing",               description: "Para posicionar e conectar com as campanhas." },
        integraciones:    { title: "Integrações",                   description: "Ferramentas a conectar com o site." },
        "marketing-ideas":{ title: "Ideias da equipe de marketing", description: "A direção criativa que quase nunca é documentada." },
        libre:            { title: "Comentários livres",            description: "Espaço para tudo mais." },
      },
      fields: {
        "general.nombre":     { label: "Nome comercial",                  help: "" },
        "general.rubro":      { label: "Segmento",                        help: "" },
        "general.historia":   { label: "História da empresa",             help: "" },
        "general.mision":     { label: "Missão",                          help: "" },
        "general.vision":     { label: "Visão",                           help: "" },
        "general.valores":    { label: "Valores",                         help: "" },
        "general.publico":    { label: "Público-alvo",                    help: "" },
        "general.esencia":    { label: "Como vocês descreveriam a essência desta marca?", help: "" },
        "objetivo.objetivos": { label: "Selecionem todos os que se aplicam", help: "" },
        "referencias.urls":   { label: "Sites de referência",             help: "Adicionem sites que admiram, mesmo de outros segmentos." },
        "referencias.porque": { label: "O que vocês gostam nessas referências?", help: "" },
        "identidad.activos":  { label: "Vocês já têm…",                   help: "" },
        "identidad.archivos": { label: "Envie os arquivos que tiver (logo, manual, fotos…)", help: "" },
        "estructura.secciones": { label: "Marquem tudo o que quiserem incluir", help: "" },
        "funcionalidades.switches": { label: "Ativem o que lhes interessa", help: "" },
        "funcionalidades.detalle":  { label: "Existe alguma funcionalidade específica que queiram implementar?", help: "" },
        "contenido.proveedor":  { label: "Quem vai fornecer o conteúdo?", help: "" },
        "contenido.disponible": { label: "Que material já têm disponível?", help: "" },
        "seo.keywords":       { label: "Palavras-chave importantes",       help: "" },
        "seo.competidores":   { label: "Principais concorrentes",          help: "" },
        "seo.regiones":       { label: "Cidades ou regiões alvo",          help: "" },
        "seo.google_ads":     { label: "Campanhas Google Ads ativas",      help: "" },
        "seo.meta_ads":       { label: "Campanhas Meta Ads ativas",        help: "" },
        "integraciones.integraciones": { label: "Selecionem as que usam ou querem usar", help: "" },
        "marketing-ideas.sensacion": { label: "Que sensação o site deve transmitir ao visitante?", help: "" },
        "marketing-ideas.accion":    { label: "Que ação querem que o usuário faça ao entrar?", help: "" },
        "marketing-ideas.persona":   { label: "Se este site fosse uma pessoa, como seria?", help: "" },
        "libre.notas":        { label: "Escrevam qualquer ideia, inspiração ou detalhe importante", help: "" },
      },
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
  if (!ctx) throw new Error("useLang must be used inside <LanguageProvider>");
  return ctx;
}
