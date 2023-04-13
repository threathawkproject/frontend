import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { InputLabel, Select, FormControl, MenuItem } from "@mui/material";

export default function CreateInvestigationDialog(props) {
  const {
    open,
    setOpen,
    ioc,
    setIoc,
    iocType,
    handleChangeIocType,
    handleCreateInvestigation,
    iocTypes,
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
        <DialogTitle>Create Investigation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create an investigation, please select an indicator type and its
            value
          </DialogContentText>
          <FormControl
            fullWidth
            sx={{
              marginTop: "20px",
            }}
          >
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              fullWidth
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={iocType}
              label="Type"
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
          <TextField
            sx={{
              marginTop: "10px",
            }}
            autoFocus
            margin="dense"
            id="ioc"
            value={ioc}
            onChange={(e) => setIoc(e.target.value)}
            label="Indicator"
            type="text"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleCreateInvestigation}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
