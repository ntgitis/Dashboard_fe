// import { useMemo, useState } from "react";
// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   Stack,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   TextField,
//   Typography,
// } from "@mui/material";
// import { PageHeader } from "@/components/common/PageHeader";
// import { StatusChip } from "@/components/common/StatusChip";
// import { orders } from "@/mocks";
// import { formatVnd } from "@/utils/formatters";

// export default function AdminOrdersPage() {
//   const [keyword, setKeyword] = useState("");
//   const [status, setStatus] = useState("all");
//   const [selectedOrder, setSelectedOrder] = useState(null);

//   const filteredOrders = useMemo(() => {
//     const lowerKeyword = keyword.trim().toLowerCase();

//     return orders.filter((order) => {
//       const matchKeyword =
//         !lowerKeyword ||
//         order.id.toLowerCase().includes(lowerKeyword) ||
//         order.customer.toLowerCase().includes(lowerKeyword) ||
//         order.email.toLowerCase().includes(lowerKeyword);
//       const matchStatus = status === "all" || order.status === status;

//       return matchKeyword && matchStatus;
//     });
//   }, [keyword, status]);

//   return (
//     <>
//       <PageHeader
//         title="Quản lý đơn hàng"
//         description="Theo dõi đơn hàng, khách hàng, tổng tiền và trạng thái xử lý."
//       />

//       <Card>
//         <CardContent>
//           <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mb: 2 }}>
//             <TextField
//               label="Tìm kiếm"
//               placeholder="Mã đơn, khách hàng hoặc email"
//               size="small"
//               value={keyword}
//               onChange={(event) => setKeyword(event.target.value)}
//               sx={{ flex: 1 }}
//             />

//             <FormControl size="small" sx={{ minWidth: 220 }}>
//               <InputLabel>Trạng thái</InputLabel>
//               <Select label="Trạng thái" value={status} onChange={(event) => setStatus(event.target.value)}>
//                 <MenuItem value="all">Tất cả</MenuItem>
//                 <MenuItem value="pending">Chờ xử lý</MenuItem>
//                 <MenuItem value="processing">Đang xử lý</MenuItem>
//                 <MenuItem value="shipped">Đang giao</MenuItem>
//                 <MenuItem value="delivered">Hoàn tất</MenuItem>
//                 <MenuItem value="cancelled">Đã hủy</MenuItem>
//               </Select>
//             </FormControl>
//           </Stack>

//           <Box sx={{ overflowX: "auto" }}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Mã đơn</TableCell>
//                   <TableCell>Khách hàng</TableCell>
//                   <TableCell>Email</TableCell>
//                   <TableCell>Ngày</TableCell>
//                   <TableCell align="right">Sản phẩm</TableCell>
//                   <TableCell align="right">Tổng tiền</TableCell>
//                   <TableCell>Trạng thái</TableCell>
//                   <TableCell align="right">Thao tác</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {filteredOrders.map((order) => (
//                   <TableRow key={order.id} hover>
//                     <TableCell>{order.id}</TableCell>
//                     <TableCell>{order.customer}</TableCell>
//                     <TableCell>{order.email}</TableCell>
//                     <TableCell>{order.date}</TableCell>
//                     <TableCell align="right">{order.items}</TableCell>
//                     <TableCell align="right">{formatVnd(order.total)}</TableCell>
//                     <TableCell>
//                       <StatusChip status={order.status} />
//                     </TableCell>
//                     <TableCell align="right">
//                       <Button size="small" onClick={() => setSelectedOrder(order)}>
//                         Chi tiết
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </Box>
//         </CardContent>
//       </Card>

