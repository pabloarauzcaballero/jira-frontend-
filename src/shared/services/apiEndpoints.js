export const TODO_ENDPOINT = "TODO_ENDPOINT";

export const buildPath = (path, params = {}) =>
  Object.entries(params).reduce(
    (currentPath, [key, value]) => currentPath.replace(`:${key}`, encodeURIComponent(value)),
    path
  );

export const API_ENDPOINTS = {
  auth: {
    login: "/api/auth/login",
    signup: "/api/auth/signup",
    logout: "/api/auth/logout",
    refreshSession: "/api/auth/refreshSession",
    me: "/api/auth/me",
  },
  usuarios: {
    list: "/api/usuarios",
    detail: (idUsuario) => `/api/usuarios/${idUsuario}`,
    create: "/api/auth/signup",
    update: (idUsuario) => `/api/usuarios/${idUsuario}`,
    delete: (idUsuario) => `/api/usuarios/${idUsuario}`,
    tags: TODO_ENDPOINT,
  },
  proyectos: {
    list: "/api/proyectos",
    detail: (idProyecto) => `/api/proyectos/${idProyecto}`,
    create: "/api/proyectos",
    update: (idProyecto) => `/api/proyectos/${idProyecto}`,
    delete: (idProyecto) => `/api/proyectos/${idProyecto}`,
    miembros: {
      list: (idProyecto) => `/api/proyectos/${idProyecto}/miembros`,
      create: (idProyecto) => `/api/proyectos/${idProyecto}/miembros`,
      update: (idProyecto, idUsuario) => `/api/proyectos/${idProyecto}/miembros/${idUsuario}`,
      delete: (idProyecto, idUsuario) => `/api/proyectos/${idProyecto}/miembros/${idUsuario}`,
    },
  },
  proyectoAsignacion: {
    listByProyecto: (idProyecto) => `/api/tickets/proyecto/${idProyecto}/asignaciones`,
    listByTicket: (idTicket) => `/api/tickets/${idTicket}/asignaciones`,
    create: (idTicket) => `/api/tickets/${idTicket}/asignaciones`,
    update: (idAsignacion) => `/api/tickets/asignaciones/${idAsignacion}`,
    delete: (idAsignacion) => `/api/tickets/asignaciones/${idAsignacion}`,
  },
  tickets: {
    list: "/api/tickets",
    listByProyecto: (idProyecto) => `/api/tickets/proyecto/${idProyecto}`,
    detail: (idTicket) => `/api/tickets/${idTicket}`,
    create: "/api/tickets",
    update: (idTicket) => `/api/tickets/${idTicket}`,
    delete: (idTicket) => `/api/tickets/${idTicket}`,
    changeStatus: (idTicket) => `/api/tickets/${idTicket}/status`,
    changeEstadoRegistro: (idTicket) => `/api/tickets/${idTicket}/estado-registro`,
    tasks: (idTicket) => `/api/tickets/${idTicket}/tasks`,
    acceptanceCriteria: (idTicket) => `/api/tickets/${idTicket}/acceptance-criteria`,
  },
  ticketActualizacion: {
    listByAssignment: (idAsignacion) => `/api/tickets/asignaciones/${idAsignacion}/actualizaciones`,
    listByTicket: (idTicket) => `/api/tickets/${idTicket}/actualizaciones`,
    list: TODO_ENDPOINT,
    create: (idAsignacion) => `/api/tickets/asignaciones/${idAsignacion}/actualizaciones`,
    update: (idActualizacion) => `/api/tickets/actualizaciones/${idActualizacion}`,
    delete: (idActualizacion) => `/api/tickets/actualizaciones/${idActualizacion}`,
  },
  ticketAcciones: {
    list: (idTicket) => `/api/tickets/${idTicket}/tasks`,
    create: (idTicket) => `/api/tickets/${idTicket}/tasks`,
    delete: (idTicket) => `/api/tickets/${idTicket}/tasks`,
  },
  ticketCriteriosAceptacion: {
    list: (idTicket) => `/api/tickets/${idTicket}/acceptance-criteria`,
    create: (idTicket) => `/api/tickets/${idTicket}/acceptance-criteria`,
    delete: (idTicket) => `/api/tickets/${idTicket}/acceptance-criteria`,
  },
};
