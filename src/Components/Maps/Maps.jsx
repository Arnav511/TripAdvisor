import React from 'react'
import { useLoadScript } from '@react-google-maps/api'
import { Paper, Typography, useMediaQuery } from '@mui/material'
import { Rating } from '@mui/material'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import GoogleMapReact from 'google-map-react'


export default function Maps({ setCoordinates, setBounds, coordinates, places, setChildClicked }) {

  const isDesktop = useMediaQuery('(min-width:600px)')

  const [isHovering, setIsHovering] = React.useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const classes = {
    paper: {
      padding: '10px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      width: '100px',
    },
    mapContainer: {
      height: '100vh',
      width: '100%',
    },
    markerContainer: {
      position: 'absolute',
      transform: 'translate(-50%, -50%)',
      zIndex:isHovering? 1 : 2,
    },
    pointer: {
      cursor: 'pointer',
    },
  }

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  })

  if (!isLoaded) return <div>Loading...</div>
  return (
    <>
      <div style={classes.mapContainer}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
          defaultCenter={coordinates}
          center={coordinates}
          zoom={14}
          margin={[50, 50, 50, 50]}
          onChange={(event) => {
            setCoordinates({ lat: event.center.lat, lng: event.center.lng });
            setBounds({ ne: event.marginBounds.ne, sw: event.marginBounds.sw });
          }}
          onChildClick={(child) => {
            setChildClicked(child)
          }}
        >
          {places?.map((place, i) => (
            <div
              style={classes.markerContainer}
              lat={Number(place.latitude)}
              lng={Number(place.longitude)}
              key={i}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {
                !isDesktop ? (
                  <LocationOnOutlinedIcon color="primary" fontSize="large" />
                ) : (
                  <Paper elevation={3} style={classes.paper}>
                    <Typography variant="subtitle2" gutterBottom>
                      {place.name}
                    </Typography>
                    <img
                      style={classes.pointer}
                      src={
                        place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'
                      }
                      alt={place.name}
                    />
                    <Rating size="small" value={Number(place.rating)} readOnly />
                  </Paper>
                )
              }
            </div>
          ))}
        </GoogleMapReact>
      </div>
    </>
  )
}

