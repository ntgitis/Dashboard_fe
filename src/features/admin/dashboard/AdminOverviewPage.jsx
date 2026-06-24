import { useMemo } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
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
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { PageHeader } from "@/components/common/PageHeader";
import { StatCard } from "@/components/common/StatCard";
import { StatusChip } from "@/components/common/StatusChip";
import { formatVnd } from "@/utils/formatters";
import { getAdminProducts } from "@/services/productApi";
import { getAdminOrders } from "@/services/orderApi";
import { getAdminUsers } from "@/services/adminUserApi";

const FETCH_DASHBOARD_SIZE = 1000;

function getApiErrorMessage(error) {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    "Không tải được dữ liệu tổng quan"
  );
}

function formatDateTime(value) {
  if (!value) return "-";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString("vi-VN");
}

function isRevenueOrder(order) {
  return order.status !== "CANCELLED";
}

export default function AdminOverviewPage() {
  const navigate = useNavigate();

  const productsQuery = useQuery({
    queryKey: ["dashboard-products"],
    queryFn: () =>
      getAdminProducts({
        page: 0,
        size: FETCH_DASHBOARD_SIZE,
      }),
  });

  const ordersQuery = useQuery({
    queryKey: ["dashboard-orders"],
    queryFn: () =>
      getAdminOrders({
        page: 0,
        size: FETCH_DASHBOARD_SIZE,
      }),
  });

  const usersQuery = useQuery({
    queryKey: ["dashboard-users"],
    queryFn: () =>
      getAdminUsers({
        page: 0,
        size: FETCH_DASHBOARD_SIZE,
      }),
  });

  const products = productsQuery.data?.content || [];
  const orders = ordersQuery.data?.content || [];
  const users = usersQuery.data?.content || [];

  const stats = useMemo(() => {
    const revenue = orders
      .filter(isRevenueOrder)
      .reduce((sum, order) => sum + Number(order.totalAmount || 0), 0);

    const totalOrders = ordersQuery.data?.totalElements ?? orders.length;
    const totalProducts = productsQuery.data?.totalElements ?? products.length;

    const totalCustomers = users.filter((user) => user.role === "USER").length;

    return {
      revenue,
      totalOrders,
      totalProducts,
      totalCustomers,
    };
  }, [
    orders,
    ordersQuery.data?.totalElements,
    products,
    productsQuery.data?.totalElements,
    users,
  ]);

  const recentOrders = useMemo(() => {
    return [...orders]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 6);
  }, [orders]);

  const lowStockProducts = useMemo(() => {
    return products
      .filter((product) => Number(product.stock || 0) <= 10)
      .sort((a, b) => Number(a.stock || 0) - Number(b.stock || 0))
      .slice(0, 5);
  }, [products]);

  const hasError =
    productsQuery.isError || ordersQuery.isError || usersQuery.isError;

  const isLoading =
    productsQuery.isLoading || ordersQuery.isLoading || usersQuery.isLoading;

  return (
    <Stack spacing={3}>
      <PageHeader title="Tổng quan" />

      {hasError && (
        <Alert severity="error">
          {getApiErrorMessage(
            productsQuery.error || ordersQuery.error || usersQuery.error,
          )}
        </Alert>
      )}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(2, 1fr)",
            xl: "repeat(4, 1fr)",
          },
          gap: 2,
        }}
      >
        <StatCard
          label="Doanh thu"
          value={isLoading ? "Đang tải..." : formatVnd(stats.revenue)}
          icon={AttachMoneyOutlinedIcon}
          tone="success"
        />

        <StatCard
          label="Đơn hàng"
          value={isLoading ? "Đang tải..." : stats.totalOrders}
          icon={ShoppingBagOutlinedIcon}
          tone="primary"
        />

        <StatCard
          label="Sản phẩm"
          value={isLoading ? "Đang tải..." : stats.totalProducts}
          icon={Inventory2OutlinedIcon}
          tone="warning"
        />

        <StatCard
          label="Khách hàng"
          value={isLoading ? "Đang tải..." : stats.totalCustomers}
          icon={PeopleAltOutlinedIcon}
          tone="info"
        />
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", xl: "2fr 1fr" },
          gap: 2,
        }}
      >
        <Card>
          <CardContent>
            <Stack
              direction={{ xs: "column", md: "row" }}
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", md: "center" }}
              spacing={1}
              sx={{ mb: 2 }}
            >
              <Box>
                <Typography variant="h6" fontWeight={700}>
                  Đơn hàng gần đây
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  6 đơn hàng mới nhất trong hệ thống
                </Typography>
              </Box>

              <Button size="small" onClick={() => navigate("/admin/orders")}>
                Xem tất cả
              </Button>
            </Stack>

            <Divider sx={{ mb: 2 }} />

            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>ID đơn</TableCell>
                  <TableCell>User ID</TableCell>
                  <TableCell>Ngày tạo</TableCell>
                  <TableCell>Giá trị</TableCell>
                  <TableCell>Trạng thái</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {recentOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5}>
                      <Typography color="text.secondary" textAlign="center">
                        Chưa có đơn hàng
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  recentOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{order.userId}</TableCell>
                      <TableCell>{formatDateTime(order.createdAt)}</TableCell>
                      <TableCell>{formatVnd(order.totalAmount || 0)}</TableCell>
                      <TableCell>
                        <StatusChip status={order.status} />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mb: 2 }}
            >
              <Box>
                <Typography variant="h6" fontWeight={700}>
                  Tồn kho thấp
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Các sản phẩm cần nhập thêm
                </Typography>
              </Box>

              <Button size="small" onClick={() => navigate("/admin/products")}>
                Xem tất cả
              </Button>
            </Stack>

            <Divider sx={{ mb: 2 }} />

            <Stack spacing={1.5}>
              {lowStockProducts.length === 0 ? (
                <Typography color="text.secondary" textAlign="center">
                  Không có sản phẩm tồn kho thấp
                </Typography>
              ) : (
                lowStockProducts.map((product) => (
                  <Box
                    key={product.id}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 2,
                    }}
                  >
                    <Box>
                      <Typography fontWeight={600}>{product.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {product.sku || `ID: ${product.id}`}
                      </Typography>
                    </Box>

                    <Typography
                      fontWeight={700}
                      color={
                        Number(product.stock || 0) === 0
                          ? "error"
                          : "warning.main"
                      }
                    >
                      {product.stock}
                    </Typography>
                  </Box>
                ))
              )}
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Stack>
  );
}
