import React from "react";
import DashboardLayout from "../../../components/layout/dashboard-layout";
import {
  Typography,
  Box,
  Card,
  CardHeader,
  TablePagination,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
  Paper,
} from "@mui/material";
import { ClassificationPieChart } from "../../../components/feeds/classification-pie-chart";
import { NewIndicatorCards } from "../../../components/feeds/new-indicator-cards";
import { SourcePieChart } from "../../../components/feeds/source-pie-chart";
import { useState } from "react";
import { getDummyData } from "./dummyData";
import { useRouter } from "next/router";
const dummyData = getDummyData();
export default function Feeds() {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box
      sx={{
        margin: "45px 45px 0px 50px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto auto",
        }}
      >
        <ClassificationPieChart />
        <NewIndicatorCards />
        <SourcePieChart />
      </div>
      <Card sx={{ marginTop: "80px" }}>
        <Paper sx={{ minWidth: 400, maxHeight: "430px", overflowY: "scroll" }}>
          <Table
            sx={{
              height: "max-content",
            }}
            stickyHeader
          >
            <TableHead
              sx={{
                backgroundColor: " #F6F5FA",
              }}
            >
              <TableRow>
                <TableCell>Source</TableCell>
                <TableCell>IOC</TableCell>
                <TableCell align="right">Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dummyData.map((data) => {
                return (
                  <TableRow
                    sx={{
                      "&:hover": {
                        cursor: "pointer",
                        textDecoration: "underline",
                      },
                    }}
                    onClick={() => {
                      router.push("investigate/" + data.ioc);
                    }}
                  >
                    <TableCell>{data.sources[0]}</TableCell>
                    <TableCell>{data.ioc}</TableCell>
                    <TableCell align="right">{data.type}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            <TableFooter
              sx={{
                bottom: 0, // <-- KEY
                zIndex: 2,
                position: "sticky",
                width: "100%",
                backgroundColor: "#F6F5FA",
              }}
            >
              {/* <TableRow
                sx={{
                  width: "100%",
                }}
              >
                <TablePagination
                  rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  count={30}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableRow> */}
            </TableFooter>
          </Table>
        </Paper>
      </Card>
    </Box>
  );
}

Feeds.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
