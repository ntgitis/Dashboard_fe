import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { getUserRoleMeta, USER_ROLE_OPTIONS } from "../customer.constants";

function formatDate(value) {
  if (!value) return "-";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("vi-VN");
}

function formatDateTime(value) {
  if (!value) return "-";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString("vi-VN");
}

export default function CustomerDetailDialog({
  open,
  user,
  nextRole,
  onNextRoleChange,
  onClose,
  onSaveRole,
  saving = false,
}) {
  if (!user) {
    return null;
  }

  const roleMeta = getUserRoleMeta(user.role);
  const isSaveDisabled = saving || !nextRole || nextRole === user.role;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Chi tiết người dùng</DialogTitle>

      <DialogContent>
        <Stack spacing={2}>
          <Typography>
            <strong>User ID:</strong> {user.id}
          </Typography>

          <Typography>
            <strong>Họ tên:</strong> {user.fullName || "-"}
          </Typography>

          <Typography>
            <strong>Email:</strong> {user.email}
          </Typography>

          <Typography>
            <strong>Số điện thoại:</strong> {user.phone || "-"}
          </Typography>

          <Typography>
            <strong>Ngày sinh:</strong> {formatDate(user.dob)}
          </Typography>

          <Typography>
            <strong>Địa chỉ:</strong> {user.address || "-"}
          </Typography>

          <Typography>
            <strong>Avatar path:</strong> {user.avatarPath || "-"}
          </Typography>

          <Typography>
            <strong>Ngày tạo:</strong> {formatDateTime(user.createdAt)}
          </Typography>

          <Typography>
            <strong>Cập nhật lần cuối:</strong> {formatDateTime(user.updatedAt)}
          </Typography>

          <Stack direction="row" spacing={1} alignItems="center">
            <Typography>
              <strong>Role hiện tại:</strong>
            </Typography>
            <Chip label={roleMeta.label} color={roleMeta.color} size="small" />
          </Stack>

          <Divider />

          <FormControl fullWidth>
            <InputLabel>Role mới</InputLabel>
            <Select
              label="Role mới"
              value={nextRole}
              onChange={(event) => onNextRoleChange(event.target.value)}
              disabled={saving}
            >
              {USER_ROLE_OPTIONS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={saving}>
          Đóng
        </Button>

        <Button
          variant="contained"
          onClick={onSaveRole}
          disabled={isSaveDisabled}
        >
          {saving ? "Đang lưu..." : "Lưu role"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
