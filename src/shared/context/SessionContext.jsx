import { createContext, useCallback, useContext, useMemo, useState } from "react";

import { DEFAULT_TIMEZONE } from "../data/databaseOptions";
import { API_ENDPOINTS } from "../services/apiEndpoints";
import { ACCESS_TOKEN_STORAGE_KEY } from "../services/httpClient";

const SessionContext = createContext(null);
const SESSION_STORAGE_KEY = "jira_session";

function normalizeSessionUser(user = {}) {
  if (!user) return null;

  return {
    id_usuario: user.id_usuario ?? user.id ?? null,
    nombre: user.nombre ?? user.name ?? user.email ?? "Usuario",
    email: user.email ?? "",
    telefono: user.telefono ?? user.phone ?? null,
    timezone: user.timezone ?? DEFAULT_TIMEZONE,
    posicion_principal:
      user.posicion_principal ?? user.primaryPosition ?? user.position ?? "Sin posición asignada",
    is_two_factors: Boolean(user.is_two_factors ?? user.isTwoFactors ?? false),
    estado_registro: user.estado_registro ?? "ACTIVO",
    version: user.version ?? 1,
    tags: Array.isArray(user.tags) ? user.tags : [],
    avatarUrl: user.avatarUrl ?? user.urlProfile ?? null,
  };
}

function readStoredSession() {
  try {
    const rawSession = window.localStorage.getItem(SESSION_STORAGE_KEY);
    if (!rawSession) return {};

    const storedSession = JSON.parse(rawSession);

    if (storedSession?.auth?.accessToken) {
      window.localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, storedSession.auth.accessToken);
    }

    return storedSession;
  } catch (_error) {
    return {};
  }
}

function persistSession(session) {
  try {
    window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));

    if (session?.auth?.accessToken) {
      window.localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, session.auth.accessToken);
    }
  } catch (_error) {
    // Local storage can fail in private mode. The app still works in memory.
  }
}

function clearStoredSession() {
  window.localStorage.removeItem(SESSION_STORAGE_KEY);
  window.localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
}

function buildDefaultSession(initialSession = {}) {
  const storedSession = readStoredSession();

  return {
    auth: {
      isAuthenticated: false,
      accessToken: null,
      refreshToken: null,
      csrfToken: null,
      sessionId: null,
    },
    currentUser: null,
    active: {
      id_proyecto: null,
      id_ticket: null,
      workspace: "Workspace principal",
    },
    permissions: {
      usuarios: { read: true, create: true, update: true, delete: true },
      proyectos: { read: true, create: true, update: true, delete: true },
      tickets: {
        read: true,
        create: true,
        update: true,
        delete: true,
        changeStatus: true,
        comment: true,
      },
      asignaciones: { read: true, create: true, update: true, delete: true },
    },
    preferences: {
      timezone: DEFAULT_TIMEZONE,
      language: "es-BO",
      theme: "light",
      pageSize: 10,
    },
    ui: {
      sidebarCollapsed: false,
      activeView: "signup",
    },
    endpoints: API_ENDPOINTS,
    lastSyncAt: null,
    ...storedSession,
    ...initialSession,
  };
}

export function SessionProvider({ children, initialSession = {} }) {
  const [session, setSessionState] = useState(() => buildDefaultSession(initialSession));

  const setSession = useCallback((updater) => {
    setSessionState((currentSession) => {
      const nextSession = typeof updater === "function" ? updater(currentSession) : updater;
      persistSession(nextSession);
      return nextSession;
    });
  }, []);

  const updateSession = useCallback(
    (partialSession) => {
      setSession((currentSession) => ({
        ...currentSession,
        ...partialSession,
      }));
    },
    [setSession]
  );

  const updateCurrentUser = useCallback(
    (partialUser) => {
      setSession((currentSession) => ({
        ...currentSession,
        currentUser: normalizeSessionUser({
          ...currentSession.currentUser,
          ...partialUser,
        }),
      }));
    },
    [setSession]
  );

  const setAuthSession = useCallback(
    (authPayload = {}) => {
      const user = normalizeSessionUser(
        authPayload.user ?? authPayload.currentUser ?? authPayload.usuario ?? authPayload
      );

      setSession((currentSession) => ({
        ...currentSession,
        auth: {
          ...currentSession.auth,
          isAuthenticated: Boolean(user),
          accessToken: authPayload.accessToken ?? currentSession.auth.accessToken,
          refreshToken: authPayload.refreshToken ?? currentSession.auth.refreshToken,
          csrfToken: authPayload.csrfToken ?? currentSession.auth.csrfToken,
          sessionId: authPayload.sessionId ?? currentSession.auth.sessionId,
        },
        currentUser: user,
        preferences: {
          ...currentSession.preferences,
          timezone: user?.timezone ?? currentSession.preferences.timezone,
        },
        lastSyncAt: new Date().toISOString(),
      }));
    },
    [setSession]
  );

  const setActiveProject = useCallback(
    (idProyecto) => {
      setSession((currentSession) => ({
        ...currentSession,
        active: {
          ...currentSession.active,
          id_proyecto: idProyecto ? Number(idProyecto) : null,
        },
      }));
    },
    [setSession]
  );

  const setActiveTicket = useCallback(
    (idTicket) => {
      setSession((currentSession) => ({
        ...currentSession,
        active: {
          ...currentSession.active,
          id_ticket: idTicket ? Number(idTicket) : null,
        },
      }));
    },
    [setSession]
  );

  const setActiveView = useCallback(
    (activeView) => {
      setSession((currentSession) => ({
        ...currentSession,
        ui: {
          ...currentSession.ui,
          activeView,
        },
      }));
    },
    [setSession]
  );

  const logout = useCallback(() => {
    clearStoredSession();

    setSessionState((currentSession) => ({
      ...currentSession,
      auth: {
        ...currentSession.auth,
        isAuthenticated: false,
        accessToken: null,
        refreshToken: null,
        csrfToken: null,
        sessionId: null,
      },
      currentUser: null,
      active: {
        ...currentSession.active,
        id_proyecto: null,
        id_ticket: null,
      },
      lastSyncAt: new Date().toISOString(),
    }));
  }, []);

  const value = useMemo(
    () => ({
      session,
      currentUser: session.currentUser,
      auth: session.auth,
      active: session.active,
      permissions: session.permissions,
      preferences: session.preferences,
      endpoints: session.endpoints,
      updateSession,
      updateCurrentUser,
      setAuthSession,
      setActiveProject,
      setActiveTicket,
      setActiveView,
      logout,
    }),
    [
      session,
      updateSession,
      updateCurrentUser,
      setAuthSession,
      setActiveProject,
      setActiveTicket,
      setActiveView,
      logout,
    ]
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSessionContext() {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error("useSessionContext debe usarse dentro de SessionProvider");
  }

  return context;
}
