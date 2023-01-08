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
import { getDummyData } from "../../pages/dashboard/feeds/dummyData";

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
  const dummyData = getDummyData();

  const ips = dummyData.filter((data) => data.type === "IP")?.length;
  const urls = dummyData.filter((data) => data.type === "url")?.length;
  const emails = dummyData.filter((data) => data.type === "email")?.length;
  const file = dummyData.filter((data) => data.type === "file")?.length;
  const hash = dummyData.filter((data) => data.type === "hash")?.length;
  const domain = dummyData.filter((data) => data.type === "domain")?.length;
  const data = {
    labels,
    datasets: [
      {
        label: "# IOCs",
        data: [ips, urls, emails, file, hash, domain],
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
