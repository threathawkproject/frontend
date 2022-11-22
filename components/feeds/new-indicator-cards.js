import React from "react";
import { HomeInfoCard } from "../cards/home-info-card";
export const NewIndicatorCards = () => {
  return (
    <div
      style={{
        marginTop: "20px",
        height: "300px",
        width: "300px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "30px 0px",
      }}
    >
      <HomeInfoCard
        title={56}
        subTitle={"NEW INDICATORS"}
        backgroundColor={"#6066F4"}
      />
      <HomeInfoCard
        title={23}
        subTitle={"COLLECTIONS"}
        backgroundColor={"#59C3F3"}
      />
    </div>
  );
};
