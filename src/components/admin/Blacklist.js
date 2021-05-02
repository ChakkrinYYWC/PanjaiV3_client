import React from 'react';
import { useState, useEffect } from 'react';
import './ModalNoti.css'
import './Blacklist.css'
import Axios from 'axios';
import { Card, Button, Modal } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";
var once = false;
/*----------------------------------------------------------------------*/

function Blacklist() {
  const [foundUser, setFoundUser] = useState([])
  // const [userSearchInput, setUserSearchInput] = useState("")

  var blackListPopup = localStorage.getItem('blackListPopup')
  //console.log(blackListPopup)
  if (blackListPopup == "false") {
    var isShow = false
  }
  if (blackListPopup == "true") {
    var isShow = true
  }
  // const [show, setShow] = useState("");
  // console.log(show)

  const handleClose = async () => {
    await localStorage.setItem('blackListPopup', false);
    //console.log(localStorage.getItem('blackListPopup'))
    window.location.reload()
  };

  // const userSearch = () => {
  //   Axios.get('/search/findUser/' + userSearchInput, {
  //   }).then(async function (res) {
  //     setFoundUser(res.data)
  //   }).catch(error => console.log(error))
  // }

  if (once == false) {
    Axios.get('/search/findBanedUser', {
    }).then(async function (res) {
      setFoundUser(res.data)
    }).catch(error => console.log(error))
    once = true
  }

  function UnBanUser(data){
    if (window.confirm("Do you really want to unban?")) {
      Axios.get('/authenticate/unBanUser/' + data, {
      }).then(res => {
          //console.log(res)
          window.location.reload()
      }).catch(error => console.log(error))
    }
  }


  // ====================================== Blacklist =========================================
  return (
    <div>
      <div className="bigpopup">
        <Modal className="popup" show={isShow}>
          <div className="pd">
            <Modal.Header
              className="popuptitle"
              closeButton
              onClick={handleClose}
            >
              Blacklist
            </Modal.Header>
            <Modal.Body>
              <table id="customers">
                <tr>
                  <th>User</th>

                </tr>
                {
                  foundUser.map((record, index) => {
                    return (
                      <div className="unbanforadmin">
                        <tr>
                          <td>
                            <div className="row m-0">
                              <div className="column col-6 ">
                                <img src={record.idcard} />
                              </div>
                              <span className="column col-6 ">
                                <div className="usernameforadmin">username : {record.username}</div>
                                <div className="usernameforadmin">name : {record.name}</div>
                                <div className="usernameforadmin">email : {record.email}</div>
                                {/* <div className="usernameforadmin">image : {record.idcard}</div> */}

                                <span className="btnban" >
                                  <button onClick={() => UnBanUser(record._id)}>UNBAN</button>

                                </span>
                              </span>


                            </div>
                          </td>
                        </tr>
                      </div>
                    )
                  })

                }

              </table>
            </Modal.Body>
          </div>
        </Modal>
      </div>
    </div>
  );
}
export default Blacklist;