import React from "react";
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from "@mui/material";

import PlaceDetails from "../PlaceDetails/PlaceDetails";


export default function List({ places, childClicked, isLoading, type, setType, rating, setRating }) {

  const [elRefs, setElRefs] = React.useState([]);

  React.useEffect(() => {
    const refs = Array(places?.length).fill().map((_, i) => elRefs[i] || React.createRef());
    setElRefs(refs);
  }, [places]);


  const classes = {
    formControl: {
      margin: "8px",
      minWidth: 120,
      marginBottom: '30px',
    },

    selectEmpty: {
      marginTop: "16px",
    },

    loading: {
      height: '600px',
      display: 'flex',
      justifyContent: "center",
      alignItems: 'center',
    },

    container: {
      padding: '25px',
    },

    marginBottom: {
      marginBottom: '30px',
    },

    list: {
      height: '75vh',
      overflow: 'auto',
    },
  }

  return (
    <div style={classes.container}>
      <Typography variant="h4">Restaurants, Hotels and Attractions around you</Typography>
      <FormControl sx={{ m: 1, minWidth: 120 }} style={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type}
          label="Type"
          onChange={(e) => setType(e.target.value)}
        >
          <MenuItem value="restaurants">Restaurants</MenuItem>
          <MenuItem value="hotels">Hotels</MenuItem>
          <MenuItem value="attractions">Attractions</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }} style={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Rating</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={rating}
          label="Rating"
          onChange={(e) => setRating(e.target.value)}
        >
          <MenuItem value={0}>All</MenuItem>
          <MenuItem value={3}>Above 3.0</MenuItem>
          <MenuItem value={4}>Above 4.0</MenuItem>
          <MenuItem value={4.5}>Above 4.5</MenuItem>
        </Select>
      </FormControl>
      {isLoading ? (
        <div style={classes.loading}>
          <CircularProgress />
        </div>
      ) : (
        <>
          <Grid container spacing={3} style={classes.list}>
            {places?.map((place, i) => (
              <Grid item key={i} xs={12}>
                <PlaceDetails place={place} selected={Number(childClicked) === i} refProp={elRefs[i]} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  )
}