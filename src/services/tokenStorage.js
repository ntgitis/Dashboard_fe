const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function setTokens({ accessToken, refreshToken }) {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);

  if (refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }
}

export function clearTokens() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}

//sau này backend dùng http only cookie nên ko cần lưu refresh token trong localStorage nữa,
//chỉ cần lưu access token thôi. Khi hết hạn access token thì gọi api refresh token backend
// sẽ trả về access token mới và backend sẽ tự động set http only cookie cho refresh token.
// Nên sau này chỉ cần lưu access token trong localStorage thôi, ko cần lưu refresh token nữa.
