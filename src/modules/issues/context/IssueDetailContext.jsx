import { createContext, useContext, useMemo } from "react";

import { API_ENDPOINTS } from "../../../shared/services/apiEndpoints";

const IssueDetailContext = createContext(null);

export function IssueDetailProvider({
  children,
  issue,
  currentUser,
  activities = [],
  onEdit,
  onDelete,
  onChangeStatus,
  onPostComment,
}) {
  const actions = useMemo(
    () => ({
      header: [
        {
          id: "ticket.detail.edit",
          label: "Editar",
          icon: "edit",
          endpoint: API_ENDPOINTS.tickets.update,
          method: "PATCH",
          onExecute: () => onEdit?.(issue),
          successMessage: "Acción de edición preparada.",
        },
        {
          id: "ticket.detail.changeStatus",
          label: "Cambiar estado",
          icon: "published_with_changes",
          endpoint: API_ENDPOINTS.tickets.changeStatus,
          method: "PATCH",
          className: "btn btn-sm btn-primary d-flex align-items-center gap-1",
          onExecute: () => onChangeStatus?.(issue),
          successMessage: "Cambio de estado preparado.",
        },
        {
          id: "ticket.detail.delete",
          label: "",
          icon: "delete",
          endpoint: API_ENDPOINTS.tickets.delete,
          method: "DELETE",
          className: "btn btn-sm btn-light border text-danger d-flex align-items-center justify-content-center",
          confirm: {
            title: "Eliminar ticket",
            message: "Esta acción está preparada para eliminar el ticket cuando conectes el endpoint real.",
            confirmLabel: "Eliminar",
            confirmClassName: "btn btn-danger",
          },
          onExecute: () => onDelete?.(issue),
          successMessage: "Eliminación preparada.",
        },
      ],
      comment: [
        {
          id: "ticket.detail.comment.create",
          label: "Comentar",
          endpoint: API_ENDPOINTS.ticketActualizacion.create,
          method: "POST",
          className: "btn btn-sm btn-primary",
          onExecute: (payload) => onPostComment?.(payload.comment),
          successMessage: "Actualización preparada para ticket_actualizacion.",
          showPayloadOnSuccess: true,
        },
      ],
      navigation: [
        {
          id: "ticket.detail.backToBoard",
          label: "",
          icon: "arrow_back",
          type: "navigate",
          to: "board",
          className: "issue-detail-back-btn",
        },
      ],
    }),
    [issue, onChangeStatus, onDelete, onEdit, onPostComment]
  );

  const value = useMemo(
    () => ({ issue, currentUser, activities, actions }),
    [issue, currentUser, activities, actions]
  );

  return <IssueDetailContext.Provider value={value}>{children}</IssueDetailContext.Provider>;
}

export function useIssueDetailContext() {
  const context = useContext(IssueDetailContext);

  if (!context) {
    throw new Error("useIssueDetailContext debe usarse dentro de IssueDetailProvider");
  }

  return context;
}
