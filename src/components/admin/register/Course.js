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
const Course = () => {
  const [open, setOpen] = useState(false);
  const [list, setList] = useState([]);

  useEffect(() => getCourse(), []);

  const getCourse = () => {
    axios
      .get("http://localhost/grading/api/faculty/getCourse.php")
      .then(({ data }) => setList(data))
      .catch((err) => console.log(err));
  };

  const columns = [
    { field: "id", headerName: "Course ID", width: 100 },
    { field: "code", headerName: "Course Code", flex: 0.5 },
    { field: "description", headerName: "Description", flex: 1 },
    {
      field: "sy",
      headerName: "School Year",
      width: 200,
      valueGetter: ({ value }) => `${value} - ${Number(value) + 1}`,
    },
  ];

  const add = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    axios
      .post("http://localhost/grading/api/faculty/addCourse.php", formData)
      .then(({ data }) => {
        if (data) {
          setOpen(false);
          getCourse();
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
        Add Course
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
        <DialogTitle sx={{ bgcolor: "primary.light" }}>Add Course</DialogTitle>
        <DialogContent>
          <Box sx={{ width: "100%", my: 2 }} component="form" onSubmit={add}>
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <strong>Course Code:</strong>
                <TextField
                  fullWidth
                  name="code"
                  autoFocus
                  required
                  size="small"
                />
              </Grid>
              <Grid item xs={4}>
                <strong>Description:</strong>
                <TextField
                  fullWidth
                  name="description"
                  autoFocus
                  required
                  size="small"
                />
              </Grid>
              <Grid item xs={4}>
                <strong>School Year:</strong>

                <FormControl sx={{ m: 1, width: "100%", mt: 0 }} size="small">
                  <Select
                    fullWidth
                    name="sy"
                    value={new Date().getFullYear() - 1}
                  >
                    <MenuItem value={new Date().getFullYear() - 1}>{`${
                      new Date().getFullYear() - 1
                    } - ${new Date().getFullYear()}`}</MenuItem>
                    <MenuItem
                      value={new Date().getFullYear()}
                    >{`${new Date().getFullYear()} - ${
                      new Date().getFullYear() + 1
                    }`}</MenuItem>
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

export default Course;
