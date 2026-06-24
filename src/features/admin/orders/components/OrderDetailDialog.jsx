import {
  Button,
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { StatusChip } from "@/components/common/StatusChip";
import { formatVnd } from "@/utils/formatters";
import {
  getNextOrderStatuses,
  getOrderStatusLabel,
  isFinalOrderStatus,
} from "../order.constants";

function formatDateTime(value) {
  if (!value) return "-";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString("vi-VN");
}

export default function OrderDetailDialog({
  open,
  order,
  nextStatus,
  onNextStatusChange,
  onClose,
  onSave,
  saving = false,
}) {
  if (!order) {
    return null;
  }

  const nextStatuses = getNextOrderStatuses(order.status);
  const canChangeStatus = nextStatuses.length > 0;
  const isSaveDisabled =
    saving || !canChangeStatus || nextStatus === order.status;

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
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Chi tiết đơn hàng</DialogTitle>

      <DialogContent>
        <Stack spacing={2}>
          <Typography>
            <strong>ID đơn hàng:</strong> {order.id}
          </Typography>

          <Typography>
            <strong>User ID:</strong> {order.userId}
          </Typography>

          <Typography>
            <strong>Ngày tạo:</strong> {formatDateTime(order.createdAt)}
          </Typography>

          <Typography>
            <strong>Cập nhật lần cuối:</strong>{" "}
            {formatDateTime(order.updatedAt)}
          </Typography>

          <Typography>
            <strong>Tổng tiền:</strong> {formatVnd(order.totalAmount || 0)}
          </Typography>

          <Typography>
            <strong>Địa chỉ giao hàng:</strong> {order.shippingAddress || "-"}
          </Typography>

          <Typography>
            <strong>Ghi chú:</strong> {order.note || "-"}
          </Typography>

          <Stack direction="row" spacing={1} alignItems="center">
            <Typography>
              <strong>Trạng thái hiện tại:</strong>
            </Typography>
            <StatusChip status={order.status} />
          </Stack>

          <Divider />

          <Typography variant="subtitle1" fontWeight={700}>
            Sản phẩm trong đơn
          </Typography>

          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Item ID</TableCell>
                <TableCell>Product ID</TableCell>
                <TableCell>Tên sản phẩm</TableCell>
                <TableCell>Số lượng</TableCell>
                <TableCell>Đơn giá</TableCell>
                <TableCell>Tạm tính</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {(order.items || []).map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.productId}</TableCell>
                  <TableCell>{item.productName}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{formatVnd(item.unitPrice || 0)}</TableCell>
                  <TableCell>{formatVnd(item.subtotal || 0)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Divider />

          <FormControl fullWidth>
            <InputLabel>Trạng thái mới</InputLabel>
            <Select
              label="Trạng thái mới"
              value={nextStatus}
              onChange={(event) => onNextStatusChange(event.target.value)}
              disabled={!canChangeStatus || saving}
            >
              {statusOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {isFinalOrderStatus(order.status) ? (
            <Typography color="text.secondary">
              Đơn hàng đã ở trạng thái cuối, không thể cập nhật tiếp.
            </Typography>
          ) : (
            <Typography color="text.secondary">
              Chỉ được chuyển đơn hàng theo đúng luồng xử lý hợp lệ.
            </Typography>
          )}
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={saving}>
          Đóng
        </Button>

        <Button variant="contained" onClick={onSave} disabled={isSaveDisabled}>
          {saving ? "Đang lưu..." : "Lưu trạng thái"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
