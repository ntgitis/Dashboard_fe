import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";

function LoginPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState("admin");

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(role === "admin" ? "/admin" : "/user");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        bgcolor: "background.default",
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={0} sx={{ p: { xs: 3, sm: 4 }, border: "1px solid", borderColor: "divider" }}>
          <Stack alignItems="center" spacing={1.5} sx={{ mb: 3 }}>
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: 2,
                bgcolor: "primary.main",
                color: "primary.contrastText",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <StorefrontOutlinedIcon />
            </Box>

            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h5">Đăng nhập hệ thống</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                Chọn khu vực demo để vào dashboard tương ứng.
              </Typography>
            </Box>
          </Stack>

          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField label="Email" type="email" defaultValue="admin@store.com" fullWidth />
              <TextField label="Mật khẩu" type="password" defaultValue="123456" fullWidth />
              <TextField
                select
                label="Khu vực"
                value={role}
                onChange={(event) => setRole(event.target.value)}
                SelectProps={{ native: true }}
              >
                <option value="admin">Admin</option>
                <option value="user">Khách hàng</option>
              </TextField>

              <FormControlLabel control={<Checkbox defaultChecked />} label="Ghi nhớ đăng nhập" />

              <Button type="submit" variant="contained" size="large" fullWidth>
                Đăng nhập
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default LoginPage;
