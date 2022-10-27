import React from "react";
import { Box, Typography } from "@mui/material";
import threatHawkLogoWhite from "../../images/threatHawkLogoWhite.svg";
import Image from "next/image";
export const SidebarMain = () => {
  return (
    <Box
      sx={{
        width: "33%",
        height: "100vh",
        background: "#2F69FE",
        borderRight: "1px solid rgba(191, 195, 203, 0.25)",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <Box
        style={{
          marginTop: "280px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Image
          style={{
            display: "block",
            objectFit: "contain",
            width: "185px",
            height: "92px",
          }}
          src={threatHawkLogoWhite}
          alt="Threat Hawk Logo"
        />
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "2rem",
            textTransform: "uppercase",
            color: "#FFFFFF",
            letterSpacing: 4,
            marginTop: 5,
          }}
        >
          threat hawk
        </Typography>
      </Box>
    </Box>
  );
};
