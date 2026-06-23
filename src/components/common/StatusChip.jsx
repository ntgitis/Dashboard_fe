import { Chip } from "@mui/material";
import { statusColor, statusLabel } from "@/utils/status";

export const StatusChip = ({ status }) => (
  <Chip
    size="small"
    label={statusLabel[status] || status}
    color={statusColor[status] || "default"}
    variant="outlined"
  />
);
