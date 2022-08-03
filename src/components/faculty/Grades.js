import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Autocomplete,
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
const Grades = () => {
  const [chosenClass, setChosenClass] = useState("");

  const columns = [
    { field: "id", headerName: "Student ID", flex: 1 },
    { field: "name", headerName: "Student Name", flex: 1 },
    { field: "first", headerName: "First Term", flex: 1, editable: true },
    { field: "mid", headerName: "Mid Term", flex: 1, editable: true },
    { field: "end", headerName: "End Term", flex: 1, editable: true },
    { field: "average", headerName: "Average", flex: 1 },
  ];
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ ml: "auto", display: "flex", alignItems: "center" }}>
        <Typography variant="h6">Class:</Typography>
        <Autocomplete
          value={chosenClass}
          onChange={(e, val) => setChosenClass(val)}
          options={[]}
          sx={{ width: 300, ml: 2 }}
          renderInput={(params) => (
            <TextField {...params} label="Choose a Class" />
          )}
        />
      </Box>
      <Box sx={{ width: "100%", height: "700px", mt: 1 }}>
        <DataGrid columns={columns} rows={[]} />
      </Box>
    </Box>
  );
};

export default Grades;
