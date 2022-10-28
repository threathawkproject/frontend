import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import { SidebarButton } from "../../buttons/sidebar-button";
import threatHawkLogoWhite from "../../images/threatHawkLogoWhite.svg";
import Image from "next/image";
import DesktopWindowsOutlinedIcon from "@mui/icons-material/DesktopWindowsOutlined";
import { DashboardCustomizeOutlined } from "@mui/icons-material";
const menuItems = [
  {
    title: "Home",
    icon: DesktopWindowsOutlinedIcon,
  },
  {
    title: "Investigate",
    icon: DesktopWindowsOutlinedIcon,
  },
  {
    title: "Feeds",
    icon: DesktopWindowsOutlinedIcon,
  },
  {
    title: "Analyzers",
    icon: DesktopWindowsOutlinedIcon,
  },
  {
    title: "History",
    icon: DesktopWindowsOutlinedIcon,
  },
  {
    title: "Tags",
    icon: DesktopWindowsOutlinedIcon,
  },
  {
    title: "Alerts",
    icon: DesktopWindowsOutlinedIcon,
  },
  {
    title: "Guides",
    icon: DesktopWindowsOutlinedIcon,
  },
  {
    title: "Settings",
    icon: DesktopWindowsOutlinedIcon,
  },
];
export const SidebarDashboard = () => {
  return (
    <Box
      sx={{
        width: "25%",
        height: "100vh",
        background: "#F6F5FA",
        borderRight: "1px solid rgba(191, 195, 203, 0.25)",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <Box>
        <Box
          style={{
            marginTop: "50px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              textTransform: "uppercase",
              fontWeight: 700,
              fontSize: 23,
              letterSpacing: 4,
              color: "#2F69FE",
            }}
          >
            threat hawk
          </Typography>
        </Box>
        <Grid
          container
          sx={{
            marginTop: "80px",
          }}
          spacing={{ xs: 2 }}
        >
          <Grid item xs={6} key={0} sx={{ width: 100, height: 100 }}>
            <SidebarButton Icon={DesktopWindowsOutlinedIcon} title={"Home"} />
          </Grid>
          {/* {menuItems.map((item, index) => {
            return (
              
            );
          })} */}
        </Grid>
      </Box>
    </Box>
  );
};
