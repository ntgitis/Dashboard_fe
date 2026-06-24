import { httpClient } from "./httpClient";

export async function getAdminUsers(params = {}) {
  return httpClient.get("/admin/users", {
    params: {
      page: params.page ?? 0,
      size: params.size ?? 10,
      sort: params.sort || "createdAt,desc",
    },
  });
}

export async function getAdminUserById(id) {
  return httpClient.get(`/admin/users/${id}`);
}

export async function updateAdminUserRole(id, role) {
  return httpClient.put(`/admin/users/${id}/role`, {
    role,
  });
}
