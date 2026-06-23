import { Box, Card, CardContent, Typography } from "@mui/material";
import PercentOutlinedIcon from "@mui/icons-material/PercentOutlined";
import RepeatOutlinedIcon from "@mui/icons-material/RepeatOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";
import { PageHeader } from "@/components/common/PageHeader";
import { StatCard } from "@/components/common/StatCard";
import { revenueData } from "@/mocks";

export default function AdminAnalyticsPage() {
  return (
    <>
      <PageHeader
        title="Phân tích kinh doanh"
        description="Theo dõi xu hướng doanh thu, đơn hàng và hiệu suất bán hàng."
      />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", xl: "repeat(4, 1fr)" },
          gap: 2,
        }}
      >
        <StatCard label="Giá trị đơn TB" value="540K" delta="+4.1%" icon={TrendingUpOutlinedIcon} />
        <StatCard label="Tỉ lệ chuyển đổi" value="3.84%" delta="+0.6%" icon={PercentOutlinedIcon} tone="success" />
        <StatCard label="Đơn lặp lại" value="38%" delta="+2.9%" icon={RepeatOutlinedIcon} tone="info" />
        <StatCard label="Đơn bị hủy" value="21" delta="-1.2%" trend="down" icon={ShoppingCartOutlinedIcon} tone="warning" />
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
          gap: 2,
          mt: 3,
        }}
      >
        <Card>
          <CardContent>
            <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 2 }}>
              Doanh thu theo tháng
            </Typography>
            <LineChart
              height={320}
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
              Số đơn hàng theo tháng
            </Typography>
            <BarChart
              height={320}
              dataset={revenueData}
              xAxis={[{ scaleType: "band", dataKey: "month" }]}
              series={[{ dataKey: "orders", label: "Đơn hàng", color: "#0ea5e9" }]}
              grid={{ horizontal: true }}
            />
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
