import React from "react";
import { Box, Typography } from "@mui/material";
import { Pie } from "react-chartjs-2";

import { Chart, ArcElement } from "chart.js";

Chart.register(ArcElement);
export const SourcePieChart = () => {
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
            Botvirj
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
            America
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
            BlockList
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
            AbuseIPDB
          </div>
        </div>
        <Pie
          data={{
            labels: ["Botvirj", "DarkList", "AbuseIPDB", "BlockList"],

            datasets: [
              {
                label: "IOC Classifications",
                data: [230, 300, 100, 400],
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
