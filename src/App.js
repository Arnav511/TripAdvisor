import './App.css';
import React from 'react';
import Header from './Components/Header/Header';
import List from './Components/List/List';
import Maps from './Components/Maps/Maps';
import { CssBaseline, Grid } from '@mui/material';
import { getData } from './APIs/Index';
import { useEffect, useState } from 'react';

function App() {

  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const [bounds, setBounds] = useState(null);
  const [childClicked, setChildClicked] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState("");

  const [filteredPlaces, setFilteredPlaces] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinates({ lat: latitude, lng: longitude })
    })
  }, [])

  useEffect(() => {
    if (bounds) {
      setIsLoading(true);
      getData(type, bounds.sw, bounds.ne)
        .then((data) => {
          setPlaces(data.filter((place) => place.name && place.num_reviews > 0));
          setFilteredPlaces([]);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        })
    }
  }, [bounds, type])

  useEffect(() => {
    if (rating) {
      const filteredPlaces = places.filter((place) => place.rating > rating);
      setFilteredPlaces(filteredPlaces);
    }
  }, [rating])


  return (
    <>
      <CssBaseline />
      <Header setCoordinates={setCoordinates}/>
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List places={filteredPlaces.length?filteredPlaces:places} childClicked={childClicked} isLoading={isLoading} type={type} setType={setType} rating={rating} setRating={setRating}/>
        </Grid>
        <Grid item xs={12} md={8}>
          <Maps setCoordinates={setCoordinates} setBounds={setBounds} coordinates={coordinates} setChildClicked={setChildClicked} places={filteredPlaces.length?filteredPlaces:places}/>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
