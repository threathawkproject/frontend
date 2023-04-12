import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import { CircularProgress } from "@mui/material";
import { Visibility } from "@mui/icons-material";

const ResultsDisplay = (props) => {
  const srcs = props.srcs;
  const source = props.source;
  const data = props.data;
  const isIncluded = props.isIncluded;
  const isLoading = props.isLoading;
  const [expanded, setExpanded] = React.useState(false);
  const handleChangePanel = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <Accordion
      sx={{
        width: "96%",
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
          <b>{srcs[source].name}</b>
        </Typography>
        <Typography sx={{ color: "text.secondary" }}>
          {isIncluded && isLoading ? (
            <CircularProgress size="1.5rem" />
          ) : data[source] ? (
            "Data Fetched"
          ) : (
            "No Data"
          )}
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

export default ResultsDisplay;
