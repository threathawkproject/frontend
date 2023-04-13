import React from "react";
import ReactCountryFlag from "react-country-flag";
import { byCountry } from "country-code-lookup";
import { Box } from "@mui/material";
import Image from "next/image";

const EnrichmentNode = (props) => {
  const { icon, color } = props;
  return (
    <Box
      style={{
        margin: "auto auto",
        height: "35px",
        width: "35px",
        borderRadius: "100%",
        backgroundColor: color || "#77767F",
        border: "3px solid #29E3CD",
      }}
    >
      {icon ? (
        <Image src={`/images/${icon}`} height={33} width={33} alt="" />
      ) : (
        <></>
      )}
    </Box>
  );
};

export default EnrichmentNode;
