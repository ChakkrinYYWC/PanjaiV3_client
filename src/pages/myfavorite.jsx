import Axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { TextField, withStyles, Button } from "@material-ui/core";
import { Link, Redirect } from 'react-router-dom';

import Fav from "../components/Profile/myfav";

function favorite() {
    return (
        <Fav />
    )
}

export default favorite;
//export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(PostPanjaiForm));