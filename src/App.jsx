import { useEffect, useMemo, useState } from "react";

import NavBar from "./shared/components/navBar";
import HamburguerNav from "./shared/components/hamburguerNav";
import BoardComponent from "./modules/boards/pages/boardComponent";
import ProjectsPage from "./modules/projects/pages/ProjectPage";
import ProjectMembersPage from "./modules/projects/pages/ProjectMembersPage";
import CreateProjectPage from "./modules/projects/pages/CreateProject";
import CreateIssuePage from "./modules/issues/pages/CreateIssue/CreateIssuePage";
import IssueDetailPage from "./modules/issues/pages/IssueDetail/IssueDetailPage";
import UserProfilePage from "./modules/profile/pages/UserProfilePage";

import { AppActionProvider } from "./shared/context/AppActionContext";
import { useNotificationContext } from "./shared/context/NotificationContext";
import { useSessionContext } from "./shared/context/SessionContext";

import {
  databaseSelectOptions,
  getCurrentUser,
  getIssueActivities,
  getIssueDetail,
  getProfileData,
  getProjectCards,
  getProjectMembers,
  groupTicketsByStatus,
  toMember,
} from "./shared/data/databaseAdapters.js";
import { ticketStatusOptions } from "./shared/data/databaseOptions.js";
import { usuarios } from "./shared/data/mockDatabase.js";

const CURRENT_USER_ID = 1;
const ACTIVE_PROJECT_ID = 1;
const ACTIVE_TICKET_ID = 102;

function splitProjectsByEstado(projectCards) {
  return {
    currentProjects: projectCards.filter((project) => project.status === "ACTIVO"),
    recentProjects: projectCards.filter((project) => project.status !== "ACTIVO"),
  };
}

