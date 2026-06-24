import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Alert, Stack } from "@mui/material";
import { useSnackbar } from "notistack";

import { PageHeader } from "@/components/common/PageHeader";
import { getAdminOrders, updateAdminOrderStatus } from "@/services/orderApi";

import OrderFilter from "../components/OrderFilter";
import OrderTable from "../components/OrderTable";
import OrderDetailDialog from "../components/OrderDetailDialog";

const DEFAULT_PAGE = 0;
const DEFAULT_ROWS_PER_PAGE = 10;

function getApiErrorMessage(error) {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    "Có lỗi xảy ra"
  );
}

export default function AdminOrdersPage() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [nextStatus, setNextStatus] = useState("");

  const ordersQuery = useQuery({
    queryKey: ["admin-orders", { status, page, rowsPerPage }],
    queryFn: () =>
      getAdminOrders({
        status,
        page,
        size: rowsPerPage,
      }),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }) => updateAdminOrderStatus(id, status),
    onSuccess: () => {
      enqueueSnackbar("Cập nhật trạng thái đơn hàng thành công", {
        variant: "success",
      });

      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
      handleCloseDetail();
    },
    onError: (error) => {
      enqueueSnackbar(getApiErrorMessage(error), { variant: "error" });
    },
  });

  const ordersPage = ordersQuery.data || {
    content: [],
    totalElements: 0,
    totalPages: 0,
    number: page,
    size: rowsPerPage,
  };

  const handleStatusChange = (value) => {
    setStatus(value);
    setPage(DEFAULT_PAGE);
  };

  const handleResetFilter = () => {
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

    updateStatusMutation.mutate({
      id: selectedOrder.id,
      status: nextStatus,
    });
  };

  return (
    <>
      <Stack spacing={2}>
        <PageHeader title="Quản lý đơn hàng" />

        {ordersQuery.isError && (
          <Alert severity="error">
            {getApiErrorMessage(ordersQuery.error)}
          </Alert>
        )}

        <OrderFilter
          status={status}
          onStatusChange={handleStatusChange}
          onReset={handleResetFilter}
        />

        <OrderTable
          orders={ordersPage.content || []}
          totalElements={ordersPage.totalElements || 0}
          page={page}
          rowsPerPage={rowsPerPage}
          loading={ordersQuery.isLoading || ordersQuery.isFetching}
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
        saving={updateStatusMutation.isPending}
      />
    </>
  );
}
