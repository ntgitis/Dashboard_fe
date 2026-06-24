import { httpClient } from "./httpClient";

function normalizeOptionalString(value) {
  const normalizedValue = String(value ?? "").trim();
  return normalizedValue || "";
}

function cleanProductPayload(payload) {
  return {
    name: normalizeOptionalString(payload.name),
    description: normalizeOptionalString(payload.description),
    price: Number(payload.price),
    stock: Number(payload.stock),
    imageUrl: normalizeOptionalString(payload.imageUrl),
    sku: normalizeOptionalString(payload.sku),
    categoryId: Number(payload.categoryId),
  };
}

export async function getAdminProducts(params = {}) {
  const search = String(params.search ?? "").trim();

  return httpClient.get("/admin/products", {
    params: {
      search: search || undefined,
      categoryId: params.categoryId || undefined,
      minPrice: params.minPrice || undefined,
      maxPrice: params.maxPrice || undefined,
      active: typeof params.active === "boolean" ? params.active : undefined,
      page: params.page ?? 0,
      size: params.size ?? 10,
      sort: params.sort || "createdAt,desc",
    },
  });
}

export async function getAdminProductById(id) {
  return httpClient.get(`/admin/products/${id}`);
}

export async function createProduct(payload) {
  return httpClient.post("/admin/products", cleanProductPayload(payload));
}

export async function updateProduct(id, payload) {
  return httpClient.put(`/admin/products/${id}`, cleanProductPayload(payload));
}

export async function deleteProduct(id) {
  return httpClient.delete(`/admin/products/${id}`);
}

export async function getCategories() {
  return httpClient.get("/categories");
}
