import React from "react";
import { IconButton, Typography, Box, Stack } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const SidebarButton = (props) => {
  const { Icon, title, ...other } = props;
  return (
    <IconButton
      style={{
        display: "flex",
        fledDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "4px",
        width: 100,
        height: 100,
        backgroundColor: "#2F69FE",
        borderRadius: "15px",
        color: "white",
        fontWeight: 600,
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
