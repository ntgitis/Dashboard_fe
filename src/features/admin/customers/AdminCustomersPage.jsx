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
import { customers } from "@/mocks";
import { formatVnd } from "@/utils/formatters";

export default function AdminCustomersPage() {
  const [keyword, setKeyword] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const filteredCustomers = useMemo(() => {
    const lowerKeyword = keyword.trim().toLowerCase();
    return customers.filter(
      (customer) =>
        !lowerKeyword ||
        customer.name.toLowerCase().includes(lowerKeyword) ||
        customer.email.toLowerCase().includes(lowerKeyword) ||
        customer.id.toLowerCase().includes(lowerKeyword),
    );
  }, [keyword]);

  return (
    <>
      <PageHeader
        title="Quản lý khách hàng"
        description="Xem thông tin khách hàng, số đơn hàng và tổng chi tiêu."
      />

      <Card>
        <CardContent>
          <TextField
            label="Tìm kiếm khách hàng"
            placeholder="Tên, email hoặc mã khách hàng"
            size="small"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />

          <Box sx={{ overflowX: "auto" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Mã KH</TableCell>
                  <TableCell>Khách hàng</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Ngày tham gia</TableCell>
                  <TableCell align="right">Số đơn</TableCell>
                  <TableCell align="right">Tổng chi tiêu</TableCell>
                  <TableCell>Hạng</TableCell>
                  <TableCell align="right">Thao tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.id} hover>
                    <TableCell>{customer.id}</TableCell>
                    <TableCell>{customer.name}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.joined}</TableCell>
                    <TableCell align="right">{customer.orders}</TableCell>
                    <TableCell align="right">{formatVnd(customer.spent)}</TableCell>
                    <TableCell>
                      <StatusChip status={customer.tier} />
                    </TableCell>
                    <TableCell align="right">
                      <Button size="small" onClick={() => setSelectedCustomer(customer)}>
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

      <Dialog open={Boolean(selectedCustomer)} onClose={() => setSelectedCustomer(null)} fullWidth maxWidth="sm">
        <DialogTitle>Chi tiết khách hàng</DialogTitle>
        {selectedCustomer && (
          <DialogContent dividers>
            <Stack spacing={1.5}>
              <Typography><strong>Mã khách hàng:</strong> {selectedCustomer.id}</Typography>
              <Typography><strong>Họ tên:</strong> {selectedCustomer.name}</Typography>
              <Typography><strong>Email:</strong> {selectedCustomer.email}</Typography>
              <Typography><strong>Ngày tham gia:</strong> {selectedCustomer.joined}</Typography>
              <Typography><strong>Số đơn hàng:</strong> {selectedCustomer.orders}</Typography>
              <Typography><strong>Tổng chi tiêu:</strong> {formatVnd(selectedCustomer.spent)}</Typography>
              <Box>
                <Typography sx={{ mb: 1 }}><strong>Hạng khách hàng:</strong></Typography>
                <StatusChip status={selectedCustomer.tier} />
              </Box>
            </Stack>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={() => setSelectedCustomer(null)}>Đóng</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
