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

export default function WishlistFilter({
  keyword,
  category,
  categories = [],
  onKeywordChange,
  onCategoryChange,
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
          label="Tìm kiếm sản phẩm"
          placeholder="Tên sản phẩm, SKU..."
          value={keyword}
          onChange={(event) => onKeywordChange(event.target.value)}
          fullWidth
        />

        <FormControl sx={{ minWidth: { xs: "100%", md: 220 } }}>
          <InputLabel>Danh mục</InputLabel>
          <Select
            label="Danh mục"
            value={category}
            onChange={(event) => onCategoryChange(event.target.value)}
          >
            <MenuItem value="all">Tất cả</MenuItem>

            {categories.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
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
