import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { StatusChip } from "@/components/common/StatusChip";
import { formatVnd } from "@/utils/formatters";
import {
  getNextOrderStatuses,
  getOrderStatusLabel,
  isFinalOrderStatus,
} from "../order.constants";

export default function OrderDetailDialog({
  open,
  order,
  nextStatus,
  onNextStatusChange,
  onClose,
  onSave,
}) {
  if (!order) {
    return null;
  }

  const nextStatuses = getNextOrderStatuses(order.status);
  const canChangeStatus = nextStatuses.length > 0;
  const isSaveDisabled = !canChangeStatus || nextStatus === order.status;

  const statusOptions = [
    {
      value: order.status,
      label: `${getOrderStatusLabel(order.status)} hiện tại`,
    },
    ...nextStatuses.map((status) => ({
      value: status,
      label: getOrderStatusLabel(status),
    })),
  ];

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Chi tiết đơn hàng</DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <Stack spacing={0.75}>
            <Typography>
              <strong>Mã đơn:</strong> {order.id}
            </Typography>

            <Typography>
              <strong>Khách hàng:</strong> {order.customer}
            </Typography>

            <Typography>
              <strong>Email:</strong> {order.email}
            </Typography>

            <Typography>
              <strong>Ngày đặt:</strong> {order.date}
            </Typography>

            <Typography>
              <strong>Số sản phẩm:</strong> {order.items}
            </Typography>

            <Typography>
              <strong>Tổng tiền:</strong> {formatVnd(order.total)}
            </Typography>

            <Stack direction="row" spacing={1} alignItems="center">
              <Typography>
                <strong>Trạng thái hiện tại:</strong>
              </Typography>
              <StatusChip status={order.status} />
            </Stack>
          </Stack>

          <Divider />

          <FormControl fullWidth disabled={!canChangeStatus}>
            <InputLabel>Trạng thái mới</InputLabel>
            <Select
              label="Trạng thái mới"
              value={nextStatus}
              onChange={(event) => onNextStatusChange(event.target.value)}
            >
              {statusOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {isFinalOrderStatus(order.status) && (
            <Typography color="text.secondary" variant="body2">
              Đơn hàng đã ở trạng thái cuối, không thể cập nhật tiếp.
            </Typography>
          )}

          {!isFinalOrderStatus(order.status) && (
            <Typography color="text.secondary" variant="body2">
              Chỉ được chuyển đơn hàng theo đúng luồng xử lý hợp lệ.
            </Typography>
          )}
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Đóng</Button>
        <Button variant="contained" onClick={onSave} disabled={isSaveDisabled}>
          Lưu trạng thái
        </Button>
      </DialogActions>
    </Dialog>
  );
}
