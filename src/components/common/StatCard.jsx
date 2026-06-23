import { Avatar, Box, Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

const paletteByTone = {
  primary: "primary.main",
  success: "success.main",
  warning: "warning.main",
  info: "info.main",
  error: "error.main",
  secondary: "secondary.main",
};

export const StatCard = ({
  label,
  value,
  delta,
  trend = "up",
  icon: Icon,
  tone = "primary",
}) => {
  const color = paletteByTone[tone] || paletteByTone.primary;
  const TrendIcon = trend === "up" ? TrendingUpIcon : TrendingDownIcon;

  return (
    <Card>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" spacing={2}>
          <Box>
            <Typography variant="body2" color="text.secondary">
              {label}
            </Typography>
            <Typography variant="h5" sx={{ mt: 1 }}>
              {value}
            </Typography>

            {delta && (
              <Chip
                size="small"
                icon={<TrendIcon fontSize="small" />}
                label={delta}
                color={trend === "up" ? "success" : "error"}
                variant="outlined"
                sx={{ mt: 1.5 }}
              />
            )}
          </Box>

          {Icon && (
            <Avatar
              sx={{
                bgcolor: color,
                width: 44,
                height: 44,
              }}
            >
              <Icon fontSize="small" />
            </Avatar>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};
