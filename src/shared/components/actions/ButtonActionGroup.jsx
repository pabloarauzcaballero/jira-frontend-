import { useAppActionContext } from "../../context/AppActionContext";

export default function ButtonActionGroup({
  actions = [],
  contextPayload = {},
  className = "d-flex flex-wrap align-items-center gap-2",
  defaultButtonClassName = "btn btn-sm btn-light border d-flex align-items-center gap-1",
}) {
  const { executeAction } = useAppActionContext();

  if (!actions.length) return null;

  return (
    <div className={className}>
      {actions.map((action) => (
        <button
          key={action.id}
          type="button"
          className={action.className || defaultButtonClassName}
          onClick={() => executeAction(action, contextPayload)}
          disabled={action.disabled}
          title={action.title}
        >
          {action.icon && (
            <span
              className="material-symbols-outlined"
              style={{ fontSize: action.iconSize || "16px" }}
            >
              {action.icon}
            </span>
          )}
          {action.label && <span>{action.label}</span>}
        </button>
      ))}
    </div>
  );
}
