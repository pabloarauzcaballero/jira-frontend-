import { API_ENDPOINTS } from "./apiEndpoints";
import { requestEndpoint } from "./httpClient";

function extractData(result) {
  const response = result?.data ?? result;
  return response?.data ?? response?.user ?? response?.usuario ?? response ?? null;
}

export async function listUsuarios() {
  const result = await requestEndpoint({
    endpoint: API_ENDPOINTS.usuarios.list,
    method: "GET",
    // El schema actual del backend usa .positive() en offset, por eso 0 falla.
    // Cuando corrijas el backend a .nonnegative(), cambia esto a offset: 0.
    params: { offset: 1, limit: 50 },
  });

  return extractData(result) ?? [];
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

  return extractData(result) ?? [];
}

export async function getProyecto(idProyecto) {
  const result = await requestEndpoint({
    endpoint: API_ENDPOINTS.proyectos.detail,
    endpointParams: [idProyecto],
    method: "GET",
  });

  return extractData(result);
}

export async function createProyecto(payload) {
  const result = await requestEndpoint({
    endpoint: API_ENDPOINTS.proyectos.create,
    method: "POST",
    data: payload,
  });

  return extractData(result);
}

export async function listProyectoMiembros(idProyecto) {
  if (!idProyecto) return [];

  const result = await requestEndpoint({
    endpoint: API_ENDPOINTS.proyectos.miembros.list,
    endpointParams: [idProyecto],
    method: "GET",
  });

  return extractData(result) ?? [];
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

  return extractData(result) ?? [];
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
