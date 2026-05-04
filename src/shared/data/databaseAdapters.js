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
  const idUsuario = currentUser.id_usuario ?? currentUser.id ?? null;
  const nombre = currentUser.nombre ?? currentUser.name ?? currentUser.email ?? "Usuario";
  const posicion = currentUser.posicion_principal ?? currentUser.position ?? "Sin posición asignada";
  const twoFactorEnabled = Boolean(currentUser.is_two_factors ?? currentUser.isTwoFactors ?? false);

  return {
    rawUser: {
      id_usuario: idUsuario,
      nombre,
      email: currentUser.email ?? "",
      telefono: currentUser.telefono ?? currentUser.phone ?? "",
      timezone: currentUser.timezone ?? "America/La_Paz",
      posicion_principal: posicion,
      is_two_factors: twoFactorEnabled,
      avatarUrl: currentUser.avatarUrl ?? currentUser.urlProfile ?? null,
      tags: Array.isArray(currentUser.tags) ? currentUser.tags : [],
    },
    user: {
      id_usuario: idUsuario,
      name: nombre,
      nombre,
      email: currentUser.email ?? "",
      position: posicion,
      posicion_principal: posicion,
      avatarUrl: currentUser.avatarUrl ?? currentUser.urlProfile ?? null,
      initials: initialsFromName(nombre),
      tags: Array.isArray(currentUser.tags) ? currentUser.tags : [],
    },
    security: {
      twoFactorEnabled,
      twoFactorLabel: twoFactorEnabled
        ? "Activo según la sesión actual"
        : "Pendiente de activar",
      actions: ["Cambiar contraseña", "Revisar estado de cuenta"],
    },
    accountDetails: {
      email: currentUser.email || "Sin email sincronizado",
      phone: currentUser.telefono ?? currentUser.phone ?? "Sin teléfono",
      timezone: currentUser.timezone ?? "America/La_Paz",
      manager: {
        name: "Pendiente",
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
    createdAt: "Creado: pendiente",
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
        "Selecciona un ticket para visualizar su descripción, acciones y criterios de aceptación.",
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


function normalizeArray(value) {
  if (Array.isArray(value)) return value;
  return [];
}

function pickTicketAssignments(ticket = {}) {
  return normalizeArray(ticket.asignaciones ?? ticket.assignments ?? ticket.proyecto_asignaciones);
}

function pickTicketUpdates(ticket = {}) {
  const directUpdates = normalizeArray(
    ticket.actualizaciones ?? ticket.updates ?? ticket.ticket_actualizaciones
  );

  const assignmentUpdates = pickTicketAssignments(ticket).flatMap((assignment) =>
    normalizeArray(
      assignment.actualizaciones ?? assignment.updates ?? assignment.ticket_actualizaciones
    ).map((update) => ({ ...update, asignacion: assignment }))
  );

  return [...directUpdates, ...assignmentUpdates];
}

export function toTicketActivities(ticket = {}, currentUser = null) {
  return pickTicketUpdates(ticket)
    .map((update, index) => {
      const assignment = update.asignacion ?? update.assignment ?? {};
      const usuario = update.usuario ?? update.user ?? assignment.usuario ?? currentUser ?? {};
      const userName = usuario.nombre ?? usuario.name ?? usuario.email ?? "Usuario";
      const comment = update.actualizacion ?? update.comentario ?? update.comment ?? update.descripcion ?? "";
      const status = update.status ?? update.estado ?? null;

      return {
        id: update.id_actualizacion ?? update.id ?? `${comment}-${index}`,
        user: {
          name: userName,
          avatarUrl: usuario.avatarUrl ?? usuario.urlProfile ?? null,
          initials: initialsFromName(userName),
        },
        action: status ? "cambió el estado" : "comentó",
        date: formatDateTime(update.fecha_creacion ?? update.createdAt ?? update.actualizado_en),
        comment,
        status: status ? formatDbLabel(status) : null,
      };
    })
    .filter((activity) => activity.comment || activity.status);
}

export function toIssueDetail(ticket = {}, currentUser = null) {
  if (!ticket) return buildEmptyIssueDetail(currentUser);

  const idTicket = ticket.id_ticket ?? ticket.id;
  const idProyecto = ticket.id_proyecto ?? ticket.proyecto?.id_proyecto ?? ticket.proyecto?.id;
  const title = ticket.nombre ?? ticket.title ?? "Ticket sin título";
  const statusValue = ticket.status ?? "PENDIENTE";
  const priorityValue = ticket.prioridad ?? "MEDIA";
  const assignments = pickTicketAssignments(ticket);
  const firstAssignment = assignments[0] ?? null;
  const idAsignacion =
    ticket.id_asignacion ?? firstAssignment?.id_asignacion ?? firstAssignment?.id ?? null;
  const assignee = firstAssignment?.usuario ?? ticket.usuario ?? ticket.assignee ?? currentUser;
  const assigneeName = assignee?.nombre ?? assignee?.name ?? assignee?.email ?? "Sin asignar";
  const projectId = idProyecto ?? firstAssignment?.id_proyecto;

  return {
    id: idTicket,
    id_ticket: idTicket,
    id_proyecto: projectId,
    id_usuario: ticket.id_usuario ?? firstAssignment?.id_usuario ?? assignee?.id_usuario ?? assignee?.id,
    id_asignacion: idAsignacion,
    raw: ticket,
    key: `TCK-${idTicket ?? "N/D"}`,
    workspace: "Workspace principal",
    projectName: ticket.proyecto?.nombre ?? `Proyecto #${projectId ?? "N/D"}`,
    projectShortName: `PROY-${projectId ?? "N/D"}`,
    title,
    nombre: title,
    type: "Ticket",
    status: formatDbLabel(statusValue),
    statusValue,
    priority: formatDbLabel(priorityValue),
    priorityValue,
    descripcion: ticket.descripcion ?? ticket.description ?? "",
    createdAt: `Creado: ${formatDateTime(ticket.fecha_creacion)}`,
    createdDate: formatDateTime(ticket.fecha_creacion),
    updatedAt: formatDateTime(ticket.actualizado_en ?? ticket.fecha_creacion),
    estado_registro: ticket.estado_registro ?? "ACTIVO",
    assignee: {
      name: assigneeName,
      role: assignee?.posicion_principal ?? firstAssignment?.cargo ?? "N/A",
      avatarUrl: assignee?.avatarUrl ?? assignee?.urlProfile ?? null,
      initials: initialsFromName(assigneeName),
    },
    reporter: {
      name: currentUser?.nombre ?? currentUser?.email ?? "Pendiente",
      avatarUrl: currentUser?.avatarUrl ?? currentUser?.urlProfile ?? null,
      initials: initialsFromName(currentUser?.nombre ?? currentUser?.email ?? "Pendiente"),
    },
    description: {
      paragraphs: [ticket.descripcion || ticket.description || "Sin descripción."],
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
