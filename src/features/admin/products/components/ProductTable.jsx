import {
  Avatar,
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
  Tooltip,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ImageNotSupportedOutlinedIcon from "@mui/icons-material/ImageNotSupportedOutlined";

import { formatVnd } from "@/utils/formatters";

function getActiveLabel(active) {
  return active ? "Đang bán" : "Ngừng bán";
}

function getActiveColor(active) {
  return active ? "success" : "default";
}

function formatDateTime(value) {
  if (!value) return "-";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString("vi-VN");
}

export default function ProductTable({
  products = [],
  totalElements = 0,
  page = 0,
  rowsPerPage = 10,
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
              <TableCell>Sản phẩm</TableCell>
              <TableCell>SKU</TableCell>
              <TableCell>Danh mục</TableCell>
              <TableCell>Giá</TableCell>
              <TableCell>Tồn kho</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Ngày tạo</TableCell>
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
                  <TableCell>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                    >
                      <Avatar
                        variant="rounded"
                        src={product.imageUrl || undefined}
                        sx={{ width: 48, height: 48 }}
                      >
                        <ImageNotSupportedOutlinedIcon fontSize="small" />
                      </Avatar>

                      <Box>
                        <Typography fontWeight={700}>
                          {product.name || "-"}
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                          ID: {product.id}
                        </Typography>

                        {product.description && (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              maxWidth: 320,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {product.description}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell>{product.sku || "-"}</TableCell>

                  <TableCell>{product.categoryName || "-"}</TableCell>

                  <TableCell>{formatVnd(product.price || 0)}</TableCell>

                  <TableCell>
                    <Typography
                      fontWeight={700}
                      color={
                        Number(product.stock || 0) === 0
                          ? "error"
                          : Number(product.stock || 0) <= 10
                            ? "warning.main"
                            : "text.primary"
                      }
                    >
                      {product.stock ?? 0}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={getActiveLabel(product.active)}
                      color={getActiveColor(product.active)}
                      size="small"
                    />
                  </TableCell>

                  <TableCell>{formatDateTime(product.createdAt)}</TableCell>

                  <TableCell align="right">
                    <Tooltip title="Sửa sản phẩm">
                      <IconButton onClick={() => onEdit(product)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Xóa sản phẩm">
                      <IconButton
                        color="error"
                        onClick={() => onDelete(product)}
                        disabled={product.active === false}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
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
