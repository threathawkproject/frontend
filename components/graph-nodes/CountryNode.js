import React from "react";
import ReactCountryFlag from "react-country-flag";

const CountryNode = ({ countryCode }) => {
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
      <ReactCountryFlag className="emojiFlag" countryCode={countryCode} />
    </div>
  );
};

export default CountryNode;
