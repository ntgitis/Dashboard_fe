import { httpClient } from "@/services/httpClient";

export const customersApi = {
  getCustomers: (params) => httpClient.get("/customers", { params }),

  getCustomerById: (id) => httpClient.get(`/customers/${id}`),

  updateCustomerStatus: (id, status) =>
    httpClient.patch(`/customers/${id}/status`, { status }),
};
