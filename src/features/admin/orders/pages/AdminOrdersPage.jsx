import { useMemo, useState } from "react";
import { Stack } from "@mui/material";
import { PageHeader } from "@/components/common/PageHeader";
import { orders as orderMocks } from "@/mocks";
import OrderFilter from "../components/OrderFilter";
import OrderTable from "../components/OrderTable";
import OrderDetailDialog from "../components/OrderDetailDialog";

const DEFAULT_PAGE = 0;
const DEFAULT_ROWS_PER_PAGE = 10;

export default function AdminOrdersPage() {
  const [items, setItems] = useState(orderMocks);
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("all");

  const [page, setPage] = useState(DEFAULT_PAGE);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [nextStatus, setNextStatus] = useState("");

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

  const handleOpenDetail = (order) => {
    setSelectedOrder(order);
    setNextStatus(order.status);
  };

  const handleCloseDetail = () => {
    setSelectedOrder(null);
    setNextStatus("");
  };

  const handleSaveStatus = () => {
    if (!selectedOrder || nextStatus === selectedOrder.status) {
      return;
    }

    setItems((prev) =>
      prev.map((order) =>
        order.id === selectedOrder.id
          ? {
              ...order,
              status: nextStatus,
            }
          : order,
      ),
    );

    handleCloseDetail();
  };

  return (
    <>
      <PageHeader
        title="Quản lý đơn hàng"
        description="Theo dõi đơn hàng, trạng thái xử lý và giá trị thanh toán."
      />

      <Stack spacing={3}>
        <OrderFilter
          keyword={keyword}
          status={status}
          onKeywordChange={handleKeywordChange}
          onStatusChange={handleStatusChange}
          onReset={handleResetFilter}
        />

        <OrderTable
          orders={filteredOrders}
          page={currentPage}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          onViewDetail={handleOpenDetail}
        />
      </Stack>

      <OrderDetailDialog
        open={Boolean(selectedOrder)}
        order={selectedOrder}
        nextStatus={nextStatus}
        onNextStatusChange={setNextStatus}
        onClose={handleCloseDetail}
        onSave={handleSaveStatus}
      />
    </>
  );
}
