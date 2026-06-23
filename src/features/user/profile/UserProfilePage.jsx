import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { PageHeader } from "@/components/common/PageHeader";

export default function UserProfilePage() {
  return (
    <>
      <PageHeader title="Hồ sơ" description="Cập nhật thông tin cá nhân của bạn." />

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "300px 1fr" }, gap: 2 }}>
        <Card>
          <CardContent sx={{ textAlign: "center" }}>
            <Avatar sx={{ width: 96, height: 96, mx: "auto", bgcolor: "primary.main", fontSize: 28 }}>
              NA
            </Avatar>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Nguyễn An
            </Typography>
            <Typography variant="body2" color="text.secondary">
              an.nguyen@mail.com
            </Typography>
            <Button variant="outlined" fullWidth sx={{ mt: 2 }}>
              Đổi ảnh đại diện
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 2 }}>
              Thông tin cá nhân
            </Typography>

            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2 }}>
              <TextField label="Họ và tên" defaultValue="Nguyễn An" />
              <TextField label="Email" defaultValue="an.nguyen@mail.com" />
              <TextField label="Số điện thoại" defaultValue="0901 234 567" />
              <TextField label="Ngày sinh" type="date" defaultValue="1995-05-12" InputLabelProps={{ shrink: true }} />
              <TextField label="Giới thiệu" defaultValue="Yêu công nghệ và thời trang." multiline minRows={3} sx={{ gridColumn: { sm: "1 / -1" } }} />
            </Box>

            <Stack direction="row" justifyContent="flex-end" spacing={1} sx={{ mt: 3 }}>
              <Button variant="outlined">Hủy</Button>
              <Button variant="contained">Lưu thay đổi</Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
