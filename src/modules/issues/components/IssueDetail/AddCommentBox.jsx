import { useState } from "react";

import ButtonActionGroup from "../../../../shared/components/actions/ButtonActionGroup";
import { useIssueDetailContext } from "../../context/IssueDetailContext";

export default function AddCommentBox({ currentUser }) {
  const [comment, setComment] = useState("");
  const { issue, actions } = useIssueDetailContext();
  const cleanComment = comment.trim();
  const userName = currentUser?.nombre ?? currentUser?.name ?? currentUser?.email ?? "Usuario";
  const avatarUrl = currentUser?.avatarUrl ?? currentUser?.urlProfile;

  return (
    <div className="issue-comment-box">
      {avatarUrl ? (
        <img src={avatarUrl} alt={userName} className="issue-user-avatar" />
      ) : (
        <div className="issue-user-avatar issue-user-avatar-fallback" aria-label={userName}>
          {currentUser?.initials || userName.slice(0, 2).toUpperCase()}
        </div>
      )}

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
              onExecute: async (payload) => {
                const result = await action.onExecute?.(payload);
                if (result !== false) setComment("");
                return result;
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
