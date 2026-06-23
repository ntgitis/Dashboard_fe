import {
  Box,
  Button,
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

function getStatusLabel(status) {
  if (status === "ACTIVE") return "Đang bán";
  if (status === "INACTIVE") return "Ngừng bán";
  if (status === "LOW_STOCK") return "Sắp hết hàng";
  return status;
}

function getStatusColor(status) {
  if (status === "ACTIVE") return "success";
  if (status === "INACTIVE") return "default";
  if (status === "LOW_STOCK") return "warning";
  return "default";
}

export default function ProductTable({
  products,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onEdit,
  onDelete,
}) {
  const visibleProducts = products.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

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
              <TableCell align="right">Giá</TableCell>
              <TableCell align="right">Tồn kho</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell align="right">Hành động</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {visibleProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8}>
                  <Box sx={{ py: 4, textAlign: "center" }}>
                    <Typography color="text.secondary">
                      Không có sản phẩm phù hợp
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              visibleProducts.map((product) => (
                <TableRow key={product.id} hover>
                  <TableCell>{product.id}</TableCell>

                  <TableCell>
                    <Typography fontWeight={600}>{product.name}</Typography>
                  </TableCell>

                  <TableCell>{product.sku}</TableCell>
                  <TableCell>{product.category}</TableCell>

                  <TableCell align="right">
                    {product.price.toLocaleString("vi-VN")}đ
                  </TableCell>

                  <TableCell align="right">{product.stock}</TableCell>

                  <TableCell>
                    <Chip
                      size="small"
                      label={getStatusLabel(product.status)}
                      color={getStatusColor(product.status)}
                    />
                  </TableCell>

                  <TableCell align="right">
                    <IconButton color="primary" onClick={() => onEdit(product)}>
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
        count={products.length}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        labelRowsPerPage="Số dòng mỗi trang"
      />
    </Paper>
  );
}
