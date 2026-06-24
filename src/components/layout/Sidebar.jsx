import {
  BarChartOutlined,
  DashboardOutlined,
  FavoriteBorderOutlined,
  Inventory2Outlined,
  LocationOnOutlined,
  PeopleAltOutlined,
  PersonOutlineOutlined,
  ShoppingCartOutlined,
  StorefrontOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";

const adminItems = [
  { title: "Tổng quan", url: "/admin", icon: DashboardOutlined, end: true },
  { title: "Phân tích", url: "/admin/analytics", icon: BarChartOutlined },
  { title: "Sản phẩm", url: "/admin/products", icon: Inventory2Outlined },
  { title: "Đơn hàng", url: "/admin/orders", icon: ShoppingCartOutlined },
  { title: "Khách hàng", url: "/admin/customers", icon: PeopleAltOutlined },
];

const userItems = [
  { title: "Tổng quan", url: "/user", icon: DashboardOutlined, end: true },
  {
    title: "Đơn hàng của tôi",
    url: "/user/orders",
    icon: ShoppingCartOutlined,
  },
  { title: "Yêu thích", url: "/user/wishlist", icon: FavoriteBorderOutlined },
  { title: "Địa chỉ", url: "/user/addresses", icon: LocationOnOutlined },
  { title: "Hồ sơ", url: "/user/profile", icon: PersonOutlineOutlined },
];

export default function Sidebar({ role, onRoleChange }) {
  const items = role === "admin" ? adminItems : userItems;

  return (
    <Box sx={{ width: 260, height: "100%", bgcolor: "background.paper" }}>
      <Box sx={{ p: 2.5 }}>
        <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
          <Avatar sx={{ bgcolor: "primary.main" }}>
            <StorefrontOutlined />
          </Avatar>
          <Box>
            <Typography variant="subtitle1" fontWeight={700}>
              Store Dashboard
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {role === "admin" ? "Khu vực quản trị" : "Khu vực khách hàng"}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider />

      <Box sx={{ p: 1.5 }}>
        <Typography
          variant="overline"
          color="text.secondary"
          sx={{ px: 1.5, fontWeight: 700 }}
        >
          {role === "admin" ? "Quản trị" : "Tài khoản"}
        </Typography>

        <List dense sx={{ mt: 0.5 }}>
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <ListItemButton
                key={item.url}
                component={NavLink}
                to={item.url}
                end={item.end}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  color: "text.secondary",
                  "&.active": {
                    bgcolor: "primary.main",
                    color: "primary.contrastText",
                    "& .MuiListItemIcon-root": {
                      color: "primary.contrastText",
                    },
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 38, color: "inherit" }}>
                  <Icon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            );
          })}
        </List>
      </Box>

      {/* <Divider />

      <Box sx={{ p: 1.5 }}>
        <Typography
          variant="overline"
          color="text.secondary"
          sx={{ px: 1.5, fontWeight: 700 }}
        >
          Chuyển khu vực
        </Typography>

        <List dense sx={{ mt: 0.5 }}>
          <ListItemButton
            selected={role === "admin"}
            onClick={() => onRoleChange("admin")}
            sx={{ borderRadius: 2, mb: 0.5 }}
          >
            <ListItemIcon sx={{ minWidth: 38 }}>
              <DashboardOutlined fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Admin" />
          </ListItemButton>

          <ListItemButton
            selected={role === "user"}
            onClick={() => onRoleChange("user")}
            sx={{ borderRadius: 2 }}
          >
            <ListItemIcon sx={{ minWidth: 38 }}>
              <PersonOutlineOutlined fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Khách hàng" />
          </ListItemButton>
        </List>
      </Box> */}
    </Box>
  );
}
