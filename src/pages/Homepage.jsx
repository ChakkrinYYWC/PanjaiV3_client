import Axios from 'axios';
import React from 'react';
import { useState } from 'react';
import Foundation from './aroundME'
import Home from '../components/homepage/Homepage'
import Search from '../components/search/search'
import { store } from "../action/store";
import { Provider } from "react-redux";
import ButterToast, { POS_RIGHT, POS_TOP } from "butter-toast";

import User from '../components/admin/User'
import Noti_report from '../components/admin/Noti'
import Black from '../components/admin/Blacklist'

import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link,
    Redirect
} from "react-router-dom";

/*----------------------------------------------------------------------*/
function Homepage() {

    return (
        <>
            {/* <Link to="/login">Login</Link><br />
            <Link to="/register">Register</Link><br />
            <Link to="/Too_panjai">Too panjai</Link><br /> */}
            {/* <Foundation/> */}
            <Home />
            <Black />
            <User />
            <Provider store={store}>
                <Noti_report />
                <ButterToast position={{ vertical: POS_TOP, horizontal: POS_RIGHT }} />
            </Provider>
            {/* <Black/>
            <Uad/> */}
            {/* <Search/> */}
        </>

    )
}

export default Homepage;