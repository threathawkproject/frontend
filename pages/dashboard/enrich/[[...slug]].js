import React, { useState, useRef } from "react";
import { useRouter } from "next/router";
import DashboardLayout from "../../../components/layout/dashboard-layout";
//MUI Components
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
  Button,
  Tabs,
  Tab,
  Box,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
//MUI Icons
import { Search, Visibility, FileUpload } from "@mui/icons-material";
//axios
import axios from "axios";
//React Query Hooks
import { useMutation, useQuery } from "@tanstack/react-query";
//Toast
import { toast } from "react-hot-toast";
import { useMemo } from "react";
import { EnrichmentGraph } from "../../../components/graph/EnrichmentGraph";
import ResultsDisplay from "../../../components/enrichment/ResultsDisplay";

//Menu Props For Multi Select
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
  getContentAnchorEl: null,
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "center",
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "center",
  },
  variant: "menu",
};

//Request Functions
//Perform Enrichment
const analyzeRequest = async (postData, isFile = false, file = null) => {
  const form = new FormData();
  if (isFile) {
    form.append("form", JSON.stringify({ ...postData, ioc: "" }));
    form.append("file", file, file?.name);
    const resp = await axios.post("http://127.0.0.1:8080/analyze", form, {
      headers: {
        ...form.getHeaders(),
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    });
    return resp.data;
  } else {
    const resp = await axios.post("http://127.0.0.1:8080/analyze", postData);
    return resp.data;
  }
};

//Get a list of all analyzers
const getAnalyzers = async () => {
  const resp = await axios.get("http://127.0.0.1:8080/analyzers");
  return resp.data;
};

//List of all IOC Types
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
  {
    value: "file",
    name: "File",
  },
  {
    value: "sha1",
    name: "SHA1",
  },
  {
    value: "sha256",
    name: "SHA256",
  },
  {
    value: "md5",
    name: "MD5",
  },
];

//Enrichment Page
export default function Enrich() {
  //Get Selected IOC From the query params
  const router = useRouter();
  const ic = router.query?.slug?.[0];

  //Page State
  //Current IOC
  const [ioc, setIoc] = useState(ic ? ic : "");
  //Selected IOC Type
  const [iocType, setIocType] = useState("ip");
  //Sources Object Returned from API
  const [srcs, setSrcs] = useState([]);
  //Selected File Name for IOC Type "file"
  const [fileName, setFileName] = useState("");
  //Selected File for IOC Type "file"
  const [file, setFile] = useState();
  //Current Tab Value
  const [tab, setTab] = useState(0);
  //Selected sources/analyzers for enrichment
  const [selectedSources, setSelectedSources] = useState([]);

  //react-query's useMutation for handling POST request of enrichment: i.e analyzeRequest function defined above
  const { isLoading, mutateAsync } = useMutation(analyzeRequest, {
    //if request is successful
    onSuccess: (d) => {
      toast.success("Data Fetched");
      if (d) setData(d);
      else setData({});
      console.log("Data", d);
    },
    //if request is not successful
    onError: (e) => {
      console.log("error", e);
      toast.error("Unable to fetch data. Try Again!");
    },
  });
  ////react-query's useMutation for handling POST request to get all analyzers: i.e getAnalyzers function defined above
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

  //Ref for file upload input
  const fileUploadRef = useRef(null);

  //Convert sources to a list for rendering through map function
  //use Memo to memoize the value for better efficiency.
  const sources = useMemo(() => {
    let srcList = [];
    for (const property in srcs) {
      console.log(`${property}: ${srcs[property]}`);
      if (srcs[property].type.includes(iocType)) {
        srcList.push({ ...srcs[property], value: property });
      }
    }
    return srcList;
  }, [iocType, srcs]);

  //Handler Functions for various inputs
  const handleChange = (e) => {
    setIoc(e.target.value);
  };
  const handleChangeIocType = (e) => {
    setSelectedSources([]);
    setIocType(e.target.value);
  };
  const analyze = () => {
    let postData = {};
    console.log("v", validateEmail(ioc));

    const iocToAnalyze = ioc.includes("/")
      ? ioc.substring(0, ioc.indexOf("/"))
      : ioc;

    console.log("IOC", iocToAnalyze);
    postData = {
      ioc: iocToAnalyze,
      selected_analyzers: selectedSources,
      type: iocType,
    };

    console.log("Post Data", postData);
    toast.loading("Performing Enrichment");
    mutateAsync(postData, iocType === "file" ? true : false, file)
      .then(() => {
        toast.dismiss();
        toast.success("Enriched " + iocType);
      })
      .catch((e) => {
        console.log(e);
        toast.dismiss();
        toast.error("Could not perform enrichment check logs for details");
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
  const handleSelectSources = (e) => {
    setSelectedSources(e.target.value);
  };
  const handleSelectFile = () => {
    fileUploadRef.current.click();
  };
  const handleUploadFile = (e, file) => {
    if (e.target.files) {
      console.log("File", e.target.files[0]);
      setFileName(e.target.files[0].name);
      setFile(e.target.files[0]);
    }
  };
  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  };
  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginTop: "50px",
          }}
        >
          {iocType === "file" ? (
            <Box
              sx={{
                width: "600px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingRight: "10px",
              }}
            >
              <Button
                onClick={handleSelectFile}
                endIcon={<FileUpload />}
                variant="outlined"
                color="primary"
              >
                Upload File
              </Button>
              <input
                style={{
                  display: "none",
                }}
                onChange={handleUploadFile}
                ref={fileUploadRef}
                type="file"
              />
              <p>{fileName}</p>
              <Button variant="outlined">
                <Search
                  sx={{
                    color: "blue",
                  }}
                  onClick={analyze}
                />
              </Button>
            </Box>
          ) : (
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
          )}
          <FormControl
            sx={{
              width: "120px",
            }}
          >
            <InputLabel id="demo-simple-select-label">IOC Type</InputLabel>
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
        <FormControl
          sx={{
            width: "720px",
            marginTop: "5px",
          }}
        >
          <InputLabel id="demo-simple-select-label">Select Sources</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedSources}
            multiple
            label="Select Sorces"
            onChange={handleSelectSources}
            MenuProps={MenuProps}
            renderValue={(selected) => selected.join(", ")}
          >
            {sources.map((source, index) => {
              return (
                <MenuItem value={source.value} key={index}>
                  <ListItemIcon>
                    <Checkbox
                      checked={selectedSources.includes(source.value)}
                    />
                  </ListItemIcon>
                  <ListItemText>{source.name}</ListItemText>
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ width: "95%", margin: "20px" }}></Box>
      <Box
        sx={{
          marginTop: "30px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            width: "96%",
            marginBottom: "10px",
          }}
        >
          <Tabs
            value={tab}
            onChange={handleChangeTab}
            aria-label="basic tabs example"
          >
            <Tab label="Details" />
            <Tab label="Graph View" />
          </Tabs>
        </Box>
        {tab === 0 ? (
          selectedSources.map((source, index) => {
            return (
              <ResultsDisplay
                isIncluded={selectedSources.includes(source.value)}
                source={source}
                srcs={srcs}
                key={index}
                data={data}
                isLoading={isLoading}
              />
            );
          })
        ) : (
          <div
            style={{
              height: "800px",
              width: "98%",
              border: "2px dashed #C1C1C2",
              display: "flex",
            }}
          >
            <div>
              <EnrichmentGraph ioc={ioc} data={data} />
            </div>
          </div>
        )}

        {/* */}
      </Box>
    </Box>
  );
}

Enrich.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
