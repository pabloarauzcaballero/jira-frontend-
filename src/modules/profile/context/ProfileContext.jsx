import { createContext, useContext, useMemo } from "react";

const ProfileContext = createContext(null);

export function ProfileProvider({
  children,
  profileData = {},
  onEditProfile,
  onChangePassword,
}) {
  const actions = useMemo(
    () => ({
      header: [
        {
          id: "profile.edit",
          label: "Editar perfil",
          icon: "edit",
          className: "btn btn-sm btn-primary d-flex align-items-center gap-1",
          onExecute: () => onEditProfile?.(),
        },
      ],
      details: [
        {
          id: "profile.details.edit",
          label: "Editar",
          icon: "edit",
          className: "btn btn-sm btn-light border d-flex align-items-center gap-1",
          onExecute: () => onEditProfile?.(),
        },
      ],
      security: [
        {
          id: "profile.security.password",
          label: "Cambiar contraseña",
          icon: "lock_reset",
          className: "btn btn-sm btn-light border d-flex align-items-center justify-content-center gap-1",
          onExecute: () => onChangePassword?.(),
        },
      ],
    }),
    [onChangePassword, onEditProfile]
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
