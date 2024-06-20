import React, { useEffect } from "react";
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
  TextField,
  IconButton,
  Paper,
  InputAdornment,
  Stack,
  Pagination,
} from "@mui/material";
import axios from "axios";
import { ClassificationPieChart } from "../../../components/feeds/classification-pie-chart";
import { NewIndicatorCards } from "../../../components/feeds/new-indicator-cards";
import { SourcePieChart } from "../../../components/feeds/source-pie-chart";
import { useState } from "react";
import { useRouter } from "next/router";
import { Search, DiamondOutlined } from "@mui/icons-material";
// const iocs = getDummyData();
export default function Feeds() {
  const router = useRouter();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [count, setCount] = useState(1);
  const [search, setSearch] = useState("");
  const [iocs, setIocs] = useState([]);

  const handleChangePage = (event, newPage) => {
    fetchIOCs(newPage);
  };
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const fetchIOCs = async (page = 1) => {
    try {
      const response = await axios.get(
        `http://localhost:8004/api/ioc_feeds?page=${page}`
      );
      console.log("IOCS", response.data);
      setIocs(response.data.results);
      setCount(Math.ceil(response.data.count / 10));
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchIOCs();
  }, []);

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
      <Card sx={{ margin: "80px 0px" }}>
        <Typography
          sx={{
            margin: "20px 10px",
            color: "#A3A2A9",
            fontWeight: "bold",
          }}
          variant="h6"
        >
          IOC Feeds
        </Typography>
        <Box sx={{ minWidth: 400, maxHeight: "700px" }}>
          <Box sx={{ margin: "5px 20px" }}>
            {/* <TextField
              label="Search IOC"
              name="search"
              type="text"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            /> */}
          </Box>
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
                <TableCell
                  sx={{
                    color: "#A3A2A9",
                    fontWeight: "bold",
                  }}
                >
                  Source
                </TableCell>
                <TableCell
                  sx={{
                    color: "#A3A2A9",
                    fontWeight: "bold",
                  }}
                >
                  IOC
                </TableCell>
                <TableCell
                  sx={{
                    color: "#A3A2A9",
                    fontWeight: "bold",
                  }}
                >
                  Type
                </TableCell>
                <TableCell
                  sx={{
                    color: "#A3A2A9",
                    fontWeight: "bold",
                  }}
                  align="right"
                >
                  Last Seen
                </TableCell>
                <TableCell
                  sx={{
                    color: "#A3A2A9",
                    fontWeight: "bold",
                  }}
                  align="right"
                >
                  Enrich
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {iocs?.map((data, index) => {
                let d = new Date(data.updated_timestamp);
                const date = `${d.getDay()}/${d.getMonth()}/${d.getFullYear()}`;

                return (
                  <TableRow
                    key={index}
                    sx={{
                      "&:hover": {
                        cursor: "pointer",
                        textDecoration: "underline",
                      },
                    }}
                  >
                    <TableCell>{data.sources[0]}</TableCell>
                    <TableCell>{data.ioc}</TableCell>
                    <TableCell>{data.type}</TableCell>
                    <TableCell align="right">{date}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        onClick={() => {
                          router.push("enrich/" + encodeURIComponent(data.ioc));
                        }}
                      >
                        <DiamondOutlined fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            {/* <TableFooter
              sx={{
                bottom: 0, // <-- KEY
                zIndex: 2,
                position: "sticky",
                width: "100%",
                backgroundColor: "#F6F5FA",
              }}
            ></TableFooter> */}
          </Table>
        </Box>
        <Stack
          spacing={1}
          marginTop={3}
          marginBottom={3}
          alignItems="center"
          justifyContent={"center"}
        >
          <Pagination
            count={count}
            onChange={handleChangePage}
            shape="rounded"
          />
          <TextField
            size="small"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleChangePage(e, e.target.value);
              }
            }}
            sx={{
              width: "50px",
            }}
            label="P#"
          />
        </Stack>
      </Card>
    </Box>
  );
}

Feeds.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
