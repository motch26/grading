import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Button,
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
const Load = () => {
  const [open, setOpen] = useState(false);
  const [list, setList] = useState([]);

  useEffect(() => {
    getLoad();
    getFacultyList();
    getSectionList();
  }, []);

  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedSection, setSelectedSection] = useState("");

  const [facultyList, setFacultyList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [sectionList, setSectionList] = useState([]);
  const columns = [
    { field: "id", headerName: "Load ID", flex: 1 },
    { field: "subject", headerName: "Subject", flex: 1 },
    { field: "section", headerName: "Section", flex: 1 },
    { field: "faculty", headerName: "Faculty", flex: 1 },
  ];

  const getFacultyList = () => {
    axios
      .get("http://localhost/grading/api/faculty/getFacultyList.php")
      .then(({ data }) => setFacultyList(data))
      .catch((err) => console.log(err));
  };
  const getSectionList = () => {
    axios
      .get("http://localhost/grading/api/faculty/getSectionList.php")
      .then(({ data }) => setSectionList(data))
      .catch((err) => console.log(err));
  };

  const getSubjectsList = (id) => {
    axios
      .get(
        "http://localhost/grading/api/faculty/getSubjectList.php?section_id=" +
          id
      )
      .then(({ data }) => {
        if (data) setSubjectList(data);
      })
      .catch((err) => console.log(err));
  };

  const getLoad = () => {
    axios
      .get("http://localhost/grading/api/faculty/getLoad.php")
      .then(({ data }) => {
        if (data) setList(data);
      })
      .catch((err) => console.log(err));
  };

  const add = (e) => {
    e.preventDefault();
    console.log(`${selectedFaculty} ${selectedSection} ${selectedSubject}`);
    const formData = new FormData();
    formData.append("faculty_id", selectedFaculty);
    formData.append("section_id", selectedSection);
    formData.append("subject_id", selectedSubject);

    axios
      .post("http://localhost/grading/api/faculty/addLoad.php", formData)
      .then(({ data }) => {
        if (data) {
          setOpen(false);
          getLoad();
        }
      });
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Button
        variant="contained"
        sx={{ width: "fit-content", ml: "auto" }}
        startIcon={<Add />}
        onClick={() => setOpen(true)}
      >
        Add Class Load
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
        <DialogTitle sx={{ bgcolor: "primary.light" }}>
          Add Class Load
        </DialogTitle>
        <DialogContent>
          <Box sx={{ width: "100%", my: 2 }} component="form" onSubmit={add}>
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <strong>Faculty:</strong>
                <FormControl sx={{ width: "100%", mt: 0 }} size="small">
                  <Select
                    fullWidth
                    name="faculty"
                    value={selectedFaculty}
                    onChange={(e) => setSelectedFaculty(e.target.value)}
                  >
                    {facultyList.map((faculty) => {
                      const { id, name } = faculty;
                      return (
                        <MenuItem key={id} value={id}>
                          {name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <strong>Class Section:</strong>
                <FormControl sx={{ width: "100%", mt: 0 }} size="small">
                  <Select
                    fullWidth
                    name="section"
                    value={selectedSection}
                    onChange={(e) => {
                      setSelectedSection(e.target.value);
                      getSubjectsList(e.target.value);
                    }}
                  >
                    {sectionList.map((section) => {
                      //TODO: SET LEVEL
                      const { id, name } = section;
                      return (
                        <MenuItem key={id} value={id}>
                          {name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <strong>Subject:</strong>
                <FormControl sx={{ width: "100%", mt: 0 }} size="small">
                  <Select
                    fullWidth
                    name="subject"
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                  >
                    {subjectList.map((subject) => {
                      const { id, code } = subject;
                      return (
                        <MenuItem key={id} value={id}>
                          {code}
                        </MenuItem>
                      );
                    })}
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

export default Load;
