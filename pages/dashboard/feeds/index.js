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
  Paper,
  InputAdornment,
  Stack,
  Pagination
} from "@mui/material";
import axios from "axios";
import { ClassificationPieChart } from "../../../components/feeds/classification-pie-chart";
import { NewIndicatorCards } from "../../../components/feeds/new-indicator-cards";
import { SourcePieChart } from "../../../components/feeds/source-pie-chart";
import { useState } from "react";
import { getDummyData } from "./dummyData";
import { useRouter } from "next/router";
import { Search } from "@mui/icons-material";
// const iocs = getDummyData();
export default function Feeds() {
  const router = useRouter();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [count,setCount] = useState(1)
  const [search, setSearch] = useState("");
  const [iocs,setIocs] = useState([])
 
  const handleChangePage = (event, newPage) => {
    fetchIOCs(newPage)
  };
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  
  const fetchIOCs = async(page=1)=>{
    try{
      const response = await axios.get(`http://localhost:8000/api/ioc_feeds?page=${page}`)
      console.log("IOCS",response.data)
      setIocs(response.data.results)
      setCount(Math.ceil(response.data.count/10))

    }catch(e)
    {
      console.log(e)
    } 
  }
  useEffect(()=>{
    fetchIOCs()
  },[])

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
      <Card sx={{ margin:"80px 0px" }}>
        <Paper sx={{ minWidth: 400, maxHeight: "430px", overflowY: "scroll" }}>
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
                <TableCell>Source</TableCell>
                <TableCell>IOC</TableCell>
                <TableCell>Type</TableCell>
                <TableCell align="right">Last Seen</TableCell>
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
                    onClick={() => {
                      router.push(
                        "investigate/" + encodeURIComponent(data.ioc)
                      );
                    }}
                  >
                    <TableCell>{data.sources[0]}</TableCell>
                    <TableCell>{data.ioc}</TableCell>
                    <TableCell>{data.type}</TableCell>
                    <TableCell align="right">{date}</TableCell>
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
        <Stack spacing={2} alignItems="center" justifyContent={"center"}>
        <Pagination
        count={count}
        onChange={handleChangePage}
        shape="rounded"
        />
        </Stack>
      </Card>

    </Box>
  );
}

Feeds.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};