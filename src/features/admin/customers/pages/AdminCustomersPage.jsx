import { useMemo, useState } from "react";
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

// Vì backend chưa có search/filter users,
// FE lấy số lượng lớn rồi filter/paginate ở client.
const FETCH_USERS_SIZE = 1000;

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

function matchKeyword(user, keyword) {
  const normalizedKeyword = normalizeText(keyword);

  if (!normalizedKeyword) {
    return true;
  }

  const searchableFields = [user.id, user.fullName, user.email, user.phone];

  return searchableFields.some((field) =>
    normalizeText(field).includes(normalizedKeyword),
  );
}

function matchRole(user, role) {
  if (!role || role === "all") {
    return true;
  }

  return user.role === role;
}

export default function AdminCustomersPage() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const [keyword, setKeyword] = useState("");
  const [role, setRole] = useState("all");

  const [page, setPage] = useState(DEFAULT_PAGE);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);

  const [selectedUser, setSelectedUser] = useState(null);
  const [nextRole, setNextRole] = useState("");

  const usersQuery = useQuery({
    queryKey: ["admin-users"],
    queryFn: () =>
      getAdminUsers({
        page: 0,
        size: FETCH_USERS_SIZE,
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

  const users = usersQuery.data?.content || [];

  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) => matchKeyword(user, keyword) && matchRole(user, role),
    );
  }, [users, keyword, role]);

  const paginatedUsers = useMemo(() => {
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    return filteredUsers.slice(startIndex, endIndex);
  }, [filteredUsers, page, rowsPerPage]);

  const handleKeywordChange = (value) => {
    setKeyword(value);
    setPage(DEFAULT_PAGE);
  };

  const handleRoleChange = (value) => {
    setRole(value);
    setPage(DEFAULT_PAGE);
  };

  const handleResetFilter = () => {
    setKeyword("");
    setRole("all");
    setPage(DEFAULT_PAGE);
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

        <CustomerFilter
          keyword={keyword}
          role={role}
          onKeywordChange={handleKeywordChange}
          onRoleChange={handleRoleChange}
          onReset={handleResetFilter}
        />

        <CustomerTable
          users={paginatedUsers}
          totalElements={filteredUsers.length}
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
