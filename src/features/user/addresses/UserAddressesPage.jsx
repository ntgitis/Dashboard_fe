import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { PageHeader } from "@/components/common/PageHeader";

const addresses = [
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

export default function UserAddressesPage() {
  return (
    <>
      <PageHeader
        title="Địa chỉ giao hàng"
        description="Quản lý các địa chỉ nhận hàng của bạn."
        actions={
          <Button variant="contained" startIcon={<AddIcon />}>
            Thêm địa chỉ
          </Button>
        }
      />

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 2 }}>
        {addresses.map((address) => (
          <Card key={address.id}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                <Stack direction="row" spacing={1.5}>
                  <LocationOnOutlinedIcon color="primary" />
                  <Box>
                    <Typography fontWeight={700}>{address.label}</Typography>
                    {address.default && <Chip label="Mặc định" color="success" size="small" variant="outlined" sx={{ mt: 0.5 }} />}
                  </Box>
                </Stack>

                <Stack direction="row">
                  <IconButton size="small">
                    <EditOutlinedIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" color="error">
                    <DeleteOutlineIcon fontSize="small" />
                  </IconButton>
                </Stack>
              </Stack>

              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" fontWeight={700}>{address.name}</Typography>
                <Typography variant="body2" color="text.secondary">{address.phone}</Typography>
                <Typography variant="body2" color="text.secondary">{address.line}</Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </>
  );
}
