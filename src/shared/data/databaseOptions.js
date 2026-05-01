export const ESTADO_REGISTRO = ["ACTIVO", "INACTIVO", "ELIMINADO"];

export const TICKET_PRIORIDADES = ["BAJA", "MEDIA", "ALTA", "CRITICA"];

export const TICKET_STATUS = [
  "PENDIENTE",
  "EN_PROGRESO",
  "EN_REVISION",
  "FINALIZADO",
  "CANCELADO",
];

export const DEFAULT_TIMEZONE = "America/La_Paz";

export function toOption(value) {
  return {
    value,
    label: formatDbLabel(value),
  };
}

export function formatDbLabel(value = "") {
  return String(value)
    .toLowerCase()
    .split("_")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export const estadoRegistroOptions = ESTADO_REGISTRO.map(toOption);
export const ticketPriorityOptions = TICKET_PRIORIDADES.map(toOption);
export const ticketStatusOptions = TICKET_STATUS.map(toOption);
