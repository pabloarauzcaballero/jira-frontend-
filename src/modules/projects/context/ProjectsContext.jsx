import { createContext, useContext, useMemo } from "react";

import { API_ENDPOINTS } from "../../../shared/services/apiEndpoints";

const ProjectsContext = createContext(null);

export function ProjectsProvider({ children, currentProjects = [], recentProjects = [] }) {
  const actions = useMemo(
    () => ({
      header: [
        {
          id: "projects.filter",
          label: "Filtrar",
          icon: "filter_list",
          endpoint: API_ENDPOINTS.proyectos.list,
          method: "GET",
          successMessage: "Filtro de proyectos preparado.",
        },
        {
          id: "projects.create.navigate",
          label: "Nuevo proyecto",
          icon: "add",
          type: "navigate",
          to: "create-project",
          className: "btn btn-sm btn-primary px-3 d-flex align-items-center gap-1",
        },
      ],
      card: [
        {
          id: "projects.card.open",
          label: "Abrir",
          endpoint: API_ENDPOINTS.proyectos.detail,
          method: "GET",
          successMessage: "Consulta de detalle de proyecto preparada.",
        },
      ],
    }),
    []
  );

  const value = useMemo(
    () => ({ currentProjects, recentProjects, actions }),
    [currentProjects, recentProjects, actions]
  );

  return <ProjectsContext.Provider value={value}>{children}</ProjectsContext.Provider>;
}

export function useProjectsContext() {
  const context = useContext(ProjectsContext);

  if (!context) {
    throw new Error("useProjectsContext debe usarse dentro de ProjectsProvider");
  }

  return context;
}
