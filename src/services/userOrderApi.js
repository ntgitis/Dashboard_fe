import { httpClient } from "./httpClient";

export async function getMyOrders(params = {}) {
  return httpClient.get("/orders", {
    params: {
      page: params.page ?? 0,
      size: params.size ?? 10,
      sort: params.sort || "createdAt,desc",
    },
  });
}

export async function getMyOrderById(id) {
  return httpClient.get(`/orders/${id}`);
}

export async function cancelMyOrder(id) {
  return httpClient.put(`/orders/${id}/cancel`);
}

export async function createOrder(payload) {
  return httpClient.post("/orders", {
    shippingAddress: payload.shippingAddress?.trim(),
    note: payload.note?.trim() || "",
  });
}
