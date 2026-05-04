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

export function persistAccessToken(accessToken) {
  if (!accessToken) return;
  window.localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, accessToken);
}

export function clearAccessToken() {
  window.localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
}

export function normalizeAuthResponse(responseData = {}, fallbackUser = {}) {
  const envelope = responseData?.data ?? responseData;
  const user = envelope?.user ?? envelope?.usuario ?? envelope?.currentUser ?? envelope ?? fallbackUser;

  return {
    user,
    accessToken:
      envelope?.accessToken ?? envelope?.access_token ?? envelope?.token ?? null,
    refreshToken: envelope?.refreshToken ?? envelope?.refresh_token ?? null,
    csrfToken: envelope?.csrfToken ?? envelope?.csrf_token ?? null,
    sessionId: envelope?.sessionId ?? envelope?.session_id ?? null,
  };
}
