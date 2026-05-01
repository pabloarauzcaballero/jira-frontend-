import {
  ticketStatusOptions,
  ticketPriorityOptions,
  estadoRegistroOptions,
  formatDbLabel,
} from "./databaseOptions.js";
import {
  usuarios,
  usuarios_x_tag,
  proyectos,
  tickets,
  proyecto_asignacion,
  ticket_actualizacion,
  ticket_acciones,
  ticket_criterios_aceptacion,
} from "./mockDatabase.js";

export function initialsFromName(name = "") {
  return name
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
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength - 3)}...`;
}

export function getUsuarioById(idUsuario) {
  return usuarios.find((usuario) => usuario.id_usuario === Number(idUsuario));
}

export function getProyectoById(idProyecto) {
  return proyectos.find((proyecto) => proyecto.id_proyecto === Number(idProyecto));
}

export function getTicketById(idTicket) {
  return tickets.find((ticket) => ticket.id_ticket === Number(idTicket));
}

export function getAsignacionByTicketId(idTicket) {
  return proyecto_asignacion.find(
    (asignacion) => asignacion.id_ticket === Number(idTicket)
  );
}

export function toUserOption(usuario) {
  return {
    value: String(usuario.id_usuario),
    label: `${usuario.nombre} — ${usuario.posicion_principal}`,
  };
}

export function toProjectOption(proyecto) {
  return {
    value: String(proyecto.id_proyecto),
    label: `Proyecto #${proyecto.id_proyecto} — ${truncateText(proyecto.descripcion, 72)}`,
  };
}

export function toMember(usuario, extra = {}) {
  const tags = usuarios_x_tag
    .filter((row) => row.id_usuario === usuario.id_usuario)
    .map((row) => row.tag);

  return {
    id: usuario.id_usuario,
    id_usuario: usuario.id_usuario,
    nombre: usuario.nombre,
    email: usuario.email,
    rol: usuario.posicion_principal,
    posicion_principal: usuario.posicion_principal,
    estado_registro: usuario.estado_registro,
    timezone: usuario.timezone,
    is_two_factors: usuario.is_two_factors,
    urlProfile: usuario.urlProfile,
    initials: initialsFromName(usuario.nombre),
    tags,
    ...extra,
  };
}

export function getProjectMembers(idProyecto) {
  const assignments = proyecto_asignacion.filter(
    (asignacion) => asignacion.id_proyecto === Number(idProyecto)
  );

  const userMap = new Map();

  assignments.forEach((asignacion) => {
    const usuario = getUsuarioById(asignacion.id_usuario);
    const ticket = getTicketById(asignacion.id_ticket);

    if (!usuario || !ticket) return;

    const currentMember = userMap.get(usuario.id_usuario) ??
      toMember(usuario, { ticketsAsignados: [] });

    currentMember.ticketsAsignados.push({
      id: ticket.id_ticket,
      nombre: `TCK-${ticket.id_ticket}`,
      descripcion: ticket.nombre,
      status: ticket.status,
      prioridad: ticket.prioridad,
      url: "#",
    });

    userMap.set(usuario.id_usuario, currentMember);
  });

  return Array.from(userMap.values());
}

export function getProjectCards() {
  return proyectos.map((proyecto) => {
    const members = getProjectMembers(proyecto.id_proyecto);

    return {
      id: proyecto.id_proyecto,
      id_proyecto: proyecto.id_proyecto,
      name: `Proyecto #${proyecto.id_proyecto}`,
      key: `PROY-${proyecto.id_proyecto}`,
      initials: `P${proyecto.id_proyecto}`,
      status: proyecto.estado_registro,
      tone: proyecto.estado_registro === "INACTIVO" ? "tertiary" : "primary",
      description: proyecto.descripcion,
      updatedAt: `Actualizado: ${formatDateTime(proyecto.actualizado_en)}`,
      members,
    };
  });
}

export function toBoardTicket(ticket) {
  const asignacion = getAsignacionByTicketId(ticket.id_ticket);
  const assignee = asignacion ? getUsuarioById(asignacion.id_usuario) : null;

  return {
    id: ticket.id_ticket,
    id_ticket: ticket.id_ticket,
    title: ticket.nombre,
    description: ticket.descripcion,
    issueKey: `TCK-${ticket.id_ticket}`,
    priority: ticket.prioridad,
    status: ticket.status,
    estado_registro: ticket.estado_registro,
    assigneeUrl: assignee?.urlProfile ?? "",
    assigneeName: assignee?.nombre ?? "Sin asignar",
  };
}

export function groupTicketsByStatus() {
  return ticketStatusOptions.reduce((accumulator, statusOption) => {
    accumulator[statusOption.value] = tickets
      .filter((ticket) => ticket.status === statusOption.value)
      .map(toBoardTicket);

    return accumulator;
  }, {});
}

