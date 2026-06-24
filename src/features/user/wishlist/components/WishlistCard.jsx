import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { formatVnd } from "@/utils/formatters";

export default function WishlistCard({ product, onAddToCart, onRemove }) {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          height: 150,
          display: "grid",
          placeItems: "center",
          bgcolor: "grey.100",
          fontSize: 56,
        }}
      >
        {product.image}
      </Box>

      <CardContent
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
        }}
      >
        <Stack direction="row" justifyContent="space-between" spacing={1}>
          <Chip label={product.category} size="small" />

          <IconButton
            color="error"
            size="small"
            onClick={() => onRemove(product)}
            aria-label="Xoá khỏi yêu thích"
          >
            <DeleteOutlineIcon fontSize="small" />
          </IconButton>
        </Stack>

        <Box>
          <Typography fontWeight={700} noWrap>
            {product.name}
          </Typography>

          <Typography color="text.secondary" variant="body2">
            SKU: {product.sku}
          </Typography>
        </Box>

        <Typography color="primary" fontWeight={700}>
          {formatVnd(product.price)}
        </Typography>

        <Button
          variant="contained"
          startIcon={<ShoppingCartOutlinedIcon />}
          onClick={() => onAddToCart(product)}
          fullWidth
          sx={{ mt: "auto" }}
        >
          Thêm vào giỏ
        </Button>
      </CardContent>
    </Card>
  );
}
