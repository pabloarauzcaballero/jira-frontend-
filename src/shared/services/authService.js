import { API_ENDPOINTS } from "./apiEndpoints";
import { ACCESS_TOKEN_STORAGE_KEY, requestEndpoint } from "./httpClient";

export function loginRequest(payload) {
  return requestEndpoint({
    endpoint: API_ENDPOINTS.auth.login,
    method: "POST",
    data: {
      email: payload.email,
      password: payload.password,
    },
  });
}

export function signupRequest(payload) {
  return requestEndpoint({
    endpoint: API_ENDPOINTS.auth.signup,
    method: "POST",
    data: {
      nombre: payload.nombre,
      email: payload.email,
      telefono: payload.telefono,
      timezone: payload.timezone,
      posicion_principal: payload.posicion_principal,
      password_hash: payload.password_hash ?? payload.password,
      is_two_factors: Boolean(payload.is_two_factors),
    },
  });
}

export function logoutRequest() {
  return requestEndpoint({
    endpoint: API_ENDPOINTS.auth.logout,
    method: "POST",
  });
}

export function refreshSessionRequest() {
  return requestEndpoint({
    endpoint: API_ENDPOINTS.auth.refreshSession,
    method: "POST",
  });
}

export function meRequest() {
  return requestEndpoint({
    endpoint: API_ENDPOINTS.auth.me,
    method: "GET",
  });
}

export function persistAccessToken(accessToken) {
  if (!accessToken) return;
  window.localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, accessToken);
}

export function clearAccessToken() {
  window.localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
}

export function normalizeAuthResponse(responseData = {}, fallbackUser = {}) {
  const root = responseData ?? {};
  const envelope = root?.data ?? root;

  const rawUser =
    envelope?.user ??
    envelope?.usuario ??
    envelope?.currentUser ??
    envelope?.current_user ??
    envelope?.me ??
    root?.user ??
    root?.usuario ??
    root?.currentUser ??
    root?.current_user ??
    root?.me ??
    null;

  const envelopeLooksLikeUser = Boolean(
    envelope?.id_usuario || envelope?.id || envelope?.email || envelope?.nombre
  );

  const rootLooksLikeUser = Boolean(
    root?.id_usuario || root?.id || root?.email || root?.nombre
  );

  const fallbackLooksLikeUser = Boolean(
    fallbackUser?.id_usuario || fallbackUser?.id || fallbackUser?.email || fallbackUser?.nombre
  );

  return {
    user:
      rawUser ??
      (envelopeLooksLikeUser ? envelope : null) ??
      (rootLooksLikeUser ? root : null) ??
      (fallbackLooksLikeUser ? fallbackUser : null),
    accessToken:
      envelope?.accessToken ??
      envelope?.access_token ??
      envelope?.token ??
      root?.accessToken ??
      root?.access_token ??
      root?.token ??
      null,
    refreshToken:
      envelope?.refreshToken ??
      envelope?.refresh_token ??
      root?.refreshToken ??
      root?.refresh_token ??
      null,
    csrfToken:
      envelope?.csrfToken ??
      envelope?.csrf_token ??
      root?.csrfToken ??
      root?.csrf_token ??
      null,
    sessionId:
      envelope?.sessionId ??
      envelope?.session_id ??
      root?.sessionId ??
      root?.session_id ??
      null,
  };
}
