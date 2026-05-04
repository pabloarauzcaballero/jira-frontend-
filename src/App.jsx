import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";

import LoginPage from "./modules/auth/pages/LoginPage";
import SignUpPage from "./modules/auth/pages/SignUpPage";
import BoardComponent from "./modules/boards/pages/boardComponent";
import CreateIssuePage from "./modules/issues/pages/CreateIssue/CreateIssuePage";
import IssueDetailPage from "./modules/issues/pages/IssueDetail/IssueDetailPage";
import UserProfilePage from "./modules/profile/pages/UserProfilePage";
import CreateProjectPage from "./modules/projects/pages/CreateProject";
import ProjectMembersPage from "./modules/projects/pages/ProjectMembersPage";
import ProjectsPage from "./modules/projects/pages/ProjectPage";
import HamburguerNav from "./shared/components/hamburguerNav";
import NavBar from "./shared/components/navBar";
import { AppActionProvider } from "./shared/context/AppActionContext";
import { useNotificationContext } from "./shared/context/NotificationContext";
import { useSessionContext } from "./shared/context/SessionContext";
import {
  buildEmptyIssueDetail,
  buildEmptyTicketsByStatus,
  buildProfileDataFromUser,
  groupTicketsByStatus,
  splitProjectCards,
  toIssueDetail,
  toMember,
  toProjectOption,
  toUserOption,
  unwrapProyectoMiembro,
} from "./shared/data/databaseAdapters";
import { ticketPriorityOptions, ticketStatusOptions } from "./shared/data/databaseOptions";
import {
  clearAccessToken,
  loginRequest,
  logoutRequest,
  normalizeAuthResponse,
  persistAccessToken,
  signupRequest,
} from "./shared/services/authService";
import {
  addProyectoMiembro,
  createProyecto,
  createTicket,
  getTicket,
  listProyectoMiembros,
  listProyectos,
  listTicketsByProyecto,
  listUsuarios,
  removeProyectoMiembro,
  updateProyectoMiembro,
} from "./shared/services/jiraApiService";

const APP_NAME = "Mini Issue Tracker";

const timezones = [
  { value: "America/La_Paz", label: "America/La_Paz" },
  { value: "UTC", label: "UTC" },
  { value: "America/New_York", label: "America/New_York" },
  { value: "Europe/London", label: "Europe/London" },
];

const footerLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Security", href: "#" },
  { label: "Status", href: "#" },
];

const ROUTE_BY_VIEW = {
  signup: "/signup",
  login: "/login",
  projects: "/projects",
  board: "/board",
  "create-issue": "/issues/new",
  "issue-detail": "/issues/pending",
  "project-members": "/projects/members",
  "create-project": "/projects/new",
  profile: "/profile",
};

function getActiveView(pathname = "") {
  if (pathname.startsWith("/projects/new")) return "create-project";
  if (pathname.startsWith("/projects/members")) return "project-members";
  if (pathname.startsWith("/projects")) return "projects";
  if (pathname.startsWith("/issues/new")) return "create-issue";
  if (pathname.startsWith("/issues/")) return "issue-detail";
  if (pathname.startsWith("/profile")) return "profile";
  if (pathname.startsWith("/board")) return "board";
  if (pathname.startsWith("/login")) return "login";
  return "signup";
}

function getIdProyecto(proyecto = {}) {
  return proyecto?.id_proyecto ?? proyecto?.id;
}

function getIdTicket(ticket = {}) {
  return ticket.id_ticket ?? ticket.id;
}

function AppLayout({ onNavigate }) {
  const location = useLocation();
  const activeView = getActiveView(location.pathname);

  return (
    <>
      <NavBar />
      <HamburguerNav activeView={activeView} onNavigate={onNavigate} />
      <main className="app-main">
        <Outlet />
      </main>
    </>
  );
}

function ProtectedRoute() {
  const { auth } = useSessionContext();

  if (!auth.isAuthenticated) {
    return <Navigate to="/signup" replace />;
  }

  return <Outlet />;
}

