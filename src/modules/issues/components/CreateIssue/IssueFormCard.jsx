import ProjectIssueFields from "./ProjectIssueFields";
import SummaryField from "./SummaryField";
import DescriptionEditor from "./DescriptionEditor";
import IssueMetadataFields from "./IssueMetadataFields";

export default function IssueFormCard({
  formData,
  projects,
  issueTypes,
  priorities,
  statuses,
  onChange,
}) {
  return (
    <article className="create-issue-card">
      <ProjectIssueFields
        project={formData.project}
        issueType={formData.issueType}
        projects={projects}
        issueTypes={issueTypes}
        onChange={onChange}
      />

      <div className="create-issue-divider" />

      <SummaryField
        value={formData.summary}
        onChange={(value) => onChange("summary", value)}
      />

      <DescriptionEditor
        value={formData.description}
        onChange={(value) => onChange("description", value)}
      />

      <div className="create-issue-divider" />

      <IssueMetadataFields
        status={formData.status}
        assignee={formData.assignee}
        priority={formData.priority}
        tags={formData.tags}
        statuses={statuses}
        priorities={priorities}
        onChange={onChange}
      />
    </article>
  );
}