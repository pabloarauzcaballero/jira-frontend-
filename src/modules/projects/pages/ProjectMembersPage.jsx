import ProjectHeader from "../components/ProjectHeader";
import MembersCard from "../components/MembersCard";
import "../styles/ProjectMembers.css";
import { ProjectMembersProvider, useProjectMembersContext } from "../context/ProjectMembersContext";
import LoadingState from "../../../shared/components/loading/LoadingState";

function ProjectMembersContent() {
  const { projectName, projectDescription } = useProjectMembersContext();

  return (
    <main className="project-members-page flex-grow-1 pl-3 pt-1 bg-light min-vh-100">
      <ProjectHeader projectName={projectName} projectDescription={projectDescription} />
      <MembersCard />
    </main>
  );
}

export default function ProjectMembersPage(props) {
  if (props.isLoading) {
    return <LoadingState title="Cargando miembros" message="Sincronizando usuarios relacionados con el proyecto..." />;
  }

  return (
    <ProjectMembersProvider {...props}>
      <ProjectMembersContent />
    </ProjectMembersProvider>
  );
}
