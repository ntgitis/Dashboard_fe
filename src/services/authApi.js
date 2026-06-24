import { httpClient } from "./httpClient";
import {
  clearTokens,
  getRefreshToken,
  setAuthUser,
  setTokens,
} from "./tokenStorage";

function mapUserFromApi(user) {
  if (!user) return null;

  return {
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    name: user.fullName,
    dob: user.dob,
    phone: user.phone,
    address: user.address,
    role: user.role,
    avatarPath: user.avatarPath,
  };
}

function mapAuthResponseFromApi(data) {
  return {
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
    tokenType: data.tokenType || "Bearer",
    user: mapUserFromApi(data.user),
  };
}

export async function login(payload) {
  const data = await httpClient.post("/auth/login", {
    email: payload.email,
    password: payload.password,
  });

  const mappedData = mapAuthResponseFromApi(data);

  setTokens({
    accessToken: mappedData.accessToken,
    refreshToken: mappedData.refreshToken,
  });

  setAuthUser(mappedData.user);

  return mappedData;
}

export async function register(payload) {
  const data = await httpClient.post("/auth/register", payload);
  return mapAuthResponseFromApi(data);
}

export async function refreshToken() {
  const refreshTokenValue = getRefreshToken();

  if (!refreshTokenValue) {
    throw new Error("Không tìm thấy refresh token");
  }

  const data = await httpClient.post("/auth/refresh", {
    refreshToken: refreshTokenValue,
  });

  const mappedData = mapAuthResponseFromApi(data);

  setTokens({
    accessToken: mappedData.accessToken,
    refreshToken: mappedData.refreshToken,
  });

  if (mappedData.user) {
    setAuthUser(mappedData.user);
  }

  return mappedData;
}

export async function logout() {
  try {
    await httpClient.post("/auth/logout");
  } finally {
    clearTokens();
  }
}
