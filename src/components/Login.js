import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

const Login = () => {
  return (
    <Container>
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
          />
          <TextField
            label="Password"
            placeholder="Enter your password"
            margin="normal"
            fullWidth={true}
          />
          <Button sx={styles.formButton} variant="contained">
            Login
          </Button>
        </Paper>
      </Box>
    </Container>
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
    flexDirection: "column",
  },
  formButton: {
    minWidth: "20%",
    marginX: "auto",
    marginTop: 5,
  },
};

export default Login;
