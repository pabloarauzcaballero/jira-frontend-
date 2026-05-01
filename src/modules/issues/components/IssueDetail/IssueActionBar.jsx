import ButtonActionGroup from "../../../../shared/components/actions/ButtonActionGroup";
import { useIssueDetailContext } from "../../context/IssueDetailContext";

export default function IssueActionBar() {
  const { issue, actions } = useIssueDetailContext();

  return (
    <ButtonActionGroup
      actions={actions.header}
      contextPayload={issue}
      className="issue-action-bar"
    />
  );
}
