import ProjectHeader from "../components/ProjectHeader";
import MembersCard from "../components/MembersCard";
import "../styles/ProjectMembers.css";

export default function ProjectMembersPage({
  projectName,
  projectDescription,
  members = [],
  onDesvincular,
  onUnlinkMember,
  onAddRequest,
}) {
  return (
    <main className="project-members-page flex-grow-1 pl-3 pt-1 bg-light min-vh-100">
      <ProjectHeader
        projectName={projectName}
        projectDescription={projectDescription}
      />

      <MembersCard
        members={members}
        onDesvincular={onDesvincular}
        onUnlinkMember={onUnlinkMember}
        onAddRequest={onAddRequest}
      />
    </main>
  );
}
