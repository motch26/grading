import React, { useEffect, useState } from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import axios from "axios";
const Section = () => {
  const [open, setOpen] = useState(false);
  const [list, setList] = useState([]);

  const [addStudentDialog, setAddStudentDialog] = useState(false);

  const [codes, setCodes] = useState([]);
  const [studentList, setStudentList] = useState([]);

  const [currentSectionID, setCurrentSectionID] = useState(0);
  const [studentsInSection, setStudentsInSection] = useState([]);

  const [selectedStudents, setSelectedStudents] = useState([]);

  useEffect(() => {
    getCourseCode();
    getSections();
  }, [currentSectionID]);

  const getAvailableStudents = () => {
    axios
      .get("http://localhost/grading/api/faculty/getAvailableStudents.php")
      .then(({ data }) => {
        if (data) setStudentList(data);
      })
      .catch((err) => console.log(err));
  };

  const getCourseCode = () => {
    axios
      .get("http://localhost/grading/api/faculty/getCourseCode.php")
      .then(({ data }) => {
        if (data) setCodes(data);
      })
      .catch((err) => console.log(err));
  };

  const getSections = () => {
    axios
      .get("http://localhost/grading/api/faculty/getSections.php")
      .then(({ data }) => {
        if (data) setList(data);
      })
      .catch((err) => console.log(err));
  };

  const columns = [
    { field: "id", headerName: "Section ID", flex: 1 },
    { field: "code", headerName: "Course Code", flex: 1 },
    { field: "level", headerName: "Year Level", flex: 1 },
    { field: "section", headerName: "Section", flex: 1 },
    {
      field: "noStudents",
      headerName: "Number of Students",
      flex: 1,
      renderCell: (params) => (
        <strong>
          {params.value}
          <Button
            variant="contained"
            size="small"
            sx={{ ml: 2 }}
            onClick={async () => {
              setCurrentSectionID(params.row.id);
              getStudents(params.row.id);
              getAvailableStudents();
              setAddStudentDialog(true);
            }}
          >
            Add/View Student
          </Button>
        </strong>
      ),
    },
  ];

  const add = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    axios
      .post("http://localhost/grading/api/faculty/addSection.php", formData)
      .then(({ data }) => {
        if (data) {
          setOpen(false);
          getSections();
        }
      })
      .catch((err) => console.log(err));
  };

  const insertStudent = (e) => {
    e.preventDefault();
    const ids = [];
    selectedStudents.map((student) => {
      ids.push(student.id);
      return;
    });

    ids.map((id) => {
      const formData = new FormData();
      formData.append("student_id", id);
      formData.append("section_id", currentSectionID);
      axios
        .post("http://localhost/grading/api/faculty/sectionLoad.php", formData)
        .then(({ data }) => {
          getSections();
          if (data) return;
        })
        .catch((err) => console.log(err));

      return;
    });

    setAddStudentDialog(false);
  };

  const getStudents = (id) => {
    axios
      .get(
        "http://localhost/grading/api/faculty/getStudentsinSection.php?sectionId=" +
          id
      )
      .then(({ data }) => {
        if (data) setStudentsInSection(data);
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
        Add Section
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
        <DialogTitle sx={{ bgcolor: "primary.light" }}>Add Section</DialogTitle>
        <DialogContent>
          <Box sx={{ width: "100%", my: 2 }} component="form" onSubmit={add}>
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <strong>Course Code:</strong>
                <FormControl sx={{ m: 1, width: "100%", mt: 0 }} size="small">
                  <Select fullWidth name="code">
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
              <Grid item xs={4}>
                <strong>Year Level:</strong>
                <FormControl sx={{ m: 1, width: "100%", mt: 0 }} size="small">
                  <Select fullWidth name="level">
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                    <MenuItem value="4">4</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <strong>Section:</strong>

                <TextField
                  fullWidth
                  name="section"
                  autoFocus
                  required
                  size="small"
                />
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
      <Dialog
        open={addStudentDialog}
        onClose={() => setAddStudentDialog(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle sx={{ bgcolor: "primary.light" }}>
          Students List
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={6}>
              <List dense disablePadding>
                {studentsInSection.map((student) => {
                  const { id, name } = student;
                  return (
                    <React.Fragment key={id}>
                      <ListItemButton disableGutters>
                        <ListItemText>
                          <Typography variant="h6">{name}</Typography>
                        </ListItemText>
                      </ListItemButton>
                      <Divider />
                    </React.Fragment>
                  );
                })}
              </List>
            </Grid>
            <Grid item xs={6}>
              <Box
                sx={{ width: "100%", display: "flex", flexDirection: "column" }}
                component="form"
                onSubmit={insertStudent}
              >
                <strong>Search a Student:</strong>
                <Autocomplete
                  multiple
                  id="tags-standard"
                  options={studentList}
                  getOptionLabel={(option) => option.name}
                  onChange={(e, val) => setSelectedStudents(val)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label="Students List"
                    />
                  )}
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ ml: "auto", mt: 2 }}
                >
                  Add
                </Button>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Section;
