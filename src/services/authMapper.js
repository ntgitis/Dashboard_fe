export function mapUserFromApi(user) {
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

export function mapAuthResponseFromApi(data) {
  return {
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
    tokenType: data.tokenType || "Bearer",
    user: mapUserFromApi(data.user),
  };
}
