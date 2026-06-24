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
import {
  CUSTOMER_STATUS_OPTIONS,
  CUSTOMER_TIER_OPTIONS,
} from "../customer.constants";

export default function CustomerFilter({
  keyword,
  status,
  tier,
  onKeywordChange,
  onStatusChange,
  onTierChange,
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
          label="Tìm kiếm khách hàng"
          placeholder="Mã KH, tên, email, số điện thoại..."
          value={keyword}
          onChange={(event) => onKeywordChange(event.target.value)}
          fullWidth
        />

        <FormControl sx={{ minWidth: { xs: "100%", md: 180 } }}>
          <InputLabel>Trạng thái</InputLabel>
          <Select
            label="Trạng thái"
            value={status}
            onChange={(event) => onStatusChange(event.target.value)}
          >
            <MenuItem value="all">Tất cả</MenuItem>

            {CUSTOMER_STATUS_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: { xs: "100%", md: 180 } }}>
          <InputLabel>Hạng</InputLabel>
          <Select
            label="Hạng"
            value={tier}
            onChange={(event) => onTierChange(event.target.value)}
          >
            <MenuItem value="all">Tất cả</MenuItem>

            {CUSTOMER_TIER_OPTIONS.map((option) => (
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
