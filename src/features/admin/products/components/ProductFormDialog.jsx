import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";

const EMPTY_FORM = {
  name: "",
  description: "",
  price: "",
  stock: "",
  imageUrl: "",
  sku: "",
  categoryId: "",
};

function getInitialFormData(editingProduct) {
  if (!editingProduct) {
    return EMPTY_FORM;
  }

  return {
    name: editingProduct.name || "",
    description: editingProduct.description || "",
    price: editingProduct.price ?? "",
    stock: editingProduct.stock ?? "",
    imageUrl: editingProduct.imageUrl || "",
    sku: editingProduct.sku || "",
    categoryId: editingProduct.categoryId
      ? String(editingProduct.categoryId)
      : "",
  };
}

function ProductFormContent({
  editingProduct,
  categories = [],
  existingProducts = [],
  onClose,
  onSubmit,
  submitting = false,
}) {
  const isEditMode = Boolean(editingProduct);

  const [formData, setFormData] = useState(() =>
    getInitialFormData(editingProduct),
  );

  const [errors, setErrors] = useState({});

  const handleChange = (field) => (event) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Tên sản phẩm không được để trống";
    }

    if (formData.sku.trim()) {
      const isDuplicateSku = existingProducts.some((product) => {
        const sameSku =
          product.sku?.toLowerCase() === formData.sku.trim().toLowerCase();

        const differentProduct = product.id !== editingProduct?.id;

        return sameSku && differentProduct;
      });

      if (isDuplicateSku) {
        newErrors.sku = "SKU đã tồn tại";
      }
    }

    if (!formData.categoryId) {
      newErrors.categoryId = "Vui lòng chọn danh mục";
    }

    const priceNumber = Number(formData.price);

    if (formData.price === "") {
      newErrors.price = "Giá bán không được để trống";
    } else if (!Number.isFinite(priceNumber) || priceNumber <= 0) {
      newErrors.price = "Giá bán phải lớn hơn 0";
    }

    const stockNumber = Number(formData.stock);

    if (formData.stock === "") {
      newErrors.stock = "Tồn kho không được để trống";
    } else if (!Number.isInteger(stockNumber) || stockNumber < 0) {
      newErrors.stock = "Tồn kho phải là số nguyên không âm";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    onSubmit({
      name: formData.name.trim(),
      description: formData.description.trim(),
      price: Number(formData.price),
      stock: Number(formData.stock),
      imageUrl: formData.imageUrl.trim(),
      sku: formData.sku.trim(),
      categoryId: Number(formData.categoryId),
    });
  };

  return (
    <>
      <DialogTitle>
        {isEditMode ? "Cập nhật sản phẩm" : "Thêm sản phẩm mới"}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1, minWidth: 420 }}>
          <TextField
            label="Tên sản phẩm"
            value={formData.name}
            onChange={handleChange("name")}
            error={Boolean(errors.name)}
            helperText={errors.name}
            fullWidth
            required
          />

          <TextField
            label="SKU"
            value={formData.sku}
            onChange={handleChange("sku")}
            error={Boolean(errors.sku)}
            helperText={errors.sku || "Có thể để trống nếu backend tự quản lý"}
            fullWidth
          />

          <TextField
            label="Danh mục"
            value={formData.categoryId}
            onChange={handleChange("categoryId")}
            error={Boolean(errors.categoryId)}
            helperText={errors.categoryId}
            fullWidth
            required
            select
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={String(category.id)}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Giá bán"
            type="number"
            value={formData.price}
            onChange={handleChange("price")}
            error={Boolean(errors.price)}
            helperText={errors.price}
            fullWidth
            required
          />

          <TextField
            label="Tồn kho"
            type="number"
            value={formData.stock}
            onChange={handleChange("stock")}
            error={Boolean(errors.stock)}
            helperText={errors.stock}
            fullWidth
            required
          />

          <TextField
            label="Ảnh sản phẩm"
            value={formData.imageUrl}
            onChange={handleChange("imageUrl")}
            fullWidth
            placeholder="https://..."
          />

          <TextField
            label="Mô tả"
            value={formData.description}
            onChange={handleChange("description")}
            fullWidth
            multiline
            minRows={3}
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={submitting}>
          Hủy
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={submitting}
        >
          {submitting
            ? "Đang lưu..."
            : isEditMode
              ? "Lưu thay đổi"
              : "Thêm sản phẩm"}
        </Button>
      </DialogActions>
    </>
  );
}

export default function ProductFormDialog({
  open,
  editingProduct,
  categories = [],
  existingProducts = [],
  onClose,
  onSubmit,
  submitting = false,
}) {
  if (!open) {
    return null;
  }

  const formKey = editingProduct?.id || "create";

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <ProductFormContent
        key={formKey}
        editingProduct={editingProduct}
        categories={categories}
        existingProducts={existingProducts}
        onClose={onClose}
        onSubmit={onSubmit}
        submitting={submitting}
      />
    </Dialog>
  );
}
