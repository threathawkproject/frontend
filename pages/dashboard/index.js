import React from "react";
import DashboardLayout from "../../components/layout/dashboard-layout";
import { HomeInfoCard } from "../../components/cards/home-info-card";
import { Box } from "@mui/material";
export default function DashboardHome() {
  return (
    <Box
      sx={{
        margin: "70px 45px 0px 45px",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "auto auto auto",
        }}
      >
        <HomeInfoCard
          title={895}
          subTitle={"Observables Scanned"}
          backgroundColor={"#59C3F3"}
        />
        <HomeInfoCard
          title={56}
          subTitle={"New indicators"}
          backgroundColor={"#AFE7FB"}
        />
        <HomeInfoCard
          title={2}
          subTitle={"New Alerts"}
          backgroundColor={"#FF7D4C"}
        />
      </Box>
    </Box>
  );
}
//Layout
DashboardHome.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
