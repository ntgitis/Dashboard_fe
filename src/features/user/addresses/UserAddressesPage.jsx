import { useState } from "react";
import { Alert, Button, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";

import { PageHeader } from "@/components/common/PageHeader";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import {
  createMyAddress,
  deleteMyAddress,
  getMyAddresses,
  setDefaultAddress,
  updateMyAddress,
} from "@/services/addressApi";

import AddressCard from "./components/AddressCard";
import AddressFormDialog from "./components/AddressFormDialog";

function getApiErrorMessage(error) {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    "Có lỗi xảy ra"
  );
}

export default function UserAddressesPage() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const [openForm, setOpenForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [deletingAddress, setDeletingAddress] = useState(null);

  const addressesQuery = useQuery({
    queryKey: ["user-addresses"],
    queryFn: getMyAddresses,
  });

  const createAddressMutation = useMutation({
    mutationFn: createMyAddress,
    onSuccess: () => {
      enqueueSnackbar("Đã thêm địa chỉ thành công", {
        variant: "success",
      });

      queryClient.invalidateQueries({ queryKey: ["user-addresses"] });
      handleCloseForm();
    },
    onError: (error) => {
      enqueueSnackbar(getApiErrorMessage(error), {
        variant: "error",
      });
    },
  });

  const updateAddressMutation = useMutation({
    mutationFn: ({ id, payload }) => updateMyAddress(id, payload),
    onSuccess: () => {
      enqueueSnackbar("Đã cập nhật địa chỉ thành công", {
        variant: "success",
      });

      queryClient.invalidateQueries({ queryKey: ["user-addresses"] });
      handleCloseForm();
    },
    onError: (error) => {
      enqueueSnackbar(getApiErrorMessage(error), {
        variant: "error",
      });
    },
  });

  const deleteAddressMutation = useMutation({
    mutationFn: deleteMyAddress,
    onSuccess: () => {
      enqueueSnackbar("Đã xoá địa chỉ", {
        variant: "info",
      });

      queryClient.invalidateQueries({ queryKey: ["user-addresses"] });
      setDeletingAddress(null);
    },
    onError: (error) => {
      enqueueSnackbar(getApiErrorMessage(error), {
        variant: "error",
      });
    },
  });

  const setDefaultMutation = useMutation({
    mutationFn: setDefaultAddress,
    onSuccess: () => {
      enqueueSnackbar("Đã đặt địa chỉ mặc định", {
        variant: "success",
      });

      queryClient.invalidateQueries({ queryKey: ["user-addresses"] });
    },
    onError: (error) => {
      enqueueSnackbar(getApiErrorMessage(error), {
        variant: "error",
      });
    },
  });

  const addresses = addressesQuery.data || [];
  const isSubmitting =
    createAddressMutation.isPending || updateAddressMutation.isPending;

  const handleOpenCreate = () => {
    setEditingAddress(null);
    setOpenForm(true);
  };

  const handleOpenEdit = (address) => {
    setEditingAddress(address);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setEditingAddress(null);
  };

  const handleSubmitAddress = (payload) => {
    if (editingAddress?.id) {
      updateAddressMutation.mutate({
        id: editingAddress.id,
        payload,
      });
      return;
    }

    createAddressMutation.mutate(payload);
  };

  const handleConfirmDelete = () => {
    if (!deletingAddress?.id) {
      return;
    }

    deleteAddressMutation.mutate(deletingAddress.id);
  };

  return (
    <>
      <PageHeader
        title="Địa chỉ giao hàng"
        actions={
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenCreate}
          >
            Thêm địa chỉ
          </Button>
        }
      />

      <Stack spacing={2}>
        {addressesQuery.isError && (
          <Alert severity="error">
            {getApiErrorMessage(addressesQuery.error)}
          </Alert>
        )}

        {addressesQuery.isLoading ? (
          <Typography color="text.secondary">Đang tải địa chỉ...</Typography>
        ) : addresses.length === 0 ? (
          <Typography color="text.secondary">
            Bạn chưa có địa chỉ giao hàng. Hãy thêm địa chỉ để đặt hàng nhanh
            hơn.
          </Typography>
        ) : (
          addresses.map((address) => (
            <AddressCard
              key={address.id}
              address={address}
              onEdit={handleOpenEdit}
              onDelete={setDeletingAddress}
              onSetDefault={(item) => setDefaultMutation.mutate(item.id)}
            />
          ))
        )}
      </Stack>

      <AddressFormDialog
        open={openForm}
        editingAddress={editingAddress}
        onClose={handleCloseForm}
        onSubmit={handleSubmitAddress}
        submitting={isSubmitting}
      />

      <ConfirmDialog
        open={Boolean(deletingAddress)}
        title="Xoá địa chỉ"
        message={
          deletingAddress
            ? `Bạn có chắc muốn xoá địa chỉ "${
                deletingAddress.label || deletingAddress.street
              }"?`
            : ""
        }
        confirmText={
          deleteAddressMutation.isPending ? "Đang xoá..." : "Xoá địa chỉ"
        }
        cancelText="Huỷ"
        onClose={() => setDeletingAddress(null)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}