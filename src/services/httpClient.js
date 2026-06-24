// import axios from "axios";
// import { getAccessToken, clearTokens } from "./tokenStorage";

// const API_BASE_URL =
//   import.meta.env.VITE_API_URL || "http://localhost:8080/api";

// export const httpClient = axios.create({
//   baseURL: API_BASE_URL,
//   timeout: 15000,
// });

// httpClient.interceptors.request.use((config) => {
//   const token = getAccessToken();

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// httpClient.interceptors.response.use(
//   (response) => response.data,
//   (error) => {
//     if (error.response?.status === 401) {
//       clearTokens();
//       window.location.href = "/login";
//     }

//     return Promise.reject(error);
//   },
// );

import axios from "axios";
import { clearTokens, getAccessToken } from "./tokenStorage";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8080/api";

export const httpClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use(
  (config) => {
    const token = getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

httpClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const status = error.response?.status;
    const requestUrl = error.config?.url || "";

    const isAuthRequest =
      requestUrl.includes("/auth/login") ||
      requestUrl.includes("/auth/register") ||
      requestUrl.includes("/auth/refresh");

    if (status === 401 && !isAuthRequest) {
      clearTokens();

      // Không dùng window.location.href ngay trong login flow.
      // Chỉ redirect nếu user đang ở page khác login.
      if (window.location.pathname !== "/login") {
        window.location.assign("/login");
      }
    }

    return Promise.reject(error);
  },
);
