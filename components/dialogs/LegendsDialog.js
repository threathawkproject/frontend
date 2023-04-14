import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import Image from "next/image";

const legends = [
  {
    image: "/images/attack-pattern.svg",
    name: "Attack Pattern",
  },
  {
    image: "/images/campaign.svg",
    name: "Campaign",
  },
  {
    image: "/images/course-of-action.svg",
    name: "Course of action",
  },
  {
    image: "/images/grouping.svg",
    name: "Grouping",
  },
  {
    image: "/images/identity-class.svg",
    name: "Identity Class",
  },
  {
    image: "/images/identity-generic.svg",
    name: "Identity Generic",
  },
  {
    image: "/images/identity-group.svg",
    name: "Identity Group",
  },
  {
    image: "/images/identity-individual.svg",
    name: "Identity Individual",
  },
  {
    image: "/images/identity-organization.svg",
    name: "Identity Organization",
  },
  {
    image: "/images/identity-system.svg",
    name: "Identity System",
  },
  {
    image: "/images/incident.svg",
    name: "Incident",
  },
  {
    image: "/images/indicator.svg",
    name: "Indicator",
  },
  {
    image: "/images/infrastructure.svg",
    name: "Infrastructure",
  },
  {
    image: "/images/intrusion-set.svg",
    name: "Intrusion Set",
  },
  {
    image: "/images/location.svg",
    name: "Location",
  },
  {
    image: "/images/malware-analysis.svg",
    name: "Malware Analysis",
  },
  {
    image: "/images/malware-family.svg",
    name: "Malware Family",
  },
  {
    image: "/images/malware.svg",
    name: "Malware",
  },
  {
    image: "/images/note.svg",
    name: "Note",
  },
  {
    image: "/images/observed-data.svg",
    name: "Observed Data",
  },
  {
    image: "/images/opinion.svg",
    name: "Opinion",
  },
  {
    image: "/images/relationship.svg",
    name: "Relationship",
  },
  {
    image: "/images/report.svg",
    name: "Report",
  },
  {
    image: "/images/threat-actor.svg",
    name: "Threat Actor",
  },
  {
    image: "/images/tool.svg",
    name: "Tool",
  },
  {
    image: "/images/vulnerability.svg",
    name: "Vulnerability",
  },
];

export default function LegendsDialog(props) {
  const { open, setOpen } = props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Graph Legends"}</DialogTitle>
        <DialogContent>
          <List
            sx={{
              width: "100%",
              max: 360,
              maxHeight: "400px",
              bgcolor: "background.paper",
            }}
          >
            {legends.map((legend, index) => {
              return (
                <ListItem key={index}>
                  <ListItemAvatar>
                    <Avatar>
                      <Image src={legend.image} height={35} width={35} />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={legend.name} />
                </ListItem>
              );
            })}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
