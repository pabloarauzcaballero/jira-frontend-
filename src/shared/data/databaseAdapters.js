import {
  ticketStatusOptions,
  ticketPriorityOptions,
  estadoRegistroOptions,
  formatDbLabel,
} from "./databaseOptions.js";

export function initialsFromName(name = "") {
  return String(name)
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export function formatDateTime(value) {
  if (!value) return "Sin actualización";

  return new Intl.DateTimeFormat("es-BO", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function truncateText(value = "", maxLength = 64) {
  const text = String(value ?? "");

  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 3)}...`;
}

export function toUserOption(usuario = {}) {
  const idUsuario = usuario.id_usuario ?? usuario.id;
  const nombre = usuario.nombre ?? usuario.name ?? usuario.email ?? "Usuario";
  const posicion = usuario.posicion_principal ?? usuario.position ?? "Sin posición";

  return {
    value: idUsuario ? String(idUsuario) : "",
    label: `${nombre} — ${posicion}`,
    raw: usuario,
  };
}

export function toProjectOption(proyecto = {}) {
  const idProyecto = proyecto.id_proyecto ?? proyecto.id;
  const nombre = proyecto.nombre ?? proyecto.name ?? `Proyecto #${idProyecto ?? "N/D"}`;
  const descripcion = proyecto.descripcion ?? proyecto.description ?? "Proyecto sin descripción";

  return {
    value: idProyecto ? String(idProyecto) : "",
    label: `${nombre} — ${truncateText(descripcion, 72)}`,
    raw: proyecto,
  };
}

export function toMember(usuario = {}, extra = {}) {
  const idUsuario = usuario.id_usuario ?? usuario.id;
  const nombre = usuario.nombre ?? usuario.name ?? usuario.email ?? "Usuario";
  const posicion = usuario.posicion_principal ?? usuario.position ?? usuario.rol ?? "Sin posición asignada";

  return {
    id: idUsuario,
    id_usuario: idUsuario,
    nombre,
    email: usuario.email ?? "",
    rol: posicion,
    posicion_principal: posicion,
    estado_registro: usuario.estado_registro ?? "ACTIVO",
    timezone: usuario.timezone,
    is_two_factors: Boolean(usuario.is_two_factors ?? usuario.isTwoFactors ?? false),
    urlProfile: usuario.urlProfile ?? usuario.avatarUrl ?? null,
    initials: initialsFromName(nombre),
    tags: Array.isArray(usuario.tags) ? usuario.tags : [],
    ticketsAsignados: Array.isArray(usuario.ticketsAsignados) ? usuario.ticketsAsignados : [],
    ...extra,
  };
}

export function toProjectCard(proyecto = {}, members = []) {
  const idProyecto = proyecto.id_proyecto ?? proyecto.id;
  const estado = proyecto.estado_registro ?? proyecto.status ?? "ACTIVO";

  return {
    id: idProyecto,
    id_proyecto: idProyecto,
    name: proyecto.nombre ?? proyecto.name ?? `Proyecto #${idProyecto ?? "N/D"}`,
    key: proyecto.key ?? `PROY-${idProyecto ?? "N/D"}`,
    initials: proyecto.initials ?? `P${idProyecto ?? ""}`,
    status: estado,
    tone: estado === "INACTIVO" ? "tertiary" : "primary",
    description: proyecto.descripcion ?? proyecto.description ?? "Sin descripción del proyecto.",
    updatedAt: `Actualizado: ${formatDateTime(proyecto.actualizado_en ?? proyecto.updatedAt)}`,
    members,
  };
}

export function splitProjectCards(proyectos = []) {
  const cards = proyectos.map((proyecto) => toProjectCard(proyecto, proyecto.members ?? []));

  return {
    currentProjects: cards.filter((project) => project.status !== "INACTIVO"),
    recentProjects: cards.filter((project) => project.status === "INACTIVO"),
  };
}

export function toBoardTicket(ticket = {}, assignee = null) {
  const idTicket = ticket.id_ticket ?? ticket.id;

  return {
    id: idTicket,
    id_ticket: idTicket,
    title: ticket.nombre ?? ticket.title ?? "Ticket sin título",
    description: ticket.descripcion ?? ticket.description ?? "Sin descripción.",
    issueKey: ticket.issueKey ?? `TCK-${idTicket ?? "N/D"}`,
    priority: ticket.prioridad ?? ticket.priority ?? "MEDIA",
    status: ticket.status ?? "PENDIENTE",
    estado_registro: ticket.estado_registro ?? "ACTIVO",
    assigneeUrl: assignee?.urlProfile ?? assignee?.avatarUrl ?? "",
    assigneeName: assignee?.nombre ?? assignee?.name ?? "Sin asignar",
  };
}

export function groupTicketsByStatus(tickets = []) {
  return ticketStatusOptions.reduce((accumulator, statusOption) => {
    accumulator[statusOption.value] = tickets
      .filter((ticket) => ticket.status === statusOption.value)
      .map((ticket) => toBoardTicket(ticket, ticket.assignee));

    return accumulator;
  }, {});
}

export function buildEmptyTicketsByStatus(statuses = ticketStatusOptions) {
  return statuses.reduce((accumulator, statusOption) => {
    accumulator[statusOption.value] = [];
    return accumulator;
  }, {});
}

export function buildProfileDataFromUser(usuario = null) {
  const currentUser = usuario ?? {};
  const nombre = currentUser.nombre ?? currentUser.name ?? "Usuario";
  const posicion = currentUser.posicion_principal ?? currentUser.position ?? "Sin posición asignada";

  return {
    user: {
      name: nombre,
      position: posicion,
      avatarUrl: currentUser.avatarUrl ?? currentUser.urlProfile ?? null,
      initials: initialsFromName(nombre),
      tags: Array.isArray(currentUser.tags) ? currentUser.tags : [],
    },
    security: {
      twoFactorEnabled: Boolean(currentUser.is_two_factors ?? currentUser.isTwoFactors ?? false),
      twoFactorLabel: currentUser.is_two_factors
        ? "Activo según la sesión actual"
        : "Pendiente de activar o sincronizar con backend",
      actions: ["Cambiar contraseña", "Revisar estado de cuenta"],
    },
    accountDetails: {
      email: currentUser.email || "Sin email sincronizado",
      phone: currentUser.telefono ?? currentUser.phone ?? "Sin teléfono",
      timezone: currentUser.timezone ?? "America/La_Paz",
      manager: {
        name: "Pendiente de backend",
        initials: "PB",
      },
    },
    activities: [],
  };
}

export function buildEmptyIssueDetail(currentUser = null) {
  const assigneeName = currentUser?.nombre ?? currentUser?.name ?? "Sin asignar";

  return {
    key: "TCK-PENDIENTE",
    workspace: "Workspace principal",
    projectName: "Proyecto pendiente de selección",
    projectShortName: "PROY",
    title: "Ticket pendiente de cargar",
    type: "Ticket",
    status: formatDbLabel("PENDIENTE"),
    statusValue: "PENDIENTE",
    priority: formatDbLabel("MEDIA"),
    priorityValue: "MEDIA",
    createdAt: "Creado: pendiente de backend",
    createdDate: "Pendiente",
    updatedAt: "Pendiente",
    estado_registro: "ACTIVO",
    assignee: {
      name: assigneeName,
      role: currentUser?.posicion_principal ?? currentUser?.position ?? "N/A",
      avatarUrl: currentUser?.avatarUrl ?? currentUser?.urlProfile ?? null,
      initials: initialsFromName(assigneeName),
    },
    reporter: {
      name: currentUser?.nombre ?? currentUser?.name ?? "Pendiente",
      avatarUrl: currentUser?.avatarUrl ?? currentUser?.urlProfile ?? null,
      initials: initialsFromName(currentUser?.nombre ?? currentUser?.name ?? "Pendiente"),
    },
    description: {
      paragraphs: [
        "Conecta API_ENDPOINTS.tickets.detail para cargar el detalle real del ticket desde tu backend.",
      ],
      points: [],
      acceptanceCriteria: [],
    },
  };
}

export function buildTicketCreatePayload(formData, reporterId = null) {
  return {
    nombre: formData.nombre.trim(),
    descripcion: formData.descripcion.trim(),
    prioridad: formData.prioridad,
    id_proyecto: Number(formData.id_proyecto),
    id_usuario: Number(formData.id_usuario || reporterId),
    tasks: formData.acciones.filter(Boolean),
    acceptanceCriteria: formData.criterios_aceptacion.filter(Boolean),
  };
}

export function unwrapProyectoMiembro(row = {}) {
  const usuario = row.usuario ?? row.user ?? row;

  return toMember(usuario, {
    id: usuario.id_usuario ?? row.id_usuario,
    id_usuario: usuario.id_usuario ?? row.id_usuario,
    cargo: row.cargo ?? usuario.cargo ?? "MIEMBRO",
    rol: row.cargo ?? usuario.posicion_principal ?? "MIEMBRO",
    estado_registro: row.estado_registro ?? usuario.estado_registro ?? "ACTIVO",
  });
}

export function toIssueDetail(ticket = {}, currentUser = null) {
  if (!ticket) return buildEmptyIssueDetail(currentUser);

  const idTicket = ticket.id_ticket ?? ticket.id;
  const title = ticket.nombre ?? ticket.title ?? "Ticket sin título";
  const statusValue = ticket.status ?? "PENDIENTE";
  const priorityValue = ticket.prioridad ?? "MEDIA";
  const firstAssignment = Array.isArray(ticket.asignaciones) ? ticket.asignaciones[0] : null;
  const assignee = firstAssignment?.usuario ?? currentUser;
  const assigneeName = assignee?.nombre ?? assignee?.email ?? "Sin asignar";

  return {
    key: `TCK-${idTicket ?? "N/D"}`,
    workspace: "Workspace principal",
    projectName: ticket.proyecto?.nombre ?? `Proyecto #${firstAssignment?.id_proyecto ?? "N/D"}`,
    projectShortName: `PROY-${firstAssignment?.id_proyecto ?? "N/D"}`,
    title,
    type: "Ticket",
    status: formatDbLabel(statusValue),
    statusValue,
    priority: formatDbLabel(priorityValue),
    priorityValue,
    createdAt: `Creado: ${formatDateTime(ticket.fecha_creacion)}`,
    createdDate: formatDateTime(ticket.fecha_creacion),
    updatedAt: formatDateTime(ticket.actualizado_en ?? ticket.fecha_creacion),
    estado_registro: ticket.estado_registro ?? "ACTIVO",
    assignee: {
      name: assigneeName,
      role: assignee?.posicion_principal ?? "N/A",
      avatarUrl: assignee?.avatarUrl ?? assignee?.urlProfile ?? null,
      initials: initialsFromName(assigneeName),
    },
    reporter: {
      name: currentUser?.nombre ?? currentUser?.email ?? "Pendiente",
      avatarUrl: currentUser?.avatarUrl ?? currentUser?.urlProfile ?? null,
      initials: initialsFromName(currentUser?.nombre ?? currentUser?.email ?? "Pendiente"),
    },
    description: {
      paragraphs: [ticket.descripcion || "Sin descripción."],
      points: Array.isArray(ticket.tasks) ? ticket.tasks : [],
      acceptanceCriteria: Array.isArray(ticket.acceptanceCriteria) ? ticket.acceptanceCriteria : [],
    },
  };
}

export const databaseSelectOptions = {
  usuarios: [],
  proyectos: [],
  prioridades: ticketPriorityOptions,
  statuses: ticketStatusOptions,
  estadosRegistro: estadoRegistroOptions,
};
