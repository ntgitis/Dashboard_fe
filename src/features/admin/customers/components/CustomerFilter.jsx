import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import { USER_ROLE_OPTIONS } from "../customer.constants";

export default function CustomerFilter({
  keyword,
  role,
  onKeywordChange,
  onRoleChange,
  onReset,
}) {
  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={6}>
          <TextField
            label="Tìm kiếm người dùng"
            placeholder="Nhập ID, họ tên, email hoặc số điện thoại"
            value={keyword}
            onChange={(event) => onKeywordChange(event.target.value)}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
            <InputLabel>Role</InputLabel>
            <Select
              label="Role"
              value={role}
              onChange={(event) => onRoleChange(event.target.value)}
            >
              <MenuItem value="all">Tất cả</MenuItem>

              {USER_ROLE_OPTIONS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={3}>
          <Button onClick={onReset} variant="outlined" fullWidth>
            Đặt lại
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
