import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import * as action from "../../action/postPanjai";
import {
  Divider,
  Grid,
  Paper,
  Typography,
  withStyles,
  List,
  ListItem,
  ListItemText,
  Button,
  makeStyles,
} from "@material-ui/core";
import PostPanjaiForm from "./PostPanjaiForm";
import ButterToast, { Cinnamon } from "butter-toast";
import {
  DeleteSweep,
  AccessAlarm,
  ThreeDRotation,
  AssignmentTurnedIn,
} from "@material-ui/icons";
import moment from "moment";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { If, Then, ElseIf, Else } from "react-if-elseif-else-render";
import Icon from "@material-ui/core/Icon";
import Axios from "axios";

import SlideShow from "react-image-show";
import styled from 'styled-components'
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

import './PostPanjai.css'
const currentUser = localStorage.getItem("currentUser");
const currentUser_id = localStorage.getItem("currentUser_id");
const user_id = localStorage.getItem('currentUser_id')

var once = false

const styles = (theme) => ({
  MuiContainerRoot: {
    paddingLeft: '24px',
    paddingRight: '24px',
    height: '5000px'
},
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
  actionDiv: {
    textAlign: "center",
  },
  // กรอบที่ใส่โพส
  post1: {
    borderRadius: "20px",
    boxShadow: "0 1px 1px 1px rgba(85, 52, 4, 0.925)",
    height: "auto",
    padding: "30px 30px",
    marginBlock: "15px",
  },
  // กรอบโพส
  framepost: {
    // background: '#f9a825',
    borderRadius: 5,
    boxShadow: "1px   1px 1px 1px rgba(187, 130, 44, 0.925)",
    color: "rgba(187, 130, 44, 0.925)",
    height: "100%",
    padding: "10px 10px",
    marginBlock: "15px",
    borderRadius: "20px",
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
  judjudjud: {
    display: "flex",
    justifyContent: "flex-end",
  },
  bg1: {
    backgroundColor: "rgba(187, 130, 44, 0.925)",
    
    
  },
  reportpost: {
    color:" rgb(151, 117, 49)"
  }
});

// const options = [
//   // 'แก้ไข',
//   // 'ลบ',
//   "รายงานโพสต์",
// ];
const ITEM_HEIGHT = 48;

const PostPanjai = ({ classes, ...props }) => {

  const [currentId, setCurrentId] = useState(0)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  var Array_image = [];

  // async function onetime() {
  //   if (once == false) {
  //     await Axios.post('/search/getPieceAvailable/' + user_id, {
  //     }).then(async res => {
  //       await localStorage.setItem('pieceAvailable', res.data)
  //     }).catch(error => console.log(error))
  //     once = true
  //   }
  // }
  // onetime()

  useEffect(() => {
    props.fetchAllPostPanjai()
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }, [])

  const onDelete = id => {
    const onSuccess = () => {
      ButterToast.raise({
        content: <Cinnamon.Crisp title="ตู้ปันใจ"
          content="ลบโพสต์เสร็จสมบูรณ์"
          scheme={Cinnamon.Crisp.SCHEME_PURPLE}
          icon={<DeleteSweep />}
        />
      })
    }
    if (window.confirm('ต้องการลบโพสนี้ใช่หรือไม่?'))
      props.deletePostMessage(id, onSuccess)
  }

  const ScrollToTop = id => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
    setCurrentId(id);
  }


  const [select, setSelect] = React.useState('');

  const handleChange = (id, option) => {
    console.log('*' + option)
    console.log('*' + id)
    //reportItem(id)
    // }
    setAnchorEl(null);
  };


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(event.currentTarget)
  };

  const handleClose = (event) => {
    console.log(event)
    setAnchorEl(null);
  };

  const requestItem = (id) => {
    const data = { currentUser_id, currentUser };
    if (window.confirm("Do you want to request?")) {
      Axios.post("/Too-Panjai/addRequest/" + id, data, {})
        .then((res) => {
          if (res) {
            window.alert(res.data)
          }
        })
        .catch((error) => console.log(error));
    }
  };

  const favoriteItem = (id) => {
    const data = { currentUser_id, currentUser };
    Axios.post("/Too-Panjai/addFav/" + id, data, {})
      .then((res) => {
        console.log(res);
      })
      .catch((error) => console.log(error));
  };

  const reportItem = (post_id) => {
    console.log(post_id)
    if (window.confirm("รายงานโพสนี้ใช่หรือไม่?")) {
      const data = { post_id, currentUser, currentUser_id };
      Axios.post("/report/" + post_id, data, {})
        .then((res) => {
          console.log(res);
        })
        .catch((error) => console.log(error));
    }
  };

  props.postPanjaiList.sort((a, b) => (a._id > b._id ? -1 : 1)); //sortdata

  // const urlArray = [
  //     "https://dj.lnwfile.com/k5jt1b.jpg",
  //     "https://gc.lnwfile.com/hlwt5d.jpg",
  //     "https://pbs.twimg.com/media/DbZSHVNVQAceHgM.jpg",
  //     "http://localhost:3001/image/image-1619203503293.jpg"
  // ]

  return (
    <>
      {/* <Slideshow data={urlArray} /> */}
      {/* กรอบโพส */}
      {/* <Box bgcolor="primary.main" color="primary.contrastText" p={2}> */}
      <PostWrapper>
        <Paper className={`${classes.post1} ${classes.bg}`}>
          <PostPanjaiForm {...{ currentId, setCurrentId }} />
        </Paper>

      </PostWrapper>

      {/* </Box> */}

      <Grid container spacing={3}>
        {/* ฝั่งขวา ใช้ classes.ชื่ออื่่น */}
        {props.postPanjaiList.map((record, index) => {
          return (
            <Grid item xs={12} sm={4}>
              {/* {index} */}
              <Paper className={classes.framepost}>
                <Fragment key={index}>
                  <ListItem>
                    <ListItemText>
                      <Grid container>
                        <Grid item xs={8}>
                          <Typography
                            variant="h5"
                            className={`${classes.color1} ${classes.frontpost}`}
                          >
                            {record.title}
                          </Typography>
                        </Grid>

                        {currentUser !== record.creator && (
                          <Grid item sm={4} className={classes.judjudjud}>
                            {/* <IconButton
                              aria-label="more"
                              aria-controls="long-menu"
                              aria-haspopup="true"
                              onClick={handleClick}
                            >
                              <MoreVertIcon />
                            </IconButton> */}
                            <div className="reportpost-button">
                            <DropdownButton id="dropdown-item-button " title="" >
                              <span className="reportpost">
                                <Dropdown.Item as="button">
                                  
                                  <div className="reportpost-button1"
                                    onClick={() =>
                                      reportItem(record._id)
                                      //console.log(record._id)
                                      
                                    }
                                  >
                                    รายงานโพสต์
                              </div>
                                </Dropdown.Item>
                              </span>
                            </DropdownButton>
                            </div>
                            {/* <Menu
                              id="long-menu"
                              anchorEl={anchorEl}
                              keepMounted
                              open={open}
                              onClose={handleClose}
                              PaperProps={{
                                style: {
                                  maxHeight: ITEM_HEIGHT * 4.5,
                                  width: "20ch",
                                },
                              }}
                            >
                              <MenuItem
                                onClick={() =>
                                  // reportItem(record._id)
                                  console.log(record._id)
                                }
                              >
                                {record._id}
                              </MenuItem>
                            </Menu> */}
                          </Grid>
                        )}
                      </Grid>
                      <div className={classes.frontpost}>
                        ข้อมูล : {record.message}
                      </div>

                      <Grid container justify="center">
                        <SlideShow 
                          images={record.image}
                          width="400px"
                          imagesWidth="300px"
                          imagesHeight="200px"
                          imagesHeightMobile="36vw"
                          thumbnailsWidth="520px"
                          thumbnailsHeight="12vw"
                          // className={classes.picture}
                          indicators  fixedImagesHeight
                        />
                      </Grid>
                      {/* {
                        ((Array_image = []),
                        record.image.map((image, index) => {
                          Array_image.push(
                            "http://localhost:3001/image/" + image
                          );
                        }),
                        (
                          <Grid container justify="center">
                            <SlideShow className="imageslide"
                              images={Array_image}
                              width="400px"
                              imagesWidth="300px"
                              imagesHeight="180px"
                              imagesHeightMobile="56vw"
                              thumbnailsWidth="350px"
                              thumbnailsHeight="12vw"
                              className={classes.picture}
                              indicators thumbnails fixedImagesHeight
                            />
                          </Grid>
                        ))
                      } */}

                      {/* <div className={`${classes.color1} ${classes.frontpost}`}>
                        โทร : {record.contect}
                      </div> */}
                      <div className={`${classes.color1} ${classes.frontpost}`}>
                        จังหวัด : {record.location}
                      </div>
                      <div className={`${classes.color1} ${classes.frontpost}`}>
                        ผู้สร้าง : {record.creator}
                      </div>
                      <div className={`${classes.color1} ${classes.frontpost}`}>
                        {moment(record.Timestamp).calendar()}
                      </div>
                      <Grid container justify="center">
                        <div className={classes.botton1}>
                          <If condition={currentUser == record.creator}>
                            <Then>
                              <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                className={`${classes.smMargin} ${classes.frontpost}`} // จำเป็น
                                onClick={() => ScrollToTop(record._id)}
                              >
                                แก้ไข
                              </Button>
                              <Button
                                variant="contained"
                                color="secondary"
                                size="small"
                                className={`${classes.smMargin1} ${classes.frontpost}`}
                                onClick={() => onDelete(record._id)}
                              >
                                ลบ
                              </Button>
                            </Then>

                            <ElseIf condition={currentUser == "admin"}>
                              <Button
                                variant="contained"
                                color="secondary"
                                size="small"
                                className={`${classes.smMargin1} ${classes.frontpost}`}
                                onClick={() => onDelete(record._id)}
                              >
                                ลบ
                              </Button>
                            </ElseIf>

                            <Else>
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
                                onClick={() => favoriteItem(record._id)}
                              >
                                ถูกใจ
                              </Button>
                            </Else>
                          </If>
                        </div>
                      </Grid>

                      {/* รูปแบบช่อง */}
                    </ListItemText>
                  </ListItem>
                </Fragment>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => ({
  postPanjaiList: state.postPanjai.list,
});

const mapActionToProps = {
  fetchAllPostPanjai: action.fetchAll,
  deletePostMessage: action.Delete,
  createPostPanjai: action.create,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(PostPanjai));

const PostWrapper = styled.div`
  >*{
    max-width:400px;
    margin: 0 auto;
  }
`