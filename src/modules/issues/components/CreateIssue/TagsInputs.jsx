import { useState } from "react";

export default function TagsInput({
  tags = [],
  onChange,
  label = "Valores",
  inputId = "dynamic-values",
  placeholder = "Agregar valor...",
}) {
  const [currentTag, setCurrentTag] = useState("");

  function handleAddTag(event) {
    if (event.key !== "Enter") return;

    event.preventDefault();

    const cleanTag = currentTag.trim();

    if (!cleanTag || tags.includes(cleanTag)) return;

    onChange([...tags, cleanTag]);
    setCurrentTag("");
  }

  function handleRemoveTag(tagToRemove) {
    onChange(tags.filter((tag) => tag !== tagToRemove));
  }

  return (
    <div className="mt-3">
      <div className="create-issue-tags-box">
        {tags.map((tag) => (
          <span key={tag} className="create-issue-tag">
            {tag}

            <button type="button" onClick={() => handleRemoveTag(tag)}>
              <span className="material-symbols-outlined">close</span>
            </button>
          </span>
        ))}

        <input
          id={inputId}
          type="text"
          placeholder={placeholder}
          aria-label={label}
          value={currentTag}
          onChange={(event) => setCurrentTag(event.target.value)}
          onKeyDown={handleAddTag}
        />
      </div>
    </div>
  );
}
