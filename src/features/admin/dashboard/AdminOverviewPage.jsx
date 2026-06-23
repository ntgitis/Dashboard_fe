import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { LineChart } from "@mui/x-charts/LineChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { PageHeader } from "@/components/common/PageHeader";
import { StatCard } from "@/components/common/StatCard";
import { StatusChip } from "@/components/common/StatusChip";
import { categoryData, orders, products, revenueData } from "@/mocks";
import { formatVnd } from "@/utils/formatters";

export default function AdminOverviewPage() {
  const recentOrders = orders.slice(0, 6);
  const lowStockProducts = products.filter((product) => product.stock <= 10).slice(0, 5);

  return (
    <>
      <PageHeader
        title="Tổng quan quản trị"
        description="Theo dõi doanh thu, đơn hàng, khách hàng và tồn kho của cửa hàng."
        actions={
          <>
            <Button variant="outlined">Xuất báo cáo</Button>
            <Button variant="contained">Thêm sản phẩm</Button>
          </>
        }
      />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            xl: "repeat(4, 1fr)",
          },
          gap: 2,
        }}
      >
        <StatCard
          label="Doanh thu tháng"
          value={formatVnd(178_000_000)}
          delta="+18.2%"
          icon={AttachMoneyOutlinedIcon}
          tone="primary"
        />
        <StatCard
          label="Đơn hàng mới"
          value="412"
          delta="+12.4%"
          icon={ShoppingBagOutlinedIcon}
          tone="info"
        />
        <StatCard
          label="Khách hàng mới"
          value="86"
          delta="+5.7%"
          icon={PeopleAltOutlinedIcon}
          tone="success"
        />
        <StatCard
          label="Sản phẩm sắp hết"
          value={lowStockProducts.length}
          delta="Cần kiểm tra"
          trend="down"
          icon={Inventory2OutlinedIcon}
          tone="warning"
        />
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "2fr 1fr" },
          gap: 2,
          mt: 3,
        }}
      >
        <Card>
          <CardContent>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              alignItems={{ xs: "flex-start", sm: "center" }}
              justifyContent="space-between"
              spacing={1}
              sx={{ mb: 2 }}
            >
              <Box>
                <Typography variant="subtitle1" fontWeight={700}>
                  Doanh thu 12 tháng
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Đơn vị: triệu đồng
                </Typography>
              </Box>
              <Chip label="+24.6%" color="success" variant="outlined" size="small" />
            </Stack>

            <LineChart
              height={300}
              dataset={revenueData}
              xAxis={[{ scaleType: "point", dataKey: "month" }]}
              series={[{ dataKey: "revenue", label: "Doanh thu", color: "#2563eb" }]}
              grid={{ horizontal: true }}
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 2 }}>
              Doanh thu theo danh mục
            </Typography>

            <PieChart
              height={300}
              series={[
                {
                  data: categoryData.map((item, index) => ({
                    id: index,
                    value: item.value,
                    label: item.name,
                  })),
                  innerRadius: 45,
                  outerRadius: 100,
                  paddingAngle: 2,
                },
              ]}
            />
          </CardContent>
        </Card>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "2fr 1fr" },
          gap: 2,
          mt: 3,
        }}
      >
        <Card>
          <CardContent sx={{ p: 0 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 2 }}>
              <Box>
                <Typography variant="subtitle1" fontWeight={700}>
                  Đơn hàng gần đây
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  6 đơn hàng mới nhất trong hệ thống
                </Typography>
              </Box>
              <Button size="small">Xem tất cả</Button>
            </Stack>
            <Divider />

            <Box sx={{ overflowX: "auto" }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Mã đơn</TableCell>
                    <TableCell>Khách hàng</TableCell>
                    <TableCell>Ngày</TableCell>
                    <TableCell align="right">Giá trị</TableCell>
                    <TableCell>Trạng thái</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentOrders.map((order) => (
                    <TableRow key={order.id} hover>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell align="right">{formatVnd(order.total)}</TableCell>
                      <TableCell>
                        <StatusChip status={order.status} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="subtitle1" fontWeight={700}>
              Tồn kho thấp
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Các sản phẩm cần nhập thêm
            </Typography>

            <Stack spacing={1.5}>
              {lowStockProducts.map((product) => (
                <Stack key={product.id} direction="row" spacing={1.5} alignItems="center">
                  <Typography sx={{ fontSize: 24 }}>{product.image}</Typography>
                  <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                    <Typography variant="body2" fontWeight={700} noWrap>
                      {product.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {product.sku}
                    </Typography>
                  </Box>
                  <Chip size="small" color={product.stock === 0 ? "error" : "warning"} label={`${product.stock} còn`} />
                </Stack>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
