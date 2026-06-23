import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { PageHeader } from "@/components/common/PageHeader";
import { StatusChip } from "@/components/common/StatusChip";
import { orders } from "@/mocks";
import { formatVnd } from "@/utils/formatters";

export default function UserOrdersPage() {
  return (
    <>
      <PageHeader
        title="Đơn hàng của tôi"
        description="Lịch sử và trạng thái các đơn hàng đã đặt."
      />

      <Card>
        <CardContent>
          <Box sx={{ overflowX: "auto" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Mã đơn</TableCell>
                  <TableCell>Ngày đặt</TableCell>
                  <TableCell align="right">Số sản phẩm</TableCell>
                  <TableCell align="right">Tổng tiền</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell align="right">Thao tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.slice(0, 10).map((order) => (
                  <TableRow key={order.id} hover>
                    <TableCell>
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Typography sx={{ fontSize: 24 }}>📦</Typography>
                        <Typography fontWeight={700}>{order.id}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell align="right">{order.items}</TableCell>
                    <TableCell align="right">{formatVnd(order.total)}</TableCell>
                    <TableCell>
                      <StatusChip status={order.status} />
                    </TableCell>
                    <TableCell align="right">
                      <Button size="small">Chi tiết</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}
