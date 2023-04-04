import React from "react";
import DashboardLayout from "../../components/layout/dashboard-layout";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Switch } from "@mui/material";
import toast from "react-hot-toast";


const analyzers = {
  emailRep: {
    type: "email",
    path: "analyzers.webAnalyzers.emailRep",
    className: "EmailRepClass",
  },
  robtex: {
    type: "observable",
    path: "analyzers.webAnalyzers.robtex",
    className: "Robtex",
  },
  geoIP2: {
    type: "ip",
    path: "analyzers.webAnalyzers.geoIP2",
    className: "GeoIP2",
    accountID: 771503,
    key: "fKh4TiE6RFjEKDo9",
  },
  abuseIPDB: {
    type: "ip",
    path: "analyzers.webAnalyzers.abuseIPDB",
    className: "AbuseIPDB",
    key: "02241dd0b2496a7dcc6ae14ec1791d8c4cb29cdc1ee5207ad82ab96cc4721a17b931a6420003a2a0",
  },
  honeyDB: {
    type: "ip",
    path: "analyzers.webAnalyzers.honeyDB",
    className: "HoneyDB",
    id: "2a7247b71a923763bb17dbf0185320742a972f64e5757ef9c0d5fe9918e4ec7c",
    key: "d72b1b4ff45ab4ba4284f62d6190963fbb88f2578974f02a5e7b6dbf0c24ee6d",
  },
  threatMiner: {
    type: "ip",
    path: "analyzers.webAnalyzers.threatMiner",
    className: "ThreatMiner",
  },
  virusTotal: {
    type: "observable",
    path: "analyzers.webAnalyzers.virusTotal",
    className: "VirusTotal",
    key: "45191dd08477e7c7ce89a32e4b7e8f46a6848fde192e9480ce67fa9872c9f2b2",
  },
  stringsifter: {
    type: "file",
    path: "analyzers.dockerAnalyzers.stringsifter",
    className: "StringSifter",
  },
};



export default function DashboardHome() {
  const analyzersList = [];
  for (const property in analyzers) {
    analyzersList.push(property);
  }
  return (
    <Box
      sx={{
        margin: "70px 45px 0px 45px",
      }}
    >
      <Typography variant="h3">Analyzers</Typography>
      <Box sx={{ marginTop: "20px" }}>
        {analyzersList.map((analyzer, index) => {
          return (
            <Box key={index} sx={{ marginBottom: "20px" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="h6">
                  {index + 1}: {analyzer}
                </Typography>
                <Switch defaultChecked />
              </Box>
              {analyzers[analyzer].key ? (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <TextField label="API Key" size="small" />
                  <Button
                    color="primary"
                    sx={{ marginLeft: "5px" }}
                    variant="contained"
                    onClick={() => toast.success("Key updated")}
                  >
                    Set Key
                  </Button>
                </Box>
              ) : (
                <></>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
//Layout
DashboardHome.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
