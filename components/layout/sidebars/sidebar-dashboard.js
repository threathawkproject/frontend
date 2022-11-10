import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import { SidebarButton } from "../../buttons/sidebar-button";
import { useRouter } from "next/router";
import {
  DesktopWindowsOutlined,
  Search,
  Layers,
  FormatShapes,
  History,
  LocalOffer,
  Notifications,
  LibraryBooks,
  Settings,
} from "@mui/icons-material";
const menuItems = [
  {
    title: "Home",
    icon: DesktopWindowsOutlined,
    route: "/dashboard",
  },
  {
    title: "Investigate",
    icon: Search,
    route: "/dashboard/investigate",
  },
  {
    title: "Feeds",
    icon: Layers,
    route: "/dashboard/feeds",
  },
  {
    title: "Analyzers",
    icon: FormatShapes,
    route: "/dashboard/analyzers",
  },
  {
    title: "History",
    icon: History,
    route: "/dashboard/history",
  },
  {
    title: "Tags",
    icon: LocalOffer,
    route: "/dashboard/tags",
  },
  {
    title: "Alerts",
    icon: Notifications,
    route: "/dashboard/alerts",
  },
  {
    title: "Guides",
    icon: LibraryBooks,
    route: "/dashboard/guides",
  },
  {
    title: "Settings",
    icon: Settings,
    route: "/dashboard/settings",
  },
];
export const SidebarDashboard = () => {
  const router = useRouter();
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
        <Box
          sx={{
            marginTop: "80px",
            display: "grid",
            gridTemplateColumns: "auto auto",
            rowGap: "30px",
            columnGap: "30px",
          }}
          spacing={{ xs: 2 }}
        >
          {menuItems.map((item, index) => {
            return (
              <Box xs={6} key={index} sx={{ width: 100, height: 100 }}>
                <SidebarButton
                  selected={router.asPath === item.route ? true : false}
                  Icon={item.icon}
                  title={item.title}
                  route={item.route}
                />
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};
