import { createContext, useContext, useMemo } from "react";

import { API_ENDPOINTS } from "../../../shared/services/apiEndpoints";

const BoardContext = createContext(null);

export function BoardProvider({ children, teamProfiles = [], statuses = [], ticketsByStatus = {} }) {
  const totalTickets = Object.values(ticketsByStatus).reduce(
    (total, tickets) => total + tickets.length,
    0
  );

  const actions = useMemo(
    () => ({
      header: [
        {
          id: "board.filter.active",
          label: "Solo activos",
          icon: "check_circle",
          endpoint: API_ENDPOINTS.tickets.list,
          method: "GET",
          successMessage: "Filtro preparado para consultar tickets activos.",
        },
        {
          id: "board.filters.open",
          label: "Filtros",
          icon: "filter_list",
          endpoint: API_ENDPOINTS.tickets.list,
          method: "GET",
          successMessage: "Panel de filtros preparado.",
        },
        {
          id: "board.ticket.create.navigate",
          label: "Crear ticket",
          icon: "add",
          type: "navigate",
          to: "create-issue",
          className: "btn btn-sm btn-primary px-3 d-flex align-items-center gap-1",
        },
      ],
      column: [
        {
          id: "board.column.options",
          label: "",
          icon: "more_horiz",
          endpoint: API_ENDPOINTS.tickets.list,
          method: "GET",
          className: "btn btn-sm btn-link text-secondary p-0",
          successMessage: "Opciones de columna preparadas.",
        },
      ],
    }),
    []
  );

  const value = useMemo(
    () => ({ teamProfiles, statuses, ticketsByStatus, totalTickets, actions }),
    [teamProfiles, statuses, ticketsByStatus, totalTickets, actions]
  );

  return <BoardContext.Provider value={value}>{children}</BoardContext.Provider>;
}

export function useBoardContext() {
  const context = useContext(BoardContext);

  if (!context) {
    throw new Error("useBoardContext debe usarse dentro de BoardProvider");
  }

  return context;
}
