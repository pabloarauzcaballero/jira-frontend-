import "../../styles/CreateIssue.css";

import CreateIssueHeader from "../../components/CreateIssue/CreateIssueHeader";
import IssueFormCard from "../../components/CreateIssue/IssueFormCard";
import IssueFormActions from "../../components/CreateIssue/IssueFormActions";
import { CreateIssueProvider, useCreateIssueContext } from "../../context/CreateIssueContext";

function CreateIssueContent() {
  const { actions, formData } = useCreateIssueContext();

  return (
    <section className="create-issue-page">
      <CreateIssueHeader />
      <IssueFormCard />
      <IssueFormActions actions={actions.form} contextPayload={formData} />
    </section>
  );
}

export default function CreateIssuePage(props) {
  return (
    <CreateIssueProvider {...props}>
      <CreateIssueContent />
    </CreateIssueProvider>
  );
}
