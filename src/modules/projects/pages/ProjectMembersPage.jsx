import ProjectHeader from "../components/ProjectHeader";
import MembersCard from "../components/MembersCard";
import "../styles/ProjectMembers.css";
import { ProjectMembersProvider, useProjectMembersContext } from "../context/ProjectMembersContext";

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
  return (
    <ProjectMembersProvider {...props}>
      <ProjectMembersContent />
    </ProjectMembersProvider>
  );
}
