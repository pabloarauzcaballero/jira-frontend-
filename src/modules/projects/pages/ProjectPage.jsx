import "../styles/projects.css";

import ProjectsHeader from "../components/ProjectsHeader";
import ProjectSection from "../components/ProjectSection";

export default function ProjectsPage({
  currentProjects = [],
  recentProjects = [],
}) {
  const totalProjects = currentProjects.length + recentProjects.length;

  return (
    <section className="projects-page">
      <ProjectsHeader
        totalProjects={totalProjects}
      />

      <ProjectSection
        title="Workspace actual"
        icon="workspaces"
        projects={currentProjects}
      />

      <ProjectSection
        title="Proyectos recientes"
        icon="history"
        projects={recentProjects}
        muted
      />
    </section>
  );
}