import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  Alert,
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
import { useSnackbar } from "notistack";
import { login } from "@/services/authApi";

function getLoginErrorMessage(error) {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    "Đăng nhập thất bại"
  );
}

function LoginPage() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    remember: true,
  });

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      enqueueSnackbar("Đăng nhập thành công", { variant: "success" });

      const role = data.user?.role;

      if (role === "ADMIN") {
        navigate("/admin", { replace: true });
        return;
      }

      navigate("/user", { replace: true });
    },
    onError: (error) => {
      enqueueSnackbar(getLoginErrorMessage(error), { variant: "error" });
    },
  });

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;

    setFormValues((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    loginMutation.mutate({
      email: formValues.email.trim(),
      password: formValues.password,
    });
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            p: 4,
            borderRadius: 3,
          }}
        >
          <Stack spacing={3}>
            <Stack spacing={1} alignItems="center">
              <StorefrontOutlinedIcon color="primary" sx={{ fontSize: 48 }} />
              <Typography variant="h5" fontWeight={700}>
                Đăng nhập hệ thống
              </Typography>
              <Typography variant="body2" color="text.secondary" align="center">
                Sử dụng tài khoản backend để vào dashboard.
              </Typography>
            </Stack>

            {loginMutation.isError && (
              <Alert severity="error">
                {getLoginErrorMessage(loginMutation.error)}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  value={formValues.email}
                  onChange={handleChange}
                  required
                  fullWidth
                  autoComplete="email"
                />

                <TextField
                  label="Mật khẩu"
                  name="password"
                  type="password"
                  value={formValues.password}
                  onChange={handleChange}
                  required
                  fullWidth
                  autoComplete="current-password"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      name="remember"
                      checked={formValues.remember}
                      onChange={handleChange}
                    />
                  }
                  label="Ghi nhớ đăng nhập"
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
      </Box>
    </Container>
  );
}

export default LoginPage;
