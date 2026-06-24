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
// import { customers } from "@/mocks";
// import { formatVnd } from "@/utils/formatters";

// export default function AdminCustomersPage() {
//   const [keyword, setKeyword] = useState("");
//   const [selectedCustomer, setSelectedCustomer] = useState(null);

//   const filteredCustomers = useMemo(() => {
//     const lowerKeyword = keyword.trim().toLowerCase();
//     return customers.filter(
//       (customer) =>
//         !lowerKeyword ||
//         customer.name.toLowerCase().includes(lowerKeyword) ||
//         customer.email.toLowerCase().includes(lowerKeyword) ||
//         customer.id.toLowerCase().includes(lowerKeyword),
//     );
//   }, [keyword]);

//   return (
//     <>
//       <PageHeader
//         title="Quản lý khách hàng"
//         description="Xem thông tin khách hàng, số đơn hàng và tổng chi tiêu."
//       />

//       <Card>
//         <CardContent>
//           <TextField
//             label="Tìm kiếm khách hàng"
//             placeholder="Tên, email hoặc mã khách hàng"
//             size="small"
//             value={keyword}
//             onChange={(event) => setKeyword(event.target.value)}
//             fullWidth
//             sx={{ mb: 2 }}
//           />

//           <Box sx={{ overflowX: "auto" }}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Mã KH</TableCell>
//                   <TableCell>Khách hàng</TableCell>
//                   <TableCell>Email</TableCell>
//                   <TableCell>Ngày tham gia</TableCell>
//                   <TableCell align="right">Số đơn</TableCell>
//                   <TableCell align="right">Tổng chi tiêu</TableCell>
//                   <TableCell>Hạng</TableCell>
//                   <TableCell align="right">Thao tác</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {filteredCustomers.map((customer) => (
//                   <TableRow key={customer.id} hover>
//                     <TableCell>{customer.id}</TableCell>
//                     <TableCell>{customer.name}</TableCell>
//                     <TableCell>{customer.email}</TableCell>
//                     <TableCell>{customer.joined}</TableCell>
//                     <TableCell align="right">{customer.orders}</TableCell>
//                     <TableCell align="right">{formatVnd(customer.spent)}</TableCell>
//                     <TableCell>
//                       <StatusChip status={customer.tier} />
//                     </TableCell>
//                     <TableCell align="right">
//                       <Button size="small" onClick={() => setSelectedCustomer(customer)}>
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

//       <Dialog open={Boolean(selectedCustomer)} onClose={() => setSelectedCustomer(null)} fullWidth maxWidth="sm">
//         <DialogTitle>Chi tiết khách hàng</DialogTitle>
//         {selectedCustomer && (
//           <DialogContent dividers>
//             <Stack spacing={1.5}>
//               <Typography><strong>Mã khách hàng:</strong> {selectedCustomer.id}</Typography>
//               <Typography><strong>Họ tên:</strong> {selectedCustomer.name}</Typography>
//               <Typography><strong>Email:</strong> {selectedCustomer.email}</Typography>
//               <Typography><strong>Ngày tham gia:</strong> {selectedCustomer.joined}</Typography>
//               <Typography><strong>Số đơn hàng:</strong> {selectedCustomer.orders}</Typography>
//               <Typography><strong>Tổng chi tiêu:</strong> {formatVnd(selectedCustomer.spent)}</Typography>
//               <Box>
//                 <Typography sx={{ mb: 1 }}><strong>Hạng khách hàng:</strong></Typography>
//                 <StatusChip status={selectedCustomer.tier} />
//               </Box>
//             </Stack>
//           </DialogContent>
//         )}
//         <DialogActions>
//           <Button onClick={() => setSelectedCustomer(null)}>Đóng</Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// }

import { useEffect, useMemo, useState } from "react";
import { Stack } from "@mui/material";
import { PageHeader } from "@/components/common/PageHeader";
import { customers as customerMocks } from "@/mocks";
import CustomerFilter from "../components/CustomerFilter";
import CustomerTable from "../components/CustomerTable";
import CustomerDetailDialog from "../components/CustomerDetailDialog";
import { CUSTOMER_STATUS } from "../customer.constants";

const DEFAULT_PAGE = 0;
const DEFAULT_ROWS_PER_PAGE = 10;

export default function AdminCustomersPage() {
  const [items, setItems] = useState(customerMocks);
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("all");
  const [tier, setTier] = useState("all");

  const [page, setPage] = useState(DEFAULT_PAGE);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);

  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const filteredCustomers = useMemo(() => {
    const lowerKeyword = keyword.trim().toLowerCase();

    return items.filter((customer) => {
      const matchKeyword =
        !lowerKeyword ||
        customer.id.toLowerCase().includes(lowerKeyword) ||
        customer.name.toLowerCase().includes(lowerKeyword) ||
        customer.email.toLowerCase().includes(lowerKeyword) ||
        customer.phone.includes(lowerKeyword);

      const matchStatus = status === "all" || customer.status === status;
      const matchTier = tier === "all" || customer.tier === tier;

      return matchKeyword && matchStatus && matchTier;
    });
  }, [items, keyword, status, tier]);

  useEffect(() => {
    const maxPage = Math.max(
      0,
      Math.ceil(filteredCustomers.length / rowsPerPage) - 1,
    );

    if (page > maxPage) {
      setPage(maxPage);
    }
  }, [filteredCustomers.length, page, rowsPerPage]);

  const handleKeywordChange = (value) => {
    setKeyword(value);
    setPage(DEFAULT_PAGE);
  };

  const handleStatusChange = (value) => {
    setStatus(value);
    setPage(DEFAULT_PAGE);
  };

  const handleTierChange = (value) => {
    setTier(value);
    setPage(DEFAULT_PAGE);
  };

  const handleResetFilter = () => {
    setKeyword("");
    setStatus("all");
    setTier("all");
    setPage(DEFAULT_PAGE);
  };

  const handlePageChange = (_, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(Number(event.target.value));
    setPage(DEFAULT_PAGE);
  };

  const handleCloseDetail = () => {
    setSelectedCustomer(null);
  };

  const handleToggleCustomerStatus = (customer) => {
    const nextStatus =
      customer.status === CUSTOMER_STATUS.BLOCKED
        ? CUSTOMER_STATUS.ACTIVE
        : CUSTOMER_STATUS.BLOCKED;

    setItems((prev) =>
      prev.map((item) =>
        item.id === customer.id
          ? {
              ...item,
              status: nextStatus,
            }
          : item,
      ),
    );

    setSelectedCustomer((prev) =>
      prev && prev.id === customer.id
        ? {
            ...prev,
            status: nextStatus,
          }
        : prev,
    );
  };

  return (
    <>
      <PageHeader
        title="Quản lý khách hàng"
        description="Theo dõi hồ sơ, hạng thành viên, trạng thái và tổng giá trị mua hàng."
      />

      <Stack spacing={3}>
        <CustomerFilter
          keyword={keyword}
          status={status}
          tier={tier}
          onKeywordChange={handleKeywordChange}
          onStatusChange={handleStatusChange}
          onTierChange={handleTierChange}
          onReset={handleResetFilter}
        />

        <CustomerTable
          customers={filteredCustomers}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          onViewDetail={setSelectedCustomer}
        />
      </Stack>

      <CustomerDetailDialog
        open={Boolean(selectedCustomer)}
        customer={selectedCustomer}
        onClose={handleCloseDetail}
        onToggleStatus={handleToggleCustomerStatus}
      />
    </>
  );
}
