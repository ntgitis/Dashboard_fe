import {
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
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

export default function UserOrderTable({
  orders = [],
  totalElements = 0,
  page = 0,
  rowsPerPage = 10,
  loading = false,
  onPageChange,
  onRowsPerPageChange,
  onViewDetail,
  onRequestCancel,
}) {
  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã đơn</TableCell>
              <TableCell>Ngày đặt</TableCell>
              <TableCell>Số sản phẩm</TableCell>
              <TableCell>Tổng tiền</TableCell>
              <TableCell>Địa chỉ giao hàng</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Thao tác</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7}>
                  <Typography py={3} align="center" color="text.secondary">
                    Đang tải đơn hàng...
                  </Typography>
                </TableCell>
              </TableRow>
            ) : orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7}>
                  <Typography py={3} align="center" color="text.secondary">
                    Không có đơn hàng phù hợp
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <TableRow key={order.id} hover>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{formatDateTime(order.createdAt)}</TableCell>
                  <TableCell>{order.items?.length || 0}</TableCell>
                  <TableCell>{formatVnd(order.totalAmount || 0)}</TableCell>
                  <TableCell>{order.shippingAddress || "-"}</TableCell>
                  <TableCell>
                    <StatusChip status={order.status} />
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Button size="small" onClick={() => onViewDetail(order)}>
                        Chi tiết
                      </Button>

                      {canCancelOrder(order.status) && (
                        <Button
                          size="small"
                          color="error"
                          onClick={() => onRequestCancel(order)}
                        >
                          Huỷ đơn
                        </Button>
                      )}
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={totalElements}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        rowsPerPageOptions={[5, 10, 20, 50]}
        labelRowsPerPage="Số dòng mỗi trang"
      />
    </Paper>
  );
}
