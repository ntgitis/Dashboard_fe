import { httpClient } from "@/services/httpClient";

export const ordersApi = {
  getOrders: (params) => httpClient.get("/orders", { params }),

  getOrderById: (id) => httpClient.get(`/orders/${id}`),

  updateOrderStatus: (id, status) =>
    httpClient.patch(`/orders/${id}/status`, { status }),
};
