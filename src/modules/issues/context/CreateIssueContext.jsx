import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import { buildTicketCreatePayload } from "../../../shared/data/databaseAdapters";
import { API_ENDPOINTS } from "../../../shared/services/apiEndpoints";
import { useSessionContext } from "../../../shared/context/SessionContext";

const CreateIssueContext = createContext(null);

export function CreateIssueProvider({
  children,
  projects = [],
  users = [],
  usersByProject = {},
  priorities = [],
  statuses = [],
  reporterId,
  onSubmit,
  onCancel,
}) {
  const { currentUser, active } = useSessionContext();
  const effectiveReporterId = reporterId ?? currentUser?.id_usuario ?? 1;
  const initialProjectId = active?.id_proyecto ? String(active.id_proyecto) : projects[0]?.value || "";

  const [formData, setFormData] = useState({
    id_proyecto: initialProjectId,
    id_usuario: "",
    nombre: "",
    descripcion: "",
    status: statuses[0]?.value || "PENDIENTE",
    prioridad: priorities[1]?.value || priorities[0]?.value || "MEDIA",
    acciones: [],
    criterios_aceptacion: [],
  });

  const selectedProjectUsers = useMemo(() => {
    const projectUsers = usersByProject[String(formData.id_proyecto)] ?? usersByProject[Number(formData.id_proyecto)];

    if (Array.isArray(projectUsers) && projectUsers.length > 0) {
      return projectUsers;
    }

    return [];
  }, [formData.id_proyecto, usersByProject]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFormData((currentData) => {
      const nextProjectId = currentData.id_proyecto || initialProjectId || projects[0]?.value || "";
      const projectUsers = usersByProject[String(nextProjectId)] ?? usersByProject[Number(nextProjectId)] ?? [];
      const hasSelectedUser = projectUsers.some(
        (userOption) => String(userOption.value) === String(currentData.id_usuario)
      );

      return {
        ...currentData,
        id_proyecto: nextProjectId,
        id_usuario: hasSelectedUser ? currentData.id_usuario : projectUsers[0]?.value || "",
      };
    });
  }, [initialProjectId, projects, usersByProject]);

  const handleChange = useCallback(
    (field, value) => {
      if (field === "id_proyecto") {
        const projectUsers = usersByProject[String(value)] ?? usersByProject[Number(value)] ?? [];

        setFormData((currentData) => ({
          ...currentData,
          id_proyecto: value,
          id_usuario: projectUsers[0]?.value || "",
        }));
        return;
      }

      setFormData((currentData) => ({
        ...currentData,
        [field]: value,
      }));
    },
    [usersByProject]
  );

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
          disabled: !formData.id_proyecto || !formData.id_usuario,
          onExecute: (payload) => {
            onSubmit?.(payload);
          },
          successTitle: "Ticket creado",
          successMessage: "El ticket fue guardado correctamente.",
          showPayloadOnSuccess: true,
        },
      ],
    }),
    [buildPayload, formData.id_proyecto, formData.id_usuario, onCancel, onSubmit]
  );

  const value = useMemo(
    () => ({
      formData,
      projects,
      users,
      selectedProjectUsers,
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
      selectedProjectUsers,
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
