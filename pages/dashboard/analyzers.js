import React, { useState, useMemo } from "react";
import DashboardLayout from "../../components/layout/dashboard-layout";
import { Box, Button, TextField, Typography, Grid } from "@mui/material";
import { Switch } from "@mui/material";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import AnalyzerSettingsCard from "../../components/analyzers/AnalyzerSettingsCard";
import axios from "axios";

const getAnalyzers = async () => {
  const resp = await axios.get("http://127.0.0.1:8080/analyzers");
  return resp.data;
};

export default function DashboardHome() {
  const [srcs, setSrcs] = useState([]);

  const { isAnalyzersLoading } = useQuery(["all-analyzers"], getAnalyzers, {
    //if request is successful
    onSuccess: (d) => {
      setSrcs(d);
    },
    //error handling
    onError: (e) => {
      console.log(e);
    },
  });

  const sources = useMemo(() => {
    let srcList = [];
    for (const property in srcs) {
      srcList.push({ ...srcs[property], value: property });
    }
    return srcList;
  }, [srcs]);
  console.log("SOURCES", srcs);

  return (
    <Box
      sx={{
        margin: "100px 45px 0px 45px",
      }}
    >
      <Grid container spacing={4} sx={{ marginTop: "20px" }}>
        {sources.map((analyzer, index) => {
          return (
            <Grid item key={index}>
              <AnalyzerSettingsCard
                name={analyzer.name}
                types={analyzer.type === "file" ? ["file"] : analyzer.type}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
//Layout
DashboardHome.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
