import React from "react";
import { Box, Typography } from "@mui/material";
import { Pie } from "react-chartjs-2";

import {
  Chart,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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
          height: "400px",
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
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                backgroundColor: "#FF7D4C",
                height: "5px",
                width: "20px",
                borderRadius: "15px",
                marginRight: "5px",
              }}
            ></div>
            Email
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                backgroundColor: "#adadad",
                height: "5px",
                width: "20px",
                borderRadius: "15px",
                marginRight: "5px",
              }}
            ></div>
            File
          </div>
        </div>
        <Pie
          data={{
            labels: ["Hash", "Domain", "URL", "IP", "Email", "File"],

            datasets: [
              {
                label: "IOC Classifications",
                data: [383, 322, 200, 368, 20, 100],
                backgroundColor: [
                  "#59C3F3",
                  "#6066F4",
                  "#AFE7FB",
                  "#29E3CD",
                  "#FF7D4C",
                  "#adadad",
                ],
                hoverOffset: 4,
              },
            ],
          }}
          options={{
            radius: "80%",
            plugins: {
              legend: {
                display: false,
              },
            },
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
