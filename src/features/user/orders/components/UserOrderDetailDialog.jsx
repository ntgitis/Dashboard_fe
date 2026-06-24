import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { StatusChip } from "@/components/common/StatusChip";
import { formatVnd } from "@/utils/formatters";
import { canCancelOrder } from "../userOrder.constants";

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
                <strong>Trạng thái:</strong>
              </Typography>
              <StatusChip status={order.status} />
            </Stack>
          </Stack>

          <Divider />

          {isCancelable ? (
            <Typography color="text.secondary" variant="body2">
              Bạn có thể huỷ đơn khi đơn hàng còn ở trạng thái chờ xử lý hoặc
              đang xử lý.
            </Typography>
          ) : (
            <Typography color="text.secondary" variant="body2">
              Đơn hàng này không thể huỷ vì đã được giao, hoàn tất hoặc đã huỷ
              trước đó.
            </Typography>
          )}
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
