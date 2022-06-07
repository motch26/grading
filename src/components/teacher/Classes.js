import {
  Alert,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  MenuItem,
  Modal,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Outlet, useNavigate } from "react-router-dom";

const Classes = () => {
  const [cookies] = useCookies(["id"]);
  const navigate = useNavigate();

  const [sessions, setSessions] = useState(null);
  const [subjects, setSubjects] = useState(null);
  const [sections, setSections] = useState(null);

  const [subjectID, setSubjectID] = useState("");
  const [sectionID, setSectionID] = useState("");

  const [addSessionShow, setAddSession] = useState(false);
  const [isSessionDuplicate, setSessionDuplicate] = useState(false);
  const [insertError, setInsertError] = useState(false);

  const [showSessionInfo, setShowSessionInfo] = useState(false);

  //For setting outlet context states
  const [currentSubjectName, setCurrentSubjectName] = useState("");
  const [currentSession, setCurrentSession] = useState("");
  const [currentSectionID, setCurrentSectionID] = useState("");

  const getSession = () => {
    axios
      .get(
        `https://grading.miracodes.com/api/getTeacherSession.php?id=${cookies.id}`
      )
      .then((res) => {
        setSessions(res.data);
        setAddSession(false);
      })
      .catch((err) => console.log(err));
  };

  const getSubject = () => {
    axios
      .get("https://grading.miracodes.com/api/getSubjects.php")
      .then((res) => {
        if (res.data) setSubjects(res.data);
      })
      .catch((err) => console.log(err));
  };

  const getSection = () => {
    axios
      .get("https://grading.miracodes.com/api/getSections.php")
      .then((res) => {
        if (res.data) setSections(res.data);
      })
      .catch((err) => console.log(err));
  };

  const insertSession = () => {
    const formData = new FormData();
    formData.append("id", cookies.id);
    formData.append("section_id", sectionID);
    formData.append("subject_id", subjectID);
    axios
      .post("https://grading.miracodes.com/api/insertSession.php", formData)
      .then((res) => {
        if (res.data) {
          navigate("/home/teacher/classes");
        } else setInsertError(true);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getSession();
    getSubject();
    getSection();
  }, [sessions]);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={showSessionInfo ? 8 : 12}>
          <Paper sx={styles.paper}>
            <Grid container spacing={2}>
              {sessions
                ? sessions.map((session) => {
                    const { id, secID, course_code, level, section, name } =
                      session;
                    return (
                      <Grid item xs={12} md={6} key={id}>
                        <Card elevation={10}>
                          <CardActionArea
                            onClick={() => {
                              setCurrentSubjectName(name);
                              setCurrentSession(
                                `${course_code} ${level} - ${section}`
                              );
                              setCurrentSectionID(secID);
                              setShowSessionInfo(true);
                              navigate(`${id}`);
                            }}
                          >
                            <CardContent>
                              <Box sx={styles.subjectContainer}>
                                <Typography
                                  variant="h4"
                                  sx={styles.subjectName}
                                >
                                  {name}
                                </Typography>
                              </Box>
                              <Box sx={styles.sessionInfo}>
                                <Typography sx={styles.section} variant="h5">
                                  {`${course_code} ${level} - ${section}`}
                                </Typography>
                              </Box>
                            </CardContent>
                          </CardActionArea>
                        </Card>
                      </Grid>
                    );
                  })
                : null}
            </Grid>
            <Button
              variant="contained"
              sx={styles.addBtn}
              onClick={() => setAddSession(true)}
            >
              Add Class Session
            </Button>
          </Paper>
        </Grid>
        {showSessionInfo ? (
          <Grid item xs={12} md={4}>
            <Outlet
              context={[
                currentSubjectName,
                currentSession,
                currentSectionID,
                setShowSessionInfo,
              ]}
            />
          </Grid>
        ) : null}
      </Grid>
      <Modal
        sx={styles.modalContainer}
        open={addSessionShow}
        onClose={() => setAddSession(false)}
      >
        <Paper sx={styles.modalPaper}>
          <Box sx={styles.modalTitle}>
            <Typography variant="h5" fontWeight={700}>
              Add Class Session
            </Typography>
          </Box>
          <Box sx={styles.formContainer}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Box sx={styles.inputContainer}>
                  <Typography variant="h6" fontWeight={400}>
                    Teacher ID :{" "}
                  </Typography>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    value={cookies.id}
                    helperText="Non-Editable"
                    InputProps={{ readOnly: true }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={styles.inputContainer}>
                  <Typography variant="h6" fontWeight={400}>
                    Subject :{" "}
                  </Typography>
                  <Select
                    value={subjectID}
                    onChange={(e) => setSubjectID(e.target.value)}
                  >
                    {subjects ? (
                      subjects.map((subjectItem) => {
                        const { id, name } = subjectItem;
                        return (
                          <MenuItem value={id} key={id}>
                            {name}
                          </MenuItem>
                        );
                      })
                    ) : (
                      <MenuItem value="">No Subjects Encoded</MenuItem>
                    )}
                  </Select>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={styles.inputContainer}>
                  <Typography variant="h6" fontWeight={400}>
                    Class Section :{" "}
                  </Typography>
                  <Select
                    value={sectionID}
                    onChange={(e) => setSectionID(e.target.value)}
                  >
                    {/* TODO: Adjust sections list if duplicate sessions exist */}
                    {sections ? (
                      sections.map((sectionItem) => {
                        const { id, course_code, level, section } = sectionItem;
                        return (
                          <MenuItem value={id} key={id}>
                            {`${course_code} ${level} - ${section}`}
                          </MenuItem>
                        );
                      })
                    ) : (
                      <MenuItem value="">No Sections Encoded</MenuItem>
                    )}
                  </Select>
                </Box>
              </Grid>
            </Grid>
            <Box sx={styles.formEnd}>
              {isSessionDuplicate ? (
                <Alert severity="error">Class session already exists!</Alert>
              ) : null}
              {insertError ? (
                <Alert severity="error">Adding session failed!</Alert>
              ) : null}
              <Button
                variant="contained"
                sx={styles.addSessionBtn}
                onClick={insertSession}
              >
                Add Session
              </Button>
            </Box>
          </Box>
        </Paper>
      </Modal>
    </>
  );
};

const styles = {
  paper: {
    p: 2,
  },
  subjectContainer: {
    bgcolor: "primary.dark",
    p: 2,
    color: "white",
  },
  subjectName: {
    textAlign: "center",
    fontWeight: 700,
  },
  sessionInfo: {
    p: 2,
    bgcolor: "primary.light",
  },
  section: {
    textAlign: "center",
  },
  addBtn: {
    mt: 5,
    mx: "auto",
    display: "block",
  },
  modalContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalPaper: {
    p: 2,
    width: "clamp(500px, 70vw, 80vw)",
    height: "clamp(300px, fit-content, 90vh)",
    diplay: "flex",
    flexDirection: "column",
    alignItems: "strech",
  },
  modalTitle: {
    p: 1,
    pl: 3,
    bgcolor: "primary.light",
  },
  formContainer: {
    p: 2,
    border: "3px dashed",
    borderTop: "0",
    borderColor: "primary.light",
    width: "100%",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
  },
  formEnd: {
    display: "flex",
    alignItems: "center",
  },
  addSessionBtn: {
    ml: "auto",

    display: "block",
  },
};

export default Classes;
