import "../../styles/CreateIssue.css";

import CreateIssueHeader from "../../components/CreateIssue/CreateIssueHeader";
import IssueFormCard from "../../components/CreateIssue/IssueFormCard";
import IssueFormActions from "../../components/CreateIssue/IssueFormActions";
import { CreateIssueProvider, useCreateIssueContext } from "../../context/CreateIssueContext";
import LoadingState from "../../../../shared/components/loading/LoadingState";

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
  if (props.isLoading) {
    return <LoadingState title="Preparando ticket" message="Cargando proyectos, usuarios, estados y prioridades..." />;
  }

  return (
    <CreateIssueProvider {...props}>
      <CreateIssueContent />
    </CreateIssueProvider>
  );
}
