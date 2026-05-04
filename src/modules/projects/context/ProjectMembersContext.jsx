import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import { API_ENDPOINTS } from "../../../shared/services/apiEndpoints";
import { toMember } from "../../../shared/data/databaseAdapters";
import { estadoRegistroOptions, projectRoleOptions } from "../../../shared/data/databaseOptions";

const ProjectMembersContext = createContext(null);

function normalizeText(value = "") {
  return String(value).trim().toLowerCase();
}

function getMemberSearchText(member = {}) {
  return [
    member.nombre,
    member.email,
    member.cargo,
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

  return toMember(
    option.raw ?? {
      id_usuario: Number(option.value),
      nombre: option.label,
      posicion_principal: "Pendiente",
    },
    { cargo: "MIEMBRO", rol: "MIEMBRO" }
  );
}

export function ProjectMembersProvider({
  children,
  project,
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
  onEditProject,
}) {
  const [members, setMembers] = useState(initialMembers);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(initialUsers[0]?.value ?? "");
  const [editingMemberId, setEditingMemberId] = useState(null);
  const [memberDraft, setMemberDraft] = useState({});

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMembers(initialMembers);
  }, [initialMembers]);

  const userOptions = useMemo(() => initialUsers, [initialUsers]);

  const availableUserOptions = useMemo(() => {
    const currentMemberIds = new Set(members.map((member) => Number(member.id_usuario ?? member.id)));
    const filteredOptions = userOptions.filter((userOption) => !currentMemberIds.has(Number(userOption.value)));

    return filteredOptions;
  }, [members, userOptions]);

  useEffect(() => {
    if (!selectedUserId || !availableUserOptions.some((option) => String(option.value) === String(selectedUserId))) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedUserId(availableUserOptions[0]?.value ?? "");
    }
  }, [availableUserOptions, selectedUserId]);

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

      const memberWithRole = {
        ...newMember,
        cargo: payload.cargo ?? newMember.cargo ?? "MIEMBRO",
        rol: payload.cargo ?? newMember.rol ?? "MIEMBRO",
      };

      setMembers((currentMembers) => {
        const alreadyExists = currentMembers.some(
          (member) => Number(member.id_usuario ?? member.id) === idUsuario
        );

        if (alreadyExists) return currentMembers;

        return [...currentMembers, memberWithRole];
      });

      setSelectedUserId(availableUserOptions[0]?.value ?? "");
      setIsAddMemberOpen(false);
      onAddMember?.(memberWithRole);

      return memberWithRole;
    },
    [availableUserOptions, onAddMember, selectedUserId, userOptions]
  );

  const startEditMember = useCallback((member) => {
    const memberId = member.id_usuario ?? member.id;

    setEditingMemberId(memberId);
    setMemberDraft({
      id: memberId,
      id_usuario: memberId,
      nombre: member.nombre ?? "",
      email: member.email ?? "",
      posicion_principal: member.posicion_principal ?? "",
      cargo: member.cargo ?? member.rol ?? "MIEMBRO",
      rol: member.cargo ?? member.rol ?? "MIEMBRO",
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
        cargo: payload.cargo ?? memberDraft.cargo ?? "MIEMBRO",
      };

      updatedMember.rol = updatedMember.cargo;

      setMembers((currentMembers) =>
        currentMembers.map((member) => {
          const memberId = Number(member.id_usuario ?? member.id);
          const updatedMemberId = Number(updatedMember.id_usuario ?? updatedMember.id);

          if (memberId !== updatedMemberId) return member;

          return {
            ...member,
            cargo: updatedMember.cargo,
            rol: updatedMember.cargo,
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
        currentMembers.filter(
          (currentMember) => Number(currentMember.id_usuario ?? currentMember.id) !== Number(member.id_usuario ?? member.id)
        )
      );
      onDesvincular?.(member);
      onUnlinkMember?.(member);
    },
    [onDesvincular, onUnlinkMember]
  );

  const addRequest = useCallback(
    (member) => {
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
          endpoint: API_ENDPOINTS.proyectos.miembros.list,
          method: "GET",
          className: "btn btn-sm btn-light border d-flex align-items-center gap-1",
          buildPayload: (payload) => ({
            query: payload.searchTerm,
            filters: ["nombre", "email", "cargo", "estado_registro", "tags"],
          }),
          onExecute: findMember,
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
            cargo: payload.cargo ?? "MIEMBRO",
            estado_registro: "ACTIVO",
          }),
          onExecute: addMember,
        },
      ],
      editForm: [
        {
          id: "project.members.saveMemberChanges",
          label: "Guardar cambios",
          icon: "save",
          endpoint: API_ENDPOINTS.proyectos.miembros.update,
          method: "PUT",
          className: "btn btn-sm btn-primary d-flex align-items-center gap-1",
          buildPayload: (payload) => ({
            id_usuario: Number(payload.id_usuario),
            cargo: payload.cargo ?? "MIEMBRO",
            estado_registro: payload.estado_registro,
          }),
          onExecute: saveMemberChanges,
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
            message: "Esta acción desvinculará al usuario del proyecto actual.",
            confirmLabel: "Desvincular",
            confirmClassName: "btn btn-danger",
          },
          onExecute: (member) => unlinkMember(member),
        },
        {
          id: "project.members.addRequest",
          label: "Nuevo ticket",
          icon: "add_task",
          endpoint: API_ENDPOINTS.tickets.create,
          method: "POST",
          className: "btn btn-sm btn-primary d-flex align-items-center gap-1",
          onExecute: (member) => addRequest(member),
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
      project,
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
      projectRoleOptions,
      actions,
      onEditProject,
    }),
    [
      actions,
      availableUserOptions,
      editingMemberId,
      filteredMembers,
      isAddMemberOpen,
      memberDraft,
      members,
      onEditProject,
      project,
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
