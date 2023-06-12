import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function ConfigDialog(props) {
  const { open, setOpen } = props;

  const [apiKey, setApiKey] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    toast.success("API key changed");
    setApiKey("");
    setOpen(false);
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Config</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To set the API Key of the analyzer, enter the API key below and
            confirm
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            label="API Key"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
