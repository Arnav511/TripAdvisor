import React, { useState } from 'react'
import { Autocomplete } from '@react-google-maps/api'
import { AppBar, Toolbar, Typography, InputBase, Box } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { StyledEngineProvider } from '@mui/material'
import { Search, SearchIconWrapper, StyledInputBase } from './Styles'

export default function Header(props) {

    const [autocomplete, setAutocomplete] = useState(null)

    const onLoad = (autoC) => {
        setAutocomplete(autoC)
    }

    const onPlaceChanged = (place) => {
        const lat = autocomplete.getPlace().geometry.location.lat()
        const lng = autocomplete.getPlace().geometry.location.lng()
        props.setCoordinates({ lat, lng })
    }

    return (
        // <AppBar position="static">
        //     <Toolbar className="toolbar">
        //         <Typography variant="h5" className="title">
        //             Travel Advisor
        //         </Typography>
        //         <Box style={{display:"flex"}}>
        //             <Typography variant="h6" className="title">
        //                 Explore new places
        //             </Typography>
        //             <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
        //                 <div className="search">
        //                     <div className="searchIcon">
        //                         <SearchIcon />
        //                     </div>
        //                     <StyledEngineProvider injectFirst>
        //                         <InputBase placeholder="Search..."/>
        //                     </StyledEngineProvider>
        //                 </div>
        //             </Autocomplete>
        //         </Box>
        //     </Toolbar>
        // </AppBar>
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar style={{backgroundColor:"#18339d"}}>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                        >
                            Travel Advisor
                        </Typography>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    )
}
