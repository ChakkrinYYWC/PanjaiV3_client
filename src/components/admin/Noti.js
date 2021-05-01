import React from 'react';
import { useState, useEffect } from 'react';
import './ModalNoti.css'
import Axios from 'axios';
import { Card, Button, Modal } from 'react-bootstrap';
import ButterToast, { Cinnamon } from "butter-toast";
import { DeleteSweep, AccessAlarm, ThreeDRotation, AssignmentTurnedIn } from "@material-ui/icons";
import { connect } from 'react-redux';
import * as action from '../../action/postPanjai'
import SlideShow from "react-image-show";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";
import {

  Grid
} from "@material-ui/core";

var once = false
/*----------------------------------------------------------------------*/

function Noti(props) {
  //console.log(props)

  const [post, setPost] = useState([])

  var reportPopup = localStorage.getItem('reportPopup')
  //console.log(reportPopup)
  if (reportPopup == "false") {
    var isShow = false
  }
  if (reportPopup == "true") {
    var isShow = true
  }
  // const [show, setShow] = useState("");
  // console.log(show)

  const handleClose = async () => {
    await localStorage.setItem('reportPopup', false);
    //console.log(localStorage.getItem('reportPopup'))
    window.location.reload()
  };

  async function onetime() {
    if (once == false) {
      await Axios.get('/search/postreport', {
      }).then(res => {
        //console.log(res.data)
        setPost(res.data)
      }).catch(error => console.log(error))
      once = true
    }
  }
  onetime()
  //console.log(post)

  const onDelete = id => {
    const onSuccess = () => {
      ButterToast.raise({
        content: <Cinnamon.Crisp title="ตู้ปันใจ"
          content="Deleted successfully"
          scheme={Cinnamon.Crisp.SCHEME_PURPLE}
          icon={<DeleteSweep />}
        />
      })
    }
    if (window.confirm('ต้องการลบโพสนี้ใช่หรือไม่?')) {
      props.deletePostMessage(id, onSuccess)
      window.location.reload()
    }

  }
  // ==================================== FDT Report ====================================================
  return (
    <div>
      <div className="bigpopup">
        <Modal className="popup" show={isShow}>
          <div className="bp">
            <Modal.Header
              className="popuptitle"
              closeButton
              onClick={handleClose}
            >
              Post Report
              {/* <div className="y"></div> */}
            </Modal.Header>
            <Modal.Body>
              {
                post.map((record, index) => {
                  return (
                    <div className="column  ">
                      <Card className="foundat">

                        {/* <Card.Img
                          variant="top"
                          src={'http://localhost:3001/image/' + record.post.image}
                        /> */}
                        <Grid container justify="center">
                          <SlideShow className="imageslide"
                            images={record.post.image}
                            width="400px"
                            imagesWidth="400px"
                            imagesHeight="200px"
                            imagesHeightMobile="56vw"
                            thumbnailsWidth="520px"
                            thumbnailsHeight="12vw"
                            // className={classes.picture}
                            indicators fixedImagesHeight
                          />
                        </Grid>
                        <Card.Body>
                          <Link className="Tfound"></Link>
                          <div className="information">{record.post.title}</div>
                          <div className="information">ข้อมูล : {record.post.message}</div>
                          <div className="information">ผู้สร้าง : {record.post.creator}</div>
                          <div className="information">จังหวัด : {record.post.location}</div>
                          <div className="information-1">วันที่ลง : {record.post.Timestamp}</div>
                          <div className="pum">
                            <Button
                              variant="contained"
                              color="primary"
                              size="small"
                              className="want" // จำเป็น
                              onClick={() => onDelete(record.post._id)}
                            >
                              ลบโพสต์
                </Button>

                          </div>
                        </Card.Body>
                      </Card>
                    </div>
                  )
                })
              }

            </Modal.Body>



          </div>
        </Modal>



      </div>

    </div>
  );
}

const mapActionToProps = {
  deletePostMessage: action.Delete,
}
const mapStateToProps = state => ({
  postPanjaiList: state.postPanjai.list
})
export default connect(mapStateToProps, mapActionToProps)(Noti);