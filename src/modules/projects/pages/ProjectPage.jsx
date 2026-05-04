import { useState } from "react";

import "../styles/projects.css";

import ProjectsHeader from "../components/ProjectsHeader";
import ProjectSection from "../components/ProjectSection";
import ProjectEditModal from "../components/ProjectEditModal";
import { ProjectsProvider, useProjectsContext } from "../context/ProjectsContext";
import LoadingState from "../../../shared/components/loading/LoadingState";

function ProjectsContent({ editingProject, isSavingProject, onCloseEdit, onSubmitEdit }) {
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

      {editingProject && (
        <ProjectEditModal
          key={editingProject.id_proyecto ?? editingProject.id}
          project={editingProject}
          isSaving={isSavingProject}
          onClose={onCloseEdit}
          onSubmit={onSubmitEdit}
        />
      )}
    </section>
  );
}

export default function ProjectsPage({
  currentProjects = [],
  recentProjects = [],
  isLoading = false,
  isSavingProject = false,
  onManageMembers,
  onEditProject,
}) {
  const [editingProject, setEditingProject] = useState(null);

  if (isLoading) {
    return <LoadingState title="Cargando proyectos" message="Obteniendo proyectos activos e históricos..." />;
  }

  async function handleSubmitEdit(payload) {
    if (!editingProject) return;

    await onEditProject?.(editingProject, payload);
    setEditingProject(null);
  }

  return (
    <ProjectsProvider
      currentProjects={currentProjects}
      recentProjects={recentProjects}
      onManageMembers={onManageMembers}
      onEditProject={setEditingProject}
    >
      <ProjectsContent
        editingProject={editingProject}
        isSavingProject={isSavingProject}
        onCloseEdit={() => setEditingProject(null)}
        onSubmitEdit={handleSubmitEdit}
      />
    </ProjectsProvider>
  );
}
