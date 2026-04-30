import { useState } from "react";
import "../styles/createProject.css";

import CreateProjectHeader from "../components/CreateProjectHeader";
import ProjectFormCard from "../components/ProjectFormCard";

export default function CreateProjectPage({
  initialMembers = [],
  roles = ["Viewer", "Editor", "Admin"],
  onSubmit,
  onCancel,
}) {
  const [projectData, setProjectData] = useState({
    projectName: "",
    description: "",
  });

  const [members, setMembers] = useState(initialMembers);

  function handleProjectChange(field, value) {
    setProjectData((currentData) => ({
      ...currentData,
      [field]: value,
    }));
  }

  function handleAddMember(newMember) {
    setMembers((currentMembers) => [
      ...currentMembers,
      {
        id: crypto.randomUUID(),
        ...newMember,
      },
    ]);
  }

  function handleRemoveMember(memberId) {
    setMembers((currentMembers) =>
      currentMembers.filter((member) => member.id !== memberId)
    );
  }

  function handleSubmit() {
    const payload = {
      ...projectData,
      members,
    };

    onSubmit?.(payload);
    console.log("Create Project Payload:", payload);
  }

  return (
    <section className="create-project-page">
      <CreateProjectHeader />

      <ProjectFormCard
        projectData={projectData}
        members={members}
        roles={roles}
        onProjectChange={handleProjectChange}
        onAddMember={handleAddMember}
        onRemoveMember={handleRemoveMember}
        onSubmit={handleSubmit}
        onCancel={onCancel}
      />
    </section>
  );
}