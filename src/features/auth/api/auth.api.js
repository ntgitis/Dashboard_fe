import { httpClient } from "@/services/httpClient";

export const authApi = {
  login: (payload) => httpClient.post("/auth/login", payload),
  me: () => httpClient.get("/auth/me"),
  logout: () => httpClient.post("/auth/logout"),
};
