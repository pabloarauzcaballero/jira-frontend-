import { useState } from "react";

export default function AddCommentBox({ currentUser, onPostComment }) {
  const [comment, setComment] = useState("");

  function handlePost() {
    const cleanComment = comment.trim();

    if (!cleanComment) return;

    onPostComment?.(cleanComment);
    setComment("");
  }

  return (
    <div className="issue-comment-box">
      <img
        src={currentUser.avatarUrl}
        alt={currentUser.name}
        className="issue-user-avatar"
      />

      <div className="flex-grow-1">
        <textarea
          className="form-control issue-comment-textarea"
          placeholder="Add a comment..."
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />

        <div className="d-flex justify-content-end mt-2">
          <button
            type="button"
            className="btn btn-sm btn-primary"
            onClick={handlePost}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}