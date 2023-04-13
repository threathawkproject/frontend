import React from "react";
import ReactCountryFlag from "react-country-flag";
import { byCountry } from "country-code-lookup";

const EnrichmentNode = ({ countryCode }) => {
  return (
    <div
      style={{
        width: "30px",
        height: "30px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black",

        borderRadius: "100%",
      }}
    >
      <ReactCountryFlag className="emojiFlag" countryCode={"PK"} />
    </div>
  );
};

export default EnrichmentNode;
