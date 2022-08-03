import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";

const Login = () => {
  const [cookies, setCookie] = useCookies(["user_id", "id", "role"]);

  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    axios
      .post("http://localhost/grading/api/login.php", formData)
      .then((res) => {
        if (res.data) {
          const { user_id, id, role } = res.data;
          setCookie("user_id", user_id, { path: "/" });
          setCookie("id", id, { path: "/" });
          setCookie("role", role, { path: "/" });

          switch (role) {
            case "admin":
              navigate("/admin");
              break;
            case "faculty":
              navigate("/faculty");
              break;
            case "student":
              navigate("/student");
              break;
            default:
              break;
          }
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box sx={{ bgcolor: "primary.light" }}>
      <Container maxWidth="xs">
        <Box sx={{ height: "100vh", width: "100%", display: "flex" }}>
          <Paper
            sx={{
              m: "auto",
              p: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ bgcolor: "primary.main", m: 1 }}>
              <LockOutlined />
            </Avatar>
            <Typography variant="h5">Sign in</Typography>
            <Box component="form" onSubmit={login} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Username"
                name="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                SIGN IN
              </Button>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
