import React, { useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Collapse,
  Divider,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  AccountCircle,
  ExpandLess,
  ExpandMore,
  PersonAdd,
  School,
} from "@mui/icons-material";
import { Outlet } from "react-router-dom";
import { grey } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
const AdminHome = () => {
  const [enrolmentDropdown, setEnrolmentDropdown] = useState(false);
  const [registerDropdown, setRegisterDropdown] = useState(false);
  const [loadingDropdown, setLoadingDropdown] = useState(false);

  const navigate = useNavigate();

  const [cookies, setCookie, removeCookie] = useCookies([
    "user_id",
    "id",
    "role",
    "username",
  ]);

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
            Admin
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
            <ListItemButton
              onClick={() => setEnrolmentDropdown((prev) => !prev)}
            >
              <ListItemIcon>
                <PersonAdd />
              </ListItemIcon>
              <ListItemText primary="Enrolment" />
              {enrolmentDropdown ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={enrolmentDropdown} timeout="auto" unmountOnExit>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => navigate("student")}
              >
                <ListItemIcon>
                  <School />
                </ListItemIcon>
                <ListItemText primary="Student" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => navigate("faculty")}
              >
                <ListItemIcon>
                  <School />
                </ListItemIcon>
                <ListItemText primary="Faculty" />
              </ListItemButton>
            </Collapse>
            <ListItemButton
              onClick={() => setRegisterDropdown((prev) => !prev)}
            >
              <ListItemIcon>
                <PersonAdd />
              </ListItemIcon>
              <ListItemText primary="Class Register" />
              {registerDropdown ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={registerDropdown} timeout="auto" unmountOnExit>
              <ListItemButton sx={{ pl: 4 }} onClick={() => navigate("course")}>
                <ListItemIcon>
                  <School />
                </ListItemIcon>
                <ListItemText primary="Course" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => navigate("subject")}
              >
                <ListItemIcon>
                  <School />
                </ListItemIcon>
                <ListItemText primary="Subject" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <School />
                </ListItemIcon>
                <ListItemText
                  primary="Section"
                  onClick={() => navigate("section")}
                />
              </ListItemButton>
            </Collapse>
            <ListItemButton onClick={() => setLoadingDropdown((prev) => !prev)}>
              <ListItemIcon>
                <PersonAdd />
              </ListItemIcon>
              <ListItemText primary="Class Loading" />
              {loadingDropdown ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={loadingDropdown} timeout="auto" unmountOnExit>
              <ListItemButton sx={{ pl: 4 }} onClick={() => navigate("load")}>
                <ListItemIcon>
                  <School />
                </ListItemIcon>
                <ListItemText primary="Load Class" />
              </ListItemButton>
            </Collapse>
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

export default AdminHome;
