import { useQuery } from "@tanstack/react-query";
import { productsApi } from "../api/products.api";

export function useProducts(params) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => productsApi.getProducts(params),
  });
}
