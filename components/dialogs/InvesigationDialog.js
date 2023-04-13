import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  InputLabel,
  Select,
  FormControl,
  MenuItem,
  ListItemIcon,
  Checkbox,
  ListItemText,
  Typography,
} from "@mui/material";
export default function InvestigationDialog(props) {
  const {
    open,
    setOpen,
    currentNode,
    sources,
    selectedSources,
    handleSelectSources,
    MenuProps,
    handleInvestigate,
  } = props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Investigate</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Select Sources To Perform Investigation on the selected node
          </DialogContentText>
          <Typography
            sx={{
              marginTop: "20px",
            }}
          >
            <b>{currentNode?.type?.toUpperCase()}: </b>
            {currentNode?.name}
          </Typography>
          <Typography>
            <b>Type: </b>
            {currentNode?.type === "indicator"
              ? currentNode?.node_type
              : currentNode?.type}
          </Typography>
          <FormControl
            fullWidth
            sx={{
              marginTop: "5px",
            }}
          >
            <InputLabel id="demo-simple-select-label">
              Select Sources
            </InputLabel>
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
                  <MenuItem value={source} key={index}>
                    <ListItemIcon>
                      <Checkbox checked={selectedSources.includes(source)} />
                    </ListItemIcon>
                    <ListItemText>{source}</ListItemText>
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleInvestigate} variant="contained">
            Investigate
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
