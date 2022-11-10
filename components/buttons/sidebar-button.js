import React from "react";
import { IconButton, Typography, Box, Stack } from "@mui/material";
import { useRouter } from "next/router";

export const SidebarButton = (props) => {
  const { Icon, title, selected, route, ...other } = props;
  const router = useRouter();
  const handleClick = () => {
    console.log("Clicked");
    router.push(route);
  };
  return (
    <IconButton
      onClick={handleClick}
      sx={{
        display: "flex",
        fledDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "4px",
        width: 100,
        height: 100,
        backgroundColor: selected ? "#2F69FE" : "#FFFFFF",
        borderRadius: "15px",
        color: "white",
        fontWeight: 600,
        color: selected ? "#FFFFFF" : "#A3A2A9",
        "&:hover": {
          backgroundColor: "#2F69FE",
          color: "white",
        },
      }}
    >
      <Stack alignItems={"center"}>
        <Icon />

        <Typography
          sx={{
            marginTop: "10px",
            textTransform: "capitalize",
            fontWeight: 500,
            fontSize: "13px",
            letterSpacing: "0.5px",
          }}
        >
          {title}
        </Typography>
      </Stack>
    </IconButton>
  );
};
