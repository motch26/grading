import React from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Box, Button, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
const Section = () => {
  const rows = [
    { id: 1, course: "code", level: 4, section: "A", noStudents: 0 },
  ];
  const columns = [
    { field: "id", headerName: "Section ID", flex: 1 },
    { field: "course", headerName: "Course Code", flex: 1 },
    { field: "level", headerName: "Year Level", flex: 1 },
    { field: "section", headerName: "Section", flex: 1 },
    {
      field: "noStudents",
      headerName: "Number of Students",
      flex: 1,
      renderCell: (params) => (
        <strong>
          {params.value}
          <Button variant="contained" size="small" sx={{ ml: 2 }}>
            Add Student
          </Button>
        </strong>
      ),
    },
  ];
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Button
        variant="contained"
        sx={{ width: "fit-content", ml: "auto" }}
        startIcon={<Add />}
      >
        Add Section
      </Button>
      <Box sx={{ width: "100%", height: "700px", mt: 1 }}>
        <DataGrid columns={columns} rows={rows} />
      </Box>
    </Box>
  );
};

export default Section;
