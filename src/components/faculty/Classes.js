import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { Add } from "@mui/icons-material";
const Classes = () => {
  const rows = [
    {
      id: 1,
      subject: "Subject",
      section: "Section",
      start: "01:00",
      end: "05:00",
    },
  ];
  const columns = [
    { field: "id", headerName: "Class ID", flex: 1 },
    { field: "subject", headerName: "Subject", flex: 1 },
    { field: "section", headerName: "Section", flex: 1 },
    { field: "start", headerName: "Start", flex: 1 },
    { field: "end", headerName: "End", flex: 1 },
    {
      field: "action",
      headerName: "Actions",
      flex: 1,
      renderCell: (param) => (
        <Button size="small" variant="contained">
          View Students
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ width: "100%", height: "700px", mt: 1 }}>
        <DataGrid columns={columns} rows={rows} />
      </Box>
    </Box>
  );
};

export default Classes;
