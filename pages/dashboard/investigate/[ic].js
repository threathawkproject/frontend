import React from "react";
import DashboardLayout from "../../../components/layout/dashboard-layout";
import { Box } from "@mui/material";
import {
  TextField,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useState } from "react";
import { Search, Visibility } from "@mui/icons-material";
import axios from "axios";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
const dummyData = {
  email: "huzaifa2469@gmail.com",
  reputation: "high",
  suspicious: false,
  references: 2,
  details: {
    blacklisted: false,
    malicious_activity: false,
    malicious_activity_recent: false,
    credentials_leaked: true,
    credentials_leaked_recent: false,
    data_breach: true,
    first_seen: "12/01/2018",
    last_seen: "12/01/2018",
    domain_exists: true,
    domain_reputation: "n/a",
    new_domain: false,
    days_since_domain_creation: 9975,
    suspicious_tld: false,
    spam: false,
    free_provider: true,
    disposable: false,
    deliverable: true,
    accept_all: false,
    valid_mx: true,
    primary_mx: "gmail-smtp-in.l.google.com",
    spoofable: true,
    spf_strict: true,
    dmarc_enforced: false,
    profiles: ["twitter"],
  },
  summary:
    "Not suspicious. This email address has been seen in 2 reputable sources on the internet, including Twitter. It has been seen in data breaches or credential leaks as recent as 12/01/2018, but not recently. We've observed no malicious or suspicious activity from this address. ",
};

const analyzeRequest = async (postData) => {
  const resp = await axios.post("http://127.0.0.1:8000/analyze", postData);
  return resp.data;
};

const iocTypes = [
  {
    value: "ip",
    name: "IP Address",
  },
  {
    value: "email",
    name: "Email Address",
  },
  {
    value: "domain",
    name: "Domain Name",
  },
  {
    value: "url",
    name: "URL",
  },
];
export default function Investigate() {
  const { isLoading, mutateAsync } = useMutation(analyzeRequest, {
    onSuccess: (d) => {
      toast.success("Data Fetched");
      setData(d);
    },
    onError: (e) => {
      toast.error("Unable to fetch data. Try Again!");
    },
  });
  const router = useRouter();
  const { ic } = router.query;
  console.log("IOC", ic);
  const [ioc, setIoc] = useState(ic ? ic : "");
  const [iocType, setIocType] = useState("ip");
  const [sources, setSources] = useState([
    "emailRep",
    "abuseIPDB",
    "geoIP2",
    "honeyDB",
  ]);
  const [selectedSources, setSelectedSources] = useState([
    "abuseIPDB",
    "geoIP2",
    "honeyDB",
  ]);
  console.log(selectedSources);
  const handleChange = (e) => {
    setIoc(e.target.value);
  };
  const handleChangeIocType = (e) => {
    setIocType(e.target.value);
  };
  const analyze = () => {
    let postData = {};
    console.log("v", validateEmail(ioc));
    if (validateEmail(ioc)) {
      postData = {
        ioc: ioc,
        selected_analyzers: ["emailRep"],
      };
    } else {
      postData = {
        ioc: ioc,
        selected_analyzers: selectedSources,
      };
    }

    console.log("Post Data", postData);
    toast.loading("Performing Enrichment");
    mutateAsync(postData).then(() => {
      toast.dismiss();
      toast.success("Enriched " + iocType);
    });
  };
  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  const [data, setData] = useState({});
  const handleChangeSelectedSources = (e) => {
    if (e.target.checked) {
      setSelectedSources([...selectedSources, e.target.value]);
    } else {
      setSelectedSources(
        selectedSources.filter((item) => item != e.target.value)
      );
    }
  };
  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginTop: "50px",
          }}
        >
          <TextField
            sx={{
              width: "600px",
              marginRight: "5px",
            }}
            autoFocus
            margin="dense"
            name="ioc"
            value={ioc}
            onChange={handleChange}
            label="IOC"
            type="text"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <IconButton onClick={analyze}>
                  <Search
                    sx={{
                      color: "darkgray",
                    }}
                  />
                </IconButton>
              ),
            }}
          />
          <FormControl
            sx={{
              width: "120px",
            }}
          >
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={iocType}
              label="IOC Type"
              onChange={handleChangeIocType}
            >
              {iocTypes.map((type, index) => {
                return (
                  <MenuItem value={type.value} key={index}>
                    {type.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Box>
        {sources.map((source) => {
          return (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                maxWidth: "150px",
                marginLeft: "80px",
              }}
            >
              <Typography>{source}</Typography>
              <Checkbox
                value={source}
                defaultChecked={selectedSources.includes(source)}
                onChange={handleChangeSelectedSources}
              />
            </Box>
          );
        })}
      </Box>
      <Box
        sx={{
          marginTop: "30px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {sources.map((source, index) => {
          return <ResultsDisplay source={source} key={index} data={data} />;
        })}
      </Box>
    </Box>
  );
}

const ResultsDisplay = (props) => {
  const source = props.source;
  const data = props.data;
  const [expanded, setExpanded] = React.useState(false);
  const handleChangePanel = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <Accordion
      sx={{
        width: "90%",
      }}
      expanded={expanded === "panel1"}
      onChange={handleChangePanel("panel1")}
    >
      <AccordionSummary
        expandIcon={<Visibility />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography sx={{ width: "33%", flexShrink: 0 }}>
          <b>{source}</b>
        </Typography>
        <Typography sx={{ color: "text.secondary" }}>
          {data[source] ? "Data Fetched" : "No Data"}
        </Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          maxHeight: "400px",
          overflowY: "scroll",
        }}
      >
        <Typography>
          {data[source] && (
            <pre
              style={{
                maxWidth: "100px",
              }}
            >
              {JSON.stringify(data[source], null, 2)}
            </pre>
          )}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};
Investigate.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
