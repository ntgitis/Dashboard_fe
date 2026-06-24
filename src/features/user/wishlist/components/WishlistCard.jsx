import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { formatVnd } from "@/utils/formatters";

export default function WishlistCard({ item, onRemove }) {
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {item.productImageUrl ? (
        <CardMedia
          component="img"
          height="180"
          image={item.productImageUrl}
          alt={item.productName}
        />
      ) : (
        <Box
          sx={{
            height: 180,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "action.hover",
          }}
        >
          <Typography color="text.secondary">Không có ảnh</Typography>
        </Box>
      )}

      <CardContent sx={{ flexGrow: 1 }}>
        <Stack spacing={1} height="100%">
          <Stack direction="row" justifyContent="space-between" spacing={1}>
            <Chip
              label={item.active ? "Đang bán" : "Ngừng bán"}
              color={item.active ? "success" : "default"}
              size="small"
            />

            <IconButton
              size="small"
              color="error"
              onClick={() => onRemove(item)}
              aria-label="Xoá khỏi yêu thích"
            >
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>
          </Stack>

          <Typography fontWeight={700}>{item.productName}</Typography>

          <Typography variant="body2" color="text.secondary">
            Product ID: {item.productId}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Tồn kho: {item.stock ?? 0}
          </Typography>

          <Typography fontWeight={800}>{formatVnd(item.price || 0)}</Typography>

          <Button variant="outlined" fullWidth disabled sx={{ mt: "auto" }}>
            Giỏ hàng chưa có API
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
