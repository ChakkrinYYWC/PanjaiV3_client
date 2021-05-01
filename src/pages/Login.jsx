import Axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { TextField, withStyles, Button } from "@material-ui/core";
import { Link, Redirect } from 'react-router-dom';

import LoginFrom from "../components/authen/loginFrom";

const styles = theme => ({
    container: {
        backgroundColor: 'red'
    }
})

function Login() {
    return (
        <LoginFrom />
    )
}

export default (withStyles(styles)(Login));
//export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(PostPanjaiForm));