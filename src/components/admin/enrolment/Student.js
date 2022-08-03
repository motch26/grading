import React, { useState } from "react";
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
const Student = () => {
  const [open, setOpen] = useState("true");

  const generatePassword = () => {
    var length = 8,
      charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  };

  const columns = [
    { field: "id", headerName: "Student ID", width: 100 },
    { field: "username", headerName: "Username", width: 200 },
    { field: "password", headerName: "Password", width: 200 },
    { field: "firstName", headerName: "First Name", width: 200 },
    { field: "lastName", headerName: "Last Name", width: 200 },
    { field: "mi", headerName: "M.I.", width: 50 },
    { field: "gender", headerName: "Gender", width: 200 },
    { field: "address", headerName: "Address", width: 200 },
    { field: "birthday", headerName: "Birthday", width: 200 },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Button
        variant="contained"
        sx={{ width: "fit-content", ml: "auto" }}
        startIcon={<Add />}
      >
        Add Student
      </Button>
      <Box sx={{ width: "100%", height: "700px", mt: 1 }}>
        <DataGrid columns={columns} rows={[]} />
      </Box>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle sx={{ bgcolor: "primary.light" }}>Add Student</DialogTitle>
        <DialogContent>
          <Box
            sx={{ width: "100%", my: 2 }}
            component="form"
            onSubmit={() => {}}
          >
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
                {/*TODO: Proceed */}
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Student;
