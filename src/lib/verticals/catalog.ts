// Catálogo de funcionalidades: la "capability matrix" de la plataforma.
//
// BASE_FEATURES = el piso común a TODOS los comercios.
// VERTICAL_FEATURES = lo que suma cada rubro encima de la base.
//
// Para sumar/quitar una funcionalidad a un rubro, editás SOLO este archivo.

import type { VerticalFeature, VerticalKey } from "./types";

/** Funcionalidades comunes a todos los comercios (la misma base para todos). */
export const BASE_FEATURES: VerticalFeature[] = [
  {
    id: "resumen",
    label: "Resumen",
    description: "Vista general del comercio: KPIs y estado.",
    icon: "LayoutDashboard",
    scope: "base",
  },
  {
    id: "novedades",
    label: "Novedades",
    description: "Feed de actividad del comercio.",
    icon: "Newspaper",
    scope: "base",
  },
  {
    id: "mensajes",
    label: "Mensajes",
    description: "Bandeja unificada de consultas.",
    icon: "MessageSquare",
    scope: "base",
  },
  {
    id: "contactos",
    label: "Contactos",
    description: "CRM básico de clientes y leads.",
    icon: "Users",
    scope: "base",
  },
  {
    id: "archivos",
    label: "Archivos",
    description: "Documentos y material del comercio.",
    icon: "FolderArchive",
    scope: "base",
  },
];

/** Funcionalidades específicas de cada vertical (rubro). */
export const VERTICAL_FEATURES: Record<VerticalKey, VerticalFeature[]> = {
  inmobiliaria: [
    {
      id: "propiedades",
      label: "Cartera de propiedades",
      description: "Alta y gestión de inmuebles con fichas.",
      icon: "Building2",
      scope: "vertical",
    },
    {
      id: "visitas",
      label: "Agenda de visitas",
      description: "Coordinación de visitas a propiedades.",
      icon: "CalendarClock",
      scope: "vertical",
    },
    {
      id: "matching",
      label: "Match comprador–propiedad",
      description: "Cruza búsquedas con el inventario.",
      icon: "HeartHandshake",
      scope: "vertical",
    },
    {
      id: "tasaciones",
      label: "Tasaciones",
      description: "Solicitudes y valuaciones de inmuebles.",
      icon: "Calculator",
      scope: "vertical",
    },
  ],
  gastronomia: [
    {
      id: "menu",
      label: "Menú digital",
      description: "Carta editable con precios y fotos.",
      icon: "UtensilsCrossed",
      scope: "vertical",
    },
    {
      id: "reservas",
      label: "Reservas de mesa",
      description: "Gestión de reservas y ocupación.",
      icon: "CalendarCheck",
      scope: "vertical",
    },
    {
      id: "pedidos",
      label: "Pedidos / Delivery",
      description: "Pedidos online y seguimiento.",
      icon: "ShoppingBag",
      scope: "vertical",
    },
    {
      id: "resenas",
      label: "Reseñas",
      description: "Reputación y respuestas a clientes.",
      icon: "Star",
      scope: "vertical",
    },
  ],
  marketing: [
    {
      id: "campanas",
      label: "Campañas",
      description: "Gestión de campañas Meta y Google.",
      icon: "Megaphone",
      scope: "vertical",
    },
    {
      id: "contenido",
      label: "Calendario de contenido",
      description: "Planificación y aprobación de posts.",
      icon: "CalendarDays",
      scope: "vertical",
    },
    {
      id: "reportes",
      label: "Reportes de performance",
      description: "Métricas y reportes al cliente.",
      icon: "BarChart3",
      scope: "vertical",
    },
    {
      id: "leads",
      label: "Leads",
      description: "Captación y seguimiento de leads.",
      icon: "Filter",
      scope: "vertical",
    },
  ],
  trading: [
    {
      id: "diario",
      label: "Diario de trading",
      description: "Registro de operaciones con R:R.",
      icon: "BookOpen",
      scope: "vertical",
    },
    {
      id: "senales",
      label: "Señales",
      description: "Publicación de setups y alertas.",
      icon: "Radio",
      scope: "vertical",
    },
    {
      id: "performance",
      label: "Performance de cuenta",
      description: "Curva de capital y estadísticas.",
      icon: "LineChart",
      scope: "vertical",
    },
  ],
  ecommerce: [
    {
      id: "catalogo",
      label: "Catálogo",
      description: "Productos, variantes y precios.",
      icon: "Boxes",
      scope: "vertical",
    },
    {
      id: "pedidos",
      label: "Pedidos",
      description: "Órdenes y estados de envío.",
      icon: "ShoppingCart",
      scope: "vertical",
    },
    {
      id: "stock",
      label: "Inventario",
      description: "Control de stock y alertas.",
      icon: "Warehouse",
      scope: "vertical",
    },
    {
      id: "cupones",
      label: "Cupones",
      description: "Promociones y descuentos.",
      icon: "Ticket",
      scope: "vertical",
    },
  ],
  eventos: [
    {
      id: "entradas",
      label: "Venta de entradas",
      description: "Tickets, cupos y precios.",
      icon: "Ticket",
      scope: "vertical",
    },
    {
      id: "invitados",
      label: "Invitados / RSVP",
      description: "Listas y confirmaciones.",
      icon: "UserCheck",
      scope: "vertical",
    },
    {
      id: "agenda-eventos",
      label: "Agenda de eventos",
      description: "Próximos eventos y line-up.",
      icon: "CalendarDays",
      scope: "vertical",
    },
  ],
  servicios: [
    {
      id: "turnos",
      label: "Agenda de turnos",
      description: "Reservas de turnos y citas.",
      icon: "CalendarClock",
      scope: "vertical",
    },
    {
      id: "fichas",
      label: "Fichas de clientes",
      description: "Historial por cliente.",
      icon: "ClipboardList",
      scope: "vertical",
    },
    {
      id: "presupuestos",
      label: "Presupuestos",
      description: "Cotizaciones y aprobaciones.",
      icon: "FileText",
      scope: "vertical",
    },
  ],
  generico: [
    {
      id: "web",
      label: "Sitio web",
      description: "Páginas y secciones del sitio.",
      icon: "Globe",
      scope: "vertical",
    },
    {
      id: "formularios",
      label: "Formularios",
      description: "Captación de contactos.",
      icon: "FormInput",
      scope: "vertical",
    },
  ],
};
