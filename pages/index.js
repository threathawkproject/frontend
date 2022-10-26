import styles from "../styles/Home.module.css";
import { Button, TextField } from "@mui/material";
export default function Home() {
  return (
    <div className={styles.container}>
      <h1>Threat Hawk</h1>
      <TextField
        style={{
          display: "block",
          margin: "10px 0px",
        }}
        variant="outlined"
        placeholder="Search Here"
      />
      <Button
        style={{
          padding: "10px 20px",
        }}
        variant="contained"
        color="error"
      >
        Search
      </Button>
    </div>
  );
}
