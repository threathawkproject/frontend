import React from "react";
import { Box, Typography } from "@mui/material";
import { Pie } from "react-chartjs-2";

import { Chart, ArcElement } from "chart.js";

Chart.register(ArcElement);
export const ClassificationPieChart = () => {
  return (
    <Box>
      <Typography
        sx={{
          color: "#77767F",
          fontWeight: "600",
          fontSize: "16px",
          marginBottom: "5px",
        }}
      >
        Indicators by Classification
      </Typography>
      <div
        style={{
          width: "300px",
          height: "300px",
          border: "2.5px solid rgba(191, 195, 203, 0.25)",
          borderRadius: "15px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 0px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto auto",
            columnGap: "30px",
            color: "#A3A2A9",
            fontWeight: "500",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                backgroundColor: "#59C3F3",
                height: "5px",
                width: "20px",
                borderRadius: "15px",
                marginRight: "5px",
              }}
            ></div>
            Hash
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                backgroundColor: "#6066F4",
                height: "5px",
                width: "20px",
                borderRadius: "15px",
                marginRight: "5px",
              }}
            ></div>
            Domain
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                backgroundColor: "#AFE7FB",
                height: "5px",
                width: "20px",
                borderRadius: "15px",
                marginRight: "5px",
              }}
            ></div>
            IP
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                backgroundColor: "#29E3CD",
                height: "5px",
                width: "20px",
                borderRadius: "15px",
                marginRight: "5px",
              }}
            ></div>
            URL
          </div>
        </div>
        <Pie
          data={{
            labels: ["Hash", "Domain", "URL", "IP"],

            datasets: [
              {
                label: "IOC Classifications",
                data: [250, 300, 50, 100],
                backgroundColor: ["#59C3F3", "#6066F4", "#AFE7FB", "#29E3CD"],
                hoverOffset: 4,
              },
            ],
          }}
          options={{
            radius: "80%",
          }}
          //   style={{
          //     height: "200px",
          //     width: "200px",
          //   }}
        />
      </div>
    </Box>
  );
};
