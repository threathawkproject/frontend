import React from "react";
import SignInLayout from "../../components/layout/sign-in-layout";
import {
  Container,
  Stack,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { toast } from "react-hot-toast";
export default function SignUp() {
  const onSignIn = () => {
    toast.loading("Signing Up");
  };
  return (
    <Box
      sx={{
        marginTop: "290px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="sm">
        <Typography
          sx={{
            fontWeight: "700",
            fontSize: "2.3rem",
            textAlign: "center",
            letterSpacing: "0.5px",
          }}
        >
          Join Threat Hawk!
        </Typography>
        <Stack
          spacing={2}
          sx={{
            marginTop: "100px",
          }}
        >
          <TextField
            id="outlined-basic"
            variant="outlined"
            label="Email address"
            type="email"
          />
          <TextField variant="outlined" label="Password" type="password" />
          <TextField
            variant="outlined"
            label="Confirm Password"
            type="password"
          />
        </Stack>
        <Typography
          sx={{
            fontWeight: 500,
            fontSize: 16,
            display: "flex",
            marginTop: "4px",
            justifyContent: "flex-end",
            "&:hover": {
              cursor: "pointer",
              textDecoration: "underline",
            },
          }}
        >
          Already a member?
        </Typography>
        <Box
          sx={{
            marginTop: "80px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            sx={{
              width: "175px",
              height: "50px",
            }}
            onClick={onSignIn}
          >
            Sign Up
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

SignUp.getLayout = function getLayout(page) {
  return <SignInLayout>{page}</SignInLayout>;
};
