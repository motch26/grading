import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";

const Course = () => {
  const columns = [
    { field: "id", headerName: "Course ID", width: 100 },
    { field: "code", headerName: "Course Code", flex: 0.5 },
    { field: "description", headerName: "Description", flex: 1 },
    { field: "sy", headerName: "School Year", width: 200 },
  ];
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Button
        variant="contained"
        sx={{ width: "fit-content", ml: "auto" }}
        startIcon={<Add />}
      >
        Add Course
      </Button>
      <Box sx={{ width: "100%", height: "700px", mt: 1 }}>
        <DataGrid columns={columns} rows={[]} />
      </Box>
    </Box>
  );
};

export default Course;
