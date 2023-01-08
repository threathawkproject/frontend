import React from "react";
import DashboardLayout from "../../components/layout/dashboard-layout";
import { HomeInfoCard } from "../../components/cards/home-info-card";
import { Box, Typography } from "@mui/material";
import MapChart from "../../components/maps/MapChart";
import { IOCTypesBarChart } from "../../components/charts/iocTypesBarChart";
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
          title={14}
          subTitle={"Observables Scanned"}
          backgroundColor={"#59C3F3"}
        />
        <HomeInfoCard
          title={5302}
          subTitle={"New indicators"}
          backgroundColor={"#AFE7FB"}
        />
        <HomeInfoCard
          title={0}
          subTitle={"New Alerts"}
          backgroundColor={"#FF7D4C"}
        />
      </Box>
      <Box marginTop="50px">
        <Typography variant="h4" fontWeight={"bold"}>
          IOCs by Type
        </Typography>
        <Box display={"flex"} justifyContent="center">
          <IOCTypesBarChart />
        </Box>
      </Box>
      <Box marginTop="50px">
        <Typography variant="h4" fontWeight={"bold"}>
          IOCs by location
        </Typography>
        <Box display={"flex"} justifyContent="center">
          <MapChart />
        </Box>
      </Box>
    </Box>
  );
}
//Layout
DashboardHome.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
