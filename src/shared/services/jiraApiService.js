import { API_ENDPOINTS } from "./apiEndpoints";
import { requestEndpoint } from "./httpClient";

function extractData(result) {
  const response = result?.data ?? result;

  return (
    response?.data ??
    response?.rows ??
    response?.items ??
    response?.result ??
    response?.user ??
    response?.usuario ??
    response ??
    null
  );
}

function extractList(result, preferredKeys = []) {
  const data = extractData(result);

  if (Array.isArray(data)) return data;

  for (const key of preferredKeys) {
    if (Array.isArray(data?.[key])) return data[key];
  }

  if (Array.isArray(data?.rows)) return data.rows;
  if (Array.isArray(data?.items)) return data.items;
  if (Array.isArray(data?.data)) return data.data;

  return [];
}

function getProjectPayload(projectResponse) {
  const data = extractData(projectResponse);

  return data?.proyecto ?? data?.project ?? data;
}

function extractProyectoMiembrosFromDetail(projectResponse) {
  const project = getProjectPayload(projectResponse) ?? {};
  const candidates = [
    project.miembros,
    project.members,
    project.usuarios,
    project.users,
    project.asignaciones,
    project.proyecto_asignaciones,
    project.proyectoAsignaciones,
    project.ProyectoAsignaciones,
  ];

  return candidates.find(Array.isArray) ?? [];
}

export async function listUsuarios() {
  const result = await requestEndpoint({
    endpoint: API_ENDPOINTS.usuarios.list,
    method: "GET",
    // El schema actual del backend usa .positive() en offset, por eso 0 falla.
    // Cuando corrijas el backend a .nonnegative(), cambia esto a offset: 0.
    params: { offset: 1, limit: 50 },
  });

  return extractList(result, ["usuarios", "users"]);
}

export async function updateUsuario(idUsuario, payload) {
  const result = await requestEndpoint({
    endpoint: API_ENDPOINTS.usuarios.update,
    endpointParams: [idUsuario],
    method: "PUT",
    data: payload,
  });

  return extractData(result);
}

export async function listProyectos() {
  const result = await requestEndpoint({
    endpoint: API_ENDPOINTS.proyectos.list,
    method: "GET",
  });

  return extractList(result, ["proyectos", "projects"]);
}

export async function getProyecto(idProyecto) {
  const result = await requestEndpoint({
    endpoint: API_ENDPOINTS.proyectos.detail,
    endpointParams: [idProyecto],
    method: "GET",
  });

  return getProjectPayload(result);
}

export async function getProyectoConMiembros(idProyecto) {
  const result = await requestEndpoint({
    endpoint: API_ENDPOINTS.proyectos.detail,
    endpointParams: [idProyecto],
    method: "GET",
  });

  const project = getProjectPayload(result);
  const miembros = extractProyectoMiembrosFromDetail(result);

  return { project, miembros };
}

export async function createProyecto(payload) {
  const result = await requestEndpoint({
    endpoint: API_ENDPOINTS.proyectos.create,
    method: "POST",
    data: payload,
  });

  return extractData(result);
}

export async function updateProyecto(idProyecto, payload) {
  const result = await requestEndpoint({
    endpoint: API_ENDPOINTS.proyectos.update,
    endpointParams: [idProyecto],
    method: "PUT",
    data: payload,
  });

  return extractData(result);
}

export async function listProyectoMiembros(idProyecto) {
  if (!idProyecto) return [];

  try {
    const detail = await getProyectoConMiembros(idProyecto);

    if (detail.miembros.length > 0) {
      return detail.miembros;
    }
  } catch {
    // Si el detalle no trae miembros o falla, probamos el endpoint dedicado.
  }

  const result = await requestEndpoint({
    endpoint: API_ENDPOINTS.proyectos.miembros.list,
    endpointParams: [idProyecto],
    method: "GET",
  });

  return extractList(result, ["miembros", "members", "usuarios", "users"]);
}

export async function addProyectoMiembro(idProyecto, payload) {
  const result = await requestEndpoint({
    endpoint: API_ENDPOINTS.proyectos.miembros.create,
    endpointParams: [idProyecto],
    method: "POST",
    data: payload,
  });

  return extractData(result);
}

export async function updateProyectoMiembro(idProyecto, idUsuario, payload) {
  const result = await requestEndpoint({
    endpoint: API_ENDPOINTS.proyectos.miembros.update,
    endpointParams: [idProyecto, idUsuario],
    method: "PUT",
    data: payload,
  });

  return extractData(result);
}

export async function removeProyectoMiembro(idProyecto, idUsuario) {
  const result = await requestEndpoint({
    endpoint: API_ENDPOINTS.proyectos.miembros.delete,
    endpointParams: [idProyecto, idUsuario],
    method: "DELETE",
  });

  return extractData(result);
}

export async function listTicketsByProyecto(idProyecto) {
  if (!idProyecto) return [];

  const result = await requestEndpoint({
    endpoint: API_ENDPOINTS.tickets.listByProyecto,
    endpointParams: [idProyecto],
    method: "GET",
  });

  return extractList(result, ["tickets"]);
}

export async function getTicket(idTicket) {
  const result = await requestEndpoint({
    endpoint: API_ENDPOINTS.tickets.detail,
    endpointParams: [idTicket],
    method: "GET",
  });

  return extractData(result);
}

export async function createTicket(payload) {
  const result = await requestEndpoint({
    endpoint: API_ENDPOINTS.tickets.create,
    method: "POST",
    data: payload,
  });

  return extractData(result);
}

export async function changeTicketStatus(idTicket, status) {
  const result = await requestEndpoint({
    endpoint: API_ENDPOINTS.tickets.changeStatus,
    endpointParams: [idTicket],
    method: "PATCH",
    data: { status },
  });

  return extractData(result);
}

export async function createTicketUpdate(idAsignacion, actualizacion) {
  const result = await requestEndpoint({
    endpoint: API_ENDPOINTS.ticketActualizacion.create,
    endpointParams: [idAsignacion],
    method: "POST",
    data: { actualizacion },
  });

  return extractData(result);
}
