import Axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { Provider } from "react-redux";
import PostPanjai from "../components/PostPanjai/PostPanjai";
import { store } from "../action/store";
import { Container, AppBar, Typography } from "@material-ui/core";
import ButterToast, { POS_RIGHT, POS_TOP } from "butter-toast";
import { createMuiTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

import User from '../components/admin/User'
import Noti_report from '../components/admin/Noti'
import Black from '../components/admin/Blacklist'

const useStyles = makeStyles({

    primary: {
        background: 'white',
        padding: '10px 10px 10px 20px',
        marginBlock: '15px',
        // boxShadow: '0 5px 6px 5px rgba(187, 130, 44, 0.925)',     
    },

    toopanjaitext: {
        color: ' rgba(141, 90, 18, 0.925)',
        fontFamily: 'mali',
        fontSize: '30px',
        fontWeight: 'bold'

    },
    bg: {
        backgroundColor: 'rgb(255, 236, 179)',



    }



});

function Too_panjai() {
    const classes = useStyles();
    return (
        <div className={classes.bg} >

            <Provider store={store} >
                <Container maxWidth="lg" >

                    <div position="static" className={classes.bg} >


                        <Typography
                            variant="h2"
                            align="center">
                            {/* ข้อความ */}
                            <span className={classes.toopanjaitext}>ตู้ ปั น ใ จ</span>
                        </Typography>
                    </div>
                    <PostPanjai />
                    <ButterToast position={{ vertical: POS_TOP, horizontal: POS_RIGHT }} />
                </Container>
            </Provider>
            <Black />
            <User />
            <Provider store={store}>
                <Noti_report />
                <ButterToast position={{ vertical: POS_TOP, horizontal: POS_RIGHT }} />
            </Provider>
        </div>
    );
}

export default Too_panjai;