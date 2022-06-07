import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { useCookies } from "react-cookie";
import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";

const TeacherDashboard = () => {
  const [fullName] = useOutletContext();

  const [cookies] = useCookies(["id"]);

  const [totalClasses, setTotalClasses] = useState("");
  const [totalSubject, setTotalSubjects] = useState("");

  const getStats = () => {
    axios
      .get(`https://grading.miracodes.com/api/getStats.php?id=${cookies.id}`)
      .then((res) => {
        setTotalClasses(res.data[0]);
        setTotalSubjects(res.data[1]);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getStats();
  }, []);
  return (
    <>
      <Typography variant="h3" sx={styles.welcome}>
        {" "}
        Welcome, {fullName}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={styles.cardNumber}>
                <Typography variant="h2" fontWeight={700}>
                  {totalClasses}
                </Typography>
              </Box>
              <Typography sx={styles.cardDesc} variant="h4">
                Total Classes
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={styles.cardNumber}>
                <Typography variant="h2" fontWeight={700}>
                  {totalSubject}
                </Typography>
              </Box>
              <Typography sx={styles.cardDesc} variant="h4">
                Total Subjects
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

const styles = {
  welcome: {
    textAlign: "center",
    mb: 2,
  },

  cardNumber: {
    height: 140,
    bgcolor: "primary.light",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  cardDesc: {
    textAlign: "center",
    fontWeight: 400,
    mt: 2,
  },
};

export default TeacherDashboard;
