import React, { useState } from 'react'
import { Autocomplete } from '@react-google-maps/api'
import { AppBar, Toolbar, Typography, InputBase, Box } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { Search, SearchIconWrapper, StyledInputBase } from './Styles'

export default function Header({ setCoordinates }) {

    // const classes = {
    //     title: {
    //         display: 'none',
    //         [theme.breakpoints.up('sm')]: {
    //             display: 'block',
    //         },
            
    //         @media(min-width)
    //     },
    //     search: {
    //         position: 'relative',
    //         borderRadius: theme.shape.borderRadius,
    //         backgroundColor: alpha(theme.palette.common.white, 0.15),
    //         '&:hover': { backgroundColor: alpha(theme.palette.common.white, 0.25) },
    //         marginRight: theme.spacing(2),
    //         marginLeft: 0,
    //         width: '100%',
    //         [theme.breakpoints.up('sm')]: { marginLeft: theme.spacing(3), width: 'auto' },
    //     },
    //     searchIcon: {
    //         padding: theme.spacing(0, 2), 
    //         height: '100%', 
    //         position: 'absolute', 
    //         pointerEvents: 'none', 
    //         display: 'flex', 
    //         alignItems: 'center', 
    //         justifyContent: 'center',
    //     },
    //     inputRoot: {
    //         color: 'inherit',
    //     },
    //     inputInput: {
    //         padding: theme.spacing(1, 1, 1, 0), 
    //         paddingLeft: `calc(1em + ${theme.spacing(4)}px)`, 
    //         transition: theme.transitions.create('width'), 
    //         width: '100%', 
    //         [theme.breakpoints.up('md')]: { width: '20ch' },
    //     },
    //     toolbar: {
    //         display: 'flex', 
    //         justifyContent: 'space-between',
    //     },
    // }

    const [autocomplete, setAutocomplete] = useState(null)

    const onLoad = (autoC) => {
        setAutocomplete(autoC)
    }

    const onPlaceChanged = () => {
        const lat = autocomplete.getPlace().geometry.location.lat()
        const lng = autocomplete.getPlace().geometry.location.lng()
        setCoordinates({ lat, lng })
    }

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar style={{ backgroundColor: "#18339d" }}>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                        >
                            Trip Advisor
                        </Typography>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                                <StyledInputBase
                                    placeholder="Search…"
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </Autocomplete>
                        </Search>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    )
}
