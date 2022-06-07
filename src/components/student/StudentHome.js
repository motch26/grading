import {
  AppBar,
  Box,
  Button,
  ButtonGroup,
  Toolbar,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const StudentHome = () => {
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
        `http://localhost/grading/getUser.php?id=${cookies.id}&role=${cookies.role}`
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
              <Button color="inherit">Classes</Button>
              <Button color="inherit">Records</Button>
              <Button color="inherit" onClick={logout}>
                Logout
              </Button>
            </ButtonGroup>
            <Typography>{fullName}</Typography>
          </Box>
        </Toolbar>
      </AppBar>
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
};

export default StudentHome;
