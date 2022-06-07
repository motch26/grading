import { Button, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";

const Edit = () => {
  // @ts-ignore
  const [
    sessionID,
    currentStudentID,
    currentStudentGrades,
    setEditingGrades,
    getStudentGrade,
  ] = useOutletContext();

  const { firstTerm, midTerm, endTerm } = currentStudentGrades;
  const [firstTermNew, setFirstTermNew] = useState(firstTerm);
  const [midTermNew, setMidTermNew] = useState(midTerm);
  const [endTermNew, setEndTermNew] = useState(endTerm);

  const updateGrades = () => {
    const formData = new FormData();
    formData.append("session_id", sessionID);
    formData.append("student_id", currentStudentID);
    formData.append("firstTerm", firstTermNew);
    formData.append("midTerm", midTermNew);
    formData.append("endTerm", endTermNew);
    axios
      .post("https://grading.miracodes.com/api/updateGrades.php", formData)
      .then((res) => {
        if (res.data) {
          getStudentGrade(currentStudentID);
          setEditingGrades(false);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <Grid container mt={2} gap={1}>
        <Grid item xs={4}>
          <Typography>First Term:</Typography>
          <TextField
            value={firstTermNew}
            fullWidth
            onChange={(e) => setFirstTermNew(e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <Typography>Mid Term:</Typography>
          <TextField
            value={midTermNew}
            fullWidth
            onChange={(e) => setMidTermNew(e.target.value)}
          />
        </Grid>
        <Grid item xs>
          <Typography>End Term:</Typography>
          <TextField
            value={endTermNew}
            fullWidth
            onChange={(e) => setEndTermNew(e.target.value)}
          />
        </Grid>
      </Grid>
      <Button sx={styles.updateBtn} variant="contained" onClick={updateGrades}>
        Update
      </Button>
    </>
  );
};

const styles = {
  updateBtn: {
    display: "block",
    mx: "auto",
    mt: 2,
  },
};
export default Edit;
