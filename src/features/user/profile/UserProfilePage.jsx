import { useMemo, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { PageHeader } from "@/components/common/PageHeader";

const initialProfile = {
  name: "Nguyễn An",
  email: "an.nguyen@mail.com",
  phone: "0901 234 567",
  birthday: "1999-08-20",
  address: "Q.1, TP.HCM",
};

const initialPasswordForm = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

function getInitials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(-2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export default function UserProfilePage() {
  const { enqueueSnackbar } = useSnackbar();

  const [profile, setProfile] = useState(initialProfile);
  const [form, setForm] = useState(initialProfile);
  const [passwordForm, setPasswordForm] = useState(initialPasswordForm);
  const [profileErrors, setProfileErrors] = useState({});
  const [passwordErrors, setPasswordErrors] = useState({});

  const initials = useMemo(() => getInitials(profile.name), [profile.name]);

  const handleProfileChange = (field) => (event) => {
    setForm((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));

    setProfileErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const handlePasswordChange = (field) => (event) => {
    setPasswordForm((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));

    setPasswordErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const validateProfile = () => {
    const nextErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = "Họ tên không được để trống";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Email không được để trống";
    }

    if (!form.phone.trim()) {
      nextErrors.phone = "Số điện thoại không được để trống";
    }

    setProfileErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const validatePassword = () => {
    const nextErrors = {};

    if (!passwordForm.currentPassword.trim()) {
      nextErrors.currentPassword = "Vui lòng nhập mật khẩu hiện tại";
    }

    if (!passwordForm.newPassword.trim()) {
      nextErrors.newPassword = "Vui lòng nhập mật khẩu mới";
    } else if (passwordForm.newPassword.length < 6) {
      nextErrors.newPassword = "Mật khẩu mới tối thiểu 6 ký tự";
    }

    if (!passwordForm.confirmPassword.trim()) {
      nextErrors.confirmPassword = "Vui lòng xác nhận mật khẩu mới";
    } else if (passwordForm.confirmPassword !== passwordForm.newPassword) {
      nextErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
    }

    setPasswordErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSaveProfile = () => {
    if (!validateProfile()) return;

    const normalizedProfile = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      birthday: form.birthday,
      address: form.address.trim(),
    };

    setProfile(normalizedProfile);
    setForm(normalizedProfile);

    enqueueSnackbar("Đã cập nhật hồ sơ thành công", {
      variant: "success",
    });
  };

  const handleResetProfile = () => {
    setForm(profile);
    setProfileErrors({});
  };

  const handleChangePassword = () => {
    if (!validatePassword()) return;

    setPasswordForm(initialPasswordForm);

    enqueueSnackbar("Đã đổi mật khẩu thành công", {
      variant: "success",
    });
  };

  return (
    <>
      <PageHeader title="Hồ sơ cá nhân" />

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Stack spacing={2} alignItems="center" textAlign="center">
                <Avatar
                  sx={{
                    width: 96,
                    height: 96,
                    fontSize: 32,
                    bgcolor: "primary.main",
                  }}
                >
                  {initials}
                </Avatar>

                <Box>
                  <Typography variant="h6" fontWeight={700}>
                    {profile.name}
                  </Typography>
                  <Typography color="text.secondary">
                    {profile.email}
                  </Typography>
                </Box>

                <Button variant="outlined">Đổi ảnh đại diện</Button>

                <Typography color="text.secondary" variant="body2">
                  Chức năng upload ảnh thật sẽ được kết nối khi có API backend.
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Stack spacing={3}>
            <Card>
              <CardContent>
                <Stack spacing={2}>
                  <Typography variant="h6" fontWeight={700}>
                    Thông tin cá nhân
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Họ tên"
                        value={form.name}
                        onChange={handleProfileChange("name")}
                        error={Boolean(profileErrors.name)}
                        helperText={profileErrors.name}
                        fullWidth
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Email"
                        value={form.email}
                        onChange={handleProfileChange("email")}
                        error={Boolean(profileErrors.email)}
                        helperText={profileErrors.email}
                        fullWidth
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Số điện thoại"
                        value={form.phone}
                        onChange={handleProfileChange("phone")}
                        error={Boolean(profileErrors.phone)}
                        helperText={profileErrors.phone}
                        fullWidth
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Ngày sinh"
                        type="date"
                        value={form.birthday}
                        onChange={handleProfileChange("birthday")}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        label="Địa chỉ"
                        value={form.address}
                        onChange={handleProfileChange("address")}
                        fullWidth
                      />
                    </Grid>
                  </Grid>

                  <Stack direction="row" spacing={2} justifyContent="flex-end">
                    <Button onClick={handleResetProfile}>Huỷ</Button>

                    <Button variant="contained" onClick={handleSaveProfile}>
                      Lưu thay đổi
                    </Button>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Stack spacing={2}>
                  <Typography variant="h6" fontWeight={700}>
                    Đổi mật khẩu
                  </Typography>

                  <Divider />

                  <TextField
                    label="Mật khẩu hiện tại"
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={handlePasswordChange("currentPassword")}
                    error={Boolean(passwordErrors.currentPassword)}
                    helperText={passwordErrors.currentPassword}
                    fullWidth
                  />

                  <TextField
                    label="Mật khẩu mới"
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={handlePasswordChange("newPassword")}
                    error={Boolean(passwordErrors.newPassword)}
                    helperText={passwordErrors.newPassword}
                    fullWidth
                  />

                  <TextField
                    label="Xác nhận mật khẩu mới"
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={handlePasswordChange("confirmPassword")}
                    error={Boolean(passwordErrors.confirmPassword)}
                    helperText={passwordErrors.confirmPassword}
                    fullWidth
                  />

                  <Stack direction="row" justifyContent="flex-end">
                    <Button variant="contained" onClick={handleChangePassword}>
                      Đổi mật khẩu
                    </Button>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
