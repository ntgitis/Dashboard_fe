import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Alert, Button, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useSnackbar } from "notistack";

import { PageHeader } from "@/components/common/PageHeader";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import {
  createProduct,
  deleteProduct,
  getAdminProducts,
  getCategories,
  updateProduct,
} from "@/services/productApi";

import ProductFilter from "../components/ProductFilter";
import ProductTable from "../components/ProductTable";
import ProductFormDialog from "../components/ProductFormDialog";

const DEFAULT_PAGE = 0;
const DEFAULT_ROWS_PER_PAGE = 10;

function getApiErrorMessage(error) {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    "Có lỗi xảy ra"
  );
}

export default function AdminProductsPage() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const [keyword, setKeyword] = useState("");
  const [categoryId, setCategoryId] = useState("all");
  const [active, setActive] = useState("all");

  const [page, setPage] = useState(DEFAULT_PAGE);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);

  const [openForm, setOpenForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);

  const productsQuery = useQuery({
    queryKey: [
      "admin-products",
      {
        keyword,
        categoryId,
        active,
        page,
        rowsPerPage,
      },
    ],
    queryFn: () =>
      getAdminProducts({
        search: keyword,
        categoryId: categoryId === "all" ? undefined : Number(categoryId),
        active: active === "all" ? undefined : active === "true",
        page,
        size: rowsPerPage,
      }),
  });

  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const createProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      enqueueSnackbar("Thêm sản phẩm thành công", {
        variant: "success",
      });

      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      handleCloseForm();
      setPage(DEFAULT_PAGE);
    },
    onError: (error) => {
      enqueueSnackbar(getApiErrorMessage(error), {
        variant: "error",
      });
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: ({ id, payload }) => updateProduct(id, payload),
    onSuccess: () => {
      enqueueSnackbar("Cập nhật sản phẩm thành công", {
        variant: "success",
      });

      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      handleCloseForm();
    },
    onError: (error) => {
      enqueueSnackbar(getApiErrorMessage(error), {
        variant: "error",
      });
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      enqueueSnackbar("Xóa sản phẩm thành công", {
        variant: "success",
      });

      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      setDeletingProduct(null);
    },
    onError: (error) => {
      enqueueSnackbar(getApiErrorMessage(error), {
        variant: "error",
      });
    },
  });

  const productsPage = productsQuery.data || {
    content: [],
    totalElements: 0,
    totalPages: 0,
    number: page,
    size: rowsPerPage,
  };

  const categories = categoriesQuery.data || [];

  const isSubmitting =
    createProductMutation.isPending || updateProductMutation.isPending;

  const handleOpenCreate = () => {
    setEditingProduct(null);
    setOpenForm(true);
  };

  const handleOpenEdit = (product) => {
    setEditingProduct(product);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setEditingProduct(null);
  };

  const handleKeywordChange = (value) => {
    setKeyword(value);
    setPage(DEFAULT_PAGE);
  };

  const handleCategoryChange = (value) => {
    setCategoryId(value);
    setPage(DEFAULT_PAGE);
  };

  const handleActiveChange = (value) => {
    setActive(value);
    setPage(DEFAULT_PAGE);
  };

  const handleResetFilter = () => {
    setKeyword("");
    setCategoryId("all");
    setActive("all");
    setPage(DEFAULT_PAGE);
  };

  const handlePageChange = (_, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(Number(event.target.value));
    setPage(DEFAULT_PAGE);
  };

  const handleSubmitProduct = (payload) => {
    if (editingProduct?.id) {
      updateProductMutation.mutate({
        id: editingProduct.id,
        payload,
      });
      return;
    }

    createProductMutation.mutate(payload);
  };

  const handleConfirmDelete = () => {
    if (!deletingProduct?.id) {
      return;
    }

    deleteProductMutation.mutate(deletingProduct.id);
  };

  return (
    <>
      <Stack spacing={2}>
        <PageHeader
          title="Quản lý sản phẩm"
          description="Tạo, cập nhật, lọc và xóa mềm sản phẩm theo API backend"
          actions={
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleOpenCreate}
            >
              Thêm sản phẩm
            </Button>
          }
        />

        {productsQuery.isError && (
          <Alert severity="error">
            {getApiErrorMessage(productsQuery.error)}
          </Alert>
        )}

        {categoriesQuery.isError && (
          <Alert severity="warning">
            Không tải được danh mục: {getApiErrorMessage(categoriesQuery.error)}
          </Alert>
        )}

        <ProductFilter
          keyword={keyword}
          categoryId={categoryId}
          active={active}
          categories={categories}
          onKeywordChange={handleKeywordChange}
          onCategoryChange={handleCategoryChange}
          onActiveChange={handleActiveChange}
          onReset={handleResetFilter}
        />

        <ProductTable
          products={productsPage.content || []}
          totalElements={productsPage.totalElements || 0}
          page={page}
          rowsPerPage={rowsPerPage}
          loading={productsQuery.isLoading || productsQuery.isFetching}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          onEdit={handleOpenEdit}
          onDelete={setDeletingProduct}
        />
      </Stack>

      <ProductFormDialog
        open={openForm}
        editingProduct={editingProduct}
        categories={categories}
        onClose={handleCloseForm}
        onSubmit={handleSubmitProduct}
        submitting={isSubmitting}
      />

      <ConfirmDialog
        open={Boolean(deletingProduct)}
        title="Xóa sản phẩm"
        message={
          deletingProduct
            ? `Bạn có chắc muốn xóa sản phẩm "${deletingProduct.name}"? Sản phẩm sẽ được chuyển sang trạng thái ngừng bán.`
            : ""
        }
        confirmText={
          deleteProductMutation.isPending ? "Đang xóa..." : "Xóa sản phẩm"
        }
        cancelText="Hủy"
        onClose={() => setDeletingProduct(null)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
