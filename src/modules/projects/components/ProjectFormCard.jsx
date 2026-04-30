import GeneralDetailsSection from "./GeneralDetailsSection";
import TeamMembersSection from "./TeamMembersSection";
import FormActions from "./FormActions";

export default function ProjectFormCard({
  projectData,
  members,
  roles,
  onProjectChange,
  onAddMember,
  onRemoveMember,
  onSubmit,
  onCancel,
}) {
  return (
    <article className="create-project-card">
      <div className="create-project-card-body">
        <GeneralDetailsSection
          projectData={projectData}
          onProjectChange={onProjectChange}
        />

        <div className="create-project-divider"></div>

        <TeamMembersSection
          members={members}
          roles={roles}
          onAddMember={onAddMember}
          onRemoveMember={onRemoveMember}
        />
      </div>

      <FormActions onSubmit={onSubmit} onCancel={onCancel} />
    </article>
  );
}