import Axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { If, Then, ElseIf, Else } from "react-if-elseif-else-render";

import "./Homepage.css";
import Carousel from "react-bootstrap/Carousel";
import { Player } from "video-react";
// import "node_modules/video-react/dist/video-react.css";
import YouTube from "@u-wave/react-youtube";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

import Fade from "@material-ui/core/Fade";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
// import Card from 'react-bootstrap/Card';
import { Card, Button, Modal } from "react-bootstrap";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from "react-router-dom";
import { model } from "mongoose";
import { ChartJa, DonationChart } from "./chart";

/*----------------------------------------------------------------------*/
var once = false;
function Homepage() {
  // const [anchorEl, setAnchorEl] = React.useState(null);

  // const handleClick = (event) => {
  //     setAnchorEl(event.currentTarget);
  // };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const popupYet = localStorage.getItem("popupYet");
  const currentUser = localStorage.getItem("currentUser");

  const [display, setDisplay] = useState(false);

  const Handledisplay = () => {
    setDisplay(!display);
  };

  const [show, setShow] = useState(false);
  const [allitem, setItem] = useState([]);

  const handleClose = () => {
    localStorage.setItem("Firstpopup", false);
    localStorage.setItem("popupYet", true);
    setShow(false);
  };

  useEffect(async () => {
    // const Firstpopup = localStorage.getItem('Firstpopup');
    await setShow(localStorage.getItem("Firstpopup"));
    await localStorage.setItem("Firstpopup", false);
  }, []);

  async function onetime() {
    if (once == false) {
      once = true;
      await Axios.post("Foundation/allItemInFDT", {})
        .then((res) => {
          //console.log(res.data);
          setItem(res.data);
        })
        .catch((error) => console.log(error));
    }
  }
  onetime();
  async function FDTclicked(data) {
    if (data == "เงิน") {
      handleClose()
    }
    localStorage.setItem('FDTclicked', data)
  }
  //console.log(allitem)

  return (
    <div>
      <If condition={currentUser !== null && popupYet == "false"}>
        <Then>
          <div className="bigpopup">
            <Modal className="popup" show={show}>
              <span className="p">
                <Modal.Header
                  className="popuptitle"
                  closeButton
                  onClick={handleClose}
                ></Modal.Header>
                <Modal.Body>
                  <i class="fas">&#xf1bb;</i> ยินดีต้อนรับเข้าสู่ปันใจ{" "}
                  <i class="fas">&#xf1bb;</i>
                </Modal.Body>
                <Modal.Body>คุณต้องการบริจาคสิ่งใดหรือไม่ ?</Modal.Body>

                <span className="pum row m-0">
                  <span className="column col-6">
                    <Button
                      className="pummoney"
                      href="/#003"
                      variant="primary"
                      onClick={handleClose}
                    >
                      เงิน
                    </Button>
                  </span>
                  <span className="column col-6">
                    <DropdownButton id="dropdown-item-button" title=" สิ่งของ">
                      <div className="container">
                        {allitem.map((record, index) => {
                          return (
                            <div className="lover">
                              <Dropdown.Item>
                                <Link to={"/FDTpopup"} className="love">
                                  <div onClick={() => FDTclicked(record._id[0])}>{record._id[0]}</div>
                                </Link>
                              </Dropdown.Item>
                              <If condition={record._id[1]}>
                                <Then>
                                  <Dropdown.Item>
                                    <Link to={"/FDTpopup"} className="love">
                                      <div onClick={() => FDTclicked(record._id[1])}>{record._id[1]}</div>
                                    </Link>
                                  </Dropdown.Item>

                                  <If condition={record._id[2]}>
                                    <Then>
                                      <Dropdown.Item>
                                        <Link to={"/FDTpopup"} className="love">
                                          <div onClick={() => FDTclicked(record._id[2])}>{record._id[2]}</div>
                                        </Link>
                                      </Dropdown.Item>
                                    </Then>
                                  </If>
                                </Then>
                              </If>
                            </div>
                          );
                        })}
                        <Dropdown.Item as="button">
                          <Link to="/Too_panjai" className="love">
                            <div>อื่นๆ</div>
                          </Link>
                        </Dropdown.Item>
                      </div>
                    </DropdownButton>
                  </span>
                </span>

                <Modal.Body>
                  {" "}
                  <i class="far">&#129409;</i>
                </Modal.Body>
              </span>
            </Modal>
          </div>
        </Then>
      </If>
      {/* ----------------------slideshow------------------------------------------------*/}
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://img.wongnai.com/p/1920x0/2021/01/04/5fbcd82c32974158b8b2c0aba5427bc4.jpg"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src="/05.jpg" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src="/02.jpg" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src="/06.jpg" />
        </Carousel.Item>
      </Carousel>

      {/* ---------------------------------category------------------------------------- */}
      <div className="category" id="003">
        <h3>หมวดหมู่มูลนิธิ</h3>
        <center>
          <div className="row m-0">
            <div className="column col-6 col-lg-4">
              <Card className="cardd">
                <Card.Img variant="top" src="/pngegg.png" />
                <Card.Body>
                  <Link to="/Foundation/เด็กและเยาวชน" className="CardTitle">
                    เด็กและเยาวชน
                  </Link>
                  {/* <Card.Title Link to="/Too-panjai">เด็กและเยาวชน</Card.Title> */}
                </Card.Body>
              </Card>
            </div>
            <div className="column col-6 col-lg-4">
              <Card className="cardd">
                <Card.Img variant="top" src="/2.png" />
                <Card.Body className="">
                  <Link to="/Foundation/ผู้สูงอายุ" className="CardTitle">
                    ผู้สูงอายุ
                  </Link>
                  {/* <Card.Title>ผู้สูงอายุ</Card.Title> */}
                </Card.Body>
              </Card>
            </div>
            <div className="column col-6 col-lg-4">
              <Card className="cardd">
                <Card.Img variant="top" src="/e.png" />
                <Card.Body>
                  <Link to="/Foundation/สัตว์" className="CardTitle">
                    สัตว์
                  </Link>
                  {/* <Card.Title>สัตว์</Card.Title> */}
                </Card.Body>
              </Card>
            </div>


            <div className="column col-6 col-lg-4">
              <Card className="cardd">
                <Card.Img variant="top" src="/4.png" />
                <Card.Body>
                  <Link
                    to="/Foundation/ผู้พิการและผู้ป่วย"
                    className="CardTitle"
                  >
                    ผู้พิการและผู้ป่วย
                  </Link>
                  {/* <Card.Title>ผู้พิการและผู้ป่วย</Card.Title> */}
                </Card.Body>
              </Card>
            </div>
            <div className="column col-6 col-lg-4">
              <Card className="cardd">
                <Card.Img variant="top" src="/5.1.png" />
                <Card.Body>
                  <Link to="/Foundation/สิ่งแวดล้อม" className="CardTitle">
                    สิ่งแวดล้อม
                  </Link>
                  {/* <Card.Title>สิ่งแวดล้อม</Card.Title> */}
                </Card.Body>
              </Card>
            </div>
            <div className="column col-6 col-lg-4">
              <Card className="cardd">
                <Card.Img variant="top" src="/6.png" />
                <Card.Body>
                  <Link to="/Foundation/อื่นๆ" className="CardTitle">
                    อื่นๆ
                  </Link>
                  {/* <Card.Title>อื่นๆ</Card.Title> */}
                </Card.Body>
              </Card>
            </div>

          </div>
        </center>
      </div>

      {/* ----------------------------ตู้ปันใจ------------------------------------------ */}
      <div className="tupanjai" id="1">
        <div className="row">
          <div className="col-sm-4">
            <div className="too">
              <img src="to1.png" width="750" height="600"></img>
            </div>
          </div>
          <div className="col-sm-8">
            <div className="tpjj">
              <p> สำหรับคนที่ต้องการสิ่งของหรือต้องการบริจาคสิ่งของ </p>
              <p>แต่ไม่รู้จะไปบริจาคที่ไหน สามารถบริจาคได้ที่ </p>
              <a className="tpj" type="button" href="Too_panjai">
                <i className="far fa-hand-point-right"></i> ตู้ปันใจ
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* ----------------------------รอยยิ้ม------------------------------------------ */}
      <div className="card">
        <ul
          className={display ? "card-stacks transition" : "card-stacks"}
          onClick={Handledisplay}
        >
          <li className="title">
            <h2>
              " รอยยิ้มแห่งความสุข<i className="far fa-smile-wink"></i> "
            </h2>
          </li>
          <li className="stack stack-1">
            <ul className="cards-down">
              <li className="card card-2">
                <img src="https://www.prachachat.net/wp-content/uploads/2020/04/66-5-728x491.jpg" />
                <div className="content">
                  <center>
                    <p>"ช่วยกันปันน้ำใจ"</p>
                  </center>
                </div>
              </li>
              <li className="card card-3">
                <img src="https://home4animals.org/wp-content/uploads/2018/01/img-06.jpg" />
                <div className="content">
                  <center>
                    <p>"ทุกชีวิตมีค่า"</p>
                  </center>
                </div>
              </li>
            </ul>
          </li>
          <li className="stack stack-2">
            <ul className="cards-down">
              <li className="card card-2">
                <img src="https://f.ptcdn.info/629/060/000/phk8l2zd5SQ1Q10qxsm-o.jpg" />
                <div className="content">
                  <center>
                    <p>"คนไทยไม่ทิ้งกัน"</p>
                  </center>
                </div>
              </li>
              <li className="card card-3">
                <img src="https://happymom.in.th/upload/d444294a3940ec9ccde7dc5514137f18.jpg" />
                <div className="content">
                  <center>
                    <p>"หนูดีใจมากๆเลยค่ะ"</p>
                  </center>
                </div>
              </li>
            </ul>
          </li>
          <li className="stack stack-3">
            <ul className="cards-down">
              <li className="card card-2">
                <img src="https://4.bp.blogspot.com/-o8CwTuYhYrI/Ui_zq7jfYcI/AAAAAAAAACw/kCQQ6dFBIWo/s1600/yim.jpg" />
                <div className="content">
                  <center>
                    <p>"ยิ่งให้ ยิ่งได้"</p>
                  </center>
                </div>
              </li>
              <li className="card card-3">
                <img src="https://obs.line-scdn.net/0hmdaLuIDjMktcNRmSeHxNHGZjMSRvWSFIOANjSABbbH8kViEeaFMpJX83b3t4UHUVMgB_KHs0KXohUiUZYVIp/w644" />
                <div className="content">
                  <center>
                    <p>"ขอบคุณนะคะ"</p>
                  </center>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      {/* ----------------------------dastbord------------------------------------------ */}
      {/* <div className="Total-donation">*/}

      {/*    <div class="grid-container-donation">*/}
      {/*        <div class="grid-item-donation">*/}
      {/*            <span className="text-donation-money">*/}
      {/*                <p>ยอดบริจาคทั้งหมด</p>*/}
      {/*            </span>*/}
      {/*        </div>*/}
      {/*        <div class="grid-item-donation">*/}
      {/*            <span className="text-donation-people">*/}
      {/*                <p>จำนวนผู้บริจาคทั้งหมด</p>*/}
      {/*            </span>*/}
      {/*        </div>*/}
      {/*        <div class="grid-item-donation">*/}
      {/*            <span className="nunber-donation-money">*/}
      {/*                <p>2,000,000 บาท</p>*/}
      {/*            </span>*/}
      {/*        </div>*/}
      {/*        <div class="grid-item-donation">*/}
      {/*            <span className="nunber-donation-people">*/}
      {/*                <p>50 คน</p>*/}
      {/*            </span>*/}
      {/*        </div>*/}
      {/*        */}
      {/*    </div>*/}

      {/*</div> */}
      <div className="bg-dashboaed">
        <p>Dashboard ประจำปี {new Date().getFullYear()}</p>
        <div className="bg-dashboaed1">
          <div className="table-dashboaed" >
            <DonationChart />
          </div>
        </div>
      </div>
    </div>
  );
}

// $('ul.card-stacks').on('click', function () {
//     $(this).toggleClass('transition');
// });

export default Homepage;
