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
import LoadingState from "./shared/components/loading/LoadingState";
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
  meRequest,
  normalizeAuthResponse,
  persistAccessToken,
  refreshSessionRequest,
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
  updateUsuario,
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
  if (pathname.startsWith("/signup")) return "signup";
  return "login";
}

function getIdProyecto(proyecto = {}) {
  return proyecto?.id_proyecto ?? proyecto?.id;
}

function getIdTicket(ticket = {}) {
  return ticket.id_ticket ?? ticket.id;
}

function AppLayout({ onNavigate, onLogout, isLoading = false }) {
  const location = useLocation();
  const activeView = getActiveView(location.pathname);

  return (
    <>
      <NavBar />
      <HamburguerNav activeView={activeView} onNavigate={onNavigate} onLogout={onLogout} />
      <main className="app-main">
        {isLoading && (
          <div className="app-loading-strip">
            <LoadingState
              variant="compact"
              compact
              title="Sincronizando workspace"
              message="Cargando usuarios, proyectos, miembros y tickets..."
            />
          </div>
        )}
        <Outlet />
      </main>
    </>
  );
}

function ProtectedRoute({ isCheckingSession = false }) {
  const { auth } = useSessionContext();

  if (isCheckingSession) {
    return <LoadingState title="Verificando sesión" message="Validando la sesión activa..." />;
  }

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

function PublicOnlyRoute({ isCheckingSession = false }) {
  const { auth } = useSessionContext();

  if (isCheckingSession) {
    return <LoadingState title="Verificando sesión" message="Validando la sesión activa..." />;
  }

  if (auth.isAuthenticated) {
    return <Navigate to="/board" replace />;
  }

  return <Outlet />;
}

function IssueDetailRoute({ tickets = [], currentUser, activities = [], isWorkspaceLoading = false }) {
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

  return (
    <IssueDetailPage
      issue={issue}
      currentUser={currentUser}
      activities={activities}
      isLoading={isLoading || isWorkspaceLoading}
    />
  );
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
    updateCurrentUser,
    logout,
  } = useSessionContext();
  const { showError, showSuccess, showWarning } = useNotificationContext();

  const [usuarios, setUsuarios] = useState([]);
  const [proyectos, setProyectos] = useState([]);
  const [miembrosByProyecto, setMiembrosByProyecto] = useState({});
  const [tickets, setTickets] = useState([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [hasLoadedWorkspace, setHasLoadedWorkspace] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function validateStoredSession() {
      try {
        const sessionResult = await refreshSessionRequest().catch(() => meRequest());
        let normalizedSession = normalizeAuthResponse(sessionResult.data);

        if (!normalizedSession.user) {
          const meResult = await meRequest();
          normalizedSession = normalizeAuthResponse(meResult.data);
        }

        if (!normalizedSession.user) {
          throw new Error("No active session user was returned.");
        }

        if (isMounted) {
          persistAccessToken(normalizedSession.accessToken);
          setAuthSession(normalizedSession);
        }
      } catch (_error) {
        clearAccessToken();
        logout();
      } finally {
        if (isMounted) setIsCheckingSession(false);
      }
    }

    validateStoredSession();

    return () => {
      isMounted = false;
    };
  }, [logout, setAuthSession]);

  const reloadWorkspace = useCallback(async () => {
    if (isCheckingSession || !auth.isAuthenticated) return;

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
          "No se pudieron cargar todos los datos del workspace.",
      });
    } finally {
      setHasLoadedWorkspace(true);
      setIsSyncing(false);
    }
  }, [active.id_proyecto, auth.isAuthenticated, isCheckingSession, setActiveProject, showWarning]);

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
      isLoading: isSyncing && !hasLoadedWorkspace,
    };
  }, [activeProjectMembers, currentMember, currentUser, hasLoadedWorkspace, isSyncing, miembrosByProyecto, projectOptions, proyectos, tickets, userOptions]);

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
        setAuthLoading(true);
        const result = await loginRequest(payload);
        let normalized = normalizeAuthResponse(result.data, {
          email: payload.email,
          nombre: payload.email,
          timezone: "America/La_Paz",
        });

        const meResult = await meRequest().catch(() => null);
        if (meResult?.data) {
          normalized = normalizeAuthResponse(meResult.data, normalized.user);
        }

        persistAccessToken(normalized.accessToken);
        setAuthSession(normalized);

        showSuccess({
          title: "Sesión iniciada",
          message: "Tu sesión fue iniciada correctamente.",
        });

        navigate("/board");
      } catch (error) {
        showError({
          title: "No se pudo iniciar sesión",
          message: error?.response?.data?.message || error.message || "Verifica tus credenciales e inténtalo nuevamente.",
        });
      } finally {
        setAuthLoading(false);
      }
    },
    [navigate, setAuthSession, showError, showSuccess]
  );

  const handleSignUp = useCallback(
    async (payload) => {
      try {
        setAuthLoading(true);
        await signupRequest(payload);

        const loginResult = await loginRequest({
          email: payload.email,
          password: payload.password,
        });

        let normalized = normalizeAuthResponse(loginResult.data, payload);
        const meResult = await meRequest().catch(() => null);
        if (meResult?.data) {
          normalized = normalizeAuthResponse(meResult.data, normalized.user);
        }

        persistAccessToken(normalized.accessToken);
        setAuthSession(normalized);

        showSuccess({
          title: "Cuenta creada",
          message: "Tu cuenta fue creada y la sesión quedó activa.",
        });

        navigate("/board");
      } catch (error) {
        showError({
          title: "No se pudo registrar la cuenta",
          message: error?.response?.data?.message || error.message || "Verifica los datos ingresados e inténtalo nuevamente.",
        });
      } finally {
        setAuthLoading(false);
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
            message: "Completa el nombre y la descripción antes de crear el proyecto.",
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
          message: "El proyecto fue guardado correctamente y se actualizaron sus miembros.",
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
            message: "Completa el nombre, proyecto y usuario asignado antes de crear el ticket.",
          });
          return;
        }

        const createdTicket = await createTicket(payload);
        const newTicketId = getIdTicket(createdTicket?.ticket ?? createdTicket);

        await reloadWorkspace();

        showSuccess({
          title: "Ticket creado",
          message: "El ticket fue guardado correctamente.",
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

  const handleUpdateProfile = useCallback(
    async (payload) => {
      const idUsuario = currentUser?.id_usuario ?? currentUser?.id;

      if (!idUsuario) {
        showError({
          title: "No se pudo editar el perfil",
          message: "La sesión actual no tiene un id_usuario válido. Revisa que /api/auth/me devuelva el usuario autenticado.",
        });
        return;
      }

      try {
        setIsSavingProfile(true);
        const updatedUser = await updateUsuario(idUsuario, payload);
        updateCurrentUser(updatedUser ?? payload);

        setUsuarios((currentUsers) =>
          currentUsers.map((usuario) =>
            Number(usuario.id_usuario ?? usuario.id) === Number(idUsuario)
              ? { ...usuario, ...(updatedUser ?? payload) }
              : usuario
          )
        );

        showSuccess({
          title: "Perfil actualizado",
          message: "Los datos del usuario fueron guardados correctamente.",
        });
      } catch (error) {
        showError({
          title: "No se pudo editar el perfil",
          message: error?.response?.data?.message || error.message || "Revisa el endpoint de usuarios.",
        });
        throw error;
      } finally {
        setIsSavingProfile(false);
      }
    },
    [currentUser?.id, currentUser?.id_usuario, showError, showSuccess, updateCurrentUser]
  );

  const handlePasswordPending = useCallback(() => {
    showWarning({
      title: "Endpoint pendiente",
      message: "El cambio de contraseña necesita un endpoint específico en el backend. No reutilicé editar usuario para no tocar password_hash por accidente.",
    });
  }, [showWarning]);

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
        <Route element={<PublicOnlyRoute isCheckingSession={isCheckingSession} />}>
          <Route index element={<Navigate to="/login" replace />} />
          <Route
            path="/signup"
            element={
              <SignUpPage
                appName={APP_NAME}
                subtitle="Crea tu cuenta y empieza a gestionar tu workspace."
                icon="bug_report"
                timezones={timezones}
                footerLinks={footerLinks}
                onSignUp={handleSignUp}
                isLoading={authLoading}
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
                isLoading={authLoading}
              />
            }
          />
        </Route>

        <Route element={<ProtectedRoute isCheckingSession={isCheckingSession} />}>
          <Route element={<AppLayout onNavigate={navigateByView} onLogout={handleLogout} isLoading={isSyncing} />}>
            <Route path="/board" element={<BoardComponent {...routeData} />} />
            <Route
              path="/projects"
              element={
                <ProjectsPage
                  currentProjects={routeData.projects}
                  recentProjects={routeData.recentProjects}
                  isLoading={routeData.isLoading}
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
                  isLoading={routeData.isLoading}
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
                    "Selecciona un proyecto para revisar y administrar sus miembros."
                  }
                  members={routeData.members}
                  users={routeData.users}
                  onAddMember={handleAddMember}
                  onUpdateMember={handleUpdateMember}
                  onUnlinkMember={handleUnlinkMember}
                  isLoading={routeData.isLoading}
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
                  isLoading={routeData.isLoading}
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
                  isWorkspaceLoading={routeData.isLoading}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <UserProfilePage
                  {...routeData.profileData}
                  timezones={timezones}
                  isLoading={routeData.isLoading}
                  isSavingProfile={isSavingProfile}
                  onSubmitProfile={handleUpdateProfile}
                  onShowPasswordPending={handlePasswordPending}
                />
              }
            />
            <Route
              path="*"
              element={<Navigate to={auth.isAuthenticated ? "/board" : "/login"} replace />}
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
