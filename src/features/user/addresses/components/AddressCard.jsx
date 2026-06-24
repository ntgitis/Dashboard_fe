import {
  Button,
  Card,
  CardContent,
  Chip,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

function getFullAddress(address) {
  return [address.street, address.city, address.province, address.postalCode]
    .filter(Boolean)
    .join(", ");
}

export default function AddressCard({
  address,
  onEdit,
  onDelete,
  onSetDefault,
}) {
  return (
    <Card>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" spacing={2}>
          <Stack direction="row" spacing={1.5}>
            <LocationOnOutlinedIcon color="primary" />

            <Stack spacing={0.75}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography fontWeight={700}>
                  {address.label || "Địa chỉ"}
                </Typography>

                {address.isDefault && (
                  <Chip label="Mặc định" color="primary" size="small" />
                )}
              </Stack>

              <Typography color="text.secondary">
                {getFullAddress(address) || "-"}
              </Typography>
            </Stack>
          </Stack>

          <Stack direction="row" spacing={1}>
            <IconButton onClick={() => onEdit(address)}>
              <EditOutlinedIcon />
            </IconButton>

            <IconButton color="error" onClick={() => onDelete(address)}>
              <DeleteOutlineIcon />
            </IconButton>
          </Stack>
        </Stack>

        {!address.isDefault && (
          <Button
            size="small"
            onClick={() => onSetDefault(address)}
            sx={{ mt: 2 }}
          >
            Đặt làm mặc định
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
