import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box, Drawer } from "@mui/material";
import Header from "./Header";
import Sidebar from "./Sidebar";

const drawerWidth = 260;

export default function DashboardLayout({ role = "admin" }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebar = <Sidebar role={role} />;

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Header
        role={role}
        drawerWidth={drawerWidth}
        onMenuClick={() => setMobileOpen(true)}
      />

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
      >
        {sidebar}
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        open
      >
        {sidebar}
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          minHeight: "100vh",
          bgcolor: "background.default",
          p: { xs: 2, md: 3 },
          pt: { xs: 10, md: 11 },
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
