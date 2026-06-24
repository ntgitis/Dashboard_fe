import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
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
import { canCancelOrder } from "../userOrder.constants";

function formatDateTime(value) {
  if (!value) return "-";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString("vi-VN");
}

export default function UserOrderDetailDialog({
  open,
  order,
  onClose,
  onRequestCancel,
}) {
  if (!order) {
    return null;
  }

  const isCancelable = canCancelOrder(order.status);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Chi tiết đơn hàng</DialogTitle>

      <DialogContent>
        <Stack spacing={2}>
          <Typography>
            <strong>Mã đơn:</strong> {order.id}
          </Typography>

          <Typography>
            <strong>Ngày đặt:</strong> {formatDateTime(order.createdAt)}
          </Typography>

          <Typography>
            <strong>Cập nhật lần cuối:</strong>{" "}
            {formatDateTime(order.updatedAt)}
          </Typography>

          <Typography>
            <strong>Địa chỉ giao hàng:</strong> {order.shippingAddress || "-"}
          </Typography>

          <Typography>
            <strong>Ghi chú:</strong> {order.note || "-"}
          </Typography>

          <Typography>
            <strong>Tổng tiền:</strong> {formatVnd(order.totalAmount || 0)}
          </Typography>

          <Stack direction="row" spacing={1} alignItems="center">
            <Typography>
              <strong>Trạng thái:</strong>
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
                  <TableCell>{item.productId}</TableCell>
                  <TableCell>{item.productName}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{formatVnd(item.unitPrice || 0)}</TableCell>
                  <TableCell>{formatVnd(item.subtotal || 0)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Typography color="text.secondary">
            {isCancelable
              ? "Bạn có thể huỷ đơn khi đơn hàng còn ở trạng thái chờ xử lý hoặc đang xử lý."
              : "Đơn hàng này không thể huỷ vì đã được giao, hoàn tất hoặc đã huỷ trước đó."}
          </Typography>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Đóng</Button>

        {isCancelable && (
          <Button
            color="error"
            variant="contained"
            onClick={() => onRequestCancel(order)}
          >
            Huỷ đơn
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
