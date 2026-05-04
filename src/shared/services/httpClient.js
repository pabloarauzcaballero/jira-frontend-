import axios from "axios";

import { TODO_ENDPOINT } from "./apiEndpoints";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "https://jira-backend-pt30.onrender.com";
export const ACCESS_TOKEN_STORAGE_KEY = "jira_access_token";

export function resolveEndpoint(endpoint, ...params) {
  if (typeof endpoint === "function") {
    return endpoint(...params);
  }

  return endpoint;
}

export function isPendingEndpoint(endpoint) {
  return (
    !endpoint ||
    endpoint === TODO_ENDPOINT ||
    String(endpoint).includes(TODO_ENDPOINT)
  );
}

export const httpClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use((config) => {
  const accessToken = window.localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

export async function requestEndpoint({
  endpoint,
  endpointParams = [],
  method = "GET",
  data,
  params,
  config = {},
}) {
  const resolvedEndpoint = resolveEndpoint(endpoint, ...endpointParams);

  if (isPendingEndpoint(resolvedEndpoint)) {
    return {
      pending: true,
      endpoint: resolvedEndpoint || TODO_ENDPOINT,
      method,
      payload: data ?? params ?? null,
      data: null,
    };
  }

  const response = await httpClient.request({
    url: resolvedEndpoint,
    method,
    data,
    params,
    ...config,
  });

  return {
    pending: false,
    endpoint: resolvedEndpoint,
    method,
    payload: data ?? params ?? null,
    data: response.data,
  };
}