//       <Dialog open={Boolean(selectedOrder)} onClose={() => setSelectedOrder(null)} fullWidth maxWidth="sm">
//         <DialogTitle>Chi tiết đơn hàng</DialogTitle>
//         {selectedOrder && (
//           <DialogContent dividers>
//             <Stack spacing={1.5}>
//               <Typography><strong>Mã đơn:</strong> {selectedOrder.id}</Typography>
//               <Typography><strong>Khách hàng:</strong> {selectedOrder.customer}</Typography>
//               <Typography><strong>Email:</strong> {selectedOrder.email}</Typography>
//               <Typography><strong>Ngày đặt:</strong> {selectedOrder.date}</Typography>
//               <Typography><strong>Số sản phẩm:</strong> {selectedOrder.items}</Typography>
//               <Typography><strong>Tổng tiền:</strong> {formatVnd(selectedOrder.total)}</Typography>
//               <Box>
//                 <Typography sx={{ mb: 1 }}><strong>Trạng thái:</strong></Typography>
//                 <FormControl fullWidth>
//                   <InputLabel>Trạng thái</InputLabel>
//                   <Select label="Trạng thái" defaultValue={selectedOrder.status}>
//                     <MenuItem value="pending">Chờ xử lý</MenuItem>
//                     <MenuItem value="processing">Đang xử lý</MenuItem>
//                     <MenuItem value="shipped">Đang giao</MenuItem>
//                     <MenuItem value="delivered">Hoàn tất</MenuItem>
//                     <MenuItem value="cancelled">Đã hủy</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Box>
//             </Stack>
//           </DialogContent>
//         )}
//         <DialogActions>
//           <Button onClick={() => setSelectedOrder(null)}>Đóng</Button>
//           <Button variant="contained" onClick={() => setSelectedOrder(null)}>
//             Lưu trạng thái
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// }

import { useEffect, useMemo, useState } from "react";
import { Stack } from "@mui/material";
import { PageHeader } from "@/components/common/PageHeader";
import { orders as orderMocks } from "@/mocks";
import OrderFilter from "../components/OrderFilter";
import OrderTable from "../components/OrderTable";
import OrderDetailDialog from "../components/OrderDetailDialog";

const DEFAULT_PAGE = 0;
const DEFAULT_ROWS_PER_PAGE = 10;

export default function AdminOrdersPage() {
  const [items, setItems] = useState(orderMocks);
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("all");

  const [page, setPage] = useState(DEFAULT_PAGE);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [nextStatus, setNextStatus] = useState("");

  const filteredOrders = useMemo(() => {
    const lowerKeyword = keyword.trim().toLowerCase();

    return items.filter((order) => {
      const matchKeyword =
        !lowerKeyword ||
        order.id.toLowerCase().includes(lowerKeyword) ||
        order.customer.toLowerCase().includes(lowerKeyword) ||
        order.email.toLowerCase().includes(lowerKeyword);

      const matchStatus = status === "all" || order.status === status;

      return matchKeyword && matchStatus;
    });
  }, [items, keyword, status]);

  useEffect(() => {
    const maxPage = Math.max(
      0,
      Math.ceil(filteredOrders.length / rowsPerPage) - 1,
    );

    if (page > maxPage) {
      setPage(maxPage);
    }
  }, [filteredOrders.length, page, rowsPerPage]);

  const handleKeywordChange = (value) => {
    setKeyword(value);
    setPage(DEFAULT_PAGE);
  };

  const handleStatusChange = (value) => {
    setStatus(value);
    setPage(DEFAULT_PAGE);
  };

  const handleResetFilter = () => {
    setKeyword("");
    setStatus("all");
    setPage(DEFAULT_PAGE);
  };

  const handlePageChange = (_, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(Number(event.target.value));
    setPage(DEFAULT_PAGE);
  };

  const handleOpenDetail = (order) => {
    setSelectedOrder(order);
    setNextStatus(order.status);
  };

  const handleCloseDetail = () => {
    setSelectedOrder(null);
    setNextStatus("");
  };

  const handleSaveStatus = () => {
    if (!selectedOrder || nextStatus === selectedOrder.status) {
      return;
    }

    setItems((prev) =>
      prev.map((order) =>
        order.id === selectedOrder.id
          ? {
              ...order,
              status: nextStatus,
            }
          : order,
      ),
    );

    handleCloseDetail();
  };

  return (
    <>
      <PageHeader
        title="Quản lý đơn hàng"
        description="Theo dõi đơn hàng, trạng thái xử lý và giá trị thanh toán."
      />

      <Stack spacing={3}>
        <OrderFilter
          keyword={keyword}
          status={status}
          onKeywordChange={handleKeywordChange}
          onStatusChange={handleStatusChange}
          onReset={handleResetFilter}
        />

        <OrderTable
          orders={filteredOrders}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          onViewDetail={handleOpenDetail}
        />
      </Stack>

      <OrderDetailDialog
        open={Boolean(selectedOrder)}
        order={selectedOrder}
        nextStatus={nextStatus}
        onNextStatusChange={setNextStatus}
        onClose={handleCloseDetail}
        onSave={handleSaveStatus}
      />
    </>
  );
}
