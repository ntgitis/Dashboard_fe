import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
} from "@mui/material";
import { ORDER_STATUS_OPTIONS } from "../order.constants";

export default function OrderFilter({ status, onStatusChange, onReset }) {
  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        <FormControl sx={{ minWidth: 220 }}>
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

        <Button onClick={onReset} variant="outlined">
          Đặt lại
        </Button>
      </Stack>
    </Paper>
  );
}
