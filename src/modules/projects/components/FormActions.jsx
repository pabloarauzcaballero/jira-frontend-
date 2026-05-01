import ButtonActionGroup from "../../../shared/components/actions/ButtonActionGroup";

export default function FormActions({ actions = [], contextPayload = {} }) {
  return (
    <ButtonActionGroup
      actions={actions}
      contextPayload={contextPayload}
      className="create-project-actions"
    />
  );
}
