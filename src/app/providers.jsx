// import { CssBaseline, ThemeProvider } from "@mui/material";
// import { BrowserRouter } from "react-router-dom";
// import theme from "@/theme/theme";

// export default function AppProviders({ children }) {
//   return (
//     <BrowserRouter>
//       <ThemeProvider theme={theme}>
//         <CssBaseline />
//         {children}
//       </ThemeProvider>
//     </BrowserRouter>
//   );
// }

import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import theme from "@/theme/theme";
import { queryClient } from "./queryClient";

export default function AppProviders({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider maxSnack={3}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </BrowserRouter>
      </SnackbarProvider>
    </QueryClientProvider>
  );
}
