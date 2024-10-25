import React, { useState, useRef } from "react";
import { useRouter } from "next/router";
import DashboardLayout from "../../../components/layout/dashboard-layout";
//MUI Components
import {
  TextField,
  IconButton,
  Typography,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Box,
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
import { InvestigationGraph } from "../../../components/investigation/InvestigationGraph";
import CreateInvestigationDialog from "../../../components/dialogs/CreateInvestigationDialog";
import InvestigationDialog from "../../../components/dialogs/InvesigationDialog";
import LegendsDialog from "../../../components/dialogs/LegendsDialog";
// import { EnrichmentGraph } from "../../../components/graph/EnrichmentGraph";
// import ResultsDisplay from "../../../components/enrichment/ResultsDisplay";

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
//Perform Investigation

const investigate = async (variables) => {
  const { payload, selected_analyzers } = variables;
  try {
    const { file_path, root_node_id } = payload;
    const response2 = await axios.post("http://localhost:8002/investigate", {
      file_path: file_path,
      enrichment: {
        node_id: payload.root_node_id,
        ioc: payload.value,
        type: payload.type,
        selected_analyzers: selected_analyzers || [],
      },
    });
    try {
      const response3 = await axios.post("http://localhost:8002/display", {
        file_path: file_path,
      });
      return response3.data;
    } catch (e) {
      throw new Error(e);
    }
  } catch (e) {
    throw new Error(e);
  }
};

// //Get a list of all analyzers
// const getAnalyzers = async () => {
//   const resp = await axios.get("http://127.0.0.1:8080/analyzers");
//   return resp.data;
// };
const getInvestigationTypes = async () => {
  const resp = await axios.get("http://localhost:8002/get_investigation_types");
  return resp.data;
};
// AWAIS:: NOTE:: Check the port again for this one as it was 8080, assuming he wanted to use enrichment analyzers here
const getAnalyzers = async (type) => {
  const resp = await axios.get(
    `http://localhost:8000/get_investigation_analyzers?analyzer_type=${type}`
  );
  return resp.data;
};

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
  //Selected sources/analyzers for enrichment
  const [selectedSources, setSelectedSources] = useState([]);
  //Start new investgation
  const [investigationStarted, setInvestigationStarted] = useState(false);
  //Create Investigation Dialog Open State
  const [isCreateInvestigationsOpen, setIsCreateInvestigationsOpen] =
    useState(false);
  //Is Investigation Dialog Open
  const [isInvestigationDialogOpen, setIsInvestigationDialogOpen] =
    useState(false);
  //Graph Legends
  const [isLegendsOpen, setIsLegendsOpen] = useState(false);
  //Investigation Data
  const [data, setData] = useState({
    objects: [],
  });
  //Create Investigation Response
  const [createInvestigationResponse, setCreateInvestigationResponse] =
    useState({});

  //Current Node
  const [currentNode, setCurrentNode] = useState({});

  const [sources, setSources] = useState([]);

  //IOC Types
  const [iocTypes, setIocTypes] = useState([]);

  const { isLoading: isIocTypesLoading } = useQuery(
    ["ioc-types"],
    getInvestigationTypes,
    {
      onSuccess: async (d) => {
        setIocTypes(d);
      },
      onError: (e) => {
        console.log(e);
      },
    }
  );

  //react-query's useMutation for handling POST request of investigation: i.e investigate function defined above
  const { isLoading, mutateAsync: mutateAsyncInvestigation } = useMutation(
    investigate,
    {
      onSuccess: (d) => {
        console.log("INVESTIGATIONNNNN", d);
        setData(d);
      },
      onError: (e) => {
        console.log("OH NOEEEEEEEEE PT1", e);
      },
    }
  );
  const { isLoading: isAnalyzersLoading, mutateAsync: mutateGetAnalyzers } =
    useMutation(getAnalyzers, {
      onSuccess: (d) => {
        setSources(d);
      },
      onError: (e) => {
        console.log("OH NOEEEEEEEEE PT2", e);
      },
    });

  //Ref for file upload input
  const fileUploadRef = useRef(null);
  //Convert sources to a list for rendering through map function

  //Handler Functions for various inputs
  const handleChange = (e) => {
    setIoc(e.target.value);
  };
  const handleChangeIocType = (e) => {
    setSelectedSources([]);
    setIocType(e.target.value);
    mutateGetAnalyzers(e.target.value);
  };
  const createInvestigation = async (payload) => {
    const response = await axios.post(
      "http://localhost:8002/create_investigation",
      payload
    );
    setCreateInvestigationResponse(response);
    setIsCreateInvestigationsOpen(false);
    setInvestigationStarted(true);
    setData({
      objects: [
        {
          id: response.data.root_node_id,
          type: "indicator",
          node_type: "ip",
          name: ioc,
        },
      ],
    });
  };
  const handleCreateInvestigation = () => {
    let postData = {};

    const iocToAnalyze = ioc.includes("/")
      ? ioc.substring(0, ioc.indexOf("/"))
      : ioc;

    console.log("IOC", iocToAnalyze);
    postData = {
      type: "indicator",
      data: {
        value: iocToAnalyze,
        type: iocType,
      },
      selected_analyzers: selectedSources,
    };

    console.log("Post Data", postData);
    toast.loading("Creating Investigation");
    mutateGetAnalyzers(iocType);
    createInvestigation(postData)
      .then(() => {
        toast.dismiss();
        toast.success("Investigation created\n Indicator:" + ioc);
      })
      .catch((e) => {
        console.log(e);
        toast.dismiss();
        toast.error("Could not create investigation");
      });
  };

  const handleInvestigate = async () => {
    const iocToAnalyze = ioc.includes("/")
      ? ioc.substring(0, ioc.indexOf("/"))
      : ioc;
    const payload = {
      ...createInvestigationResponse?.data,
      root_node_id: currentNode.id,
      value: currentNode.name || iocToAnalyze,
      type:
        currentNode?.type === "indicator"
          ? currentNode?.node_type
          : currentNode?.type,
    };
    toast.loading("Investigating IOC");
    setIsInvestigationDialogOpen(false);
    mutateAsyncInvestigation({
      payload: payload,
      selected_analyzers: selectedSources,
    })
      .then(() => {
        toast.dismiss();
        toast.success("Investigated:" + ioc);
      })
      .catch((e) => {
        console.log(e);
        toast.dismiss();
        toast.error("Could not investigate IOC");
      });
  };

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

  const onClickNode = function (nodeId, node) {
    console.log(`Clicked node ${nodeId}`);
    console.log("Node", node);
    setIsInvestigationDialogOpen(true);
    setCurrentNode(node);
    setIocType(node?.type === "indicator" ? node?.node_type : node?.type);
    setSelectedSources([]);
    mutateGetAnalyzers(
      node?.type === "indicator" ? node?.node_type : node?.type
    );
  };

  return (
    <Box>
      <LegendsDialog open={isLegendsOpen} setOpen={setIsLegendsOpen} />
      <CreateInvestigationDialog
        open={isCreateInvestigationsOpen}
        setOpen={setIsCreateInvestigationsOpen}
        handleCreateInvestigation={handleCreateInvestigation}
        ioc={ioc}
        setIoc={setIoc}
        iocType={iocType}
        handleChangeIocType={handleChangeIocType}
        iocTypes={iocTypes}
      />
      <InvestigationDialog
        open={isInvestigationDialogOpen}
        setOpen={setIsInvestigationDialogOpen}
        currentNode={currentNode}
        handleInvestigate={handleInvestigate}
        sources={sources}
        selectedSources={selectedSources}
        handleSelectSources={handleSelectSources}
        MenuProps={MenuProps}
      />
      <Box
        sx={{
          height: "800px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "70px 0px",
        }}
      >
        {investigationStarted && (
          <Box
            sx={{
              width: "890px",
              display: "flex",
              justifyContent: "end",
              marginBottom: "20px",
            }}
          >
            <Button
              style={{
                backgroundColor: "#FF7D4C",
              }}
              sx={{ marginRight: "10px" }}
              onClick={() => setIsLegendsOpen(true)}
              variant="contained"
            >
              Legends
            </Button>
            <Button
              variant="contained"
              onClick={() => setIsCreateInvestigationsOpen(true)}
            >
              New Investigation
            </Button>
          </Box>
        )}
        <Box
          sx={{
            height: "100%",
            width: "900px",
            backgroundColor: "#FFFFFF",
            borderRadius: "15px",
            border: "2.5px solid rgba(191, 195, 203, 0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {investigationStarted ? (
            <InvestigationGraph
              graphData={data.objects || []}
              selectedIoc={
                currentNode?.name || ioc.includes("/")
                  ? ioc.substring(0, ioc.indexOf("/"))
                  : ioc
              }
              onClickNode={onClickNode}
            />
          ) : (
            <Button
              variant="contained"
              size="large"
              onClick={() => setIsCreateInvestigationsOpen(true)}
            >
              Start A New Investigation
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
}

Enrich.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
