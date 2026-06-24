import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Alert, Stack } from "@mui/material";
import { useSnackbar } from "notistack";

import { PageHeader } from "@/components/common/PageHeader";
import { getAdminUsers, updateAdminUserRole } from "@/services/adminUserApi";

import CustomerFilter from "../components/CustomerFilter";
import CustomerTable from "../components/CustomerTable";
import CustomerDetailDialog from "../components/CustomerDetailDialog";

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

export default function AdminCustomersPage() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const [page, setPage] = useState(DEFAULT_PAGE);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);
  const [selectedUser, setSelectedUser] = useState(null);
  const [nextRole, setNextRole] = useState("");

  const usersQuery = useQuery({
    queryKey: ["admin-users", { page, rowsPerPage }],
    queryFn: () =>
      getAdminUsers({
        page,
        size: rowsPerPage,
      }),
  });

  const updateRoleMutation = useMutation({
    mutationFn: ({ id, role }) => updateAdminUserRole(id, role),
    onSuccess: () => {
      enqueueSnackbar("Cập nhật role người dùng thành công", {
        variant: "success",
      });

      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      handleCloseDetail();
    },
    onError: (error) => {
      enqueueSnackbar(getApiErrorMessage(error), { variant: "error" });
    },
  });

  const usersPage = usersQuery.data || {
    content: [],
    totalElements: 0,
    totalPages: 0,
    number: page,
    size: rowsPerPage,
  };

  const handlePageChange = (_, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(Number(event.target.value));
    setPage(DEFAULT_PAGE);
  };

  const handleOpenDetail = (user) => {
    setSelectedUser(user);
    setNextRole(user.role);
  };

  const handleCloseDetail = () => {
    setSelectedUser(null);
    setNextRole("");
  };

  const handleSaveRole = () => {
    if (!selectedUser || nextRole === selectedUser.role) {
      return;
    }

    updateRoleMutation.mutate({
      id: selectedUser.id,
      role: nextRole,
    });
  };

  return (
    <>
      <Stack spacing={2}>
        <PageHeader
          title="Quản lý người dùng"
          description="Quản lý danh sách người dùng theo API backend"
        />

        {usersQuery.isError && (
          <Alert severity="error">{getApiErrorMessage(usersQuery.error)}</Alert>
        )}

        <CustomerFilter />

        <CustomerTable
          users={usersPage.content || []}
          totalElements={usersPage.totalElements || 0}
          page={page}
          rowsPerPage={rowsPerPage}
          loading={usersQuery.isLoading || usersQuery.isFetching}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          onViewDetail={handleOpenDetail}
        />
      </Stack>

      <CustomerDetailDialog
        open={Boolean(selectedUser)}
        user={selectedUser}
        nextRole={nextRole}
        onNextRoleChange={setNextRole}
        onClose={handleCloseDetail}
        onSaveRole={handleSaveRole}
        saving={updateRoleMutation.isPending}
      />
    </>
  );
}
