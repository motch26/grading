import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { Add } from "@mui/icons-material";
const Load = () => {
  const columns = [
    { field: "id", headerName: "Load ID", flex: 1 },
    { field: "section", headerName: "Section", flex: 1 },
    { field: "faculty", headerName: "Faculty", flex: 1 },
    { field: "start", headerName: "Start", flex: 1 },
    { field: "end", headerName: "End", flex: 1 },
  ];
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Button
        variant="contained"
        sx={{ width: "fit-content", ml: "auto" }}
        startIcon={<Add />}
      >
        Add Class Load
      </Button>
      <Box sx={{ width: "100%", height: "700px", mt: 1 }}>
        <DataGrid columns={columns} rows={[]} />
      </Box>
    </Box>
  );
};

export default Load;
