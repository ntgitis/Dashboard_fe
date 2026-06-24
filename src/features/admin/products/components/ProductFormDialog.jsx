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
  sku: "",
  category: "",
  price: "",
  stock: "",
  status: "ACTIVE",
};

const STATUS_OPTIONS = [
  {
    value: "ACTIVE",
    label: "Đang bán",
  },
  {
    value: "INACTIVE",
    label: "Ngừng bán",
  },
  {
    value: "LOW_STOCK",
    label: "Sắp hết hàng",
  },
];

function getInitialFormData(editingProduct) {
  if (!editingProduct) {
    return EMPTY_FORM;
  }

  return {
    name: editingProduct.name || "",
    sku: editingProduct.sku || "",
    category: editingProduct.category || "",
    price: editingProduct.price ?? "",
    stock: editingProduct.stock ?? "",
    status: editingProduct.status || "ACTIVE",
  };
}

function ProductFormContent({
  editingProduct,
  categories = [],
  existingProducts = [],
  onClose,
  onSubmit,
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

    if (!formData.sku.trim()) {
      newErrors.sku = "SKU không được để trống";
    } else {
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

    if (!formData.category.trim()) {
      newErrors.category = "Vui lòng chọn danh mục";
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

    if (!formData.status) {
      newErrors.status = "Vui lòng chọn trạng thái";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    const payload = {
      ...editingProduct,
      id: editingProduct?.id || `P${Date.now().toString().slice(-5)}`,
      name: formData.name.trim(),
      sku: formData.sku.trim(),
      category: formData.category,
      price: Number(formData.price),
      stock: Number(formData.stock),
      status: formData.status,
    };

    onSubmit(payload);
  };

  return (
    <>
      <DialogTitle>
        {isEditMode ? "Cập nhật sản phẩm" : "Thêm sản phẩm mới"}
      </DialogTitle>

      <DialogContent dividers>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Tên sản phẩm"
            value={formData.name}
            onChange={handleChange("name")}
            error={Boolean(errors.name)}
            helperText={errors.name}
            fullWidth
          />

          <TextField
            label="SKU"
            value={formData.sku}
            onChange={handleChange("sku")}
            error={Boolean(errors.sku)}
            helperText={errors.sku || "Ví dụ: IP15-128, MB-AIR-M2"}
            fullWidth
          />

          <TextField
            select
            label="Danh mục"
            value={formData.category}
            onChange={handleChange("category")}
            error={Boolean(errors.category)}
            helperText={errors.category}
            fullWidth
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
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
            inputProps={{
              min: 0,
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
            inputProps={{
              min: 0,
              step: 1,
            }}
          />

          <TextField
            select
            label="Trạng thái"
            value={formData.status}
            onChange={handleChange("status")}
            error={Boolean(errors.status)}
            helperText={errors.status}
            fullWidth
          >
            {STATUS_OPTIONS.map((status) => (
              <MenuItem key={status.value} value={status.value}>
                {status.label}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Hủy
        </Button>

        <Button onClick={handleSubmit} variant="contained">
          {isEditMode ? "Lưu thay đổi" : "Thêm sản phẩm"}
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
      />
    </Dialog>
  );
}
