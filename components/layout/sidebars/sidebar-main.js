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
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: "240px",
          width: "240px",
          backgroundColor: "#487CFE",
          borderRadius: "100%",
          position: "absolute",
          left: "70%",
          top: "-118px",
        }}
      />
      <div
        style={{
          height: "75px",
          width: "75px",
          backgroundColor: "#487CFE",
          borderRadius: "100%",
          position: "absolute",
          left: "15%",
          top: "70px",
        }}
      />
      <div
        style={{
          height: "113px",
          width: "113px",
          backgroundColor: "#487CFE",
          borderRadius: "100%",
          position: "absolute",
          left: "15%",
          top: "60%",
        }}
      />
      <div
        style={{
          height: "50px",
          width: "50px",
          backgroundColor: "#487CFE",
          borderRadius: "100%",
          position: "absolute",
          left: "50%",
          top: "70%",
        }}
      />
      <div
        style={{
          height: "330px",
          width: "330px",
          backgroundColor: "#487CFE",
          borderRadius: "100%",
          position: "absolute",
          left: "-20%",
          top: "80%",
        }}
      />
      <div
        style={{
          height: "235px",
          width: "235px",
          backgroundColor: "#487CFE",
          borderRadius: "100%",
          position: "absolute",
          left: "80%",
          top: "60%",
        }}
      />
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
