import { createContext, useCallback, useContext, useMemo, useState } from "react";

import { estadoRegistroOptions } from "../../../shared/data/databaseOptions";
import { toMember } from "../../../shared/data/databaseAdapters";
import { API_ENDPOINTS } from "../../../shared/services/apiEndpoints";
import { useSessionContext } from "../../../shared/context/SessionContext";

const CreateProjectContext = createContext(null);

function buildMemberFromOption(idUsuario, users = []) {
  const selectedOption = users.find((userOption) => Number(userOption.value) === Number(idUsuario));

  if (!selectedOption) return null;

  return toMember(selectedOption.raw ?? {
    id_usuario: Number(selectedOption.value),
    nombre: selectedOption.label,
    posicion_principal: "Pendiente",
  });
}

export function CreateProjectProvider({
  children,
  initialMembers = [],
  users = [],
  currentUserId,
  onSubmit,
  onCancel,
}) {
  const { currentUser } = useSessionContext();
  const effectiveUserId = currentUserId ?? currentUser?.id_usuario ?? null;

  const [projectData, setProjectData] = useState({
    nombre: "",
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

  const handleAddMember = useCallback(
    (idUsuario) => {
      const usuario = buildMemberFromOption(idUsuario, users);

      if (!usuario) return;

      setMembers((currentMembers) => {
        const alreadyAdded = currentMembers.some(
          (member) => Number(member.id_usuario ?? member.id) === Number(usuario.id_usuario)
        );

        if (alreadyAdded) return currentMembers;

        return [...currentMembers, usuario];
      });
    },
    [users]
  );

  const handleRemoveMember = useCallback((memberId) => {
    setMembers((currentMembers) =>
      currentMembers.filter(
        (member) => Number(member.id_usuario ?? member.id) !== Number(memberId)
      )
    );
  }, []);

  const buildPayload = useCallback(
    () => ({
      nombre: projectData.nombre.trim(),
      descripcion: projectData.descripcion.trim(),
      user_id_creacion: effectiveUserId,
      miembros: members.map((member) => ({
        id_usuario: member.id_usuario ?? member.id,
        cargo: member.cargo ?? "MIEMBRO",
      })),
    }),
    [effectiveUserId, members, projectData.nombre, projectData.descripcion]
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
            onSubmit?.(payload);
          },
          successTitle: "Proyecto creado",
          successMessage: "El proyecto fue guardado correctamente.",
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