function PublicOnlyRoute() {
  const { auth } = useSessionContext();

  if (auth.isAuthenticated) {
    return <Navigate to="/board" replace />;
  }

  return <Outlet />;
}

function IssueDetailRoute({ tickets = [], currentUser, activities = [] }) {
  const { idTicket } = useParams();
  const [remoteTicket, setRemoteTicket] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const localTicket = useMemo(() => {
    if (!idTicket || idTicket === "pending") return tickets[0] ?? null;

    return tickets.find((ticket) => String(getIdTicket(ticket)) === String(idTicket)) ?? null;
  }, [idTicket, tickets]);

  useEffect(() => {
    let isMounted = true;

    async function loadTicketDetail() {
      if (!idTicket || idTicket === "pending" || localTicket) {
        setRemoteTicket(null);
        return;
      }

      try {
        setIsLoading(true);
        const ticket = await getTicket(idTicket);
        if (isMounted) setRemoteTicket(ticket);
      } catch (_error) {
        if (isMounted) setRemoteTicket(null);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadTicketDetail();

    return () => {
      isMounted = false;
    };
  }, [idTicket, localTicket]);

  const issue = useMemo(() => {
    if (isLoading) return buildEmptyIssueDetail(currentUser);
    return toIssueDetail(localTicket ?? remoteTicket, currentUser);
  }, [currentUser, isLoading, localTicket, remoteTicket]);

  return <IssueDetailPage issue={issue} currentUser={currentUser} activities={activities} />;
}

function AppRoutes() {
  const navigate = useNavigate();
  const {
    currentUser,
    auth,
    active,
    setAuthSession,
    setActiveProject,
    setActiveTicket,
    logout,
  } = useSessionContext();
  const { showError, showSuccess, showWarning } = useNotificationContext();

  const [usuarios, setUsuarios] = useState([]);
  const [proyectos, setProyectos] = useState([]);
  const [miembrosByProyecto, setMiembrosByProyecto] = useState({});
  const [tickets, setTickets] = useState([]);
  const [isSyncing, setIsSyncing] = useState(false);

  const reloadWorkspace = useCallback(async () => {
    if (!auth.isAuthenticated) return;

    try {
      setIsSyncing(true);

      const [usuariosData, proyectosData] = await Promise.all([
        listUsuarios().catch(() => []),
        listProyectos().catch(() => []),
      ]);

      const normalizedUsuarios = Array.isArray(usuariosData) ? usuariosData : [];
      const normalizedProyectos = Array.isArray(proyectosData) ? proyectosData : [];
      const proyectoIds = normalizedProyectos.map(getIdProyecto).filter(Boolean);

      const miembrosPairs = await Promise.all(
        proyectoIds.map(async (idProyecto) => {
          const miembros = await listProyectoMiembros(idProyecto).catch(() => []);
          return [idProyecto, miembros.map(unwrapProyectoMiembro)];
        })
      );

      const ticketsByProject = await Promise.all(
        proyectoIds.map(async (idProyecto) => {
          const projectTickets = await listTicketsByProyecto(idProyecto).catch(() => []);
          return projectTickets.map((ticket) => ({ ...ticket, id_proyecto: idProyecto }));
        })
      );

      const nextMiembrosByProyecto = Object.fromEntries(miembrosPairs);

      setUsuarios(normalizedUsuarios);
      setProyectos(normalizedProyectos);
      setMiembrosByProyecto(nextMiembrosByProyecto);
      setTickets(ticketsByProject.flat());

      if (!active.id_proyecto && proyectoIds[0]) {
        setActiveProject(proyectoIds[0]);
      }
    } catch (error) {
      showWarning({
        title: "Sincronización parcial",
        message:
          error?.response?.data?.message ||
          error.message ||
          "No se pudieron cargar todos los datos del backend.",
      });
    } finally {
      setIsSyncing(false);
    }
  }, [active.id_proyecto, auth.isAuthenticated, setActiveProject, showWarning]);

  useEffect(() => {
    reloadWorkspace();
  }, [reloadWorkspace]);

  const userOptions = useMemo(() => {
    const options = usuarios.map(toUserOption).filter((option) => option.value);

    if (currentUser?.id_usuario && !options.some((option) => Number(option.value) === Number(currentUser.id_usuario))) {
      options.unshift(toUserOption(currentUser));
    }

    return options;
  }, [currentUser, usuarios]);

  const projectOptions = useMemo(
    () => proyectos.map(toProjectOption).filter((option) => option.value),
    [proyectos]
  );

  const activeProject = useMemo(() => {
    if (active.id_proyecto) {
      return proyectos.find((proyecto) => Number(getIdProyecto(proyecto)) === Number(active.id_proyecto));
    }

    return proyectos[0] ?? null;
  }, [active.id_proyecto, proyectos]);

  const activeProjectId = getIdProyecto(activeProject) ?? active.id_proyecto ?? null;
  const activeProjectMembers = miembrosByProyecto[activeProjectId] ?? [];

  const currentMember = useMemo(
    () => (currentUser ? toMember(currentUser, { ticketsAsignados: [] }) : null),
    [currentUser]
  );

  const routeData = useMemo(() => {
    const fallbackMembers = currentMember ? [currentMember] : [];
    const teamMembers = activeProjectMembers.length > 0 ? activeProjectMembers : fallbackMembers;
    const projectsWithMembers = proyectos.map((proyecto) => ({
      ...proyecto,
      members: miembrosByProyecto[getIdProyecto(proyecto)] ?? [],
    }));
    const projectGroups = splitProjectCards(projectsWithMembers);

    return {
      users: userOptions,
      members: teamMembers,
      teamProfiles: teamMembers,
      statuses: ticketStatusOptions,
      priorities: ticketPriorityOptions,
      ticketsByStatus:
        tickets.length > 0
          ? groupTicketsByStatus(tickets)
          : buildEmptyTicketsByStatus(ticketStatusOptions),
      projects: projectGroups.currentProjects,
      recentProjects: projectGroups.recentProjects,
      projectOptions,
      profileData: buildProfileDataFromUser(currentUser),
      issue: toIssueDetail(tickets[0], currentUser),
      activities: [],
      isSyncing,
    };
  }, [activeProjectMembers, currentMember, currentUser, isSyncing, miembrosByProyecto, projectOptions, proyectos, tickets, userOptions]);

  const navigateByView = useCallback(
    (viewKey) => {
      const firstTicketId = getIdTicket(tickets[0]);
      const issuePath = firstTicketId ? `/issues/${firstTicketId}` : "/issues/pending";
      const path = viewKey === "issue-detail" ? issuePath : ROUTE_BY_VIEW[viewKey] ?? viewKey;

      navigate(path || "/board");
    },
    [navigate, tickets]
  );

  const handleLogin = useCallback(
    async (payload) => {
      try {
        const result = await loginRequest(payload);
        const normalized = normalizeAuthResponse(result.data, {
          email: payload.email,
          nombre: payload.email,
          timezone: "America/La_Paz",
        });

        persistAccessToken(normalized.accessToken);
        setAuthSession(normalized);

        showSuccess({
          title: "Sesión iniciada",
          message: "El backend respondió correctamente y la sesión fue sincronizada.",
        });

        navigate("/board");
      } catch (error) {
        showError({
          title: "No se pudo iniciar sesión",
          message: error?.response?.data?.message || error.message || "Revisa el endpoint de login.",
        });
      }
    },
    [navigate, setAuthSession, showError, showSuccess]
  );

  const handleSignUp = useCallback(
    async (payload) => {
      try {
        await signupRequest(payload);

        const loginResult = await loginRequest({
          email: payload.email,
          password: payload.password,
        });

        const normalized = normalizeAuthResponse(loginResult.data, payload);
        persistAccessToken(normalized.accessToken);
        setAuthSession(normalized);

        showSuccess({
          title: "Cuenta creada",
          message: "El usuario fue creado y luego autenticado para obtener la cookie JWT.",
        });

        navigate("/board");
      } catch (error) {
        showError({
          title: "No se pudo registrar la cuenta",
          message: error?.response?.data?.message || error.message || "Revisa el endpoint de signup.",
        });
      }
    },
    [navigate, setAuthSession, showError, showSuccess]
  );

  const handleCreateProject = useCallback(
    async (payload) => {
      try {
        if (!payload.nombre || !payload.descripcion) {
          showError({
            title: "Datos incompletos",
            message: "El backend requiere nombre y descripción para crear un proyecto.",
          });
          return;
        }

        const { miembros = [], ...projectPayload } = payload;
        const createdProject = await createProyecto(projectPayload);
        const idProyecto = getIdProyecto(createdProject);

        const membersToAdd = miembros.filter(
          (member) => Number(member.id_usuario) !== Number(currentUser?.id_usuario)
        );

        await Promise.all(
          membersToAdd.map((member) =>
            addProyectoMiembro(idProyecto, {
              id_usuario: Number(member.id_usuario),
              cargo: member.cargo ?? "MIEMBRO",
            }).catch(() => null)
          )
        );

        setActiveProject(idProyecto);
        await reloadWorkspace();

        showSuccess({
          title: "Proyecto creado",
          message: "El proyecto fue guardado en /api/proyectos y los miembros se intentaron vincular.",
        });

        navigate("/projects");
      } catch (error) {
        showError({
          title: "No se pudo crear el proyecto",
          message: error?.response?.data?.message || error.message || "Revisa el payload del proyecto.",
        });
      }
    },
    [currentUser?.id_usuario, navigate, reloadWorkspace, setActiveProject, showError, showSuccess]
  );

  const handleCreateTicket = useCallback(
    async (payload) => {
      try {
        if (!payload.nombre || !payload.id_proyecto || !payload.id_usuario) {
          showError({
            title: "Datos incompletos",
            message: "El backend requiere nombre, id_proyecto e id_usuario para crear el ticket.",
          });
          return;
        }

        const createdTicket = await createTicket(payload);
        const newTicketId = getIdTicket(createdTicket?.ticket ?? createdTicket);

        await reloadWorkspace();

        showSuccess({
          title: "Ticket creado",
          message: "El ticket fue guardado en /api/tickets junto con su asignación inicial.",
        });

        if (newTicketId) {
          setActiveTicket(newTicketId);
          navigate(`/issues/${newTicketId}`);
        } else {
          navigate("/board");
        }
      } catch (error) {
        showError({
          title: "No se pudo crear el ticket",
          message: error?.response?.data?.message || error.message || "Revisa el payload del ticket.",
        });
      }
    },
    [navigate, reloadWorkspace, setActiveTicket, showError, showSuccess]
  );

  const handleAddMember = useCallback(
    async (member) => {
      if (!activeProjectId || !member?.id_usuario) return;

      try {
        await addProyectoMiembro(activeProjectId, {
          id_usuario: Number(member.id_usuario),
          cargo: member.cargo ?? "MIEMBRO",
        });
        await reloadWorkspace();
        showSuccess({ title: "Miembro añadido", message: "El usuario fue vinculado al proyecto." });
      } catch (error) {
        showError({
          title: "No se pudo añadir el miembro",
          message: error?.response?.data?.message || error.message,
        });
      }
    },
    [activeProjectId, reloadWorkspace, showError, showSuccess]
  );

  const handleUpdateMember = useCallback(
    async (member) => {
      if (!activeProjectId || !member?.id_usuario) return;

      try {
        await updateProyectoMiembro(activeProjectId, member.id_usuario, {
          cargo: member.cargo ?? member.rol ?? "MIEMBRO",
          estado_registro: member.estado_registro ?? "ACTIVO",
        });
        await reloadWorkspace();
        showSuccess({ title: "Miembro actualizado", message: "La relación del miembro fue actualizada." });
      } catch (error) {
        showError({
          title: "No se pudo actualizar el miembro",
          message: error?.response?.data?.message || error.message,
        });
      }
    },
    [activeProjectId, reloadWorkspace, showError, showSuccess]
  );

  const handleUnlinkMember = useCallback(
    async (member) => {
      if (!activeProjectId || !member?.id_usuario) return;

      try {
        await removeProyectoMiembro(activeProjectId, member.id_usuario);
        await reloadWorkspace();
        showSuccess({ title: "Miembro desvinculado", message: "El usuario fue removido del proyecto." });
      } catch (error) {
        showError({
          title: "No se pudo desvincular el miembro",
          message: error?.response?.data?.message || error.message,
        });
      }
    },
    [activeProjectId, reloadWorkspace, showError, showSuccess]
  );

  const handleLogout = useCallback(async () => {
    try {
      await logoutRequest();
    } catch (_error) {
      // Aunque falle la llamada, limpiamos la sesión local.
    }

    clearAccessToken();
    logout();
    navigate("/login");
  }, [logout, navigate]);

  return (
    <AppActionProvider onNavigate={navigateByView}>
      <Routes>
        <Route element={<PublicOnlyRoute />}>
          <Route index element={<Navigate to="/signup" replace />} />
          <Route
            path="/signup"
            element={
              <SignUpPage
                appName={APP_NAME}
                subtitle="Crea tu cuenta y conecta el frontend con tu backend."
                icon="bug_report"
                timezones={timezones}
                footerLinks={footerLinks}
                onSignUp={handleSignUp}
              />
            }
          />
          <Route
            path="/login"
            element={
              <LoginPage
                appName={APP_NAME}
                subtitle="Ingresa para continuar con tu workspace."
                icon="bug_report"
                links={[
                  { label: "Crear cuenta", to: "/signup" },
                  { label: "Recuperar contraseña", href: "#" },
                ]}
                onLogin={handleLogin}
              />
            }
          />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout onNavigate={navigateByView} onLogout={handleLogout} />}>
            <Route path="/board" element={<BoardComponent {...routeData} />} />
            <Route
              path="/projects"
              element={
                <ProjectsPage
                  currentProjects={routeData.projects}
                  recentProjects={routeData.recentProjects}
                />
              }
            />
            <Route
              path="/projects/new"
              element={
                <CreateProjectPage
                  users={routeData.users}
                  initialMembers={routeData.members}
                  onSubmit={handleCreateProject}
                  onCancel={() => navigate("/projects")}
                />
              }
            />
            <Route
              path="/projects/members"
              element={
                <ProjectMembersPage
                  projectName={activeProject?.nombre ?? "Proyecto pendiente"}
                  projectDescription={
                    activeProject?.descripcion ??
                    "Crea o selecciona un proyecto para ver miembros reales desde /api/proyectos/:id/miembros."
                  }
                  members={routeData.members}
                  users={routeData.users}
                  onAddMember={handleAddMember}
                  onUpdateMember={handleUpdateMember}
                  onUnlinkMember={handleUnlinkMember}
                />
              }
            />
            <Route
              path="/issues/new"
              element={
                <CreateIssuePage
                  projects={routeData.projectOptions}
                  users={routeData.users}
                  priorities={routeData.priorities}
                  statuses={routeData.statuses}
                  onSubmit={handleCreateTicket}
                  onCancel={() => navigate("/board")}
                />
              }
            />
            <Route
              path="/issues/:idTicket"
              element={
                <IssueDetailRoute
                  tickets={tickets}
                  currentUser={currentUser}
                  activities={routeData.activities}
                />
              }
            />
            <Route path="/profile" element={<UserProfilePage {...routeData.profileData} />} />
            <Route
              path="*"
              element={<Navigate to={auth.isAuthenticated ? "/board" : "/signup"} replace />}
            />
          </Route>
        </Route>
      </Routes>
    </AppActionProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
