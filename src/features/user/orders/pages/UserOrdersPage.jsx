import { useMemo, useState } from "react";
import { Stack } from "@mui/material";
import { useSnackbar } from "notistack";
import { PageHeader } from "@/components/common/PageHeader";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import { orders as orderMocks } from "@/mocks";
import UserOrderFilter from "../components/UserOrderFilter";
import UserOrderTable from "../components/UserOrderTable";
import UserOrderDetailDialog from "../components/UserOrderDetailDialog";

const DEFAULT_PAGE = 0;
const DEFAULT_ROWS_PER_PAGE = 10;

export default function UserOrdersPage() {
  const { enqueueSnackbar } = useSnackbar();

  const [items, setItems] = useState(orderMocks.slice(0, 10));
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("all");

  const [page, setPage] = useState(DEFAULT_PAGE);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [cancelingOrder, setCancelingOrder] = useState(null);

  const filteredOrders = useMemo(() => {
    const lowerKeyword = keyword.trim().toLowerCase();

    return items.filter((order) => {
      const matchKeyword =
        !lowerKeyword ||
        order.id.toLowerCase().includes(lowerKeyword) ||
        order.customer.toLowerCase().includes(lowerKeyword) ||
        order.email.toLowerCase().includes(lowerKeyword);

      const matchStatus = status === "all" || order.status === status;

      return matchKeyword && matchStatus;
    });
  }, [items, keyword, status]);

  const maxPage = Math.max(
    0,
    Math.ceil(filteredOrders.length / rowsPerPage) - 1,
  );

  const currentPage = Math.min(page, maxPage);

  const handleKeywordChange = (value) => {
    setKeyword(value);
    setPage(DEFAULT_PAGE);
  };

  const handleStatusChange = (value) => {
    setStatus(value);
    setPage(DEFAULT_PAGE);
  };

  const handleResetFilter = () => {
    setKeyword("");
    setStatus("all");
    setPage(DEFAULT_PAGE);
  };

  const handlePageChange = (_, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(Number(event.target.value));
    setPage(DEFAULT_PAGE);
  };

  const handleCloseDetail = () => {
    setSelectedOrder(null);
  };

  const handleRequestCancel = (order) => {
    setCancelingOrder(order);
  };

  const handleConfirmCancel = () => {
    if (!cancelingOrder) return;

    setItems((prev) =>
      prev.map((order) =>
        order.id === cancelingOrder.id
          ? {
              ...order,
              status: "CANCELLED",
            }
          : order,
      ),
    );

    setSelectedOrder((prev) =>
      prev && prev.id === cancelingOrder.id
        ? {
            ...prev,
            status: "CANCELLED",
          }
        : prev,
    );

    enqueueSnackbar("Đã huỷ đơn hàng thành công", {
      variant: "success",
    });

    setCancelingOrder(null);
  };

  return (
    <>
      <PageHeader
        title="Đơn hàng của tôi"
        description="Theo dõi trạng thái đơn hàng và quản lý các đơn còn có thể huỷ."
      />

      <Stack spacing={3}>
        <UserOrderFilter
          keyword={keyword}
          status={status}
          onKeywordChange={handleKeywordChange}
          onStatusChange={handleStatusChange}
          onReset={handleResetFilter}
        />

        <UserOrderTable
          orders={filteredOrders}
          page={currentPage}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          onViewDetail={setSelectedOrder}
          onRequestCancel={handleRequestCancel}
        />
      </Stack>

      <UserOrderDetailDialog
        open={Boolean(selectedOrder)}
        order={selectedOrder}
        onClose={handleCloseDetail}
        onRequestCancel={handleRequestCancel}
      />

      <ConfirmDialog
        open={Boolean(cancelingOrder)}
        title="Huỷ đơn hàng"
        message={`Bạn có chắc muốn huỷ đơn "${cancelingOrder?.id}" không?`}
        confirmText="Huỷ đơn"
        cancelText="Đóng"
        onClose={() => setCancelingOrder(null)}
        onConfirm={handleConfirmCancel}
      />
    </>
  );
}
