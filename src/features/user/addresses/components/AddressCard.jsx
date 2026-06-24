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

export default function AddressCard({
  address,
  onEdit,
  onDelete,
  onSetDefault,
}) {
  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            spacing={2}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <LocationOnOutlinedIcon color="primary" />

              <Typography fontWeight={700}>{address.label}</Typography>

              {address.default && (
                <Chip label="Mặc định" color="primary" size="small" />
              )}
            </Stack>

            <Stack direction="row" spacing={1}>
              <IconButton size="small" onClick={() => onEdit(address)}>
                <EditOutlinedIcon fontSize="small" />
              </IconButton>

              <IconButton
                size="small"
                color="error"
                onClick={() => onDelete(address)}
              >
                <DeleteOutlineIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Stack>

          <Stack spacing={0.5}>
            <Typography>{address.name}</Typography>
            <Typography color="text.secondary">{address.phone}</Typography>
            <Typography color="text.secondary">{address.line}</Typography>
          </Stack>

          {!address.default && (
            <Button
              variant="outlined"
              size="small"
              onClick={() => onSetDefault(address)}
              sx={{ alignSelf: "flex-start" }}
            >
              Đặt làm mặc định
            </Button>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
