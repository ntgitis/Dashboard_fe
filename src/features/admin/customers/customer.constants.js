export const USER_ROLE = {
  ADMIN: "ADMIN",
  USER: "USER",
};

export const USER_ROLE_OPTIONS = [
  {
    value: USER_ROLE.ADMIN,
    label: "Admin",
    color: "error",
  },
  {
    value: USER_ROLE.USER,
    label: "User",
    color: "success",
  },
];

export function getUserRoleMeta(role) {
  return (
    USER_ROLE_OPTIONS.find((option) => option.value === role) || {
      value: role,
      label: role || "-",
      color: "default",
    }
  );
}
