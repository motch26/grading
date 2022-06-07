import { Close, Person } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Outlet,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";

const SessionInfo = () => {
  const { sessionID } = useParams();
  const navigate = useNavigate();

  const [students, setStudents] = useState(null);

  const [shoWAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showStudentGrade, setShowStudentGrade] = useState(false);
  const [isEditingGrades, setEditingGrades] = useState(false);

  //Form Fields
  const [firstName, setFirstName] = useState("");
  const [mi, setMI] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [currentStudent, setCurrentStudent] = useState("");
  const [currentStudentID, setCurrentStudentID] = useState("");
  const [currentStudentGrades, setCurrentStudentGrades] = useState(null);

  // @ts-ignore
  const [
    currentSubjectName,
    currentSession,
    currentSectionID,
    setShowSessionInfo,
  ] = useOutletContext();

  const getStudents = () => {
    axios
      .get(
        `https://grading.miracodes.com/api/getStudents.php?sessionID=${sessionID}`
      )
      .then((res) => {
        setStudents(res.data);
      })
      .catch((err) => console.log(err));
  };

  const registerStudent = () => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("firstName", firstName);
    formData.append("mi", mi);
    formData.append("lastName", lastName);
    formData.append("sectionID", currentSectionID);
    formData.append("session_id", sessionID);
    axios
      .post("https://grading.miracodes.com/api/registerStudent.php", formData)
      .then((res) => {
        if (res.data) {
          setShowAddStudentModal(false);
          getStudents();
        }
      })
      .catch((err) => console.log(err));
  };

  const getStudentGrade = (id) => {
    axios
      .get(
        `https://grading.miracodes.com/api/getStudentGrade.php?id=${id}&sessionID=${sessionID}`
      )
      .then((res) => setCurrentStudentGrades(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getStudents();
  }, [sessionID]);

  return (
    <>
      <Dialog
        maxWidth="md"
        fullWidth
        open={showStudentGrade}
        onClose={() => {
          setShowStudentGrade(false);
          setEditingGrades(false);
          navigate(`/home/teacher/classes/${sessionID}`);
        }}
      >
        <DialogTitle sx={styles.dialogTitle}>
          {currentStudent}
          <Typography fontWeight={700}>{currentSubjectName}</Typography>
          {isEditingGrades ? (
            <Button
              onClick={() => {
                setEditingGrades(false);
                getStudentGrade(currentStudentID);
                navigate(`/home/teacher/classes/${sessionID}`);
              }}
              color="inherit"
            >
              View Updated Grades
            </Button>
          ) : (
            <Button
              onClick={() => {
                setEditingGrades(true);
                navigate("edit");
              }}
              color="inherit"
            >
              Edit Grades
            </Button>
          )}
        </DialogTitle>
        <DialogContent>
          {isEditingGrades ? (
            <Outlet
              context={[
                sessionID,
                currentStudentID,
                currentStudentGrades,
                setEditingGrades,
                getStudentGrade,
              ]}
            />
          ) : (
            <Grid container gap={2} mt={2} alignItems="center">
              <Grid container gap={1} item xs={8}>
                <Grid item xs sx={styles.gradeContainer}>
                  <Typography> First Term</Typography>
                  <Typography variant="h3">
                    {currentStudentGrades ? currentStudentGrades.firstTerm : 0}
                  </Typography>
                  {currentStudentGrades ? (
                    currentStudentGrades.firstTerm > 84 ? (
                      <Chip label="Dean's Lister" color="success" />
                    ) : null
                  ) : null}
                </Grid>
                <Grid item xs sx={styles.gradeContainer}>
                  <Typography> Mid Term</Typography>
                  <Typography variant="h3">
                    {currentStudentGrades ? currentStudentGrades.midTerm : 0}
                  </Typography>
                  {currentStudentGrades ? (
                    currentStudentGrades.midTerm > 84 ? (
                      <Chip label="Dean's Lister" color="success" />
                    ) : null
                  ) : null}
                </Grid>
                <Grid item xs sx={styles.gradeContainer}>
                  <Typography> End Term</Typography>
                  <Typography variant="h3">
                    {currentStudentGrades ? currentStudentGrades.endTerm : 0}
                  </Typography>
                  {currentStudentGrades ? (
                    currentStudentGrades.endTerm > 84 ? (
                      <Chip label="Dean's Lister" color="success" />
                    ) : null
                  ) : null}
                </Grid>
              </Grid>
              <Grid item container xs>
                <Grid item xs sx={styles.gradeContainer}>
                  <Typography fontWeight={700} variant="h6">
                    {" "}
                    Average
                  </Typography>
                  <Typography variant="h1">
                    {currentStudentGrades
                      ? (
                          (parseInt(currentStudentGrades.midTerm) +
                            parseInt(currentStudentGrades.firstTerm) +
                            parseInt(currentStudentGrades.endTerm)) /
                          3
                        ).toPrecision(3)
                      : 0}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          )}
        </DialogContent>
      </Dialog>
      {/* Add Student Dialog */}
      <Dialog
        maxWidth="md"
        fullWidth
        open={shoWAddStudentModal}
        onClose={() => setShowAddStudentModal(false)}
      >
        <DialogTitle sx={styles.dialogTitle}>Add Student</DialogTitle>
        <DialogContent>
          <Grid container spacing={1} mt={2}>
            <Grid item xs={12} md={5}>
              <Typography fontWeight={700}>First Name:</Typography>
              <TextField
                onChange={(e) => setFirstName(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={5}>
              <Typography fontWeight={700}>Last Name:</Typography>
              <TextField
                onChange={(e) => setLastName(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography fontWeight={700}>M.I.:</Typography>
              <TextField onChange={(e) => setMI(e.target.value)} fullWidth />
            </Grid>
            <Grid item xs={12} md={5}>
              <Typography fontWeight={700}>Username:</Typography>
              <TextField
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={5}>
              <Typography fontWeight={700}>Password:</Typography>
              <TextField
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography fontWeight={700}>Section ID:</Typography>
              <TextField
                value={currentSectionID}
                InputProps={{ readOnly: true }}
                helperText="Non-Editable"
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            sx={styles.registerBtn}
            onClick={registerStudent}
          >
            Register
          </Button>
        </DialogContent>
      </Dialog>
      <Paper sx={styles.paper}>
        <Box sx={styles.infoTitle}>
          <Typography
            fontWeight={500}
          >{`${currentSession} | (${currentSubjectName})`}</Typography>
          <IconButton
            onClick={() => {
              setShowSessionInfo(false);
            }}
          >
            <Close />
          </IconButton>
        </Box>
        <List>
          {students ? (
            students.map((student) => {
              const { id, firstName, mi, lastName } = student;
              return (
                <ListItem
                  key={id}
                  secondaryAction={
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => {
                        setCurrentStudent(`${firstName} ${lastName}`);
                        setCurrentStudentID(id);
                        getStudentGrade(id);
                        setShowStudentGrade(true);
                      }}
                    >
                      View
                    </Button>
                  }
                >
                  <ListItemIcon>
                    <Person />
                  </ListItemIcon>
                  <ListItemText primary={`${firstName} ${mi}. ${lastName}`} />
                </ListItem>
              );
            })
          ) : (
            <Typography variant="h5" textAlign="center">
              No students enlisted
            </Typography>
          )}
        </List>
        <Button
          variant="contained"
          sx={styles.addStudentBtn}
          onClick={() => setShowAddStudentModal(true)}
        >
          Add Student
        </Button>
      </Paper>
    </>
  );
};

const styles = {
  paper: {
    p: 2,
  },
  infoTitle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    p: 1,
    bgcolor: "primary.light",
  },
  listItem: {
    display: "flex",
  },
  addStudentBtn: {
    display: "block",
    mx: "auto",
  },
  dialogTitle: {
    bgcolor: "primary.light",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  registerBtn: {
    display: "block",
    mx: "auto",
  },
  gradeContainer: {
    textAlign: "center",
    p: 1,

    border: "3px solid",
    borderColor: "primary.dark",
  },
};

export default SessionInfo;
