import { makeStyles } from "tss-react/mui";
import { styled } from "@mui/material/styles";


const Container = styled("div")(({ theme }) => ({
    padding:"25px",
}));


const Form = styled("form")(({ theme }) => ({
    margin: theme.spacing(1),
    minWidth: 120,
    marginBottom: '30px',
}));


const Loading = styled("div")(({ theme }) => ({
    height: '600px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}));


const list = styled("div")(({ theme }) => ({
    height: '75vh',
    overflow: 'auto',
}));


export { Container, Form, Loading, list }


// export default makeStyles((theme) => ({
//     formControl: {
//         margin: theme.spacing(1),
//         minWidth: 120,
//         marginBottom: '30px',
//     },

//     selectEmpty: {
//         marginTop: theme.spacing(2),
//     },

//     loading: {
//         height: '600px',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },

//     container: {
//         padding: '25px',
//     },

//     marginBottom: {
//         marginBottom: '30px',
//     },

//     list: {
//         height: '75vh',
//         overflow: 'auto',
//     },
// }));