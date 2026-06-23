import { useMemo, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { PageHeader } from "@/components/common/PageHeader";
import { StatusChip } from "@/components/common/StatusChip";
import { products } from "@/mocks";
import { formatVnd } from "@/utils/formatters";

export default function AdminProductsPage() {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [openForm, setOpenForm] = useState(false);

  const categories = useMemo(
    () => Array.from(new Set(products.map((product) => product.category))),
    [],
  );

  const filteredProducts = useMemo(() => {
    const lowerKeyword = keyword.trim().toLowerCase();

    return products.filter((product) => {
      const matchKeyword =
        !lowerKeyword ||
        product.name.toLowerCase().includes(lowerKeyword) ||
        product.sku.toLowerCase().includes(lowerKeyword);
      const matchCategory = category === "all" || product.category === category;
      const matchStatus = status === "all" || product.status === status;

      return matchKeyword && matchCategory && matchStatus;
    });
  }, [keyword, category, status]);

  return (
    <>
      <PageHeader
        title="Quản lý sản phẩm"
        description="Danh sách sản phẩm, tồn kho, trạng thái và giá bán."
        actions={
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenForm(true)}>
            Thêm sản phẩm
          </Button>
        }
      />

      <Card>
        <CardContent>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mb: 2 }}>
            <TextField
              label="Tìm kiếm"
              placeholder="Tên sản phẩm hoặc SKU"
              size="small"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              sx={{ flex: 1 }}
            />

            <FormControl size="small" sx={{ minWidth: 180 }}>
              <InputLabel>Danh mục</InputLabel>
              <Select label="Danh mục" value={category} onChange={(event) => setCategory(event.target.value)}>
                <MenuItem value="all">Tất cả</MenuItem>
                {categories.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 180 }}>
              <InputLabel>Trạng thái</InputLabel>
              <Select label="Trạng thái" value={status} onChange={(event) => setStatus(event.target.value)}>
                <MenuItem value="all">Tất cả</MenuItem>
                <MenuItem value="active">Đang bán</MenuItem>
                <MenuItem value="draft">Nháp</MenuItem>
                <MenuItem value="out">Hết hàng</MenuItem>
              </Select>
            </FormControl>

            <Button variant="outlined" startIcon={<FilterAltOutlinedIcon />}>
              Lọc
            </Button>
          </Stack>

          <Box sx={{ overflowX: "auto" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Sản phẩm</TableCell>
                  <TableCell>SKU</TableCell>
                  <TableCell>Danh mục</TableCell>
                  <TableCell align="right">Giá</TableCell>
                  <TableCell align="right">Tồn kho</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell align="right">Thao tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id} hover>
                    <TableCell>
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Typography sx={{ fontSize: 24 }}>{product.image}</Typography>
                        <Box>
                          <Typography variant="body2" fontWeight={700}>
                            {product.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {product.id}
                          </Typography>
                        </Box>
                      </Stack>
                    </TableCell>
                    <TableCell>{product.sku}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell align="right">{formatVnd(product.price)}</TableCell>
                    <TableCell align="right">{product.stock}</TableCell>
                    <TableCell>
                      <StatusChip status={product.status} />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton size="small" onClick={() => setOpenForm(true)}>
                        <EditOutlinedIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" color="error">
                        <DeleteOutlineIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </CardContent>
      </Card>

      <Dialog open={openForm} onClose={() => setOpenForm(false)} fullWidth maxWidth="sm">
        <DialogTitle>Thông tin sản phẩm</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField label="Tên sản phẩm" fullWidth />
            <TextField label="SKU" fullWidth />
            <TextField label="Danh mục" fullWidth />
            <TextField label="Giá bán" type="number" fullWidth />
            <TextField label="Tồn kho" type="number" fullWidth />
            <FormControl fullWidth>
              <InputLabel>Trạng thái</InputLabel>
              <Select label="Trạng thái" defaultValue="active">
                <MenuItem value="active">Đang bán</MenuItem>
                <MenuItem value="draft">Nháp</MenuItem>
                <MenuItem value="out">Hết hàng</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForm(false)}>Hủy</Button>
          <Button variant="contained" onClick={() => setOpenForm(false)}>
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
