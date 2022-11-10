import React from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
export const HomeInfoCard = (props) => {
  const { title, subTitle, backgroundColor, route, ...other } = props;
  return (
    <Box
      sx={{
        height: "104px",
        width: "300px",
        backgroundColor: backgroundColor,
        borderRadius: "15px",
        padding: "20px 25px",
        color: "#FFFFFF",
      }}
    >
      <Stack>
        <Box>
          <Typography
            sx={{
              fontSize: "40px",
              fontWeight: "500",
              lineHeight: "1",
            }}
          >
            {title}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "white",
          }}
        >
          <Typography
            sx={
              {
                //   fontSize: "40px",
                //   fontWeight: "500",
              }
            }
          >
            {subTitle}
          </Typography>
          <IconButton sx={{ color: "#FFFFFF" }}>
            <ArrowForwardIcon fontSize="small" />
          </IconButton>
        </Box>
      </Stack>
    </Box>
  );
};
