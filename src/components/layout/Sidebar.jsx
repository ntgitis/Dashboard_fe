import {
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

export default function Sidebar({ role }) {
  const items = role === "admin" ? adminItems : userItems;

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper",
      }}
    >
      <Box sx={{ p: 2.5 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Avatar
            sx={{
              bgcolor: "primary.main",
              width: 42,
              height: 42,
            }}
          >
            <StorefrontOutlined />
          </Avatar>

          <Box>
            <Typography variant="h6" fontWeight={800} lineHeight={1.1}>
              Dashboard
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {role === "admin" ? "Quản trị" : "Khách hàng"}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider />

      <Box sx={{ p: 1.5, flex: 1 }}>
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
                  "&.active": {
                    bgcolor: "primary.main",
                    color: "primary.contrastText",
                    "& .MuiListItemIcon-root": {
                      color: "primary.contrastText",
                    },
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <Icon fontSize="small" />
                </ListItemIcon>

                <ListItemText primary={item.title} />
              </ListItemButton>
            );
          })}
        </List>
      </Box>
    </Box>
  );
}
