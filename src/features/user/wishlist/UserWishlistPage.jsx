import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { PageHeader } from "@/components/common/PageHeader";
import { products } from "@/mocks";
import { formatVnd } from "@/utils/formatters";

export default function UserWishlistPage() {
  const list = products.slice(0, 8);

  return (
    <>
      <PageHeader title="Yêu thích" description={`${list.length} sản phẩm bạn đã lưu.`} />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(3, 1fr)", xl: "repeat(4, 1fr)" },
          gap: 2,
        }}
      >
        {list.map((product) => (
          <Card key={product.id}>
            <CardMedia
              sx={{
                height: 150,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "grey.100",
                fontSize: 56,
              }}
            >
              {product.image}
            </CardMedia>
            <CardContent>
              <Typography variant="caption" color="text.secondary">
                {product.category}
              </Typography>
              <Typography fontWeight={700} noWrap>
                {product.name}
              </Typography>

              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: 1.5 }}>
                <Typography fontWeight={700}>{formatVnd(product.price)}</Typography>
                <Stack direction="row" spacing={0.5}>
                  <IconButton size="small" color="error">
                    <FavoriteIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" color="primary">
                    <ShoppingCartOutlinedIcon fontSize="small" />
                  </IconButton>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Box>
    </>
  );
}
