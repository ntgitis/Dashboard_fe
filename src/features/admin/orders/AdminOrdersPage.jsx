import { useMemo, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
  TextField,
  Typography,
} from "@mui/material";
import { PageHeader } from "@/components/common/PageHeader";
import { StatusChip } from "@/components/common/StatusChip";
import { orders } from "@/mocks";
import { formatVnd } from "@/utils/formatters";

export default function AdminOrdersPage() {
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = useMemo(() => {
    const lowerKeyword = keyword.trim().toLowerCase();

    return orders.filter((order) => {
      const matchKeyword =
        !lowerKeyword ||
        order.id.toLowerCase().includes(lowerKeyword) ||
        order.customer.toLowerCase().includes(lowerKeyword) ||
        order.email.toLowerCase().includes(lowerKeyword);
      const matchStatus = status === "all" || order.status === status;

      return matchKeyword && matchStatus;
    });
  }, [keyword, status]);

  return (
    <>
      <PageHeader
        title="Quản lý đơn hàng"
        description="Theo dõi đơn hàng, khách hàng, tổng tiền và trạng thái xử lý."
      />

      <Card>
        <CardContent>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mb: 2 }}>
            <TextField
              label="Tìm kiếm"
              placeholder="Mã đơn, khách hàng hoặc email"
              size="small"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              sx={{ flex: 1 }}
            />

            <FormControl size="small" sx={{ minWidth: 220 }}>
              <InputLabel>Trạng thái</InputLabel>
              <Select label="Trạng thái" value={status} onChange={(event) => setStatus(event.target.value)}>
                <MenuItem value="all">Tất cả</MenuItem>
                <MenuItem value="pending">Chờ xử lý</MenuItem>
                <MenuItem value="processing">Đang xử lý</MenuItem>
                <MenuItem value="shipped">Đang giao</MenuItem>
                <MenuItem value="delivered">Hoàn tất</MenuItem>
                <MenuItem value="cancelled">Đã hủy</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          <Box sx={{ overflowX: "auto" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Mã đơn</TableCell>
                  <TableCell>Khách hàng</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Ngày</TableCell>
                  <TableCell align="right">Sản phẩm</TableCell>
                  <TableCell align="right">Tổng tiền</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell align="right">Thao tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id} hover>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.email}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell align="right">{order.items}</TableCell>
                    <TableCell align="right">{formatVnd(order.total)}</TableCell>
                    <TableCell>
                      <StatusChip status={order.status} />
                    </TableCell>
                    <TableCell align="right">
                      <Button size="small" onClick={() => setSelectedOrder(order)}>
                        Chi tiết
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </CardContent>
      </Card>

      <Dialog open={Boolean(selectedOrder)} onClose={() => setSelectedOrder(null)} fullWidth maxWidth="sm">
        <DialogTitle>Chi tiết đơn hàng</DialogTitle>
        {selectedOrder && (
          <DialogContent dividers>
            <Stack spacing={1.5}>
              <Typography><strong>Mã đơn:</strong> {selectedOrder.id}</Typography>
              <Typography><strong>Khách hàng:</strong> {selectedOrder.customer}</Typography>
              <Typography><strong>Email:</strong> {selectedOrder.email}</Typography>
              <Typography><strong>Ngày đặt:</strong> {selectedOrder.date}</Typography>
              <Typography><strong>Số sản phẩm:</strong> {selectedOrder.items}</Typography>
              <Typography><strong>Tổng tiền:</strong> {formatVnd(selectedOrder.total)}</Typography>
              <Box>
                <Typography sx={{ mb: 1 }}><strong>Trạng thái:</strong></Typography>
                <FormControl fullWidth>
                  <InputLabel>Trạng thái</InputLabel>
                  <Select label="Trạng thái" defaultValue={selectedOrder.status}>
                    <MenuItem value="pending">Chờ xử lý</MenuItem>
                    <MenuItem value="processing">Đang xử lý</MenuItem>
                    <MenuItem value="shipped">Đang giao</MenuItem>
                    <MenuItem value="delivered">Hoàn tất</MenuItem>
                    <MenuItem value="cancelled">Đã hủy</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Stack>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={() => setSelectedOrder(null)}>Đóng</Button>
          <Button variant="contained" onClick={() => setSelectedOrder(null)}>
            Lưu trạng thái
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
