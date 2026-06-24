import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { formatVnd } from "@/utils/formatters";
import {
  CUSTOMER_STATUS,
  getCustomerStatusMeta,
  getCustomerTierMeta,
} from "../customer.constants";

export default function CustomerDetailDialog({
  open,
  customer,
  onClose,
  onToggleStatus,
}) {
  if (!customer) {
    return null;
  }

  const tierMeta = getCustomerTierMeta(customer.tier);
  const statusMeta = getCustomerStatusMeta(customer.status);

  const isBlocked = customer.status === CUSTOMER_STATUS.BLOCKED;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Chi tiết khách hàng</DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <Stack spacing={0.75}>
            <Typography>
              <strong>Mã khách hàng:</strong> {customer.id}
            </Typography>

            <Typography>
              <strong>Họ tên:</strong> {customer.name}
            </Typography>

            <Typography>
              <strong>Email:</strong> {customer.email}
            </Typography>

            <Typography>
              <strong>Số điện thoại:</strong> {customer.phone}
            </Typography>

            <Typography>
              <strong>Ngày tham gia:</strong> {customer.joined}
            </Typography>

            <Typography>
              <strong>Số đơn hàng:</strong> {customer.orders}
            </Typography>

            <Typography>
              <strong>Tổng chi tiêu:</strong> {formatVnd(customer.spent)}
            </Typography>

            <Stack direction="row" spacing={1} alignItems="center">
              <Typography>
                <strong>Hạng khách hàng:</strong>
              </Typography>
              <Chip
                label={tierMeta.label}
                color={tierMeta.color}
                size="small"
              />
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
              <Typography>
                <strong>Trạng thái:</strong>
              </Typography>
              <Chip
                label={statusMeta.label}
                color={statusMeta.color}
                size="small"
              />
            </Stack>
          </Stack>

          <Divider />

          <Typography color="text.secondary" variant="body2">
            Khi khoá tài khoản, khách hàng sẽ không thể tiếp tục đặt hàng trong
            hệ thống thật. Ở phiên bản hiện tại, thao tác này đang được lưu bằng
            local state để phục vụ demo.
          </Typography>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Đóng</Button>

        <Button
          variant="contained"
          color={isBlocked ? "success" : "error"}
          onClick={() => onToggleStatus(customer)}
        >
          {isBlocked ? "Mở khoá tài khoản" : "Khoá tài khoản"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
