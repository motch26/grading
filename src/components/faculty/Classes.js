import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useCookies } from "react-cookie";
const Classes = () => {
  const [cookies] = useCookies(["id"]);

  const [open, setOpen] = useState(false);
  const [list, setList] = useState([]);

  const [studentList, setStudentList] = useState([]);

  useEffect(() => getClasses(), []);

  const getClasses = () => {
    axios
      .get(
        "http://localhost/grading/api/faculty2/getClasses.php?id=" + cookies.id
      )
      .then(({ data }) => {
        if (data) setList(data);
      })
      .catch((err) => console.log(err));
  };

  const columns = [
    { field: "id", headerName: "Class ID", flex: 1 },
    { field: "subject", headerName: "Subject", flex: 1 },
    { field: "section", headerName: "Section", flex: 1 },

    {
      field: "action",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Button
          size="small"
          variant="contained"
          onClick={() => {
            axios
              .get(
                "http://localhost/grading/api/faculty2/getStudents.php?id=" +
                  params.row.id
              )
              .then(({ data }) => {
                if (data) {
                  setStudentList(data);
                  setOpen(true);
                }
              });
          }}
        >
          View Students
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ width: "100%", height: "700px", mt: 1 }}>
        <DataGrid columns={columns} rows={list} />
      </Box>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle sx={{ bgcolor: "primary.light" }}>
          Student List
        </DialogTitle>
        <DialogContent>
          <List>
            {studentList.map((student, index) => (
              <ListItem key={index}>
                <Typography variant="h6">{student}</Typography>
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Classes;
