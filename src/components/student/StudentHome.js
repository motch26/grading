import {
  AppBar,
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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
  const [rows, setRows] = useState([]);
  const [isLatin, setIsLatin] = useState(true);
  const [totalAverage, setTotalAverage] = useState(0);

  const columns = [
    { id: "subject", label: "Subject", minWidht: 150 },
    { id: "teacher", label: "Teacher", minWidth: 150 },
    { id: "firstTerm", label: "First Term", minWidth: 150, align: "right" },
    { id: "midTerm", label: "Mid Term", minWidth: 150, align: "right" },
    { id: "endTerm", label: "End Term", minWidth: 150, align: "right" },
    { id: "average", label: "Average", minWidth: 150, align: "center" },
  ];

  const createRowData = (row) => {
    const { firstTerm, midTerm, endTerm } = row;
    const average = (
      (parseInt(firstTerm) + parseInt(midTerm) + parseInt(endTerm)) /
      3
    ).toFixed(2);
    return { ...row, average };
  };

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

  const getGrades = () => {
    axios
      .get(
        `https://grading.miracodes.com/api/getCompleteGrades.php?id=${cookies.id}`
      )
      .then((res) => {
        if (res.data) {
          res.data.map((row) => {
            const translated = createRowData(row);
            setRows([...rows, translated]);
          });
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
    setRows([]);
    getGrades();
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
      <Container>
        <Box width="100%">
          <TableContainer sx={{ maxHeight: "80vh" }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.length
                  ? rows.map((row) => {
                      const {
                        subject,
                        teacher,
                        firstTerm,
                        midTerm,
                        endTerm,
                        average,
                      } = row;
                      //TODO: get total average
                      if (isLatin) {
                        if (
                          !(
                            parseInt(firstTerm) > 84 &&
                            parseInt(midTerm) > 84 &&
                            parseInt(endTerm) > 84
                          )
                        ) {
                          setIsLatin(false);
                        }
                      }

                      return (
                        <TableRow key={subject}>
                          <TableCell>{subject}</TableCell>
                          <TableCell>{teacher}</TableCell>
                          <TableCell align="right">{firstTerm}</TableCell>
                          <TableCell align="right">{midTerm}</TableCell>
                          <TableCell align="right">{endTerm}</TableCell>
                          <TableCell>{average}</TableCell>
                        </TableRow>
                      );
                    })
                  : null}
              </TableBody>
            </Table>
          </TableContainer>
          {isLatin ? (
            <Typography
              sx={{ bgcolor: "primary.light", p: 1 }}
              textAlign="center"
              variant="h3"
            >
              Cum Laude
            </Typography>
          ) : null}
        </Box>
      </Container>
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
