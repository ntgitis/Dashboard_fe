import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";

import { login } from "@/services/authApi";

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

function getApiErrorMessage(error) {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    "Đăng nhập thất bại"
  );
}

export default function LoginPage() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      const role = data?.user?.role;
      const redirectPath = getHomePathByRole(role);

      if (redirectPath === "/login") {
        enqueueSnackbar("Tài khoản không có role hợp lệ", {
          variant: "error",
        });
        return;
      }

      enqueueSnackbar("Đăng nhập thành công", {
        variant: "success",
      });

      navigate(redirectPath, { replace: true });
    },
    onError: (error) => {
      enqueueSnackbar(getApiErrorMessage(error), {
        variant: "error",
      });
    },
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    loginMutation.mutate({
      email: formValues.email,
      password: formValues.password,
    });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="xs">
        <Paper sx={{ p: 4 }}>
          <Stack spacing={3}>
            <Stack spacing={1} alignItems="center">
              <StorefrontOutlinedIcon color="primary" sx={{ fontSize: 48 }} />

              <Typography variant="h5" fontWeight={800}>
                Đăng nhập hệ thống
              </Typography>

              <Typography variant="body2" color="text.secondary" align="center">
                Đăng nhập bằng tài khoản backend để vào dashboard
              </Typography>
            </Stack>

            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  value={formValues.email}
                  onChange={handleChange}
                  fullWidth
                  required
                  autoComplete="email"
                />

                <TextField
                  label="Mật khẩu"
                  name="password"
                  type="password"
                  value={formValues.password}
                  onChange={handleChange}
                  fullWidth
                  required
                  autoComplete="current-password"
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={loginMutation.isPending}
                  fullWidth
                >
                  {loginMutation.isPending ? "Đang đăng nhập..." : "Đăng nhập"}
                </Button>
              </Stack>
            </Box>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
