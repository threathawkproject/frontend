import React from "react";
import DashboardLayout from "../../../components/layout/dashboard-layout";

export default function Investigate() {
  return <div>Investigate</div>;
}

Investigate.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
