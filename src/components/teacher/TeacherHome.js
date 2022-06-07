import {
  AppBar,
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Outlet, useNavigate } from "react-router-dom";

const TeacherHome = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([
    "role",
    "id",
    "user_id",
  ]);

  const [fullName, setFullName] = useState("");

  const getUser = () => {
    axios
      .get(
        `https://grading.miracodes.com/api/getUser.php?id=${cookies.id}&role=${cookies.role}`
      )
      .then((res) => {
        if (res.data) {
          const { firstName, lastName } = res.data;
          setFullName(`${firstName} ${lastName}`);
        }
      })
      .catch((err) => console.log(err));
  };

  const logout = () => {
    removeCookie("id", { path: "/" });
    removeCookie("role", { path: "/" });
    removeCookie("user_id", { path: "/" });
    navigate("/");
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Home | {cookies.role.toUpperCase()}
          </Typography>

          <Box sx={styles.rightSection}>
            <ButtonGroup variant="text" sx={styles.btnGroup}>
              <Button
                color="inherit"
                onClick={() => navigate(`/home/${cookies.role}`)}
              >
                Dashboard
              </Button>

              <Button color="inherit" onClick={() => navigate("classes")}>
                Classes
              </Button>

              <Button color="inherit" onClick={logout}>
                Logout
              </Button>
            </ButtonGroup>
            <Avatar sx={{ bgcolor: "secondary.light" }}>
              {fullName.slice(0, 1)}
            </Avatar>
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={styles.body}>
        <Outlet context={[fullName]} />
      </Box>
    </>
  );
};

const styles = {
  rightSection: {
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
  },
  btnGroup: {
    marginRight: 5,
  },
  body: {
    p: 5,
  },
};

export default TeacherHome;
