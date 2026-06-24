import { httpClient } from "./httpClient";

export async function getWishlist() {
  return httpClient.get("/wishlist");
}

export async function addWishlistItem(productId) {
  return httpClient.post("/wishlist/items", {
    productId: Number(productId),
  });
}

export async function removeWishlistItem(productId) {
  return httpClient.delete(`/wishlist/items/${productId}`);
}

export async function clearWishlist() {
  return httpClient.delete("/wishlist");
}
