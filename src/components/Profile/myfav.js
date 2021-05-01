import React, { useState, useEffect, Fragment } from "react";
import "./profile.css";
import Axios from "axios";
import {
  Divider,
  Grid,
  Paper,
  Typography,
  withStyles,
  ListItem,
  ListItemText,
  Container,
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import moment from "moment";
import { ACTION_TYPES } from "../../action/postPanjai";
import SlideShow from "react-image-show";

const styles = (theme) => ({
  paper: {
    margin: theme.spacing(3),
    padding: theme.spacing(2),
  },
  smMargin: {
    "&:hover": {
      backgroundColor: "rgba(85, 52, 4, 0.925)",
    },
    margin: theme.spacing(1),
    background: "rgba(187, 130, 44, 0.925)",
  },
  smMargin1: {
    "&:hover": {
      backgroundColor: "rgba(85, 52, 4, 0.925)",
    },
    margin: theme.spacing(1),
    background: "#a13800",
  },
  // actionDiv: {
  //     textAlign: "center"
  // },
  post1: {
    boxShadow: "0 2px 3px 2px rgba(85, 52, 4, 0.925)",
    height: "auto",
    padding: "30px 30px",
    marginBlock: "15px",
  },
  framepost: {
    // background: '#f9a825',

    boxShadow: "1px   1px 1px 1px rgba(187, 130, 44, 0.925)",
    color: "rgba(187, 130, 44, 0.925)",
    height: "auto",
    padding: "10px 10px",
    borderRadius: "20px",
    maxWidth: "100%",
  },
  frampicture: {
    padding: "10px 10px",
  },
  picture: {
    height: "150px",
    width: "auto",
    margin: "10px auto",
  },
  frontpost: {
    fontFamily: "mali",
    borderRadius: "50px",
  },
  color1: {
    color: "#a13800",
  },

  // judjudjud: {
  //     marginLeft: '20px'

  // },
});

function Myfav({ classes }) {
  const currentUser = localStorage.getItem("currentUser");
  const currentUser_email = localStorage.getItem("currentUser_email");
  const currentUser_phone = localStorage.getItem("currentUser_phone");
  const currentUser_address = localStorage.getItem("currentUser_address");
  const currentUser_id = localStorage.getItem("currentUser_id");
  var Array_image = [];
  const [fav, setFav] = useState([]);

  function GetFav() {
    Axios.post("/profile/favorite/" + currentUser_id, {})
      .then((res) => {
        console.log(res);
        setFav(res.data);
      })
      .catch((error) => console.log(error));

    console.log("fav" + fav);
    return false;
  }

  const requestItem = (id) => {
    const data = { currentUser_id, currentUser };
    Axios.post("/Too-Panjai/addRequest/" + id, data, {})
      .then((res) => {
        console.log(res);
      })
      .catch((error) => console.log(error));
  };



  const unfavoriteItem = (id) => {
    const data = { currentUser_id, currentUser };
    Axios.post("/Too-Panjai/addFav/" + id, data, {})
      .then((res) => {
        console.log(res);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    GetFav()
  }, [])

  return (
    <Container style={{ marginTop: '30px' }}>
      <Grid container style={{ padding: '0 auto' }} spacing={4}>

        {fav.map((record, index) => {
          return (
            <Grid item xs={12} sm={4}>
              {/* {index} */}
              <Paper className={classes.framepost}>
                <Fragment key={index}>
                  <ListItem>
                    <ListItemText>
                      <Typography
                        variant="h5"
                        className={`${classes.color1} ${classes.frontpost}`}
                      >
                        {record.title}
                      </Typography>

                      <div className={classes.frontpost}>
                        ข้อมูล : {record.message}
                      </div>

                      {
                        ((Array_image = []),
                          record.image.map((image, index) => {
                            Array_image.push(
                              "http://localhost:3001/image/" + image
                            );
                          }),
                          (
                            <Grid container justify="center">
                              <SlideShow className="imageslide"
                                images={record.image}
                                width="400px"
                                imagesWidth="300px"
                                imagesHeight="180px"
                                imagesHeightMobile="56vw"
                                thumbnailsWidth="350px"
                                thumbnailsHeight="12vw"
                                className={classes.picture}
                                indicators  fixedImagesHeight
                              />
                            </Grid>
                          ))
                      }

                      <div className={`${classes.color1} ${classes.frontpost}`}>
                        เวลาที่ลง : {moment(record.Timestamp).calendar()}
                      </div>
                      <div className={`${classes.color1} ${classes.frontpost}`}>
                        โทร : {record.contect}
                      </div>
                      <div className={`${classes.color1} ${classes.frontpost}`}>
                        จังหวัด : {record.location}
                      </div>
                      <div className={`${classes.color1} ${classes.frontpost}`}>
                        ผู้สร้าง : {record.creator}
                      </div>

                      <Grid container justify="center">
                        <div className={classes.botton1}>
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            className={`${classes.smMargin} ${classes.frontpost}`} // จำเป็น
                            onClick={() => requestItem(record._id)}
                          >
                            ขอรับ
                          </Button>
                          <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            className={`${classes.smMargin1} ${classes.frontpost}`}
                            onClick={() => unfavoriteItem(record._id)}
                          >
                            เลิกถูกใจ
                          </Button>
                        </div>
                      </Grid>

                      {/* รูปแบบช่อง */}
                    </ListItemText>
                  </ListItem>
                  {/* <Divider component='li' /> */}
                </Fragment>
              </Paper>
            </Grid>

            // <div>
            //     <h1>{record.title}</h1><br/>ข้อมูล: {record.message}<br/>ผู้สร้าง: {record.creator}<br/><br/>
            // </div>
          );
        })}
      </Grid>
    </Container>
  );
}

export default withStyles(styles)(Myfav);
