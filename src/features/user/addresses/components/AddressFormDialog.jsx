import { useEffect, useState } from "react";
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

const initialForm = {
  label: "",
  name: "",
  phone: "",
  line: "",
  default: false,
};

export default function AddressFormDialog({
  open,
  editingAddress,
  onClose,
  onSubmit,
}) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!open) return;

    if (editingAddress) {
      setForm({
        label: editingAddress.label || "",
        name: editingAddress.name || "",
        phone: editingAddress.phone || "",
        line: editingAddress.line || "",
        default: Boolean(editingAddress.default),
      });
    } else {
      setForm(initialForm);
    }

    setErrors({});
  }, [editingAddress, open]);

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

    if (!form.label.trim()) {
      nextErrors.label = "Tên địa chỉ không được để trống";
    }

    if (!form.name.trim()) {
      nextErrors.name = "Tên người nhận không được để trống";
    }

    if (!form.phone.trim()) {
      nextErrors.phone = "Số điện thoại không được để trống";
    }

    if (!form.line.trim()) {
      nextErrors.line = "Địa chỉ không được để trống";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    onSubmit({
      ...editingAddress,
      ...form,
      label: form.label.trim(),
      name: form.name.trim(),
      phone: form.phone.trim(),
      line: form.line.trim(),
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {editingAddress ? "Sửa địa chỉ" : "Thêm địa chỉ"}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Tên địa chỉ"
            placeholder="Ví dụ: Nhà riêng, Văn phòng..."
            value={form.label}
            onChange={handleChange("label")}
            error={Boolean(errors.label)}
            helperText={errors.label}
            fullWidth
          />

          <TextField
            label="Người nhận"
            value={form.name}
            onChange={handleChange("name")}
            error={Boolean(errors.name)}
            helperText={errors.name}
            fullWidth
          />

          <TextField
            label="Số điện thoại"
            value={form.phone}
            onChange={handleChange("phone")}
            error={Boolean(errors.phone)}
            helperText={errors.phone}
            fullWidth
          />

          <TextField
            label="Địa chỉ"
            value={form.line}
            onChange={handleChange("line")}
            error={Boolean(errors.line)}
            helperText={errors.line}
            multiline
            minRows={3}
            fullWidth
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={form.default}
                onChange={handleChange("default")}
              />
            }
            label="Đặt làm địa chỉ mặc định"
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Huỷ</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {editingAddress ? "Lưu thay đổi" : "Thêm địa chỉ"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
