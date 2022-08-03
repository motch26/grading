import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { Add } from "@mui/icons-material";
const Subject = () => {
  const columns = [
    { field: "id", headerName: "Subject ID", flex: 1 },
    { field: "code", headerName: "Subject Code", flex: 1 },
    { field: "name", headerName: "Subject Name", flex: 1 },
    { field: "course", headerName: "Course Code", flex: 1 },
    { field: "level", headerName: "Year Level", flex: 1 },
  ];
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Button
        variant="contained"
        sx={{ width: "fit-content", ml: "auto" }}
        startIcon={<Add />}
      >
        Add Subject
      </Button>
      <Box sx={{ width: "100%", height: "700px", mt: 1 }}>
        <DataGrid columns={columns} rows={[]} />
      </Box>
    </Box>
  );
};

export default Subject;
