import React, { useEffect, useState } from "react";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useCookies } from "react-cookie";
const Grades = () => {
  const [chosenClass, setChosenClass] = useState("");
  const apiRef = useGridApiRef();
  useEffect(() => getClasses(), []);

  const [classList, setClassList] = useState([]);
  const [gradesList, setGradesList] = useState([]);

  const [selectedClass, setSelectedClass] = useState("");

  const [cookies] = useCookies(["id"]);

  const getClasses = () => {
    axios
      .get(
        "http://localhost/grading/api/faculty2/getClasses.php?id=" + cookies.id
      )
      .then(({ data }) => {
        if (data) setClassList(data);
      })
      .catch((err) => console.log(err));
  };

  const getStudentGrades = (id) => {
    axios
      .get(
        "http://localhost/grading/api/faculty2/getStudentGrades.php?id=" + id
      )
      .then(({ data }) => {
        if (data) setGradesList(data);
      })
      .catch((err) => console.log(err));
  };

  const columns = [
    { field: "id", headerName: "Student ID", flex: 1 },
    { field: "name", headerName: "Student Name", flex: 1 },
    { field: "first", headerName: "First Term", flex: 1, editable: true },
    { field: "mid", headerName: "Mid Term", flex: 1, editable: true },
    { field: "end", headerName: "End Term", flex: 1, editable: true },
    {
      field: "average",
      headerName: "Average",
      flex: 1,
      valueGetter: (params) => {
        const { first, mid, end } = params.row;
        return (
          (parseInt(first) + parseInt(mid) + parseInt(end)) /
          3
        ).toPrecision(4);
      },
    },
  ];
  // const processRowUpdate = (newRow) => {
  //   const updatedRow = { ...newRow, isNew: false };

  //   return updatedRow;
  // };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ ml: "auto", display: "flex", alignItems: "center" }}>
        <Typography variant="h6">Class:</Typography>
        <FormControl fullWidth sx={{ width: "300px", ml: 2 }}>
          <InputLabel id="demo-simple-select-label">Select a Class</InputLabel>
          <Select
            value={selectedClass}
            label="Select a Class"
            onChange={(e) => {
              setSelectedClass(e.target.value);
              getStudentGrades(e.target.value);
            }}
          >
            {classList.map((c) => {
              const { id, subject, section } = c;
              return (
                <MenuItem
                  value={id}
                  key={id}
                >{`${section} - ${subject}`}</MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ width: "100%", height: "700px", mt: 1 }}>
        <DataGrid
          columns={columns}
          rows={gradesList}
          experimentalFeatures={{ newEditingApi: true }}
          processRowUpdate={(newRow) => {
            const updatedRow = { ...newRow };
            console.log(updatedRow);
            return updatedRow;
          }}
        />
      </Box>
    </Box>
  );
};

export default Grades;
