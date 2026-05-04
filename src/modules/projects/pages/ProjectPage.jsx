import "../styles/projects.css";

import ProjectsHeader from "../components/ProjectsHeader";
import ProjectSection from "../components/ProjectSection";
import { ProjectsProvider, useProjectsContext } from "../context/ProjectsContext";
import LoadingState from "../../../shared/components/loading/LoadingState";

function ProjectsContent() {
  const { currentProjects, recentProjects } = useProjectsContext();

  return (
    <section className="projects-page">
      <ProjectsHeader />

      <ProjectSection title="Proyectos activos" icon="workspaces" projects={currentProjects} />

      <ProjectSection
        title="Proyectos inactivos o históricos"
        icon="history"
        projects={recentProjects}
        muted
      />
    </section>
  );
}

export default function ProjectsPage({ currentProjects = [], recentProjects = [], isLoading = false }) {
  if (isLoading) {
    return <LoadingState title="Cargando proyectos" message="Obteniendo proyectos activos e históricos..." />;
  }

  return (
    <ProjectsProvider currentProjects={currentProjects} recentProjects={recentProjects}>
      <ProjectsContent />
    </ProjectsProvider>
  );
}
