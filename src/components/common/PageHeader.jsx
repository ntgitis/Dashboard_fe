import { Box, Stack, Typography } from "@mui/material";

export const PageHeader = ({ title, description, actions }) => (
  <Stack
    direction={{ xs: "column", sm: "row" }}
    spacing={2}
    alignItems={{ xs: "flex-start", sm: "center" }}
    justifyContent="space-between"
    sx={{ mb: 3 }}
  >
    <Box>
      <Typography variant="h5" component="h1">
        {title}
      </Typography>

      {description && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {description}
        </Typography>
      )}
    </Box>

    {actions && (
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        {actions}
      </Stack>
    )}
  </Stack>
);
