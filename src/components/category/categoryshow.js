import React, { useState, useEffect } from 'react';
import './category.css'
import './categoryshow.css'
import moment from 'moment';
import Form from './Form'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import PostFDT from "../foundation/PostFDT";
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import { Fab, withStyles, Typography, IconButton } from '@material-ui/core';
import ButterToast, { POS_RIGHT, POS_TOP, Cinnamon } from "butter-toast";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded';
import { DeleteSweep } from "@material-ui/icons";
import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';
import { Link, useHistory } from 'react-router-dom';
import { Redirect } from 'react-router'
import GoogleMapReact from 'google-map-react';
import Axios from 'axios';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";

import ButtonGroup from '@material-ui/core/ButtonGroup';
import SlideShow from 'react-image-show';
import { Grid } from '@material-ui/core';
// import Slideshow from "./PostPanjai/Slideshow";  
const { compose, withProps, withStateHandlers } = require("recompose");

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
    extendedIcon: {
        marginRight: theme.spacing(0),
    }
});

const DialogTitle2 = withStyles(styles)((props) => {
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

function Categoryshow({ classes, ...props }) {

    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [current, setCurrent] = useState(0)
    const currentUser = localStorage.getItem('currentUser')
    const [lat, setLat] = useState();
    const [lng, setLng] = useState();
    const [name, setName] = useState();
    const [dataFDT, setdataFDT] = useState([])

    var Array_image = [];

    useEffect(() => {

        Axios.get('/Foundation/getid/' + props.currentId.match.params.id, {
        }).then(async res => {
            await setdataFDT(res.data)
            // await setdataFDT(res.data.sort((a, b) => (a._id > b._id ? -1 : 1))) //sortdata
        }).catch(error => console.log(error))
        //props.fetchAllPostFDT()
    }, [])


    const handleClickOpen = () => {
        if(currentUser != "null"){
            setOpen(true);
        }else{
            window.location.href = "/Login"
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpenFDT = id => {
        setOpen2(true);
        setCurrent(id);
    };

    const handleCloseFDT = () => {
        setOpen2(false);
    };

    const handleClickOpenMap = (e) => {
        const data = { data: props.currentId.match.params.id }
        Axios.post('/Foundation/map', data, {
        }).then(res => {
            //console.log(res.data.lat)
            setLat(res.data.lat)
            setLng(res.data.lng)
        }).catch(error => console.log(error))
        setOpen3(true);
        setName(e)
    };

    const handleCloseMap = () => {
        setOpen3(false);
    };

    const onDelete = id => {
        const onSuccess = () => {
            ButterToast.raise({
                content: <Cinnamon.Crisp title="มูลนิธิ"
                    content="ลบโพสต์สำหรับมูลนิธิเสร็จสมบูรณ์"
                    scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                    icon={<DeleteSweep />}
                />
            })

            window.location.href = "/Foundation/" + props.currentId.match.params.name
        }
        if (window.confirm('ต้องการลบโพสนี้ใช่หรือไม่?')) {
            Axios.delete('/Foundation/' + id, {
            }).then(async res => {
              onSuccess()
            }).catch(error => console.log(error))
        }
    }

    const MapWithAMarker = compose(
        withStateHandlers(() => ({
            isOpen: true,
        }), {
            onToggleOpen: ({ isOpen }) => () => ({
                isOpen: !isOpen,
            })
        }),
        withScriptjs,
        withGoogleMap
    )(props =>
        <GoogleMap
            defaultZoom={15}
            defaultCenter={{ lat: lat, lng: lng }}
        >
            <Marker
                position={{ lat: lat, lng: lng }}
                onClick={props.onToggleOpen}
            >
                {props.isOpen && <InfoWindow onCloseClick={props.onToggleOpen}>
                    <h1>{name}</h1>
                </InfoWindow>}
            </Marker>
        </GoogleMap>
    );

    return (
        <>
            <div className="postfdt">
                <If condition={currentUser == 'admin'}>

                    <Then>
                        <div className="box-box">

                            <Fab className="botton" size="small" color="back" aria-label="edit" onClick={() => handleClickOpenFDT(dataFDT._id)} >
                                <EditOutlinedIcon />
                            </Fab>

                            <Dialog
                                onClose={handleCloseFDT}
                                aria-labelledby="customized-dialog-title"
                                open={open2}
                            >
                                <DialogTitle2 id="customized-dialog-title" onClose={handleCloseFDT}>
                                    แก้ไขข้อมูลโครงการ
                                </DialogTitle2>

                                <PostFDT {...{ current, setCurrent }} />
                                <ButterToast position={{ vertical: POS_TOP, horizontal: POS_RIGHT }} />
                            </Dialog>


                            <Fab className="botton" size="small" color="back" aria-label="add" onClick={() => onDelete(dataFDT._id)} >
                                <DeleteOutlineRoundedIcon />
                            </Fab>
                            <center>
                                <div className="btcate">
                                    <ButtonGroup variant="text" aria-label="text primary button group">
                                        <Button href="/Foundation/เด็กและเยาวชน">เด็กและเยาวชน</Button>
                                        <Button href="/Foundation/ผู้สูงอายุ">ผู้สูงอายุ</Button>
                                        <Button href="/Foundation/สัตว์">สัตว์</Button>
                                        <Button href="/Foundation/ผู้พิการและผู้ป่วย">ผู้พิการและผู้ป่วย</Button>
                                        <Button href="/Foundation/สิ่งแวดล้อม">สิ่งแวดล้อม</Button>
                                        <Button href="/Foundation/อื่นๆ">อื่นๆ</Button>
                                    </ButtonGroup>
                                </div>

                            </center>
                            <div className="Tt">{dataFDT.title}</div>
                            <center>
                                < Grid container justify="center">
                                    <SlideShow className="imageslide"
                                        images={dataFDT.image}

                                        imagesWidth="600px"
                                        imagesHeight="400px"
                                        imagesHeightMobile="22vw"

                                        thumbnailsWidth="920px"
                                        thumbnailsHeight="12vw"

                                        indicators thumbnails fixedImagesHeight
                                    />
                                </Grid>
                                {/* <div className="image01"> */}

                            </center>
                            <div className="map">
                                <center>
                                    <Button className="map" variant="contained" onClick={() => handleClickOpenMap(dataFDT.title)} >
                                        แผนที่
                                                    </Button>
                                </center>
                            </div>

                            <Dialog className="ap"
                                // fullScreen={fullScreen}
                                onClose={handleCloseMap}
                                aria-labelledby="customized-dialog-title"
                                open={open3}
                            >
                                <div className="pagemap">
                                    <DialogTitle id="customized-dialog-title" onClose={handleCloseMap} fullScreen={fullScreen} >
                                        แผนที่{dataFDT.title}
                                    </DialogTitle>

                                    <DialogContent>
                                        <DialogContentText>
                                            <MapWithAMarker
                                                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC8YoATcEUeQOTMNL6a0V3gDas0yFDV-rg&v=3.exp&libraries=geometry,drawing,places"
                                                loadingElement={<div style={{ height: `100%` }} />}
                                                containerElement={<div style={{ height: `400px` }} />}
                                                mapElement={<div style={{ height: `100%` }} />}
                                            />
                                        </DialogContentText>
                                    </DialogContent>

                                    <DialogActions>
                                        <Button onClick={handleCloseMap} color="primary">
                                            ยกเลิก
                                                    </Button>
                                    </DialogActions>
                                </div>
                            </Dialog>
                            <div className="info">{dataFDT.message}</div>
                            <center><h1 className="totaldonate">ยอดเงินบริจาค : {new Intl.NumberFormat().format(dataFDT.money)} บาท </h1> </center>
                            <div className="bx">
                                <div className="logo" ><i className="fab fa-gratipay"></i></div>
                                <div className="infor">สิ่งของที่ต้องการ : {dataFDT.item} </div>
                                <div className="infor">จำนวน : {dataFDT.n_item} บาท</div>
                                <div className="infor">ที่อยู่ : {dataFDT.address}</div>
                                <div className="infor">เบอร์โทรศัพท์ : {dataFDT.phone} </div>
                                <div className="infor">วันที่ลง : {moment(dataFDT.Timestamp).calendar()}</div>
                                {/* <div className="infor">วันสิ้นสุดโครงการ : {moment(dataFDT.endtime).calendar()}</div> */}
                                {/* <div className="infor">วันที่สิ้นสุดโครงการ : {dataFDT.endtime}</div> */}
                                <div className="infor">วันสิ้นสุดโครงการ : {moment(dataFDT.endtime).format('L')}</div>
                            </div>
                            <center><Button variant="contained" onClick={handleClickOpen}>
                            <i class="far fa-heart"></i> &nbsp; ร่วมบริจาค &nbsp;<i class="far fa-heart"></i>
                                            </Button></center>

                            <Dialog
                                // fullScreen={fullScreen}
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="responsive-dialog-title"
                            >
                                <div className="popupdonate">
                                    <div className="namefdt">
                                        <DialogTitle id="responsive-dialog-title">บริจาคให้กับ {dataFDT.title}</DialogTitle>
                                    </div>
                                    <DialogContent>
                                        <DialogContentText>
                                            <Form {...dataFDT} />
                                            <ButterToast position={{ vertical: POS_TOP, horizontal: POS_RIGHT }} />
                                        </DialogContentText>
                                    </DialogContent>

                                    <DialogActions>
                                        <Button onClick={handleClose} color="primary">
                                            ยกเลิก
                                        </Button>
                                    </DialogActions>
                                </div>
                            </Dialog>
                        </div>
                    </Then>









                    <Else>
                        <div className="box-box">

                            <center>
                                <div className="btcate">

                                    <ButtonGroup variant="text" aria-label="text primary button group">
                                        <Button href="/Foundation/เด็กและเยาวชน">เด็กและเยาวชน</Button>
                                        <Button href="/Foundation/ผู้สูงอายุ">ผู้สูงอายุ</Button>
                                        <Button href="/Foundation/สัตว์">สัตว์</Button>
                                        <Button href="/Foundation/ผู้พิการและผู้ป่วย">ผู้พิการและผู้ป่วย</Button>
                                        <Button href="/Foundation/สิ่งแวดล้อม">สิ่งแวดล้อม</Button>
                                        <Button href="/Foundation/อื่นๆ">อื่นๆ</Button>
                                    </ButtonGroup>
                                </div>

                            </center>

                            <div className="Tt">{dataFDT.title}</div>

                            <center>

                                < Grid container justify="center">
                                    <SlideShow className="imageslide"
                                        images={dataFDT.image}

                                        imagesWidth="600px"
                                        imagesHeight="400px"
                                        imagesHeightMobile="22vw"

                                        thumbnailsWidth="920px"
                                        thumbnailsHeight="12vw"

                                        indicators thumbnails fixedImagesHeight
                                    />
                                </Grid>
                            </center>

                            <div className="map">
                                <center>
                                    <Button className="map" onClick={handleClickOpenMap} variant="contained" >
                                        แผนที่
                                                    </Button>
                                </center>
                            </div>
                            <Dialog className="ap"
                                // fullScreen={fullScreen}
                                onClose={handleCloseMap}
                                aria-labelledby="customized-dialog-title"
                                open={open3}
                            >
                                <div className="pagemap">
                                    <DialogTitle id="customized-dialog-title" onClose={handleCloseMap}>
                                        แผนที่{dataFDT.title}
                                    </DialogTitle>

                                    <DialogContent>
                                        <DialogContentText>
                                            <MapWithAMarker
                                                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC8YoATcEUeQOTMNL6a0V3gDas0yFDV-rg&v=3.exp&libraries=geometry,drawing,places"
                                                loadingElement={<div style={{ height: `100%` }} />}
                                                containerElement={<div style={{ height: `400px` }} />}
                                                mapElement={<div style={{ height: `100%` }} />}
                                            />
                                        </DialogContentText>
                                    </DialogContent>

                                    <DialogActions>
                                        <Button onClick={handleCloseMap} color="primary">
                                            ยกเลิก
                                                    </Button>
                                    </DialogActions>
                                </div>
                            </Dialog>

                            <div className="info">{dataFDT.message}</div>
                            <center><h1 className="totaldonate">ยอดเงินบริจาค : {new Intl.NumberFormat().format(dataFDT.money)} บาท</h1> </center>
                            <div className="bx">

                                <div className="logo" ><i className="fab fa-gratipay"></i></div>
                                <div className="infor">สิ่งของที่ต้องการ : {dataFDT.item}</div>
                                <div className="infor">จำนวน : {dataFDT.n_item} บาท</div>
                                <div className="infor">ที่อยู่ : {dataFDT.address}</div>
                                <div className="infor">เบอร์โทรศัพท์ : {dataFDT.phone} </div>
                                <div className="infor">วันที่ลง : {moment(dataFDT.Timestamp).calendar()}</div>
                                {/* <div className="infor">วันสิ้นสุดโครงการ : {moment(datafdt.endtime).calendar()}</div> */}
                                <div className="infor">วันสิ้นสุดโครงการ : {moment(dataFDT.endtime).format('L')}</div>
                            </div>
                            <center >

                                <Button variant="contained" onClick={handleClickOpen}>
                                <i class="far fa-heart"></i> &nbsp; ร่วมบริจาค &nbsp;<i class="far fa-heart"></i>
                                                </Button>

                            </center>

                            <Dialog
                                // fullScreen={fullScreen}
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="responsive-dialog-title"
                            >
                                <div className="popupdonate">
                                    <div classname="namefdt">
                                        <DialogTitle id="responsive-dialog-title">บริจาคให้กับ {dataFDT.title}</DialogTitle>
                                    </div>
                                    <DialogContent>
                                        <DialogContentText>
                                            <Form {...dataFDT} />
                                            <ButterToast position={{ vertical: POS_TOP, horizontal: POS_RIGHT }} />
                                        </DialogContentText>
                                    </DialogContent>

                                    <DialogActions>
                                        <Button onClick={handleClose} color="primary">
                                            ยกเลิก
                                                    </Button>
                                    </DialogActions>
                                </div>
                            </Dialog>
                        </div>
                    </Else>

                </If>

            </div>

        </>
    );
}



export default Categoryshow;

