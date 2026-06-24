import { httpClient } from "./httpClient";

export async function getPublicProducts(params = {}) {
  const search = String(params.search ?? "").trim();

  return httpClient.get("/products", {
    params: {
      search: search || undefined,
      category: params.category || undefined,
      page: params.page ?? 0,
      size: params.size ?? 10,
      sort: params.sort || "createdAt,desc",
    },
  });
}
