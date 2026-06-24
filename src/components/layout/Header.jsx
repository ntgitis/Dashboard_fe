import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import { logout } from "@/services/authApi";
import { getAuthUser } from "@/services/tokenStorage";

function getRoleLabel(role) {
  if (role === "ADMIN") return "Quản trị viên";
  if (role === "USER") return "Khách hàng";
  return role || "Người dùng";
}

function getInitials(user, fallbackRole) {
  const displayName =
    user?.fullName ||
    user?.name ||
    user?.email ||
    (fallbackRole === "admin" ? "Admin" : "User");

  const parts = displayName.trim().split(/\s+/);

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export default function Header({
  role = "admin",
  drawerWidth = 260,
  onMenuClick,
}) {
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);

  const currentUser = useMemo(() => getAuthUser(), []);
  const userRole = currentUser?.role || (role === "admin" ? "ADMIN" : "USER");

  const displayName =
    currentUser?.fullName ||
    currentUser?.name ||
    currentUser?.email ||
    (role === "admin" ? "Admin" : "Người dùng");

  const subtitle = currentUser?.email || getRoleLabel(userRole);
  const initials = getInitials(currentUser, role);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await logout();
    } finally {
      navigate("/login", { replace: true });
    }
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      color="inherit"
      sx={{
        width: { md: `calc(100% - ${drawerWidth}px)` },
        ml: { md: `${drawerWidth}px` },
        borderBottom: 1,
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      <Toolbar sx={{ gap: 2 }}>
        <IconButton
          edge="start"
          onClick={onMenuClick}
          sx={{ display: { md: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        <Box sx={{ flexGrow: 1 }} />

        <Button
          variant="outlined"
          color="inherit"
          size="small"
          startIcon={<LogoutOutlinedIcon />}
          onClick={handleLogout}
          disabled={loggingOut}
          sx={{ display: { xs: "none", sm: "inline-flex" } }}
        >
          {loggingOut ? "Đang thoát..." : "Đăng xuất"}
        </Button>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.25,
            pl: { xs: 0, sm: 1 },
          }}
        >
          <Avatar sx={{ width: 36, height: 36, bgcolor: "primary.main" }}>
            {initials}
          </Avatar>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Typography variant="body2" fontWeight={700} lineHeight={1.2}>
              {displayName}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {subtitle}
            </Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
