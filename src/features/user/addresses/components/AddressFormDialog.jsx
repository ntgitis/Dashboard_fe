import { useState } from "react";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Stack,
  TextField,
} from "@mui/material";

const EMPTY_FORM = {
  label: "",
  street: "",
  city: "",
  province: "",
  postalCode: "",
  isDefault: false,
};

function getInitialForm(editingAddress) {
  if (!editingAddress) {
    return EMPTY_FORM;
  }

  return {
    label: editingAddress.label || "",
    street: editingAddress.street || "",
    city: editingAddress.city || "",
    province: editingAddress.province || "",
    postalCode: editingAddress.postalCode || "",
    isDefault: Boolean(editingAddress.isDefault),
  };
}

function AddressFormContent({
  editingAddress,
  initialValues,
  onClose,
  onSubmit,
  submitting = false,
}) {
  const [form, setForm] = useState(() => initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.street.trim()) {
      nextErrors.street = "Địa chỉ đường phố không được để trống";
    }

    if (!form.city.trim()) {
      nextErrors.city = "Thành phố không được để trống";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) {
      return;
    }

    onSubmit({
      label: form.label.trim(),
      street: form.street.trim(),
      city: form.city.trim(),
      province: form.province.trim(),
      postalCode: form.postalCode.trim(),
      isDefault: Boolean(form.isDefault),
    });
  };

  return (
    <>
      <DialogTitle>
        {editingAddress ? "Sửa địa chỉ" : "Thêm địa chỉ"}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ pt: 1 }}>
          <TextField
            label="Nhãn địa chỉ"
            placeholder="Ví dụ: Nhà riêng, Công ty"
            value={form.label}
            onChange={handleChange("label")}
            fullWidth
            disabled={submitting}
          />

          <TextField
            label="Địa chỉ đường phố"
            value={form.street}
            onChange={handleChange("street")}
            error={Boolean(errors.street)}
            helperText={errors.street}
            fullWidth
            required
            disabled={submitting}
          />

          <TextField
            label="Thành phố"
            value={form.city}
            onChange={handleChange("city")}
            error={Boolean(errors.city)}
            helperText={errors.city}
            fullWidth
            required
            disabled={submitting}
          />

          <TextField
            label="Tỉnh / Bang"
            value={form.province}
            onChange={handleChange("province")}
            fullWidth
            disabled={submitting}
          />

          <TextField
            label="Mã bưu điện"
            value={form.postalCode}
            onChange={handleChange("postalCode")}
            fullWidth
            disabled={submitting}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={form.isDefault}
                onChange={handleChange("isDefault")}
                disabled={submitting}
              />
            }
            label="Đặt làm địa chỉ mặc định"
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={submitting}>
          Huỷ
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={submitting}
        >
          {submitting
            ? "Đang lưu..."
            : editingAddress
              ? "Lưu thay đổi"
              : "Thêm địa chỉ"}
        </Button>
      </DialogActions>
    </>
  );
}

export default function AddressFormDialog({
  open,
  editingAddress,
  onClose,
  onSubmit,
  submitting = false,
}) {
  if (!open) {
    return null;
  }

  const initialValues = getInitialForm(editingAddress);
  const formKey = editingAddress?.id || "create";

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <AddressFormContent
        key={formKey}
        editingAddress={editingAddress}
        initialValues={initialValues}
        onClose={onClose}
        onSubmit={onSubmit}
        submitting={submitting}
      />
    </Dialog>
  );
}