export function getIssueDetail(idTicket = 102) {
  const ticket = getTicketById(idTicket) ?? tickets[0];
  const asignacion = getAsignacionByTicketId(ticket.id_ticket);
  const proyecto = asignacion ? getProyectoById(asignacion.id_proyecto) : null;
  const assignee = asignacion ? getUsuarioById(asignacion.id_usuario) : null;
  const reporter = getUsuarioById(ticket.user_id_creacion);
  const acciones = ticket_acciones
    .filter((row) => row.id_ticket === ticket.id_ticket)
    .map((row) => row.accion_nombre);
  const acceptanceCriteria = ticket_criterios_aceptacion
    .filter((row) => row.id_ticket === ticket.id_ticket)
    .map((row) => row.criterios_aceptacion);

  return {
    key: `TCK-${ticket.id_ticket}`,
    workspace: "Base PostgreSQL",
    projectName: proyecto
      ? `Proyecto #${proyecto.id_proyecto}`
      : "Sin proyecto asignado",
    projectShortName: proyecto ? `PROY-${proyecto.id_proyecto}` : "N/A",
    title: ticket.nombre,
    type: "Ticket",
    status: formatDbLabel(ticket.status),
    statusValue: ticket.status,
    priority: formatDbLabel(ticket.prioridad),
    priorityValue: ticket.prioridad,
    createdAt: `Creado: ${formatDateTime(ticket.fecha_creacion)}`,
    createdDate: formatDateTime(ticket.fecha_creacion),
    updatedAt: formatDateTime(ticket.actualizado_en),
    estado_registro: ticket.estado_registro,
    assignee: assignee
      ? {
          name: assignee.nombre,
          role: assignee.posicion_principal,
          avatarUrl: assignee.urlProfile,
        }
      : {
          name: "Sin asignar",
          role: "N/A",
          avatarUrl: "https://i.pravatar.cc/80?img=12",
        },
    reporter: reporter
      ? {
          name: reporter.nombre,
          avatarUrl: reporter.urlProfile,
        }
      : {
          name: "Sin reporter",
          avatarUrl: "https://i.pravatar.cc/80?img=12",
        },
    description: {
      paragraphs: [ticket.descripcion],
      points: acciones,
      acceptanceCriteria,
    },
  };
}

export function getIssueActivities(idTicket = 102) {
  const asignacion = getAsignacionByTicketId(idTicket);

  if (!asignacion) return [];

  return ticket_actualizacion
    .filter((row) => row.id_asignacion === asignacion.id_asignacion)
    .map((row) => {
      const usuario = getUsuarioById(row.user_id_creacion);

      return {
        id: row.id_actualizacion,
        user: {
          name: usuario?.nombre ?? "Usuario del sistema",
          avatarUrl: usuario?.urlProfile ?? "https://i.pravatar.cc/80?img=12",
        },
        action: "registró una actualización",
        date: formatDateTime(row.fecha_creacion),
        comment: row.actualizacion,
        status: formatDbLabel(row.estado_registro),
      };
    });
}

export function getCurrentUser(idUsuario = 1) {
  const usuario = getUsuarioById(idUsuario) ?? usuarios[0];

  return {
    id_usuario: usuario.id_usuario,
    name: usuario.nombre,
    avatarUrl: usuario.urlProfile || "https://i.pravatar.cc/80?img=12",
  };
}

export function getProfileData(idUsuario = 1) {
  const usuario = getUsuarioById(idUsuario) ?? usuarios[0];
  const tags = usuarios_x_tag
    .filter((row) => row.id_usuario === usuario.id_usuario)
    .map((row) => row.tag);
  const manager = getUsuarioById(usuario.user_id_creacion) ?? usuarios[4];

  return {
    user: {
      name: usuario.nombre,
      position: usuario.posicion_principal,
      avatarUrl: usuario.urlProfile || "https://i.pravatar.cc/160?img=12",
      tags,
    },
    security: {
      twoFactorEnabled: usuario.is_two_factors,
      twoFactorLabel: usuario.is_two_factors
        ? "Activo según usuarios.is_two_factors"
        : "Inactivo según usuarios.is_two_factors",
      actions: ["Cambiar password_hash", "Revisar estado_registro"],
    },
    accountDetails: {
      email: usuario.email,
      phone: usuario.telefono ?? "Sin teléfono",
      timezone: usuario.timezone,
      manager: {
        name: manager?.nombre ?? "Sin responsable",
        initials: initialsFromName(manager?.nombre ?? "SR"),
      },
    },
    activities: getIssueActivities(102).map((activity) => ({
      id: activity.id,
      icon: "history",
      tone: "primary",
      userName: activity.user.name,
      action: activity.action,
      issue: "TCK-102",
      comment: activity.comment,
      date: activity.date,
    })),
  };
}

export function buildTicketCreatePayload(formData, reporterId = 1) {
  return {
    ticket: {
      nombre: formData.nombre.trim(),
      descripcion: formData.descripcion.trim(),
      prioridad: formData.prioridad,
      status: formData.status,
      estado_registro: "ACTIVO",
      user_id_creacion: reporterId,
      user_id_modificacion: reporterId,
      version: 1,
    },
    proyecto_asignacion: {
      id_proyecto: Number(formData.id_proyecto),
      id_usuario: Number(formData.id_usuario),
      estado_registro: "ACTIVO",
      user_id_creacion: reporterId,
      user_id_modificacion: reporterId,
      version: 1,
    },
    ticket_acciones: formData.acciones
      .filter(Boolean)
      .map((accion_nombre) => ({ accion_nombre })),
    ticket_criterios_aceptacion: formData.criterios_aceptacion
      .filter(Boolean)
      .map((criterios_aceptacion) => ({ criterios_aceptacion })),
  };
}

export const databaseSelectOptions = {
  usuarios: usuarios.filter((usuario) => usuario.estado_registro === "ACTIVO").map(toUserOption),
  proyectos: proyectos.filter((proyecto) => proyecto.estado_registro === "ACTIVO").map(toProjectOption),
  prioridades: ticketPriorityOptions,
  statuses: ticketStatusOptions,
  estadosRegistro: estadoRegistroOptions,
};
