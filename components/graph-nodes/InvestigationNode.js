import React from "react";
import { Box } from "@mui/material";
import Image from "next/image";

const InvestigationNode = ({ type }) => {
  return (
    <Box
      sx={{
        margin: "auto auto",
        height: "35px",
        width: "35px",
        borderRadius: "100%",
        backgroundColor: "#59C3F3",
        border: "3px solid #29E3CD",
      }}
    >
      <Image src={`/images/${type}.svg`} height={33} width={33} alt="" />
    </Box>
  );
};

export default InvestigationNode;
