import { createContext, useContext, useMemo } from "react";

const ProjectsContext = createContext(null);

export function ProjectsProvider({
  children,
  currentProjects = [],
  recentProjects = [],
  onManageMembers,
  onEditProject,
}) {
  const value = useMemo(
    () => ({ currentProjects, recentProjects, onManageMembers, onEditProject }),
    [currentProjects, recentProjects, onEditProject, onManageMembers]
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
