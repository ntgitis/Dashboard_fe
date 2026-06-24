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
import { ORDER_STATUS_OPTIONS } from "../order.constants";

export default function OrderFilter({
  keyword,
  status,
  onKeywordChange,
  onStatusChange,
  onReset,
}) {
  return (
    <Paper sx={{ p: 2 }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        alignItems={{ xs: "stretch", md: "center" }}
      >
        <TextField
          label="Tìm kiếm đơn hàng"
          placeholder="Mã đơn, khách hàng, email..."
          value={keyword}
          onChange={(event) => onKeywordChange(event.target.value)}
          fullWidth
        />

        <FormControl sx={{ minWidth: { xs: "100%", md: 220 } }}>
          <InputLabel>Trạng thái</InputLabel>
          <Select
            label="Trạng thái"
            value={status}
            onChange={(event) => onStatusChange(event.target.value)}
          >
            <MenuItem value="all">Tất cả</MenuItem>

            {ORDER_STATUS_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="outlined"
          onClick={onReset}
          sx={{ minWidth: 120, height: 56 }}
        >
          Đặt lại
        </Button>
      </Stack>
    </Paper>
  );
}
