import React from 'react'
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select, TextField } from '@mui/material'
import { useState, useEffect, createRef } from 'react'
import { Container, Form, list, Loading } from './Styles'
import PlaceDetails from '../PlaceDetails/PlaceDetails'

export default function List(props) {

  const type = props.type
  const setType = props.setType
  const rating = props.rating
  const setRating = props.setRating

  let places = props.Places.data
  console.log(places)

  // let places = [{ name: "test" , Rating:'3'}]
  // console.log(classes);

  const handleType = (event) => {
    setType(event.target.value)
  }

  const handleRating = (event) => {
    setRating(event.target.value)
  }

  const [elRefs, setElRefs] = useState([])

  useEffect(() => {
    const refs = Array(places && places.length).fill().map((_, i) => elRefs[i] || createRef())
    setElRefs(refs)
  }, [places])


  return (
    <Container>
      <Typography variant="h4">Restaurants, Hotels and Attractions around you</Typography>
      {props.isLoading ? (
        <Loading >
          <CircularProgress size="5rem" />
        </Loading>
      ) : (
        <>
          <Form>
            <TextField
              id="standard"
              select
              label="Type"
              helperText="Select your Type" 
              variant="standard"
              style={{ width: "15ch", marginRight: "10px" }}
              onChange={handleType}
            >
              <MenuItem value="restaurants">Restaurants</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
            </TextField>

            <TextField
              id="standard"
              select
              label="Rating"
              helperText="Select your Rating" 
              variant="standard"
              style={{ width: "15ch", marginLeft: "10px" }}
              onChange={handleRating}
            >
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={3}>Above 3.0</MenuItem>
              <MenuItem value={4}>Above 4.0</MenuItem>
              <MenuItem value={4.5}>Above 4.5</MenuItem>
            </TextField>
          </Form>
          <list container spacing={3} >
            {places ? places.map((place, i) => (
              <Grid item key={i} xs={12}>
                <PlaceDetails place={place} selected={Number(props.childClicked) === i} refProp={elRefs[i]} />
              </Grid>
            )) : "No Places Found"}
          </list>
        </>
      )}
    </Container>
  )
}
