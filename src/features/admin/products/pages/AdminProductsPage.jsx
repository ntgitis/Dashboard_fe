import { useEffect, useMemo, useState } from "react";
import { Button, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { PageHeader } from "@/components/common/PageHeader";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import {
  products as productMocks,
  categories as mockCategories,
} from "@/mocks";
import ProductFilter from "../components/ProductFilter";
import ProductTable from "../components/ProductTable";
import ProductFormDialog from "../components/ProductFormDialog";

const DEFAULT_PAGE = 0;
const DEFAULT_ROWS_PER_PAGE = 10;

function getValue(valueOrEvent) {
  return valueOrEvent?.target ? valueOrEvent.target.value : valueOrEvent;
}

function createProductId(products) {
  const numericIds = products
    .map((product) => product.id)
    .filter((id) => typeof id === "number");

  if (numericIds.length === products.length) {
    return Math.max(0, ...numericIds) + 1;
  }

  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return String(Date.now());
}

export default function AdminProductsPage() {
  const [items, setItems] = useState(productMocks);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");

  const [page, setPage] = useState(DEFAULT_PAGE);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);

  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [openForm, setOpenForm] = useState(false);

  const categories = useMemo(() => {
    return mockCategories?.length
      ? mockCategories
      : Array.from(new Set(items.map((item) => item.category)));
  }, [items]);

  const filteredProducts = useMemo(() => {
    const lowerKeyword = keyword.trim().toLowerCase();

    return items.filter((product) => {
      const matchKeyword =
        !lowerKeyword ||
        product.name?.toLowerCase().includes(lowerKeyword) ||
        product.sku?.toLowerCase().includes(lowerKeyword);

      const matchCategory = category === "all" || product.category === category;
      const matchStatus = status === "all" || product.status === status;

      return matchKeyword && matchCategory && matchStatus;
    });
  }, [items, keyword, category, status]);

  useEffect(() => {
    const maxPage = Math.max(
      0,
      Math.ceil(filteredProducts.length / rowsPerPage) - 1,
    );

    if (page > maxPage) {
      setPage(maxPage);
    }
  }, [filteredProducts.length, page, rowsPerPage]);

  const handleOpenCreate = () => {
    setEditingProduct(null);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setEditingProduct(null);
  };

  const handleKeywordChange = (valueOrEvent) => {
    setKeyword(getValue(valueOrEvent));
    setPage(DEFAULT_PAGE);
  };

  const handleCategoryChange = (valueOrEvent) => {
    setCategory(getValue(valueOrEvent));
    setPage(DEFAULT_PAGE);
  };

  const handleStatusChange = (valueOrEvent) => {
    setStatus(getValue(valueOrEvent));
    setPage(DEFAULT_PAGE);
  };

  const handleResetFilter = () => {
    setKeyword("");
    setCategory("all");
    setStatus("all");
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
    const hasPayloadId = payload.id !== undefined && payload.id !== null;

    setItems((prev) => {
      const exists =
        hasPayloadId && prev.some((item) => item.id === payload.id);

      if (exists) {
        return prev.map((item) => (item.id === payload.id ? payload : item));
      }

      const newProduct = {
        ...payload,
        id: hasPayloadId ? payload.id : createProductId(prev),
      };

      return [newProduct, ...prev];
    });

    if (!hasPayloadId) {
      setPage(DEFAULT_PAGE);
    }

    handleCloseForm();
  };

  const handleConfirmDelete = () => {
    if (!deletingProduct) return;

    setItems((prev) => prev.filter((item) => item.id !== deletingProduct.id));

    setDeletingProduct(null);
  };

  return (
    <>
      <PageHeader
        title="Quản lý sản phẩm"
        description="Theo dõi danh mục, tồn kho và trạng thái sản phẩm."
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

      <Stack spacing={3}>
        <ProductFilter
          keyword={keyword}
          category={category}
          status={status}
          categories={categories}
          onKeywordChange={handleKeywordChange}
          onCategoryChange={handleCategoryChange}
          onStatusChange={handleStatusChange}
          onReset={handleResetFilter}
        />

        <ProductTable
          products={filteredProducts}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          onEdit={(product) => {
            setEditingProduct(product);
            setOpenForm(true);
          }}
          onDelete={setDeletingProduct}
        />
      </Stack>

      <ProductFormDialog
        open={openForm}
        editingProduct={editingProduct}
        categories={categories}
        existingProducts={items}
        onClose={handleCloseForm}
        onSubmit={handleSubmitProduct}
      />

      <ConfirmDialog
        open={Boolean(deletingProduct)}
        title="Xoá sản phẩm"
        message={`Bạn có chắc muốn xoá "${deletingProduct?.name}" không?`}
        confirmText="Xoá"
        cancelText="Huỷ"
        onClose={() => setDeletingProduct(null)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
