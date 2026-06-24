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
import { PageHeader } from "@/components/common/PageHeader";
import { StatCard } from "@/components/common/StatCard";
import { StatusChip } from "@/components/common/StatusChip";
import { orders } from "@/mocks";
import { formatVnd } from "@/utils/formatters";

export default function UserOverviewPage() {
  const myOrders = orders.slice(0, 5);

  return (
    <>
      <PageHeader title="Tổng quan tài khoản" />

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
          label="Đơn hàng"
          value="12"
          delta="3 đơn mới"
          icon={ShoppingBagOutlinedIcon}
          tone="primary"
        />
        <StatCard
          label="Đang giao"
          value="2"
          delta="Cần theo dõi"
          icon={LocalShippingOutlinedIcon}
          tone="info"
        />
        <StatCard
          label="Yêu thích"
          value="8"
          delta="+2 tuần này"
          icon={FavoriteBorderOutlinedIcon}
          tone="warning"
        />
        <StatCard
          label="Tổng chi tiêu"
          value={formatVnd(18_500_000)}
          delta="+6.2%"
          icon={WalletOutlinedIcon}
          tone="success"
        />
      </Box>

      <Card sx={{ mt: 3 }}>
        <CardContent sx={{ p: 0 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ p: 2 }}
          >
            <Box>
              <Typography variant="subtitle1" fontWeight={700}>
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
          <Divider />

          <Stack divider={<Divider />}>
            {myOrders.map((order) => (
              <Stack
                key={order.id}
                direction={{ xs: "column", sm: "row" }}
                spacing={1.5}
                alignItems={{ xs: "flex-start", sm: "center" }}
                justifyContent="space-between"
                sx={{ p: 2 }}
              >
                <Box>
                  <Typography fontWeight={700}>{order.id}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {order.date} • {order.items} sản phẩm
                  </Typography>
                </Box>

                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography fontWeight={700}>
                    {formatVnd(order.total)}
                  </Typography>
                  <StatusChip status={order.status} />
                </Stack>
              </Stack>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </>
  );
}
