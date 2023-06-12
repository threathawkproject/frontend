import React from "react";
import ReactCountryFlag from "react-country-flag";
import { byCountry } from "country-code-lookup";
import { Box } from "@mui/material";
import Image from "next/image";

const EnrichmentNode = (props) => {
  const { icon, color, muiIcon } = props;
  return (
    <Box
      style={{
        margin: "auto auto",
        height: "35px",
        width: "35px",
        borderRadius: "100%",
        backgroundColor: color || "#2F69FE",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {icon ? (
        <Image src={`/images/${icon}`} height={35} width={35} alt="" />
      ) : muiIcon ? (
        muiIcon
      ) : (
        <></>
      )}
    </Box>
  );
};

export default EnrichmentNode;
