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
      <Container sx={{ bgcolor: "primary.light" }}>
        <Box sx={styles.mainBox}>
          <Typography variant="h2" fontWeight={700} marginBottom={5}>
            Grading System
          </Typography>
          <Paper elevation={5} sx={styles.formPaper}>
            <TextField
              label="Username"
              placeholder="Enter your username"
              margin="normal"
              fullWidth={true}
              required
              sx={{ border: 3, borderColor: "primary.light" }}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Password"
              placeholder="Enter your password"
              margin="normal"
              fullWidth={true}
              required
              type="password"
              sx={{ border: 3, borderColor: "primary.light" }}
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
  },
  formPaper: {
    p: 5,

    width: "clamp(400px, 50vw, 80vw)",
    display: "flex",
    border: "3px dashed",
    borderColor: "primary.dark",
    flexDirection: "column",
  },
  formButton: {
    minWidth: "20%",
    marginX: "auto",
    marginY: 2,
  },
};

export default Login;