export default function App() {
  const [activeView, setActiveView] = useState("board");
  const [members, setMembers] = useState(() => getProjectMembers(ACTIVE_PROJECT_ID));
  const { showInfo, showSuccess } = useNotificationContext();
  const { setActiveView: setSessionActiveView, updateCurrentUser } = useSessionContext();

  const ticketsByStatus = useMemo(() => groupTicketsByStatus(), []);
  const projectCards = useMemo(() => getProjectCards(), []);
  const { currentProjects, recentProjects } = splitProjectsByEstado(projectCards);
  const issue = useMemo(() => getIssueDetail(ACTIVE_TICKET_ID), []);
  const activities = useMemo(() => getIssueActivities(ACTIVE_TICKET_ID), []);
  const currentUser = useMemo(() => getCurrentUser(CURRENT_USER_ID), []);
  const profileData = useMemo(() => getProfileData(CURRENT_USER_ID), []);
  const teamProfiles = useMemo(
    () =>
      usuarios.map((usuario) => ({
        id: usuario.id_usuario,
        name: usuario.nombre,
        profileHeader: usuario.urlProfile || "https://i.pravatar.cc/80?img=12",
      })),
    []
  );

  useEffect(() => {
    updateCurrentUser({
      id_usuario: currentUser.id_usuario,
      nombre: currentUser.name,
      avatarUrl: currentUser.avatarUrl,
    });
  }, [currentUser, updateCurrentUser]);

  function handleNavigate(nextView) {
    setActiveView(nextView);
    setSessionActiveView(nextView);
  }

  function handleCreateIssue(payload) {
    console.log("Crear ticket sincronizado con DB:", payload);
  }

  function handleCreateProject(payload) {
    console.log("Crear proyecto sincronizado con DB:", payload);
  }

  function handleCancel() {
    showInfo({
      title: "Acción cancelada",
      message: "No se envió ningún payload. Puedes conectar aquí navegación o reset del formulario.",
    });
  }

  function handleDesvincular(memberToRemove) {
    setMembers((currentMembers) =>
      currentMembers.filter((member) => member.id !== memberToRemove.id)
    );
  }

  function handleAddRequest(selectedMember) {
    const newTicketId = Date.now();
    const newTicket = {
      id: newTicketId,
      nombre: `TCK-${String(newTicketId).slice(-4)}`,
      descripcion: "Ticket temporal creado desde la UI para probar la tabla.",
      status: "PENDIENTE",
      prioridad: "MEDIA",
      url: "#",
    };

    setMembers((currentMembers) =>
      currentMembers.map((member) => {
        if (member.id !== selectedMember.id) return member;

        return {
          ...member,
          ticketsAsignados: [...(member.ticketsAsignados ?? []), newTicket],
        };
      })
    );

    showSuccess({
      title: "Request agregada en memoria",
      message: "La UI quedó lista. Cambia el endpoint TODO_ENDPOINT para persistirlo en tu backend.",
      details: selectedMember,
    });
  }

  function handleAddMember(newMember) {
    setMembers((currentMembers) => {
      const alreadyExists = currentMembers.some(
        (member) => Number(member.id_usuario ?? member.id) === Number(newMember.id_usuario ?? newMember.id)
      );

      if (alreadyExists) return currentMembers;

      return [...currentMembers, newMember];
    });
  }

  function handleUpdateMember(updatedMember) {
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
  }

  function handleFindMember(searchSummary) {
    console.log("Encontrar miembro preparado:", searchSummary);
  }

  function renderActiveView() {
    if (activeView === "projects") {
      return (
        <ProjectsPage currentProjects={currentProjects} recentProjects={recentProjects} />
      );
    }

    if (activeView === "create-issue") {
      return (
        <CreateIssuePage
          projects={databaseSelectOptions.proyectos}
          users={databaseSelectOptions.usuarios}
          priorities={databaseSelectOptions.prioridades}
          statuses={databaseSelectOptions.statuses}
          reporterId={CURRENT_USER_ID}
          onSubmit={handleCreateIssue}
          onCancel={handleCancel}
        />
      );
    }

    if (activeView === "issue-detail") {
      return (
        <IssueDetailPage
          issue={issue}
          currentUser={currentUser}
          activities={activities}
          onEdit={() => console.log("Editar ticket", issue.key)}
          onDelete={() => console.log("Eliminar ticket", issue.key)}
          onChangeStatus={() => console.log("Cambiar status", issue.key)}
          onPostComment={(comment) => console.log("Nueva actualización:", comment)}
        />
      );
    }

    if (activeView === "project-members") {
      return (
        <ProjectMembersPage
          projectName={`Proyecto #${ACTIVE_PROJECT_ID}`}
          projectDescription="Usuarios agrupados desde proyecto_asignacion. Cada fila muestra tickets asignados al usuario en este proyecto."
          members={members}
          users={databaseSelectOptions.usuarios}
          onDesvincular={handleDesvincular}
          onAddRequest={handleAddRequest}
          onAddMember={handleAddMember}
          onUpdateMember={handleUpdateMember}
          onFindMember={handleFindMember}
        />
      );
    }

    if (activeView === "create-project") {
      return (
        <CreateProjectPage
          initialMembers={usuarios.slice(0, 2).map((usuario) => toMember(usuario))}
          users={databaseSelectOptions.usuarios}
          currentUserId={CURRENT_USER_ID}
          onSubmit={handleCreateProject}
          onCancel={handleCancel}
        />
      );
    }

    if (activeView === "profile") {
      return <UserProfilePage {...profileData} />;
    }

    return (
      <BoardComponent
        teamProfiles={teamProfiles}
        statuses={ticketStatusOptions}
        ticketsByStatus={ticketsByStatus}
      />
    );
  }

  return (
    <AppActionProvider onNavigate={handleNavigate}>
      <NavBar />
      <HamburguerNav activeView={activeView} onNavigate={handleNavigate} />

      <main className="app-main">
        <div className="app-sync-alert mb-3">
          <span className="material-symbols-outlined">database</span>
          <span>
            Front sincronizado con restricciones del DDL y acciones dinámicas. Los endpoints quedan como TODO_ENDPOINT para que tú conectes el backend.
          </span>
        </div>

        {renderActiveView()}
      </main>
    </AppActionProvider>
  );
}
