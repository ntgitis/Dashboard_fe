import axios from "axios";
import { getAccessToken, clearTokens } from "./tokenStorage";

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 15000,
});

httpClient.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

httpClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      clearTokens();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);
