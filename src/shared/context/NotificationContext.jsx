import { createContext, useCallback, useContext, useMemo, useState } from "react";

import GeneralNotificationModal from "../components/modals/GeneralNotificationModal";

const NotificationContext = createContext(null);

const EMPTY_MODAL = {
  isOpen: false,
  variant: "info",
  title: "",
  message: "",
  details: null,
  onConfirm: null,
};

export function NotificationProvider({ children }) {
  const [modal, setModal] = useState(EMPTY_MODAL);

  const closeModal = useCallback(() => {
    setModal(EMPTY_MODAL);
  }, []);

  const showNotification = useCallback((config = {}) => {
    setModal({
      ...EMPTY_MODAL,
      ...config,
      variant: config.variant || "info",
      isOpen: true,
    });
  }, []);

  const showSuccess = useCallback(
    (config = {}) => showNotification({ ...config, variant: "success" }),
    [showNotification]
  );

  const showError = useCallback(
    (config = {}) => showNotification({ ...config, variant: "error" }),
    [showNotification]
  );

  const showWarning = useCallback(
    (config = {}) => showNotification({ ...config, variant: "warning" }),
    [showNotification]
  );

  const showInfo = useCallback(
    (config = {}) => showNotification({ ...config, variant: "info" }),
    [showNotification]
  );

  const showConfirm = useCallback(
    (config = {}) =>
      showNotification({
        ...config,
        variant: "confirm",
      }),
    [showNotification]
  );

  const handleConfirm = useCallback(async () => {
    const currentConfirm = modal.onConfirm;
    closeModal();

    if (typeof currentConfirm === "function") {
      await currentConfirm();
    }
  }, [closeModal, modal.onConfirm]);

  const value = useMemo(
    () => ({
      modal,
      closeModal,
      showNotification,
      showSuccess,
      showError,
      showWarning,
      showInfo,
      showConfirm,
    }),
    [
      modal,
      closeModal,
      showNotification,
      showSuccess,
      showError,
      showWarning,
      showInfo,
      showConfirm,
    ]
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <GeneralNotificationModal
        modal={modal}
        onClose={closeModal}
        onConfirm={handleConfirm}
      />
    </NotificationContext.Provider>
  );
}

export function useNotificationContext() {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error("useNotificationContext debe usarse dentro de NotificationProvider");
  }

  return context;
}
