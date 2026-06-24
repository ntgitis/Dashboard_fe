import { useState } from "react";
import {
  Alert,
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
    setFormData((currentData) => ({
      ...currentData,
      [field]: event.target.value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [field]: "",
    }));
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.name.trim()) {
      nextErrors.name = "Tên sản phẩm không được để trống";
    }

    if (!formData.categoryId) {
      nextErrors.categoryId = "Vui lòng chọn danh mục";
    }

    const priceNumber = Number(formData.price);

    if (formData.price === "") {
      nextErrors.price = "Giá bán không được để trống";
    } else if (!Number.isFinite(priceNumber) || priceNumber <= 0) {
      nextErrors.price = "Giá bán phải lớn hơn 0";
    }

    const stockNumber = Number(formData.stock);

    if (formData.stock === "") {
      nextErrors.stock = "Tồn kho không được để trống";
    } else if (!Number.isInteger(stockNumber) || stockNumber < 0) {
      nextErrors.stock = "Tồn kho phải là số nguyên không âm";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
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
        <Stack spacing={2} sx={{ pt: 1 }}>
          <TextField
            label="Tên sản phẩm"
            value={formData.name}
            onChange={handleChange("name")}
            error={Boolean(errors.name)}
            helperText={errors.name}
            fullWidth
            required
            disabled={submitting}
          />

          <TextField
            label="Mô tả"
            value={formData.description}
            onChange={handleChange("description")}
            fullWidth
            multiline
            minRows={3}
            disabled={submitting}
          />

          <TextField
            label="SKU"
            value={formData.sku}
            onChange={handleChange("sku")}
            fullWidth
            disabled={submitting}
          />

          <TextField
            select
            label="Danh mục"
            value={formData.categoryId}
            onChange={handleChange("categoryId")}
            error={Boolean(errors.categoryId)}
            helperText={errors.categoryId}
            fullWidth
            required
            disabled={submitting || categories.length === 0}
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
            disabled={submitting}
            inputProps={{
              min: 1,
              step: 1000,
            }}
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
            disabled={submitting}
            inputProps={{
              min: 0,
              step: 1,
            }}
          />

          <TextField
            label="URL hình ảnh"
            value={formData.imageUrl}
            onChange={handleChange("imageUrl")}
            fullWidth
            disabled={submitting}
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
          disabled={submitting || categories.length === 0}
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
        onClose={onClose}
        onSubmit={onSubmit}
        submitting={submitting}
      />
    </Dialog>
  );
}
