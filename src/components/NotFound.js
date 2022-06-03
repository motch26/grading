import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";

const NotFound = () => {
  return (
    <Container>
      <Box sx={styles.box}>
        <Typography variant="h1" component="h1">
          Page not Found!
        </Typography>
        <Button href="/" variant="contained">
          Back to Home
        </Button>
      </Box>
    </Container>
  );
};

const styles = {
  box: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default NotFound;
