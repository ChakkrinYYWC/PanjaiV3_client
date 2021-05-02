import React, { useState, useRef } from 'react'
import "./search.css";
import Checkbox from "@material-ui/core/Checkbox";
import { Card } from "react-bootstrap";
import Axios from 'axios';
import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';



import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from "react-router-dom";


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
import SlideShow from "react-image-show";



export default function Checkboxes() {
  const [checked, setChecked] = React.useState(true);
  const [searchInput, setSearchInput] = useState("")
  const [checkMulaniti, SetCheckMulaniti] = useState(false);
  // const [checkfacebook, Setcheckfacebook] = useState(false);
  // const [checkfacebook, Setcheckfacebook] = useState(false);
  const [postTPJ, setPostTPJ] = useState([])
  const [postFDT, setPostFDT] = useState([])

  const Search = (event) => {
    event.preventDefault()
    Axios.get('/search/TPJ&FDT/' + searchInput, {
    }).then(async function (res) {
      //console.log(res)
      setPostTPJ(res.data.postTPJ)
      setPostFDT(res.data.postFDT)
    }).catch(error => console.log(error))
  }

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };


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
    }
  });

  const currentUser = localStorage.getItem("currentUser");
  // console.log(postTPJ)
  console.log(postFDT)

  return (
    <div className='doublebg' >
      <div className='background-search'>
        <center>
          <div className="search-bar">
            <form className="ui-form">
              <div className="field">
                <input
                  onChange={(event) => {
                    setSearchInput(event.target.value)
                  }}
                  type="text"
                  className="ui-input"
                  placeholder="ค้นหามูลนิธิ, สิ่งของ" />
                <button onClick={Search} type='submit' className="search-bt">ค้นหา</button>
              </div>
            </form>
          </div>
        </center>
        <div className='flex'>
          {/* <Checkbox
            className="box1"
            defaultChecked
            color="default"
            inputProps={{ "aria-label": "checkbox with default color" }
            }
          /> */}
          {/* <label className="check1" style={{ color: "black" }}>
            <h2> มูลนิธิ </h2>
          </label>

          <Checkbox
            className="box2"
            defaultChecked
            color="default"
            inputProps={{ "aria-label": "checkbox with default color" }}
          />
          <label className="check2" style={{ color: "black" }}>
            <h2> ตู้ปันใจ</h2>
          </label>
          <Checkbox
            className="box3"
            defaultChecked
            color="default"
            inputProps={{ "aria-label": "checkbox with default color" }}
          /> */}
          <span className="check3" style={{ color: "black" }}>
            <Link to="/testaroundme" align='right' >ใกล้ฉัน</Link>
          </span>
        </div>


        <div className="bg2">
          <center className="head">
            <h2> มูลนิธิ</h2>
          </center>

          <div className="row m-0">

            {
              postFDT.map((record, index) => {
                return (

                  <div className="column col-xs-6 col-sm-6 col-md-6 col-lg-4">
                    <Card className="foundat">
                    <Card.Img variant="top" src={record.image[0]} />
                      <Card.Body>
                        <Link className="Tfound1">{record.title}</Link>
                        <div className="information">ต้องการรับบริจาค :{record.item}</div>
                        <div className="information">จำนวน :{record.n_item}</div>
                        <div className="information-1">วันที่ลง :{record.Timestamp}</div>
                        <Link className="CardTitle">อ่านเพิ่มเติม</Link>
                      </Card.Body>
                    </Card>
                  </div>
                )
              })

            }


            {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////           */}



            {/* <div className="column col-xs-6 col-sm-6 col-md-6 col-lg-4">
            <Card className="foundat">
              <Card.Img
                variant="top"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVnmt84Z13XWVUnKhEhuKpf18Kzy190Yz-7g&usqp=CAU"
              />
              <Card.Body>
                <Link className="Tfound">ชื่อโครงการ</Link>
                <div className="information">ต้องการรับบริจาค :</div>
                <div className="information">จำนวน :</div>
                <div className="information-1">วันที่ลง :</div>
                <Link className="CardTitle">อ่านเพิ่มเติม</Link>
              </Card.Body>
            </Card></div> */}


            {/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
          </div>

          <center className="head">
            <h2> ตู้ปันใจ </h2>{" "}
          </center>

          <div className="row m-0">
          {
            postTPJ.map((record, index) => {
              return (
              
               
                <div className="column col-4">
                  <Card className="foundat2">
                  <Card.Body>
                  <center><Link className="Tfound1">{record.title}</Link></center>
                  </Card.Body>
                 
                         <Grid container justify="center" >
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
                                className="img101"
                              />
                            </Grid>
                    <Card.Body>
                      {/* <Link className="Tfound">{record.title}</Link> */}
                      <div className="information">จังหวัด :{record.location}</div>
                      <div className="information">ผู้สร้าง :{record.creator}</div>
                      <div className="information-1">วันที่ลง :{record.Timestamp}</div>
                      <div className="pum">
                      <If condition={currentUser == record.creator}>
                      <Then>
                        <button
                          variant="contained"
                          // color="primary"
                          size="small"
                          className="want" // จำเป็น
                        >
                          แก้ไข
                        </button>

                        <button
                          variant="contained"
                          // color="secondary"
                          size="small"
                          className="fav"
                        >
                          ลบ
                       </button>
                       </Then>

                       <ElseIf condition={currentUser == "admin"}>
                        <button
                          variant="contained"
                          // color="secondary"
                          size="small"
                          className="fav"
                        >
                          ลบ
                       </button>
                       </ElseIf>

                       <Else condition={currentUser == "admin"}>
                       <button
                          variant="contained"
                          // color="primary"
                          size="small"
                          className="want" // จำเป็น
                        >
                          ขอรับ
                        </button>

                        <button
                          variant="contained"
                          // color="secondary"
                          size="small"
                          className="fav"
                        >
                          ถูกใจ
                       </button>
                       </Else>
                       </If>

                      </div>
                    </Card.Body>
                  </Card>

                </div>




                )
              })

            }
       

          </div>
        </div>
      </div>
    </div>
  );
}
