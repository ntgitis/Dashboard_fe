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

export default function ProductFilter({
  keyword,
  category,
  status,
  categories,
  onKeywordChange,
  onCategoryChange,
  onStatusChange,
  onReset,
}) {
  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Tìm kiếm sản phẩm"
            placeholder="Nhập tên, SKU hoặc mã sản phẩm"
            value={keyword}
            onChange={(e) => onKeywordChange(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
            <InputLabel>Danh mục</InputLabel>
            <Select
              label="Danh mục"
              value={category}
              onChange={(e) => onCategoryChange(e.target.value)}
            >
              <MenuItem value="all">Tất cả</MenuItem>
              {categories.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
            <InputLabel>Trạng thái</InputLabel>
            <Select
              label="Trạng thái"
              value={status}
              onChange={(e) => onStatusChange(e.target.value)}
            >
              <MenuItem value="all">Tất cả</MenuItem>
              <MenuItem value="ACTIVE">Đang bán</MenuItem>
              <MenuItem value="INACTIVE">Ngừng bán</MenuItem>
              <MenuItem value="LOW_STOCK">Sắp hết hàng</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={2}>
          <Button
            fullWidth
            variant="outlined"
            sx={{ height: "100%" }}
            onClick={onReset}
          >
            Đặt lại
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
