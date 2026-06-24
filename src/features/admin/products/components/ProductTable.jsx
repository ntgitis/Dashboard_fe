import {
  Box,
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function formatPrice(price) {
  const value = Number(price || 0);
  return `${value.toLocaleString("vi-VN")}đ`;
}

function getActiveLabel(active) {
  return active ? "Đang bán" : "Ngừng bán";
}

function getActiveColor(active) {
  return active ? "success" : "default";
}

export default function ProductTable({
  products = [],
  totalElements = 0,
  page,
  rowsPerPage,
  loading = false,
  onPageChange,
  onRowsPerPageChange,
  onEdit,
  onDelete,
}) {
  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã</TableCell>
              <TableCell>Sản phẩm</TableCell>
              <TableCell>SKU</TableCell>
              <TableCell>Danh mục</TableCell>
              <TableCell>Giá</TableCell>
              <TableCell>Tồn kho</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell align="right">Hành động</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8}>
                  <Box py={3} textAlign="center">
                    <Typography color="text.secondary">
                      Đang tải sản phẩm...
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8}>
                  <Box py={3} textAlign="center">
                    <Typography color="text.secondary">
                      Không có sản phẩm phù hợp
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              products.map((product) => (
                <TableRow key={product.id} hover>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>
                    <Typography fontWeight={600}>{product.name}</Typography>
                    {product.description && (
                      <Typography variant="body2" color="text.secondary">
                        {product.description}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>{product.sku || "-"}</TableCell>
                  <TableCell>{product.categoryName || "-"}</TableCell>
                  <TableCell>{formatPrice(product.price)}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <Chip
                      label={getActiveLabel(product.active)}
                      color={getActiveColor(product.active)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => onEdit(product)}>
                      <EditIcon />
                    </IconButton>

                    <IconButton color="error" onClick={() => onDelete(product)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={totalElements}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        rowsPerPageOptions={[5, 10, 20, 50]}
        labelRowsPerPage="Số dòng mỗi trang"
      />
    </Paper>
  );
}
