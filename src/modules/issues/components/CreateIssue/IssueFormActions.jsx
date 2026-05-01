import ButtonActionGroup from "../../../../shared/components/actions/ButtonActionGroup";

export default function IssueFormActions({ actions = [], contextPayload = {} }) {
  return (
    <ButtonActionGroup
      actions={actions}
      contextPayload={contextPayload}
      className="create-issue-actions"
    />
  );
}
