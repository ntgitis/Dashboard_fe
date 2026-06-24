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

export default function UserOrderTable({
  orders = [],
  page = 0,
  rowsPerPage = 10,
  onPageChange,
  onRowsPerPageChange,
  onViewDetail,
  onRequestCancel,
}) {
  const visibleOrders = orders.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã đơn</TableCell>
              <TableCell>Ngày đặt</TableCell>
              <TableCell>Sản phẩm</TableCell>
              <TableCell>Tổng tiền</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell align="right">Thao tác</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {visibleOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography color="text.secondary" sx={{ py: 3 }}>
                    Không có đơn hàng phù hợp
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              visibleOrders.map((order) => (
                <TableRow key={order.id} hover>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.items}</TableCell>
                  <TableCell>{formatVnd(order.total)}</TableCell>
                  <TableCell>
                    <StatusChip status={order.status} />
                  </TableCell>
                  <TableCell align="right">
                    <Stack
                      direction="row"
                      spacing={1}
                      justifyContent="flex-end"
                    >
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
        count={orders.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        rowsPerPageOptions={[5, 10, 25]}
        labelRowsPerPage="Số dòng mỗi trang"
      />
    </Paper>
  );
}
