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
import Router, { useRouter } from "next/router";

export default function SignIn() {
  const router = useRouter();
  const onSignIn = () => {
    toast.success("Signed In");
    router.push("/dashboard");
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
          Welcome back!
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
          <span
            onClick={() => {
              router.push("/sign-up");
            }}
          >
            Not a member?
          </span>
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
            Sign In
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

SignIn.getLayout = function getLayout(page) {
  return <SignInLayout>{page}</SignInLayout>;
};
