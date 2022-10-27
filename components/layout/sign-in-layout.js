import { SidebarMain } from "./sidebars/sidebar-main";
import { Box } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import baseTheme from "../theme/base-theme";
import { Toaster } from "react-hot-toast";
export default function SignInLayout({ children }) {
  return (
    <ThemeProvider theme={baseTheme}>
      <Toaster />
      <Box
        sx={{
          display: "flex",
        }}
      >
        <SidebarMain />
        <Box
          sx={{
            flexGrow: "100",
          }}
        >
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
