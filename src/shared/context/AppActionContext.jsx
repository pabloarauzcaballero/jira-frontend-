import { createContext, useCallback, useContext, useMemo } from "react";

import { useNotificationContext } from "./NotificationContext";
import { TODO_ENDPOINT } from "../services/apiEndpoints";

const AppActionContext = createContext(null);

function hasPendingEndpoint(endpoint) {
  return endpoint != null && (endpoint === TODO_ENDPOINT || String(endpoint).includes(TODO_ENDPOINT));
}

export function AppActionProvider({ children, onNavigate }) {
  const { showInfo, showSuccess, showError, showWarning, showConfirm } = useNotificationContext();

  const executeAction = useCallback(
    async (action = {}, runtimePayload = {}) => {
      if (!action || action.disabled) return null;

      const runAction = async () => {
        try {
          if (action.type === "navigate") {
            onNavigate?.(action.to, runtimePayload);
            action.onExecute?.(runtimePayload);
            return null;
          }

          const payload =
            typeof action.buildPayload === "function"
              ? action.buildPayload(runtimePayload)
              : runtimePayload;

          const pendingEndpoint = hasPendingEndpoint(action.endpoint);

          if (pendingEndpoint) {
            showWarning({
              title: action.pendingTitle || "Endpoint pendiente",
              message:
                action.pendingMessage ||
                "La acción ya está preparada en el front. Solo falta reemplazar TODO_ENDPOINT por tu ruta real del backend.",
              details: {
                actionId: action.id,
                endpoint: action.endpoint || TODO_ENDPOINT,
                method: action.method || "SIN_METODO",
                payload,
              },
            });
          }

          const result = await action.onExecute?.(payload, runtimePayload);

          if (action.successMessage && !pendingEndpoint) {
            showSuccess({
              title: action.successTitle || "Acción ejecutada",
              message: action.successMessage,
              details: action.showPayloadOnSuccess ? payload : null,
            });
          } else if (!action.onExecute && !pendingEndpoint) {
            showInfo({
              title: "Acción registrada",
              message: "Esta acción no tiene una función onExecute asignada todavía.",
              details: { actionId: action.id, payload },
            });
          }

          return result;
        } catch (error) {
          showError({
            title: action.errorTitle || "No se pudo ejecutar la acción",
            message: error?.message || "Error desconocido en la acción dinámica.",
            details: {
              actionId: action.id,
              endpoint: action.endpoint,
              method: action.method,
            },
          });
          return null;
        }
      };

      if (action.confirm) {
        showConfirm({
          title: action.confirm.title || "Confirmar acción",
          message: action.confirm.message || "¿Seguro que quieres continuar?",
          confirmLabel: action.confirm.confirmLabel || action.label || "Confirmar",
          cancelLabel: action.confirm.cancelLabel || "Cancelar",
          confirmClassName: action.confirm.confirmClassName,
          onConfirm: runAction,
        });
        return null;
      }

      return runAction();
    },
    [onNavigate, showConfirm, showError, showInfo, showSuccess, showWarning]
  );

  const value = useMemo(() => ({ executeAction }), [executeAction]);

  return <AppActionContext.Provider value={value}>{children}</AppActionContext.Provider>;
}

export function useAppActionContext() {
  const context = useContext(AppActionContext);

  if (!context) {
    throw new Error("useAppActionContext debe usarse dentro de AppActionProvider");
  }

  return context;
}
