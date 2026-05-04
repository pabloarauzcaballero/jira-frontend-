import { useState } from "react";

import ProjectHeader from "../components/ProjectHeader";
import MembersCard from "../components/MembersCard";
import ProjectEditModal from "../components/ProjectEditModal";
import "../styles/ProjectMembers.css";
import { ProjectMembersProvider } from "../context/ProjectMembersContext";
import LoadingState from "../../../shared/components/loading/LoadingState";

function ProjectMembersContent() {
  return (
    <main className="project-members-page flex-grow-1 pl-3 pt-1 bg-light min-vh-100">
      <ProjectHeader />
      <MembersCard />
    </main>
  );
}

export default function ProjectMembersPage(props) {
  const [editingProject, setEditingProject] = useState(null);

  if (props.isLoading) {
    return <LoadingState title="Cargando miembros" message="Sincronizando usuarios relacionados con el proyecto..." />;
  }

  async function handleSubmitEdit(payload) {
    if (!editingProject) return;

    await props.onEditProject?.(editingProject, payload);
    setEditingProject(null);
  }

  return (
    <ProjectMembersProvider {...props} onEditProject={setEditingProject}>
      <ProjectMembersContent />

      {editingProject && (
        <ProjectEditModal
          key={editingProject.id_proyecto ?? editingProject.id}
          project={editingProject}
          isSaving={props.isSavingProject}
          onClose={() => setEditingProject(null)}
          onSubmit={handleSubmitEdit}
        />
      )}
    </ProjectMembersProvider>
  );
}
