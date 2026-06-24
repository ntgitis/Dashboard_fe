import {
  Button,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { formatVnd } from "@/utils/formatters";
import {
  getCustomerStatusMeta,
  getCustomerTierMeta,
} from "../customer.constants";

export default function CustomerTable({
  customers = [],
  page = 0,
  rowsPerPage = 10,
  onPageChange,
  onRowsPerPageChange,
  onViewDetail,
}) {
  const visibleCustomers = customers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã KH</TableCell>
              <TableCell>Khách hàng</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>SĐT</TableCell>
              <TableCell>Ngày tham gia</TableCell>
              <TableCell>Số đơn</TableCell>
              <TableCell>Tổng chi tiêu</TableCell>
              <TableCell>Hạng</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell align="right">Thao tác</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {visibleCustomers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} align="center">
                  <Typography color="text.secondary" sx={{ py: 3 }}>
                    Không có khách hàng phù hợp
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              visibleCustomers.map((customer) => {
                const tierMeta = getCustomerTierMeta(customer.tier);
                const statusMeta = getCustomerStatusMeta(customer.status);

                return (
                  <TableRow key={customer.id} hover>
                    <TableCell>{customer.id}</TableCell>
                    <TableCell>{customer.name}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.phone}</TableCell>
                    <TableCell>{customer.joined}</TableCell>
                    <TableCell>{customer.orders}</TableCell>
                    <TableCell>{formatVnd(customer.spent)}</TableCell>
                    <TableCell>
                      <Chip
                        label={tierMeta.label}
                        color={tierMeta.color}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={statusMeta.label}
                        color={statusMeta.color}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        size="small"
                        onClick={() => onViewDetail(customer)}
                      >
                        Chi tiết
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={customers.length}
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
