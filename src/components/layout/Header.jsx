import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const drawerWidth = 260;

export default function Header({ role, onMenuClick }) {
  return (
    <AppBar
      position="fixed"
      color="inherit"
      elevation={0}
      sx={{
        borderBottom: "1px solid",
        borderColor: "divider",
        width: { md: `calc(100% - ${drawerWidth}px)` },
        ml: { md: `${drawerWidth}px` },
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

        <TextField
          size="small"
          placeholder="Tìm sản phẩm, đơn hàng, khách hàng..."
          sx={{ width: { xs: "100%", sm: 420 } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlinedIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />

        <Box sx={{ flexGrow: 1 }} />

        <IconButton>
          <Badge color="error" variant="dot">
            <NotificationsNoneOutlinedIcon />
          </Badge>
        </IconButton>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
          <Avatar sx={{ width: 34, height: 34, bgcolor: "primary.main" }}>
            {role === "admin" ? "AD" : "KH"}
          </Avatar>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Typography variant="body2" fontWeight={700} lineHeight={1.1}>
              {role === "admin" ? "Admin Store" : "Nguyễn An"}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {role === "admin" ? "Quản trị viên" : "Khách hàng"}
            </Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
