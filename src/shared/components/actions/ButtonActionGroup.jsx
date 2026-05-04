import { useState } from "react";

import { useAppActionContext } from "../../context/AppActionContext";

export default function ButtonActionGroup({
  actions = [],
  contextPayload = {},
  className = "d-flex flex-wrap align-items-center gap-2",
  defaultButtonClassName = "btn btn-sm btn-light border d-flex align-items-center gap-1",
}) {
  const { executeAction } = useAppActionContext();
  const [pendingActionId, setPendingActionId] = useState(null);

  async function handleClick(action) {
    if (action.disabled || pendingActionId) return;

    try {
      setPendingActionId(action.id);
      await executeAction(action, contextPayload);
    } finally {
      setPendingActionId(null);
    }
  }

  if (!actions.length) return null;

  return (
    <div className={className}>
      {actions.map((action) => {
        const isPending = pendingActionId === action.id;

        return (
          <button
            key={action.id}
            type="button"
            className={action.className || defaultButtonClassName}
            onClick={() => handleClick(action)}
            disabled={action.disabled || Boolean(pendingActionId)}
            title={action.title}
          >
            {isPending ? (
              <span className="button-spinner" aria-hidden="true" />
            ) : (
              action.icon && (
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: action.iconSize || "16px" }}
                >
                  {action.icon}
                </span>
              )
            )}
            {action.label && <span>{isPending ? action.loadingLabel || "Cargando..." : action.label}</span>}
          </button>
        );
      })}
    </div>
  );
}
