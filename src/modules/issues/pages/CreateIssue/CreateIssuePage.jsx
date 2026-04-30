import { useState } from "react";

import "../../styles/createIssue.css";

import CreateIssueHeader from "../../components/CreateIssue/CreateIssueHeader";
import IssueFormCard from "../../components/CreateIssue/IssueFormCard";
import IssueFormActions from "../../components/CreateIssue/IssueFormActions";

export default function CreateIssuePage({
  projects = [],
  issueTypes = [],
  priorities = [],
  statuses = [],
  reporter,
  onSubmit,
  onCancel,
}) {
  const [formData, setFormData] = useState({
    project: projects[0]?.value || "",
    issueType: issueTypes[0]?.value || "",
    summary: "",
    description: "",
    status: statuses[0]?.value || "todo",
    assignee: "",
    priority: priorities[0]?.value || "medium",
    tags: ["frontend"],
  });

  function handleChange(field, value) {
    setFormData((currentData) => ({
      ...currentData,
      [field]: value,
    }));
  }

  function handleSubmit() {
    const payload = {
      ...formData,
      reporter,
    };

    console.log("Issue payload:", payload);
    onSubmit?.(payload);
  }

  return (
    <section className="create-issue-page">
      <CreateIssueHeader />

      <IssueFormCard
        formData={formData}
        projects={projects}
        issueTypes={issueTypes}
        priorities={priorities}
        statuses={statuses}
        onChange={handleChange}
      />

      <IssueFormActions onSubmit={handleSubmit} onCancel={onCancel} />
    </section>
  );
}