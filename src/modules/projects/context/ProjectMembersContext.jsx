import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import { API_ENDPOINTS } from "../../../shared/services/apiEndpoints";
import { toMember } from "../../../shared/data/databaseAdapters";
import { estadoRegistroOptions } from "../../../shared/data/databaseOptions";

const ProjectMembersContext = createContext(null);

function normalizeText(value = "") {
  return String(value).trim().toLowerCase();
}

function getMemberSearchText(member = {}) {
  return [
    member.nombre,
    member.email,
    member.rol,
    member.posicion_principal,
    member.estado_registro,
    ...(member.tags ?? []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function buildMemberFromUserOption(idUsuario, userOptions = []) {
  const option = userOptions.find((currentOption) => Number(currentOption.value) === Number(idUsuario));

  if (!option) return null;

  return toMember(option.raw ?? {
    id_usuario: Number(option.value),
    nombre: option.label,
    posicion_principal: "Pendiente",
  });
}

export function ProjectMembersProvider({
  children,
  projectName,
  projectDescription,
  members: initialMembers = [],
  users: initialUsers = [],
  onDesvincular,
  onUnlinkMember,
  onAddRequest,
  onAddMember,
  onUpdateMember,
  onFindMember,
}) {
  const [members, setMembers] = useState(initialMembers);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(initialUsers[0]?.value ?? "");
  const [editingMemberId, setEditingMemberId] = useState(null);
  const [memberDraft, setMemberDraft] = useState({});

  useEffect(() => {
    setMembers(initialMembers);
  }, [initialMembers]);

  const userOptions = useMemo(() => initialUsers, [initialUsers]);

  const availableUserOptions = useMemo(() => {
    const currentMemberIds = new Set(members.map((member) => Number(member.id_usuario ?? member.id)));
    const filteredOptions = userOptions.filter((userOption) => !currentMemberIds.has(Number(userOption.value)));

    return filteredOptions.length > 0 ? filteredOptions : userOptions;
  }, [members, userOptions]);

  const filteredMembers = useMemo(() => {
    const query = normalizeText(searchTerm);

    if (!query) return members;

    return members.filter((member) => getMemberSearchText(member).includes(query));
  }, [members, searchTerm]);

  const toggleAddMemberForm = useCallback(() => {
    setIsAddMemberOpen((currentValue) => !currentValue);
    setSelectedUserId((currentSelectedUserId) => currentSelectedUserId || availableUserOptions[0]?.value || "");
  }, [availableUserOptions]);

  const findMember = useCallback(
    (payload = {}) => {
      const query = normalizeText(payload.searchTerm ?? searchTerm);
      onFindMember?.({ query, resultCount: filteredMembers.length, results: filteredMembers });

      return { query, resultCount: filteredMembers.length };
    },
    [filteredMembers, onFindMember, searchTerm]
  );

  const addMember = useCallback(
    (payload = {}) => {
      const idUsuario = Number(payload.id_usuario ?? selectedUserId);
      const newMember = buildMemberFromUserOption(idUsuario, userOptions);

      if (!newMember) return null;

      setMembers((currentMembers) => {
        const alreadyExists = currentMembers.some(
          (member) => Number(member.id_usuario ?? member.id) === idUsuario
        );

        if (alreadyExists) return currentMembers;

        return [...currentMembers, newMember];
      });

      setSelectedUserId(availableUserOptions[0]?.value ?? "");
      setIsAddMemberOpen(false);
      onAddMember?.(newMember);

      return newMember;
    },
    [availableUserOptions, onAddMember, selectedUserId, userOptions]
  );

  const startEditMember = useCallback((member) => {
    setEditingMemberId(member.id_usuario ?? member.id);
    setMemberDraft({
      id: member.id_usuario ?? member.id,
      id_usuario: member.id_usuario ?? member.id,
      nombre: member.nombre ?? "",
      email: member.email ?? "",
      posicion_principal: member.posicion_principal ?? member.rol ?? "",
      estado_registro: member.estado_registro ?? "ACTIVO",
    });
  }, []);

  const updateMemberDraftField = useCallback((fieldName, value) => {
    setMemberDraft((currentDraft) => ({ ...currentDraft, [fieldName]: value }));
  }, []);

  const cancelEditMember = useCallback(() => {
    setEditingMemberId(null);
    setMemberDraft({});
  }, []);

  const saveMemberChanges = useCallback(
    (payload = {}) => {
      const updatedMember = {
        ...memberDraft,
        ...payload,
      };

      setMembers((currentMembers) =>
        currentMembers.map((member) => {
          const memberId = Number(member.id_usuario ?? member.id);
          const updatedMemberId = Number(updatedMember.id_usuario ?? updatedMember.id);

          if (memberId !== updatedMemberId) return member;

          return {
            ...member,
            nombre: updatedMember.nombre,
            email: updatedMember.email,
            rol: updatedMember.posicion_principal,
            posicion_principal: updatedMember.posicion_principal,
            estado_registro: updatedMember.estado_registro,
          };
        })
      );

      setEditingMemberId(null);
      setMemberDraft({});
      onUpdateMember?.(updatedMember);

      return updatedMember;
    },
    [memberDraft, onUpdateMember]
  );

  const unlinkMember = useCallback(
    (member) => {
      setMembers((currentMembers) =>
        currentMembers.filter((currentMember) => currentMember.id !== member.id)
      );
      onDesvincular?.(member);
      onUnlinkMember?.(member);
    },
    [onDesvincular, onUnlinkMember]
  );

  const addRequest = useCallback(
    (member) => {
      const newTicketId = Date.now();
      const newTicket = {
        id: newTicketId,
        nombre: `TCK-${String(newTicketId).slice(-4)}`,
        descripcion: "Solicitud pendiente de guardar.",
        status: "PENDIENTE",
        prioridad: "MEDIA",
        url: "#",
      };

      setMembers((currentMembers) =>
        currentMembers.map((currentMember) => {
          if (currentMember.id !== member.id) return currentMember;

          return {
            ...currentMember,
            ticketsAsignados: [...(currentMember.ticketsAsignados ?? []), newTicket],
          };
        })
      );

      onAddRequest?.(member);
    },
    [onAddRequest]
  );

  const actions = useMemo(
    () => ({
      header: [
        {
          id: "project.members.openAddMember",
          label: isAddMemberOpen ? "Cerrar formulario" : "Añadir miembro",
          icon: isAddMemberOpen ? "close" : "person_add",
          className: isAddMemberOpen
            ? "btn btn-sm btn-light border d-flex align-items-center gap-1"
            : "btn btn-sm btn-primary d-flex align-items-center gap-1",
          onExecute: toggleAddMemberForm,
        },
      ],
      search: [
        {
          id: "project.members.findMember",
          label: "Encontrar miembro",
          icon: "search",
          endpoint: API_ENDPOINTS.usuarios.list,
          method: "GET",
          className: "btn btn-sm btn-light border d-flex align-items-center gap-1",
          buildPayload: (payload) => ({
            query: payload.searchTerm,
            filters: ["nombre", "email", "posicion_principal", "estado_registro", "tags"],
          }),
          onExecute: findMember,
          pendingMessage:
            "La búsqueda está lista. Se ejecutará con los filtros del miembro seleccionado.",
        },
      ],
      addForm: [
        {
          id: "project.members.addMember",
          label: "Añadir miembro",
          icon: "person_add",
          endpoint: API_ENDPOINTS.proyectos.miembros.create,
          method: "POST",
          className: "btn btn-primary d-flex align-items-center gap-1",
          buildPayload: (payload) => ({
            id_usuario: Number(payload.id_usuario),
            estado_registro: "ACTIVO",
          }),
          onExecute: addMember,
          pendingMessage:
            "Se añadirá el usuario seleccionado al proyecto actual.",
        },
      ],
      editForm: [
        {
          id: "project.members.saveMemberChanges",
          label: "Guardar cambios",
          icon: "save",
          endpoint: API_ENDPOINTS.proyectos.miembros.update,
          method: "PATCH",
          className: "btn btn-sm btn-primary d-flex align-items-center gap-1",
          buildPayload: (payload) => ({
            id_usuario: Number(payload.id_usuario),
            cargo: payload.cargo ?? payload.rol ?? "MIEMBRO",
            estado_registro: payload.estado_registro,
          }),
          onExecute: saveMemberChanges,
          pendingMessage:
            "Se guardarán los cambios visibles del miembro.",
        },
        {
          id: "project.members.cancelMemberEdit",
          label: "Cancelar",
          icon: "close",
          className: "btn btn-sm btn-light border d-flex align-items-center gap-1",
          onExecute: cancelEditMember,
        },
      ],
      row: [
        {
          id: "project.members.edit",
          label: "Modificar",
          icon: "edit",
          className: "btn btn-sm btn-light border d-flex align-items-center gap-1",
          onExecute: (member) => startEditMember(member),
        },
        {
          id: "project.members.unlink",
          label: "Desvincular",
          endpoint: API_ENDPOINTS.proyectos.miembros.delete,
          method: "DELETE",
          className: "btn btn-sm btn-outline-danger d-flex align-items-center gap-1",
          confirm: {
            title: "Desvincular usuario",
            message:
              "Esta acción desvinculará al usuario del proyecto actual.",
            confirmLabel: "Desvincular",
            confirmClassName: "btn btn-danger",
          },
          onExecute: (member) => unlinkMember(member),
          successMessage: "Desvinculación preparada.",
        },
        {
          id: "project.members.addRequest",
          label: "Nueva request",
          endpoint: API_ENDPOINTS.proyectoAsignacion.create,
          method: "POST",
          className: "btn btn-sm btn-primary d-flex align-items-center gap-1",
          onExecute: (member) => addRequest(member),
          successMessage: "Solicitud preparada para crear una asignación/ticket.",
        },
      ],
    }),
    [
      addMember,
      addRequest,
      cancelEditMember,
      findMember,
      isAddMemberOpen,
      saveMemberChanges,
      startEditMember,
      toggleAddMemberForm,
      unlinkMember,
    ]
  );

  const value = useMemo(
    () => ({
      projectName,
      projectDescription,
      members,
      filteredMembers,
      searchTerm,
      setSearchTerm,
      isAddMemberOpen,
      selectedUserId,
      setSelectedUserId,
      availableUserOptions,
      editingMemberId,
      memberDraft,
      updateMemberDraftField,
      estadoRegistroOptions,
      actions,
    }),
    [
      actions,
      availableUserOptions,
      editingMemberId,
      filteredMembers,
      isAddMemberOpen,
      memberDraft,
      members,
      projectDescription,
      projectName,
      searchTerm,
      selectedUserId,
      updateMemberDraftField,
    ]
  );

  return <ProjectMembersContext.Provider value={value}>{children}</ProjectMembersContext.Provider>;
}

export function useProjectMembersContext() {
  const context = useContext(ProjectMembersContext);

  if (!context) {
    throw new Error("useProjectMembersContext debe usarse dentro de ProjectMembersProvider");
  }

  return context;
}
