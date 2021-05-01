import Axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { TextField, withStyles, Button } from "@material-ui/core";
import { Link, Redirect } from 'react-router-dom';
import AroundME from '../pages/aroundME'
import { store } from "../action/store";
import { Provider } from "react-redux";
import ButterToast, { POS_RIGHT, POS_TOP } from "butter-toast";

import User from '../components/admin/User'
import Noti_report from '../components/admin/Noti'
import Black from '../components/admin/Blacklist'

import Search from "../components/search/search";

function search() {
    return (
        <>
            <Search />
            {/* <AroundME /> */}
            <Black />
            <User />
            <Provider store={store}>
                <Noti_report />
                <ButterToast position={{ vertical: POS_TOP, horizontal: POS_RIGHT }} />
            </Provider>
        </>
    )
}

export default search;
//export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(PostPanjaiForm));