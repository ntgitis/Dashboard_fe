import { useMemo, useState } from "react";
import { Alert, Stack } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";

import { PageHeader } from "@/components/common/PageHeader";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import { cancelMyOrder, getMyOrders } from "@/services/userOrderApi";

import UserOrderFilter from "../components/UserOrderFilter";
import UserOrderTable from "../components/UserOrderTable";
import UserOrderDetailDialog from "../components/UserOrderDetailDialog";

const DEFAULT_PAGE = 0;
const DEFAULT_ROWS_PER_PAGE = 10;
const FETCH_ORDERS_SIZE = 1000;

function getApiErrorMessage(error) {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    "Có lỗi xảy ra"
  );
}

function normalizeText(value) {
  return String(value ?? "")
    .toLowerCase()
    .trim();
}

function matchKeyword(order, keyword) {
  const normalizedKeyword = normalizeText(keyword);

  if (!normalizedKeyword) {
    return true;
  }

  const fields = [
    order.id,
    order.shippingAddress,
    order.note,
    ...(order.items || []).map((item) => item.productName),
  ];

  return fields.some((field) =>
    normalizeText(field).includes(normalizedKeyword),
  );
}

function matchStatus(order, status) {
  if (!status || status === "all") {
    return true;
  }

  return order.status === status;
}

export default function UserOrdersPage() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [cancelingOrder, setCancelingOrder] = useState(null);

  const ordersQuery = useQuery({
    queryKey: ["user-orders"],
    queryFn: () =>
      getMyOrders({
        page: 0,
        size: FETCH_ORDERS_SIZE,
      }),
  });

  const cancelOrderMutation = useMutation({
    mutationFn: cancelMyOrder,
    onSuccess: () => {
      enqueueSnackbar("Đã huỷ đơn hàng thành công", {
        variant: "success",
      });

      queryClient.invalidateQueries({ queryKey: ["user-orders"] });
      setCancelingOrder(null);
      setSelectedOrder(null);
    },
    onError: (error) => {
      enqueueSnackbar(getApiErrorMessage(error), {
        variant: "error",
      });
    },
  });

  const orders = ordersQuery.data?.content || [];

  const filteredOrders = useMemo(() => {
    return orders.filter(
      (order) => matchKeyword(order, keyword) && matchStatus(order, status),
    );
  }, [orders, keyword, status]);

  const paginatedOrders = useMemo(() => {
    const startIndex = page * rowsPerPage;
    return filteredOrders.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredOrders, page, rowsPerPage]);

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

  const handleConfirmCancel = () => {
    if (!cancelingOrder?.id) {
      return;
    }

    cancelOrderMutation.mutate(cancelingOrder.id);
  };

  return (
    <>
      <Stack spacing={2}>
        <PageHeader title="Đơn hàng của tôi" />

        {ordersQuery.isError && (
          <Alert severity="error">
            {getApiErrorMessage(ordersQuery.error)}
          </Alert>
        )}

        <UserOrderFilter
          keyword={keyword}
          status={status}
          onKeywordChange={handleKeywordChange}
          onStatusChange={handleStatusChange}
          onReset={handleResetFilter}
        />

        <UserOrderTable
          orders={paginatedOrders}
          totalElements={filteredOrders.length}
          page={page}
          rowsPerPage={rowsPerPage}
          loading={ordersQuery.isLoading || ordersQuery.isFetching}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          onViewDetail={setSelectedOrder}
          onRequestCancel={setCancelingOrder}
        />
      </Stack>

      <UserOrderDetailDialog
        open={Boolean(selectedOrder)}
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onRequestCancel={setCancelingOrder}
      />

      <ConfirmDialog
        open={Boolean(cancelingOrder)}
        title="Huỷ đơn hàng"
        message={
          cancelingOrder
            ? `Bạn có chắc muốn huỷ đơn hàng #${cancelingOrder.id}?`
            : ""
        }
        confirmText={cancelOrderMutation.isPending ? "Đang huỷ..." : "Huỷ đơn"}
        cancelText="Đóng"
        onClose={() => setCancelingOrder(null)}
        onConfirm={handleConfirmCancel}
      />
    </>
  );
}
