import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isNetworkError, setNetWorkError] = useState(false);
  const [isNoAccountFound, setNoAccountFound] = useState(false);

  const [cookies, setCookie] = useCookies(["user_id", "id", "role"]);

  const checkUser = () => {
    if (username && password) {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);
      axios
        .post("https://grading.miracodes.com/api/login.php", formData)
        .then((res) => {
          if (res.data) {
            const { user_id, id, role } = res.data;
            setCookie("user_id", user_id, { path: "/" });
            setCookie("id", id, { path: "/" });
            setCookie("role", role, { path: "/" });
          } else setNoAccountFound(true);
        })
        .catch((err) => setNetWorkError(true));
    }
  };

  const navigateHome = () => navigate(`/home/${cookies.role}`);

  useEffect(() => {
    if (cookies.user_id) navigateHome();
  }, [cookies.user_id]);

  return (
    <>
      <Container>
        <Box sx={styles.mainBox}>
          <Paper elevation={24} sx={styles.formPaper}>
            <Typography
              variant="h2"
              fontWeight={700}
              mb={1}
              textAlign="center"
              sx={{ bgcolor: "primary.light", py: 1 }}
            >
              Grading System
            </Typography>
            <Typography variant="h6">Username:</Typography>
            <TextField
              placeholder="Enter your username"
              sx={{
                display: "block",
                mx: "auto",
              }}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Typography variant="h6">Password:</Typography>

            <TextField
              placeholder="Enter your password"
              type="password"
              sx={{
                display: "block",
                mx: "auto",
              }}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              sx={styles.formButton}
              variant="contained"
              onClick={checkUser}
            >
              Login
            </Button>
            {isNetworkError ? (
              <Alert
                severity="error"
                variant="filled"
                onClose={() => setNetWorkError(false)}
              >
                <AlertTitle>Network Error</AlertTitle>
                Check your <strong>internet connection</strong>!
              </Alert>
            ) : null}
            {isNoAccountFound ? (
              <Alert
                severity="warning"
                variant="filled"
                onClose={() => setNoAccountFound(false)}
              >
                <AlertTitle>User not found</AlertTitle>
                Check your inputs and <strong> try again</strong>!
              </Alert>
            ) : null}
          </Paper>
        </Box>
      </Container>
    </>
  );
};

const styles = {
  mainBox: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    bgcolor: "primary.light",
  },
  formPaper: {
    p: 3,
    pb: 1,

    width: "clamp(400px, 50vw, 80vw)",
    display: "flex",

    textAlign: "center",
    flexDirection: "column",
  },
  formButton: {
    minWidth: "20%",
    marginX: "auto",
    marginY: 2,
  },
};

export default Login;
