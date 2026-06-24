import {
  Avatar,
  Box,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { PageHeader } from "@/components/common/PageHeader";
import { getAuthUser } from "@/services/tokenStorage";

function getInitials(user) {
  const displayName = user?.fullName || user?.email || "User";
  const parts = displayName.trim().split(/\s+/);

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export default function UserProfilePage() {
  const user = getAuthUser();

  return (
    <Stack spacing={3}>
      <PageHeader
        title="Hồ sơ"
        description="Thông tin tài khoản đăng nhập hiện tại"
      />

      <Card>
        <CardContent>
          <Stack spacing={3}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar sx={{ width: 72, height: 72, bgcolor: "primary.main" }}>
                {getInitials(user)}
              </Avatar>

              <Box>
                <Typography variant="h6" fontWeight={800}>
                  {user?.fullName || "Người dùng"}
                </Typography>
                <Typography color="text.secondary">
                  {user?.email || "-"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Role: {user?.role || "-"}
                </Typography>
              </Box>
            </Stack>

            <Stack spacing={2}>
              <TextField
                label="Họ tên"
                value={user?.fullName || ""}
                fullWidth
                InputProps={{ readOnly: true }}
              />

              <TextField
                label="Email"
                value={user?.email || ""}
                fullWidth
                InputProps={{ readOnly: true }}
              />

              <TextField
                label="Ngày sinh"
                value={user?.dob || ""}
                fullWidth
                InputProps={{ readOnly: true }}
              />

              <TextField
                label="Số điện thoại"
                value={user?.phone || ""}
                fullWidth
                InputProps={{ readOnly: true }}
              />

              <TextField
                label="Địa chỉ"
                value={user?.address || ""}
                fullWidth
                multiline
                minRows={2}
                InputProps={{ readOnly: true }}
              />
            </Stack>

            <Typography variant="body2" color="text.secondary">
              Backend hiện chưa có API cập nhật hồ sơ cá nhân, nên màn này chỉ
              hiển thị thông tin thật từ tài khoản đăng nhập.
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}
