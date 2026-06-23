import { httpClient } from "@/services/httpClient";

export const productsApi = {
  getProducts: (params) => httpClient.get("/products", { params }),
  getProductById: (id) => httpClient.get(`/products/${id}`),
  createProduct: (payload) => httpClient.post("/products", payload),
  updateProduct: (id, payload) => httpClient.put(`/products/${id}`, payload),
  deleteProduct: (id) => httpClient.delete(`/products/${id}`),
  updateProductStatus: (id, status) =>
    httpClient.patch(`/products/${id}/status`, { status }),
};
