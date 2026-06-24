import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getAccessToken, getAuthUser } from "@/services/tokenStorage";

function normalizeRole(role) {
  return String(role || "")
    .toUpperCase()
    .replace(/^ROLE_/, "");
}

function getHomePathByRole(role) {
  const normalizedRole = normalizeRole(role);

  if (normalizedRole === "ADMIN") {
    return "/admin";
  }

  if (normalizedRole === "USER") {
    return "/user";
  }

  return "/login";
}

export function GuestRoute() {
  const token = getAccessToken();
  const user = getAuthUser();

  if (token && user?.role) {
    return <Navigate to={getHomePathByRole(user.role)} replace />;
  }

  return <Outlet />;
}

export default function ProtectedRoute({ allowedRoles = [] }) {
  const location = useLocation();

  const token = getAccessToken();
  const user = getAuthUser();

  const userRole = normalizeRole(user?.role);
  const normalizedAllowedRoles = allowedRoles.map(normalizeRole);

  if (!token || !user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (
    normalizedAllowedRoles.length > 0 &&
    !normalizedAllowedRoles.includes(userRole)
  ) {
    return <Navigate to={getHomePathByRole(userRole)} replace />;
  }

  return <Outlet />;
}
