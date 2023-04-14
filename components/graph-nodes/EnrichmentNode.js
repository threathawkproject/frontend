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
        backgroundColor: "#2F69FE",
      }}
    >
      {icon ? (
        <Image src={`/images/${icon}`} height={35} width={35} alt="" />
      ) : (
        <></>
      )}
    </Box>
  );
};

export default EnrichmentNode;
