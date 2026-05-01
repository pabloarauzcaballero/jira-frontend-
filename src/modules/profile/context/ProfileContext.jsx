import { createContext, useContext, useMemo } from "react";

import { API_ENDPOINTS } from "../../../shared/services/apiEndpoints";

const ProfileContext = createContext(null);

export function ProfileProvider({ children, profileData = {} }) {
  const actions = useMemo(
    () => ({
      header: [
        {
          id: "profile.edit",
          label: "Editar perfil",
          icon: "edit",
          endpoint: API_ENDPOINTS.usuarios.update,
          method: "PATCH",
          className: "btn btn-sm btn-primary d-flex align-items-center gap-1",
          successMessage: "Edición de perfil preparada.",
        },
      ],
      security: [
        {
          id: "profile.security.password",
          label: "Cambiar contraseña",
          endpoint: API_ENDPOINTS.usuarios.update,
          method: "PATCH",
          className: "btn btn-sm btn-light border",
          successMessage: "Cambio de contraseña preparado.",
        },
      ],
    }),
    []
  );

  const value = useMemo(() => ({ profileData, actions }), [profileData, actions]);

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

export function useProfileContext() {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error("useProfileContext debe usarse dentro de ProfileProvider");
  }

  return context;
}
