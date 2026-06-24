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
  categoryId,
  active,
  categories = [],
  onKeywordChange,
  onCategoryChange,
  onActiveChange,
  onReset,
}) {
  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={4}>
          <TextField
            label="Tìm kiếm sản phẩm"
            value={keyword}
            onChange={(event) => onKeywordChange(event.target.value)}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
            <InputLabel>Danh mục</InputLabel>
            <Select
              label="Danh mục"
              value={categoryId}
              onChange={(event) => onCategoryChange(event.target.value)}
            >
              <MenuItem value="all">Tất cả</MenuItem>

              {categories.map((category) => (
                <MenuItem key={category.id} value={String(category.id)}>
                  {category.name}
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
              value={active}
              onChange={(event) => onActiveChange(event.target.value)}
            >
              <MenuItem value="all">Tất cả</MenuItem>
              <MenuItem value="true">Đang bán</MenuItem>
              <MenuItem value="false">Ngừng bán</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={3}>
          <Button onClick={onReset} fullWidth variant="outlined">
            Đặt lại
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
