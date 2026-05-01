import { createContext, useCallback, useContext, useMemo, useState } from "react";

import { DEFAULT_TIMEZONE } from "../data/databaseOptions";
import { API_ENDPOINTS } from "../services/apiEndpoints";

const SessionContext = createContext(null);

function buildDefaultSession(initialSession = {}) {
  return {
    auth: {
      isAuthenticated: true,
      accessToken: null,
      refreshToken: null,
      csrfToken: null,
      sessionId: "demo-session-local",
    },
    currentUser: {
      id_usuario: 1,
      nombre: "Usuario demo",
      email: "demo@example.com",
      telefono: null,
      timezone: DEFAULT_TIMEZONE,
      posicion_principal: "Usuario del sistema",
      is_two_factors: false,
      estado_registro: "ACTIVO",
      version: 1,
      tags: [],
      avatarUrl: "https://i.pravatar.cc/80?img=12",
    },
    active: {
      id_proyecto: 1,
      id_ticket: 102,
      workspace: "Base PostgreSQL",
    },
    permissions: {
      usuarios: { read: true, create: false, update: false, delete: false },
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
      activeView: "board",
    },
    endpoints: API_ENDPOINTS,
    lastSyncAt: null,
    ...initialSession,
  };
}

export function SessionProvider({ children, initialSession = {} }) {
  const [session, setSession] = useState(() => buildDefaultSession(initialSession));

  const updateSession = useCallback((partialSession) => {
    setSession((currentSession) => ({
      ...currentSession,
      ...partialSession,
    }));
  }, []);

  const updateCurrentUser = useCallback((partialUser) => {
    setSession((currentSession) => ({
      ...currentSession,
      currentUser: {
        ...currentSession.currentUser,
        ...partialUser,
      },
    }));
  }, []);

  const setActiveProject = useCallback((idProyecto) => {
    setSession((currentSession) => ({
      ...currentSession,
      active: {
        ...currentSession.active,
        id_proyecto: Number(idProyecto),
      },
    }));
  }, []);

  const setActiveTicket = useCallback((idTicket) => {
    setSession((currentSession) => ({
      ...currentSession,
      active: {
        ...currentSession.active,
        id_ticket: Number(idTicket),
      },
    }));
  }, []);

  const setActiveView = useCallback((activeView) => {
    setSession((currentSession) => ({
      ...currentSession,
      ui: {
        ...currentSession.ui,
        activeView,
      },
    }));
  }, []);

  const logout = useCallback(() => {
    setSession((currentSession) => ({
      ...currentSession,
      auth: {
        ...currentSession.auth,
        isAuthenticated: false,
        accessToken: null,
        refreshToken: null,
        csrfToken: null,
      },
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
      setActiveProject,
      setActiveTicket,
      setActiveView,
      logout,
    }),
    [
      session,
      updateSession,
      updateCurrentUser,
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
