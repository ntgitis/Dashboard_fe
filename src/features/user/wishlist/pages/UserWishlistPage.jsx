// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   CardMedia,
//   IconButton,
//   Stack,
//   Typography,
// } from "@mui/material";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
// import { PageHeader } from "@/components/common/PageHeader";
// import { products } from "@/mocks";
// import { formatVnd } from "@/utils/formatters";

// export default function UserWishlistPage() {
//   const list = products.slice(0, 8);

//   return (
//     <>
//       <PageHeader
//         title="Yêu thích"
//         description={`${list.length} sản phẩm bạn đã lưu.`}
//       />

//       <Box
//         sx={{
//           display: "grid",
//           gridTemplateColumns: {
//             xs: "repeat(2, 1fr)",
//             md: "repeat(3, 1fr)",
//             xl: "repeat(4, 1fr)",
//           },
//           gap: 2,
//         }}
//       >
//         {list.map((product) => (
//           <Card key={product.id}>
//             <CardMedia
//               sx={{
//                 height: 150,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 bgcolor: "grey.100",
//                 fontSize: 56,
//               }}
//             >
//               {product.image}
//             </CardMedia>
//             <CardContent>
//               <Typography variant="caption" color="text.secondary">
//                 {product.category}
//               </Typography>
//               <Typography fontWeight={700} noWrap>
//                 {product.name}
//               </Typography>

//               <Stack
//                 direction="row"
//                 alignItems="center"
//                 justifyContent="space-between"
//                 sx={{ mt: 1.5 }}
//               >
//                 <Typography fontWeight={700}>
//                   {formatVnd(product.price)}
//                 </Typography>
//                 <Stack direction="row" spacing={0.5}>
//                   <IconButton size="small" color="error">
//                     <FavoriteIcon fontSize="small" />
//                   </IconButton>
//                   <IconButton size="small" color="primary">
//                     <ShoppingCartOutlinedIcon fontSize="small" />
//                   </IconButton>
//                 </Stack>
//               </Stack>
//             </CardContent>
//           </Card>
//         ))}
//       </Box>
//     </>
//   );
// }

import { useMemo, useState } from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { PageHeader } from "@/components/common/PageHeader";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import {
  products as productMocks,
  categories as mockCategories,
} from "@/mocks";
import WishlistFilter from "../components/WishlistFilter";
import WishlistCard from "../components/WishlistCard";

export default function UserWishlistPage() {
  const { enqueueSnackbar } = useSnackbar();

  const [items, setItems] = useState(productMocks.slice(0, 8));
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("all");
  const [removingProduct, setRemovingProduct] = useState(null);

  const filteredProducts = useMemo(() => {
    const lowerKeyword = keyword.trim().toLowerCase();

    return items.filter((product) => {
      const matchKeyword =
        !lowerKeyword ||
        product.name.toLowerCase().includes(lowerKeyword) ||
        product.sku.toLowerCase().includes(lowerKeyword);

      const matchCategory = category === "all" || product.category === category;

      return matchKeyword && matchCategory;
    });
  }, [items, keyword, category]);

  const handleKeywordChange = (value) => {
    setKeyword(value);
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
  };

  const handleResetFilter = () => {
    setKeyword("");
    setCategory("all");
  };

  const handleAddToCart = (product) => {
    enqueueSnackbar(`Đã thêm "${product.name}" vào giỏ hàng`, {
      variant: "success",
    });
  };

  const handleRequestRemove = (product) => {
    setRemovingProduct(product);
  };

  const handleConfirmRemove = () => {
    if (!removingProduct) return;

    setItems((prev) =>
      prev.filter((product) => product.id !== removingProduct.id),
    );

    enqueueSnackbar(`Đã xoá "${removingProduct.name}" khỏi yêu thích`, {
      variant: "info",
    });

    setRemovingProduct(null);
  };

  return (
    <>
      <PageHeader
        title="Sản phẩm yêu thích"
        description="Quản lý các sản phẩm bạn đã lưu và thêm nhanh vào giỏ hàng."
      />

      <Stack spacing={3}>
        <WishlistFilter
          keyword={keyword}
          category={category}
          categories={mockCategories}
          onKeywordChange={handleKeywordChange}
          onCategoryChange={handleCategoryChange}
          onReset={handleResetFilter}
        />

        {filteredProducts.length === 0 ? (
          <Box
            sx={{
              py: 8,
              textAlign: "center",
              bgcolor: "background.paper",
              borderRadius: 2,
            }}
          >
            <Typography fontWeight={700}>
              Không có sản phẩm yêu thích phù hợp
            </Typography>

            <Typography color="text.secondary" variant="body2" sx={{ mt: 1 }}>
              Hãy thử đổi từ khoá tìm kiếm hoặc đặt lại bộ lọc.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {filteredProducts.map((product) => (
              <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
                <WishlistCard
                  product={product}
                  onAddToCart={handleAddToCart}
                  onRemove={handleRequestRemove}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Stack>

      <ConfirmDialog
        open={Boolean(removingProduct)}
        title="Xoá khỏi yêu thích"
        message={`Bạn có chắc muốn xoá "${removingProduct?.name}" khỏi danh sách yêu thích không?`}
        confirmText="Xoá"
        cancelText="Huỷ"
        onClose={() => setRemovingProduct(null)}
        onConfirm={handleConfirmRemove}
      />
    </>
  );
}
