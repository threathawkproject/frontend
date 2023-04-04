import React from "react";
import { Box, Paper } from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Bar Chart",
    },
  },
};
const labels = [
  "IP Addressess",
  "URLs",
  "Emails",
  "Files",
  "Hashes",
  "Domains",
];

export const IOCTypesBarChart = () => {
  const ips = 369
  const urls = 100
  const emails = 240
  const file = 50
  const hash = 69
  const domain = 39
  const data = {
    labels,
    datasets: [
      {
        label: "# IOCs",
        data: [ips, 200, emails, 100, hash, 322],
        backgroundColor: "rgba(47, 105, 254,0.6)",
      },
    ],
  };
  console.log("Data", data);
  return (
    <Bar
      style={{
        height: "500px",
        width: "700px",
      }}
      options={options}
      data={data}
    />
  );
};
