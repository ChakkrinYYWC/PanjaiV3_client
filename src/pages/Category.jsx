import React, { useEffect, useState } from 'react';
import Category from "../components/category/category";
import PostFDT from "../components/foundation/PostFDT";
import ButterToast, { POS_RIGHT, POS_TOP } from "butter-toast";
import { Fab, withStyles, Typography, IconButton, Dialog } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';
import User from '../components/admin/User'
import Noti_report from '../components/admin/Noti'
import Black from '../components/admin/Blacklist'



const styles = theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),

    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],

    },
    margin: {
        margin: theme.spacing(1),

    },
    extendedIcon: {
        marginRight: theme.spacing(1),

    },
    button: {
        background: 'red',
        color: ' rgba(141, 90, 18, 0.925)',

    }
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});



const mystyle = {
    color: "white",
    backgroundColor: "rgb(172, 115, 57)",
    padding: "10px",
    fontFamily: "Arial",
    padding: "22px",
    float: "right",
    margin: "25% 10% 0px 0px"
};

function Catego({ classes, ...props }) {

    const [current, setCurrent] = useState(0)
    const [open, setOpen] = React.useState(false);
    const [currentId, setCurrentId] = useState(props)
    const currentUser = localStorage.getItem('currentUser')

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };



    return (

        <>
            <If condition={currentUser == 'admin'}>
                <Then>

                    <Category {...{ currentId, setCurrentId }} />

                    <Fab style={mystyle} size="small" aria-label="add" onClick={handleClickOpen} >
                        <AddIcon />
                    </Fab>

                    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                            Post Foundation
                        </DialogTitle>
                        <PostFDT {...{ current, setCurrent }} />
                        <ButterToast position={{ vertical: POS_TOP, horizontal: POS_RIGHT }} />
                    </Dialog>

                </Then>
                <Else>
                    <Category {...{ currentId, setCurrentId }} />

                </Else>
            </If>
            <Black />
            <User />

            <Noti_report />
            <ButterToast position={{ vertical: POS_TOP, horizontal: POS_RIGHT }} />

        </>

    );



}

export default Catego;