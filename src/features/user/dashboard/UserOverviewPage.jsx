import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import WalletOutlinedIcon from "@mui/icons-material/WalletOutlined";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { PageHeader } from "@/components/common/PageHeader";
import { StatCard } from "@/components/common/StatCard";
import { StatusChip } from "@/components/common/StatusChip";
import { formatVnd } from "@/utils/formatters";
import { getMyOrders } from "@/services/userOrderApi";
import { getWishlist } from "@/services/wishlistApi";
import { getMyAddresses } from "@/services/addressApi";

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

export default function UserOverviewPage() {
  const ordersQuery = useQuery({
    queryKey: ["user-overview-orders"],
    queryFn: () =>
      getMyOrders({
        page: 0,
        size: 1000,
      }),
  });

  const wishlistQuery = useQuery({
    queryKey: ["user-overview-wishlist"],
    queryFn: getWishlist,
  });

  const addressesQuery = useQuery({
    queryKey: ["user-overview-addresses"],
    queryFn: getMyAddresses,
  });

  const orders = ordersQuery.data?.content || [];
  const wishlistItems = wishlistQuery.data?.items || [];
  const addresses = addressesQuery.data || [];

  const totalSpent = orders
    .filter(isRevenueOrder)
    .reduce((sum, order) => sum + Number(order.totalAmount || 0), 0);

  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const isLoading =
    ordersQuery.isLoading ||
    wishlistQuery.isLoading ||
    addressesQuery.isLoading;

  return (
    <Stack spacing={3}>
      <PageHeader
        title="Tổng quan"
        description="Theo dõi nhanh đơn hàng, wishlist và địa chỉ giao hàng"
      />

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
          label="Đơn hàng"
          value={
            isLoading
              ? "Đang tải..."
              : (ordersQuery.data?.totalElements ?? orders.length)
          }
          icon={ShoppingBagOutlinedIcon}
          tone="primary"
        />

        <StatCard
          label="Đang xử lý"
          value={
            isLoading
              ? "Đang tải..."
              : orders.filter((order) =>
                  ["PENDING", "PROCESSING", "SHIPPED"].includes(order.status),
                ).length
          }
          icon={LocalShippingOutlinedIcon}
          tone="warning"
        />

        <StatCard
          label="Yêu thích"
          value={
            isLoading
              ? "Đang tải..."
              : (wishlistQuery.data?.totalItems ?? wishlistItems.length)
          }
          icon={FavoriteBorderOutlinedIcon}
          tone="info"
        />

        <StatCard
          label="Đã chi tiêu"
          value={isLoading ? "Đang tải..." : formatVnd(totalSpent)}
          icon={WalletOutlinedIcon}
          tone="success"
        />
      </Box>

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
                Những đơn hàng mới nhất của bạn
              </Typography>
            </Box>

            <Button component={Link} to="/user/orders" size="small">
              Xem tất cả
            </Button>
          </Stack>

          <Divider sx={{ mb: 2 }} />

          <Stack spacing={1.5}>
            {recentOrders.length === 0 ? (
              <Typography color="text.secondary">
                Bạn chưa có đơn hàng nào.
              </Typography>
            ) : (
              recentOrders.map((order) => (
                <Stack
                  key={order.id}
                  direction={{ xs: "column", md: "row" }}
                  justifyContent="space-between"
                  spacing={1}
                  sx={{
                    p: 1.5,
                    border: 1,
                    borderColor: "divider",
                    borderRadius: 2,
                  }}
                >
                  <Box>
                    <Typography fontWeight={700}>Đơn #{order.id}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {formatDateTime(order.createdAt)} •{" "}
                      {order.items?.length || 0} sản phẩm
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {order.shippingAddress || "-"}
                    </Typography>
                  </Box>

                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    justifyContent="flex-end"
                  >
                    <Typography fontWeight={700}>
                      {formatVnd(order.totalAmount || 0)}
                    </Typography>
                    <StatusChip status={order.status} />
                  </Stack>
                </Stack>
              ))
            )}
          </Stack>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" fontWeight={700}>
            Địa chỉ giao hàng
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Bạn hiện có {addresses.length} địa chỉ giao hàng.
          </Typography>

          <Button
            component={Link}
            to="/user/addresses"
            size="small"
            sx={{ mt: 1 }}
          >
            Quản lý địa chỉ
          </Button>
        </CardContent>
      </Card>
    </Stack>
  );
}
