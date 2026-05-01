import GeneralDetailsSection from "./GeneralDetailsSection";
import TeamMembersSection from "./TeamMembersSection";
import FormActions from "./FormActions";
import { useCreateProjectContext } from "../context/CreateProjectContext";

export default function ProjectFormCard() {
  const {
    projectData,
    members,
    users,
    estadoRegistroOptions,
    handleProjectChange,
    handleAddMember,
    handleRemoveMember,
    actions,
  } = useCreateProjectContext();

  return (
    <article className="create-project-card">
      <div className="create-project-card-body">
        <GeneralDetailsSection
          projectData={projectData}
          estadoRegistroOptions={estadoRegistroOptions}
          onProjectChange={handleProjectChange}
        />

        <div className="create-project-divider"></div>

        <TeamMembersSection
          members={members}
          users={users}
          onAddMember={handleAddMember}
          onRemoveMember={handleRemoveMember}
        />
      </div>

      <FormActions actions={actions.form} contextPayload={projectData} />
    </article>
  );
}
