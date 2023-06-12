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
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        marginTop={"70px"}
      >
        <Box>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontWeight: "600",
              fontSize: "16px",
              letterSpacing: "0.5px",
              textTransform: "capitalize",
              color: "#77767F",
            }}
          >
            IOCs by Type
          </Typography>
          <Box
            display={"flex"}
            sx={{
              height: "400px",
              width: "600px",
              border: "1px dashed #C1C1C2",
              padding: "10px",
              background: "white",
              border: "2.5px solid rgba(191, 195, 203, 0.25)",
              borderRadius: "15px",
            }}
            justifyContent="center"
          >
            <IOCTypesBarChart />
          </Box>
        </Box>
        <Box>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontWeight: "600",
              fontSize: "16px",
              letterSpacing: "0.5px",
              textTransform: "capitalize",
              color: "#77767F",
            }}
          >
            Targeted Countries
          </Typography>
          <Box
            display={"flex"}
            justifyContent="center"
            sx={{
              height: "400px",
              width: "600px",
              border: "1px dashed #C1C1C2",
              padding: "10px",
              background: "white",
              border: "2.5px solid rgba(191, 195, 203, 0.25)",
              borderRadius: "15px",
            }}
          >
            <MapChart />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
//Layout
DashboardHome.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
