import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { USER_ORDER_STATUS_OPTIONS } from "../userOrder.constants";

export default function UserOrderFilter({
  keyword,
  status,
  onKeywordChange,
  onStatusChange,
  onReset,
}) {
  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        <TextField
          label="Tìm kiếm đơn hàng"
          placeholder="Nhập mã đơn, địa chỉ, ghi chú hoặc tên sản phẩm"
          value={keyword}
          onChange={(event) => onKeywordChange(event.target.value)}
          fullWidth
        />

        <FormControl sx={{ minWidth: 220 }}>
          <InputLabel>Trạng thái</InputLabel>
          <Select
            label="Trạng thái"
            value={status}
            onChange={(event) => onStatusChange(event.target.value)}
          >
            <MenuItem value="all">Tất cả</MenuItem>

            {USER_ORDER_STATUS_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          onClick={onReset}
          variant="outlined"
          sx={{
            height: 40,
            minWidth: 96,
            px: 2.5,
            whiteSpace: "nowrap",
          }}
        >
          Đặt lại
        </Button>
      </Stack>
    </Paper>
  );
}
