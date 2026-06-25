import { httpClient } from "./httpClient";

export async function getMyAddresses() {
  return httpClient.get("/users/me/addresses");
}

export async function createMyAddress(payload) {
  return httpClient.post("/users/me/addresses", {
    label: payload.label?.trim() || "",
    street: payload.street?.trim(),
    city: payload.city?.trim(),
    province: payload.province?.trim() || "",
    postalCode: payload.postalCode?.trim() || "",
    isDefault: Boolean(payload.isDefault),
  });
}

export async function updateMyAddress(id, payload) {
  return httpClient.put(`/users/me/addresses/${id}`, {
    label: payload.label?.trim() || "",
    street: payload.street?.trim(),
    city: payload.city?.trim(),
    province: payload.province?.trim() || "",
    postalCode: payload.postalCode?.trim() || "",
    isDefault: Boolean(payload.isDefault),
  });
}

export async function deleteMyAddress(id) {
  return httpClient.delete(`/users/me/addresses/${id}`);
}

export async function setDefaultAddress(id) {
  return httpClient.patch(`/users/me/addresses/${id}/default`);
}
