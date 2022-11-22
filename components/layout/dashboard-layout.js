import { SidebarDashboard } from "./sidebars/sidebar-dashboard";
import { Box } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import baseTheme from "../theme/base-theme";
import { Toaster } from "react-hot-toast";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
const queryClient = new QueryClient();
export default function DashboardLayout({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={baseTheme}>
        <Toaster />
        <Box
          sx={{
            display: "flex",
          }}
        >
          <SidebarDashboard />
          <Box
            sx={{
              flexGrow: "100",
            }}
          >
            {children}
          </Box>
        </Box>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
