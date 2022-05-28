import { Box } from "@mui/system";
import "./Dashboard.css";
import * as React from "react";
import { Grid } from "@mui/material";
import SavedCard from "./SavedCard";
import CurrentlyReading from './CurrentlyReading'

export default () => {
  const [savedBooks, setSavedBooks] = React.useState();
  const [currentlyReading, setCurrentlyReading] = React.useState();

  return (
    <Box className="dashboard">
      <Grid container spacing={2}>
        <Grid item md={2}></Grid>
        <Grid item md={8}>
          <SavedCard />
        </Grid>
        <Grid item md={2}></Grid>
        <Grid item md={2}></Grid>
        <Grid item md={8}>
          <CurrentlyReading/>
        </Grid>
        <Grid item md={2}></Grid>
      </Grid>
    </Box>
  );
};
