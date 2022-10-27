import React from "react";
import DashboardLayout from "../../components/layout/dashboard-layout";

export default function DashboardHome() {
  return <div>Home</div>;
}

DashboardHome.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
