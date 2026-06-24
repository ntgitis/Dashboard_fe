import { useState } from "react";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getPublicProducts } from "@/services/userProductApi";
import { formatVnd } from "@/utils/formatters";

export default function WishlistAddDialog({
  open,
  existingProductIds = [],
  onClose,
  onAdd,
  adding = false,
}) {
  const [search, setSearch] = useState("");

  const productsQuery = useQuery({
    queryKey: ["wishlist-add-products", search],
    queryFn: () =>
      getPublicProducts({
        search,
        page: 0,
        size: 10,
      }),
    enabled: open,
  });

  const existingSet = new Set(existingProductIds.map(Number));
  const products = productsQuery.data?.content || [];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Thêm sản phẩm yêu thích</DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ pt: 1 }}>
          <TextField
            label="Tìm sản phẩm"
            placeholder="Nhập tên sản phẩm hoặc SKU"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            fullWidth
          />

          {productsQuery.isLoading ? (
            <Typography color="text.secondary">Đang tải sản phẩm...</Typography>
          ) : products.length === 0 ? (
            <Typography color="text.secondary">
              Không tìm thấy sản phẩm phù hợp
            </Typography>
          ) : (
            products.map((product) => {
              const alreadyAdded = existingSet.has(Number(product.id));

              return (
                <Stack
                  key={product.id}
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{
                    border: 1,
                    borderColor: "divider",
                    borderRadius: 2,
                    p: 1.5,
                  }}
                >
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Avatar
                      src={product.imageUrl || undefined}
                      variant="rounded"
                    />

                    <Stack>
                      <Typography fontWeight={700}>{product.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {formatVnd(product.price || 0)} • Tồn kho:{" "}
                        {product.stock ?? 0}
                      </Typography>
                    </Stack>
                  </Stack>

                  <Button
                    size="small"
                    variant="contained"
                    disabled={
                      adding || alreadyAdded || product.active === false
                    }
                    onClick={() => onAdd(product)}
                  >
                    {alreadyAdded ? "Đã có" : "Thêm"}
                  </Button>
                </Stack>
              );
            })
          )}
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={adding}>
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
}
