import React from "react";
import DashboardLayout from "../../../components/layout/dashboard-layout";
import {
  Typography,
  Box,
  Card,
  CardHeader,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
export default function Feeds() {
  return (
    <Box
      sx={{
        margin: "45px 45px 0px 50px",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: "700",
        }}
      >
        Feeds
      </Typography>
      <Card sx={{ marginTop: "80px" }}>
        <Box sx={{ minWidth: 400 }}>
          <Table>
            <TableHead sx={{ backgroundColor: " #F6F5FA" }}>
              <TableRow>
                <TableCell>Source</TableCell>
                <TableCell>IOC</TableCell>
                <TableCell align="right">Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Abuse IPDB</TableCell>
                <TableCell>192.168.322.2</TableCell>
                <TableCell align="right">IP Address</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </Card>
    </Box>
  );
}

Feeds.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
