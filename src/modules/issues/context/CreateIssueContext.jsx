import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import { buildTicketCreatePayload } from "../../../shared/data/databaseAdapters";
import { API_ENDPOINTS } from "../../../shared/services/apiEndpoints";
import { useSessionContext } from "../../../shared/context/SessionContext";

const CreateIssueContext = createContext(null);

export function CreateIssueProvider({
  children,
  projects = [],
  users = [],
  priorities = [],
  statuses = [],
  reporterId,
  onSubmit,
  onCancel,
}) {
  const { currentUser } = useSessionContext();
  const effectiveReporterId = reporterId ?? currentUser?.id_usuario ?? 1;

  const [formData, setFormData] = useState({
    id_proyecto: projects[0]?.value || "",
    id_usuario: users[0]?.value || "",
    nombre: "",
    descripcion: "",
    status: statuses[0]?.value || "PENDIENTE",
    prioridad: priorities[1]?.value || priorities[0]?.value || "MEDIA",
    acciones: [],
    criterios_aceptacion: [],
  });

  useEffect(() => {
    setFormData((currentData) => ({
      ...currentData,
      id_proyecto: currentData.id_proyecto || projects[0]?.value || "",
      id_usuario: currentData.id_usuario || users[0]?.value || "",
    }));
  }, [projects, users]);

  const handleChange = useCallback((field, value) => {
    setFormData((currentData) => ({
      ...currentData,
      [field]: value,
    }));
  }, []);

  const buildPayload = useCallback(
    () => buildTicketCreatePayload(formData, effectiveReporterId),
    [effectiveReporterId, formData]
  );

  const actions = useMemo(
    () => ({
      form: [
        {
          id: "ticket.create.cancel",
          label: "Cancelar",
          endpoint: null,
          className: "btn create-issue-cancel-btn",
          onExecute: () => onCancel?.(),
        },
        {
          id: "ticket.create.submit",
          label: "Crear ticket",
          endpoint: API_ENDPOINTS.tickets.create,
          method: "POST",
          className: "btn create-issue-submit-btn",
          buildPayload,
          onExecute: (payload) => {
            onSubmit?.(payload);
          },
          successTitle: "Ticket creado",
          successMessage: "El ticket fue guardado correctamente.",
          showPayloadOnSuccess: true,
        },
      ],
    }),
    [buildPayload, onCancel, onSubmit]
  );

  const value = useMemo(
    () => ({
      formData,
      projects,
      users,
      priorities,
      statuses,
      reporterId: effectiveReporterId,
      handleChange,
      buildPayload,
      actions,
    }),
    [
      formData,
      projects,
      users,
      priorities,
      statuses,
      effectiveReporterId,
      handleChange,
      buildPayload,
      actions,
    ]
  );

  return <CreateIssueContext.Provider value={value}>{children}</CreateIssueContext.Provider>;
}

export function useCreateIssueContext() {
  const context = useContext(CreateIssueContext);

  if (!context) {
    throw new Error("useCreateIssueContext debe usarse dentro de CreateIssueProvider");
  }

  return context;
}
