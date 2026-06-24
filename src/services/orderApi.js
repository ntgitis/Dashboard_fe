import { httpClient } from "./httpClient";

export async function getAdminOrders(params = {}) {
  return httpClient.get("/admin/orders", {
    params: {
      status:
        params.status && params.status !== "all" ? params.status : undefined,
      page: params.page ?? 0,
      size: params.size ?? 10,
      sort: params.sort || "createdAt,desc",
    },
  });
}

export async function getAdminOrderById(id) {
  return httpClient.get(`/admin/orders/${id}`);
}

export async function updateAdminOrderStatus(id, status) {
  return httpClient.put(`/admin/orders/${id}/status`, null, {
    params: {
      status,
    },
  });
}
