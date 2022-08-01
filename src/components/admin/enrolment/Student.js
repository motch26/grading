import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { Add } from "@mui/icons-material";
const Student = () => {
  const columns = [
    { field: "id", headerName: "Student ID", width: 100 },
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
    </Box>
  );
};

export default Student;
