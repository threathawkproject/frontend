import React from "react";
import { Box, Typography } from "@mui/material";
import { Pie } from "react-chartjs-2";

import { Chart, ArcElement } from "chart.js";

Chart.register(ArcElement);

const colors = [
  "#59C3F3",
  "#6066F4",
  "#AFE7FB",
  "#29E3CD",
  "#B85B3F",
  "#303481",
  "#BA69DE",
  "#F3558E",
  "#263859",
];
export const SourcePieChart = () => {
  const sourcesList = [
    "AbuseIPDB",
    "Darklist",
    "Bortvirj",
    "MalwareBazaar",
    "URLHaus",
  ];

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
        Indicators by Source
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
          {sourcesList.map((analyzer, index) => {
            return (
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    backgroundColor: colors[index],
                    height: "5px",
                    width: "20px",
                    borderRadius: "15px",
                    marginRight: "5px",
                  }}
                ></div>
                {analyzer}
              </div>
            );
          })}
        </div>
        <Pie
          data={{
            labels: sourcesList,

            datasets: [
              {
                label: "IOC Classifications",
                data: [230, 300, 100, 400, 230],
                backgroundColor: colors,
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
