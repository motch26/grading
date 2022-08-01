import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
const Section = () => {
  const columns = [
    { field: "id", headerName: "Section ID", flex: 1 },
    { field: "course", headerName: "Course Code", flex: 1 },
    { field: "level", headerName: "Year Level", flex: 1 },
    { field: "section", headerName: "Section", flex: 1 },
    { field: "noStudents", headerName: "Number of Students", flex: 1 },
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
        <DataGrid columns={columns} rows={[]} />
      </Box>
    </Box>
  );
};

export default Section;
