import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import axios from "axios";
const Subject = () => {
  const [open, setOpen] = useState(false);
  const [list, setList] = useState([]);

  const [codes, setCodes] = useState([]);
  const [selectedCodes, setSelectedCodes] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(1);
  const columns = [
    { field: "id", headerName: "Subject ID", flex: 1 },
    { field: "code", headerName: "Subject Code", flex: 1 },
    { field: "name", headerName: "Subject Name", flex: 1 },
    { field: "courses", headerName: "Courses", flex: 1 },
    { field: "level", headerName: "Year Level", flex: 1 },
  ];

  useEffect(() => {
    getCourseCode();
    getSubjects();
  }, []);

  const getCourseCode = () => {
    axios
      .get("http://localhost/grading/api/faculty/getCourseCode.php")
      .then(({ data }) => {
        if (data) setCodes(data);
      })
      .catch((err) => console.log(err));
  };

  const getSubjects = () => {
    axios
      .get("http://localhost/grading/api/faculty/getSubjects.php")
      .then(({ data }) => {
        if (data) setList(data);
      })
      .catch((err) => console.log(err));
  };

  const add = (e) => {
    e.preventDefault();
    setSelectedCodes([]);

    const formData = new FormData(e.target);

    axios
      .post("http://localhost/grading/api/faculty/addSubject.php", formData)
      .then(({ data }) => {
        if (data) {
          setOpen(false);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Button
        variant="contained"
        sx={{ width: "fit-content", ml: "auto" }}
        startIcon={<Add />}
        onClick={() => setOpen(true)}
      >
        Add Subject
      </Button>
      <Box sx={{ width: "100%", height: "700px", mt: 1 }}>
        <DataGrid columns={columns} rows={list} />
      </Box>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle sx={{ bgcolor: "primary.light" }}>Add Subject</DialogTitle>
        <DialogContent>
          <Box sx={{ width: "100%", my: 2 }} component="form" onSubmit={add}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <strong>Subject Code:</strong>
                <TextField
                  fullWidth
                  name="code"
                  autoFocus
                  required
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <strong>Subject Name:</strong>
                <TextField
                  fullWidth
                  name="name"
                  autoFocus
                  required
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <strong>Courses:</strong>

                <FormControl sx={{ m: 1, width: "100%", mt: 0 }} size="small">
                  <Select
                    fullWidth
                    name="courses"
                    value={selectedCodes}
                    multiple
                    renderValue={(selected) => selected.join(", ")}
                    onChange={(e) => {
                      const {
                        target: { value },
                      } = e;
                      setSelectedCodes(
                        typeof value === "string" ? value.split(",") : value
                      );
                    }}
                  >
                    {codes.map((i) => {
                      const { id, code } = i;
                      return (
                        <MenuItem key={id} value={code}>
                          {code}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <strong>Year Level:</strong>

                <FormControl sx={{ m: 1, width: "100%", mt: 0 }} size="small">
                  <Select
                    fullWidth
                    name="level"
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                  >
                    <MenuItem value="1">1st</MenuItem>
                    <MenuItem value="2">2nd</MenuItem>
                    <MenuItem value="3">3rd</MenuItem>
                    <MenuItem value="4">4th</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Button
                variant="contained"
                sx={{ ml: "auto", mt: 2 }}
                type="submit"
              >
                Add
              </Button>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Subject;
