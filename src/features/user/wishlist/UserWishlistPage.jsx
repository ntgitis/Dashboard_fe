import { useMemo, useState } from "react";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteSweepOutlinedIcon from "@mui/icons-material/DeleteSweepOutlined";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";

import { PageHeader } from "@/components/common/PageHeader";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import {
  addWishlistItem,
  clearWishlist,
  getWishlist,
  removeWishlistItem,
} from "@/services/wishlistApi";

import WishlistFilter from "./components/WishlistFilter";
import WishlistCard from "./components/WishlistCard";
import WishlistAddDialog from "./components/WishlistAddDialog";

function getApiErrorMessage(error) {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    "Có lỗi xảy ra"
  );
}

function normalizeText(value) {
  return String(value ?? "")
    .toLowerCase()
    .trim();
}

export default function UserWishlistPage() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const [keyword, setKeyword] = useState("");
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [removingItem, setRemovingItem] = useState(null);
  const [confirmClear, setConfirmClear] = useState(false);

  const wishlistQuery = useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishlist,
  });

  const addMutation = useMutation({
    mutationFn: (product) => addWishlistItem(product.id),
    onSuccess: () => {
      enqueueSnackbar("Đã thêm sản phẩm vào yêu thích", {
        variant: "success",
      });

      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
    onError: (error) => {
      enqueueSnackbar(getApiErrorMessage(error), {
        variant: "error",
      });
    },
  });

  const removeMutation = useMutation({
    mutationFn: removeWishlistItem,
    onSuccess: () => {
      enqueueSnackbar("Đã xoá sản phẩm khỏi yêu thích", {
        variant: "info",
      });

      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      setRemovingItem(null);
    },
    onError: (error) => {
      enqueueSnackbar(getApiErrorMessage(error), {
        variant: "error",
      });
    },
  });

  const clearMutation = useMutation({
    mutationFn: clearWishlist,
    onSuccess: () => {
      enqueueSnackbar("Đã xoá toàn bộ wishlist", {
        variant: "info",
      });

      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      setConfirmClear(false);
    },
    onError: (error) => {
      enqueueSnackbar(getApiErrorMessage(error), {
        variant: "error",
      });
    },
  });

  const items = wishlistQuery.data?.items || [];

  const filteredItems = useMemo(() => {
    const normalizedKeyword = normalizeText(keyword);

    if (!normalizedKeyword) {
      return items;
    }

    return items.filter((item) =>
      normalizeText(item.productName).includes(normalizedKeyword),
    );
  }, [items, keyword]);

  const existingProductIds = items.map((item) => item.productId);

  return (
    <>
      <PageHeader
        title="Yêu thích"
        actions={
          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteSweepOutlinedIcon />}
              onClick={() => setConfirmClear(true)}
              disabled={items.length === 0}
            >
              Xoá tất cả
            </Button>

            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setOpenAddDialog(true)}
            >
              Thêm sản phẩm
            </Button>
          </Stack>
        }
      />

      <WishlistFilter
        keyword={keyword}
        onKeywordChange={setKeyword}
        onReset={() => setKeyword("")}
      />

      {wishlistQuery.isLoading ? (
        <Typography color="text.secondary">Đang tải wishlist...</Typography>
      ) : filteredItems.length === 0 ? (
        <Box textAlign="center" py={6}>
          <Typography color="text.secondary">
            Không có sản phẩm yêu thích phù hợp
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Hãy thêm sản phẩm hoặc thử đổi từ khoá tìm kiếm.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {filteredItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} xl={3} key={item.id}>
              <WishlistCard item={item} onRemove={setRemovingItem} />
            </Grid>
          ))}
        </Grid>
      )}

      <WishlistAddDialog
        open={openAddDialog}
        existingProductIds={existingProductIds}
        onClose={() => setOpenAddDialog(false)}
        onAdd={(product) => addMutation.mutate(product)}
        adding={addMutation.isPending}
      />

      <ConfirmDialog
        open={Boolean(removingItem)}
        title="Xoá khỏi yêu thích"
        message={
          removingItem
            ? `Bạn có chắc muốn xoá "${removingItem.productName}" khỏi wishlist?`
            : ""
        }
        confirmText={removeMutation.isPending ? "Đang xoá..." : "Xoá"}
        cancelText="Huỷ"
        onClose={() => setRemovingItem(null)}
        onConfirm={() => {
          if (removingItem?.productId) {
            removeMutation.mutate(removingItem.productId);
          }
        }}
      />

      <ConfirmDialog
        open={confirmClear}
        title="Xoá toàn bộ wishlist"
        message="Bạn có chắc muốn xoá toàn bộ sản phẩm yêu thích?"
        confirmText={clearMutation.isPending ? "Đang xoá..." : "Xoá tất cả"}
        cancelText="Huỷ"
        onClose={() => setConfirmClear(false)}
        onConfirm={() => clearMutation.mutate()}
      />
    </>
  );
}