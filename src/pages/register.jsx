import React from 'react';
import RegisterFrom from "../components/authen/registerForm";
import { Container, AppBar, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles({

//     primary: {
//         background: 'white',
//         padding: '10px 10px 10px 20px',
//         marginBlock: '15px'
//     },
//     toopanjaitext: {
//         color: 'rgba(187, 130, 44, 0.925)',
//         fontFamily: 'mali',
//         fontSize: '36px'
//     }


// });

function Register() {
    return (
        <RegisterFrom />
    );
}

export default Register;