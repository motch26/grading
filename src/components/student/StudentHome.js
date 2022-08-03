import React from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { AccountCircle, PersonAdd, School } from "@mui/icons-material";
import { grey } from "@mui/material/colors";
import { DataGrid } from "@mui/x-data-grid";
const StudentHome = () => {
  const columns = [
    { field: "id", headerName: "Class ID", flex: 1 },
    { field: "subject", headerName: "Subject", flex: 1 },
    { field: "faculty", headerName: "Faculty", flex: 1 },
    { field: "mid", headerName: "Mid Term", flex: 1 },
    { field: "end", headerName: "End Term", flex: 1 },
    { field: "average", headerName: "Average", flex: 1 },
  ];

  return (
    <Box>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Avatar sx={{ bgcolor: "primary.light", mr: 2 }}>
            <School />
          </Avatar>
          <Typography variant="h6" sx={{ mr: "auto" }}>
            Class Management System
          </Typography>
          <Avatar sx={{ bgcolor: "primary.light", mr: 1 }}>
            <AccountCircle />
          </Avatar>
          <Typography variant="h6" sx={{ mr: 3 }}>
            Student
          </Typography>
          <Button variant="contained" disableElevation>
            LOGOUT
          </Button>
        </Toolbar>
      </AppBar>
      <Grid container sx={{ height: "90vh" }}>
        <Grid item sm={2}>
          <List>
            <ListItemButton>
              <ListItemIcon>
                <PersonAdd />
              </ListItemIcon>
              <ListItemText primary="Classes" />
            </ListItemButton>
          </List>
          <Divider />
        </Grid>
        <Grid item sm={10}>
          <Box
            sx={{
              p: 5,
              bgcolor: grey[100],
              alignSelf: "flex-end",
              height: "100%",
            }}
          >
            <Box sx={{ width: "100%", height: "700px", mt: 1 }}>
              <DataGrid columns={columns} rows={[]} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StudentHome;
