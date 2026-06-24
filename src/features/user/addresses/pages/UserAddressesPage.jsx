// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   Chip,
//   IconButton,
//   Stack,
//   Typography,
// } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
// import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
// import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
// import { PageHeader } from "@/components/common/PageHeader";

// const addresses = [
//   {
//     id: 1,
//     label: "Nhà riêng",
//     name: "Nguyễn An",
//     phone: "0901 234 567",
//     line: "12 Nguyễn Huệ, P. Bến Nghé, Q.1, TP.HCM",
//     default: true,
//   },
//   {
//     id: 2,
//     label: "Văn phòng",
//     name: "Nguyễn An",
//     phone: "0901 234 567",
//     line: "Tầng 8, Bitexco Financial Tower, Q.1, TP.HCM",
//     default: false,
//   },
// ];

// export default function UserAddressesPage() {
//   return (
//     <>
//       <PageHeader
//         title="Địa chỉ giao hàng"
//         description="Quản lý các địa chỉ nhận hàng của bạn."
//         actions={
//           <Button variant="contained" startIcon={<AddIcon />}>
//             Thêm địa chỉ
//           </Button>
//         }
//       />

//       <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 2 }}>
//         {addresses.map((address) => (
//           <Card key={address.id}>
//             <CardContent>
//               <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
//                 <Stack direction="row" spacing={1.5}>
//                   <LocationOnOutlinedIcon color="primary" />
//                   <Box>
//                     <Typography fontWeight={700}>{address.label}</Typography>
//                     {address.default && <Chip label="Mặc định" color="success" size="small" variant="outlined" sx={{ mt: 0.5 }} />}
//                   </Box>
//                 </Stack>

//                 <Stack direction="row">
//                   <IconButton size="small">
//                     <EditOutlinedIcon fontSize="small" />
//                   </IconButton>
//                   <IconButton size="small" color="error">
//                     <DeleteOutlineIcon fontSize="small" />
//                   </IconButton>
//                 </Stack>
//               </Stack>

//               <Box sx={{ mt: 2 }}>
//                 <Typography variant="body2" fontWeight={700}>{address.name}</Typography>
//                 <Typography variant="body2" color="text.secondary">{address.phone}</Typography>
//                 <Typography variant="body2" color="text.secondary">{address.line}</Typography>
//               </Box>
//             </CardContent>
//           </Card>
//         ))}
//       </Box>
//     </>
//   );
// }
import { useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useSnackbar } from "notistack";
import { PageHeader } from "@/components/common/PageHeader";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import AddressCard from "../components/AddressCard";
import AddressFormDialog from "../components/AddressFormDialog";

const initialAddresses = [
  {
    id: 1,
    label: "Nhà riêng",
    name: "Nguyễn An",
    phone: "0901 234 567",
    line: "12 Nguyễn Huệ, P. Bến Nghé, Q.1, TP.HCM",
    default: true,
  },
  {
    id: 2,
    label: "Văn phòng",
    name: "Nguyễn An",
    phone: "0901 234 567",
    line: "Tầng 8, Bitexco Financial Tower, Q.1, TP.HCM",
    default: false,
  },
];

function createAddressId(addresses) {
  return Math.max(0, ...addresses.map((address) => address.id)) + 1;
}

export default function UserAddressesPage() {
  const { enqueueSnackbar } = useSnackbar();

  const [items, setItems] = useState(initialAddresses);
  const [openForm, setOpenForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [deletingAddress, setDeletingAddress] = useState(null);

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
    setItems((prev) => {
      const isEditing = Boolean(payload.id);

      const normalizedAddress = {
        ...payload,
        id: isEditing ? payload.id : createAddressId(prev),
        default: prev.length === 0 ? true : Boolean(payload.default),
      };

      if (normalizedAddress.default) {
        const nextItems = isEditing
          ? prev.map((address) =>
              address.id === normalizedAddress.id
                ? normalizedAddress
                : { ...address, default: false },
            )
          : [
              ...prev.map((address) => ({ ...address, default: false })),
              normalizedAddress,
            ];

        return nextItems;
      }

      if (isEditing) {
        return prev.map((address) =>
          address.id === normalizedAddress.id ? normalizedAddress : address,
        );
      }

      return [...prev, normalizedAddress];
    });

    enqueueSnackbar(
      editingAddress
        ? "Đã cập nhật địa chỉ thành công"
        : "Đã thêm địa chỉ thành công",
      {
        variant: "success",
      },
    );

    handleCloseForm();
  };

  const handleSetDefault = (address) => {
    setItems((prev) =>
      prev.map((item) => ({
        ...item,
        default: item.id === address.id,
      })),
    );

    enqueueSnackbar("Đã đặt địa chỉ mặc định", {
      variant: "success",
    });
  };

  const handleConfirmDelete = () => {
    if (!deletingAddress) return;

    setItems((prev) => {
      const nextItems = prev.filter(
        (address) => address.id !== deletingAddress.id,
      );

      if (deletingAddress.default && nextItems.length > 0) {
        return nextItems.map((address, index) => ({
          ...address,
          default: index === 0,
        }));
      }

      return nextItems;
    });

    enqueueSnackbar("Đã xoá địa chỉ", {
      variant: "info",
    });

    setDeletingAddress(null);
  };

  return (
    <>
      <PageHeader
        title="Địa chỉ"
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

      {items.length === 0 ? (
        <Stack
          spacing={1}
          sx={{
            py: 8,
            textAlign: "center",
            bgcolor: "background.paper",
            borderRadius: 2,
          }}
        >
          <Typography fontWeight={700}>
            Bạn chưa có địa chỉ giao hàng
          </Typography>
          <Typography color="text.secondary" variant="body2">
            Hãy thêm địa chỉ để đặt hàng nhanh hơn.
          </Typography>
        </Stack>
      ) : (
        <Stack spacing={2}>
          {items.map((address) => (
            <AddressCard
              key={address.id}
              address={address}
              onEdit={handleOpenEdit}
              onDelete={setDeletingAddress}
              onSetDefault={handleSetDefault}
            />
          ))}
        </Stack>
      )}

      <AddressFormDialog
        open={openForm}
        editingAddress={editingAddress}
        onClose={handleCloseForm}
        onSubmit={handleSubmitAddress}
      />

      <ConfirmDialog
        open={Boolean(deletingAddress)}
        title="Xoá địa chỉ"
        message={`Bạn có chắc muốn xoá địa chỉ "${deletingAddress?.label}" không?`}
        confirmText="Xoá"
        cancelText="Huỷ"
        onClose={() => setDeletingAddress(null)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
