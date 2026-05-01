import "../styles/projects.css";

import ProjectsHeader from "../components/ProjectsHeader";
import ProjectSection from "../components/ProjectSection";
import { ProjectsProvider, useProjectsContext } from "../context/ProjectsContext";

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

export default function ProjectsPage({ currentProjects = [], recentProjects = [] }) {
  return (
    <ProjectsProvider currentProjects={currentProjects} recentProjects={recentProjects}>
      <ProjectsContent />
    </ProjectsProvider>
  );
}
