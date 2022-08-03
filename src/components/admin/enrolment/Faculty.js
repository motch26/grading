import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import axios from "axios";
const Faculty = () => {
  const [open, setOpen] = useState(false);
  const [list, setList] = useState([]);

  useEffect(() => getFaculty(), []);
  const columns = [
    { field: "id", headerName: "Faculty ID", width: 100 },
    { field: "username", headerName: "Username", width: 200 },
    { field: "password", headerName: "Password", width: 200 },
    { field: "firstName", headerName: "First Name", width: 200 },
    { field: "lastName", headerName: "Last Name", width: 200 },
    { field: "mi", headerName: "M.I.", width: 50 },
  ];

  const generatePassword = () => {
    var length = 5,
      charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  };

  const getFaculty = () => {
    axios
      .get("http://localhost/grading/api/faculty/getFaculty.php")
      .then(({ data }) => {
        if (data) setList(data);
      })
      .catch((err) => console.log(err));
  };

  const add = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const password = generatePassword();
    const firstName = e.target.firstName.value;
    const username = firstName.toLowerCase().replace(/\s/g, "");
    formData.append("username", username);
    formData.append("password", password);
    axios
      .post("http://localhost/grading/api/faculty/addFaculty.php", formData)
      .then(({ data }) => {
        if (data) {
          setOpen(false);
          getFaculty();
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
        Add Faculty
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
        <DialogTitle sx={{ bgcolor: "primary.light" }}>Add Faculty</DialogTitle>
        <DialogContent>
          <Box sx={{ width: "100%", my: 2 }} component="form" onSubmit={add}>
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <strong>First Name:</strong>
                <TextField
                  fullWidth
                  name="firstName"
                  autoFocus
                  required
                  size="small"
                />
              </Grid>
              <Grid item xs={4}>
                <strong>M.I.:</strong>
                <TextField
                  fullWidth
                  name="mi"
                  autoFocus
                  required
                  size="small"
                />
              </Grid>
              <Grid item xs={4}>
                <strong>Last Name:</strong>
                <TextField
                  fullWidth
                  name="lastName"
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
    </Box>
  );
};

export default Faculty;
