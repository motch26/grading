import React from "react";
import { Outlet } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { AccountCircle, PersonAdd, School } from "@mui/icons-material";
import { grey } from "@mui/material/colors";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
const FacultyHome = () => {
  const [cookies, setCookie, removeCookie] = useCookies([
    "user_id",
    "id",
    "role",
    "username",
  ]);

  const navigate = useNavigate();

  return (
    <Box>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Avatar sx={{ bgcolor: "primary.light", mr: 2 }}>
            <School />
          </Avatar>
          <Typography variant="h6" sx={{ mr: "auto" }}>
            Class Management System
          </Typography>
          <Avatar sx={{ bgcolor: "primary.light", mr: 1 }}>
            <AccountCircle />
          </Avatar>
          <Typography variant="h6" sx={{ mr: 3 }}>
            {cookies.username}
          </Typography>
          <Button
            variant="contained"
            disableElevation
            onClick={() => {
              removeCookie("user_id", { path: "/" });
              removeCookie("id", { path: "/" });
              removeCookie("role", { path: "/" });
              removeCookie("username", { path: "/" });

              navigate("/");
            }}
          >
            LOGOUT
          </Button>
        </Toolbar>
      </AppBar>
      <Grid container sx={{ height: "90vh" }}>
        <Grid item sm={2}>
          <List>
            <ListItemButton onClick={() => navigate("classes")}>
              <ListItemIcon>
                <PersonAdd />
              </ListItemIcon>
              <ListItemText primary="Classes" />
            </ListItemButton>
            <ListItemButton onClick={() => navigate("grades")}>
              <ListItemIcon>
                <PersonAdd />
              </ListItemIcon>
              <ListItemText primary="Grades" />
            </ListItemButton>
          </List>
          <Divider />
        </Grid>
        <Grid item sm={10}>
          <Box
            sx={{
              p: 5,
              bgcolor: grey[100],
              alignSelf: "flex-end",
              height: "100%",
            }}
          >
            <Outlet />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FacultyHome;
