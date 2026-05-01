import { useState } from "react";

import ButtonActionGroup from "../../../../shared/components/actions/ButtonActionGroup";
import { useIssueDetailContext } from "../../context/IssueDetailContext";

export default function AddCommentBox({ currentUser }) {
  const [comment, setComment] = useState("");
  const { issue, actions } = useIssueDetailContext();
  const cleanComment = comment.trim();

  return (
    <div className="issue-comment-box">
      <img src={currentUser.avatarUrl} alt={currentUser.name} className="issue-user-avatar" />

      <div className="flex-grow-1">
        <textarea
          className="form-control issue-comment-textarea"
          placeholder="Registrar actualización..."
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />

        <div className="d-flex justify-content-end mt-2">
          <ButtonActionGroup
            actions={actions.comment.map((action) => ({
              ...action,
              disabled: !cleanComment,
              onExecute: (payload) => {
                action.onExecute?.(payload);
                setComment("");
              },
            }))}
            contextPayload={{ issue, comment: cleanComment }}
            className="d-flex"
          />
        </div>
      </div>
    </div>
  );
}
