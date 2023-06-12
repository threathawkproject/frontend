import React from "react";
import { Box, Button, Switch, Typography } from "@mui/material";
import ConfigDialog from "../dialogs/ConfigDialog";

const AnalyzerSettingsCard = (props) => {
  const { name, types } = props;
  const [open, setOpen] = React.useState(false);

  console.log("TYPES", types);
  return (
    <Box sx={styles.card}>
      <Box sx={styles.boxTop}>
        <ConfigDialog open={open} setOpen={setOpen} />
        <Box>
          <Typography sx={styles.analyzerName}>{name}</Typography>
          <Box sx={styles.chips}>
            {types &&
              types?.map((type, index) => (
                <Box
                  key={index}
                  sx={{
                    backgroundColor: typeColors[type],
                    padding: "0px 15px",
                    fontSize: "13px",
                    color: "white",
                    borderRadius: "5px",
                    letterSpacing: "0.4px",
                    textTransform: type === "ip" ? "uppercase" : "capitalize",
                  }}
                >
                  {type}
                </Box>
              ))}
          </Box>
        </Box>
        <Box>
          <Switch defaultChecked />
        </Box>
      </Box>
      <Box sx={styles.boxBottom}>
        <Button
          sx={styles.configButton}
          onClick={() => setOpen(true)}
          variant="contained"
        >
          Config
        </Button>
      </Box>
    </Box>
  );
};

const typeColors = {
  ip: "#FFDE9E",
  domain: "#AFE7FB",
  hash: "#FF7D4C",
  md5: "#FF7D4C",
  sha1: "#FF7D4C",
  sha256: "#FF7D4C",
  url: "#29E3CD",
  file: "#EF3E36",
  email: "#7852CC",
};

const styles = {
  card: {
    width: "300px",
    height: "160px",
    backgroundColor: "#FFFFFF",
    border: "2.5px solid rgba(191, 195, 203, 0.25)",
    borderRadius: "15px",
    padding: "18px 33px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  boxTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  analyzerName: {
    color: "#77767F",
    fontSize: "16px",
    fontWeight: "600",
  },
  chips: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: "4px",
    width: "188px",
    flexWrap: "wrap",
    marginTop: "7px",
  },
  boxBottom: {
    display: "flex",
    justifyContent: "center",
  },
  configButton: {
    height: "25px",
    width: "70px",
    fontSize: "13px",
    padding: "8px 1px",
  },
};

export default AnalyzerSettingsCard;
