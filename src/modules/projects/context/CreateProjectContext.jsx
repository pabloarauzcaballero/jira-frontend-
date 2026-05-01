import { createContext, useCallback, useContext, useMemo, useState } from "react";

import { estadoRegistroOptions } from "../../../shared/data/databaseOptions";
import { getUsuarioById, toMember } from "../../../shared/data/databaseAdapters";
import { API_ENDPOINTS } from "../../../shared/services/apiEndpoints";
import { useSessionContext } from "../../../shared/context/SessionContext";

const CreateProjectContext = createContext(null);

export function CreateProjectProvider({
  children,
  initialMembers = [],
  users = [],
  currentUserId,
  onSubmit,
  onCancel,
}) {
  const { currentUser } = useSessionContext();
  const effectiveUserId = currentUserId ?? currentUser?.id_usuario ?? 1;

  const [projectData, setProjectData] = useState({
    descripcion: "",
    estado_registro: "ACTIVO",
  });

  const [members, setMembers] = useState(initialMembers);

  const handleProjectChange = useCallback((field, value) => {
    setProjectData((currentData) => ({
      ...currentData,
      [field]: value,
    }));
  }, []);

  const handleAddMember = useCallback((idUsuario) => {
    const usuario = getUsuarioById(idUsuario);

    if (!usuario) return;

    setMembers((currentMembers) => {
      const alreadyAdded = currentMembers.some(
        (member) => Number(member.id_usuario ?? member.id) === usuario.id_usuario
      );

      if (alreadyAdded) return currentMembers;

      return [...currentMembers, toMember(usuario)];
    });
  }, []);

  const handleRemoveMember = useCallback((memberId) => {
    setMembers((currentMembers) =>
      currentMembers.filter(
        (member) => Number(member.id_usuario ?? member.id) !== Number(memberId)
      )
    );
  }, []);

  const buildPayload = useCallback(
    () => ({
      proyecto: {
        descripcion: projectData.descripcion.trim(),
        estado_registro: projectData.estado_registro,
        user_id_creacion: effectiveUserId,
        user_id_modificacion: effectiveUserId,
        version: 1,
      },
      usuarios_preseleccionados: members.map((member) => ({
        id_usuario: member.id_usuario ?? member.id,
      })),
      nota: "proyecto_asignacion requiere id_ticket; estos usuarios son preselección visual hasta crear tickets/asignaciones reales.",
    }),
    [effectiveUserId, members, projectData.descripcion, projectData.estado_registro]
  );

  const actions = useMemo(
    () => ({
      form: [
        {
          id: "project.create.cancel",
          label: "Cancelar",
          endpoint: null,
          className: "btn create-project-cancel-btn",
          onExecute: () => onCancel?.(),
        },
        {
          id: "project.create.submit",
          label: "Crear proyecto",
          endpoint: API_ENDPOINTS.proyectos.create,
          method: "POST",
          className: "btn create-project-submit-btn",
          buildPayload,
          onExecute: (payload) => {
            console.log("Payload DB para crear proyecto:", payload);
            onSubmit?.(payload);
          },
          successTitle: "Proyecto preparado",
          successMessage: "El payload del proyecto quedó armado y listo para conectarlo al endpoint real.",
          showPayloadOnSuccess: true,
        },
      ],
    }),
    [buildPayload, onCancel, onSubmit]
  );

  const value = useMemo(
    () => ({
      projectData,
      members,
      users,
      currentUserId: effectiveUserId,
      estadoRegistroOptions,
      handleProjectChange,
      handleAddMember,
      handleRemoveMember,
      buildPayload,
      actions,
    }),
    [
      projectData,
      members,
      users,
      effectiveUserId,
      handleProjectChange,
      handleAddMember,
      handleRemoveMember,
      buildPayload,
      actions,
    ]
  );

  return <CreateProjectContext.Provider value={value}>{children}</CreateProjectContext.Provider>;
}

export function useCreateProjectContext() {
  const context = useContext(CreateProjectContext);

  if (!context) {
    throw new Error("useCreateProjectContext debe usarse dentro de CreateProjectProvider");
  }

  return context;
}
