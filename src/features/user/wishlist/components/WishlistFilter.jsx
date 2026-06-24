import { Button, Paper, Stack, TextField } from "@mui/material";

export default function WishlistFilter({ keyword, onKeywordChange, onReset }) {
  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        <TextField
          label="Tìm kiếm sản phẩm yêu thích"
          placeholder="Nhập tên sản phẩm"
          value={keyword}
          onChange={(event) => onKeywordChange(event.target.value)}
          fullWidth
        />

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
