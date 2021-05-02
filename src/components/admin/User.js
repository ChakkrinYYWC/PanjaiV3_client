import React from 'react';
import { useState, useEffect } from 'react';
import './ModalNoti.css'
import './User.css'
import Axios from 'axios';
import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';
import {
  Divider,
  Grid,
  Paper,
  Typography,
  withStyles,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from "@material-ui/core";

import { Card, Button, Modal } from 'react-bootstrap';


import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";


/*----------------------------------------------------------------------*/

function SearchUser() {
  const [userSearchInput, setUserSearchInput] = useState("")
  const [foundUser, setFoundUser] = useState([])
  var userPopup = localStorage.getItem('userPopup')
  //console.log(userPopup)
  if (userPopup == "false") {
    var isShow = false
  }
  if (userPopup == "true") {
    var isShow = true
  }
  // const [show, setShow] = useState("");
  // console.log(show)

  const handleClose = async () => {
    await localStorage.setItem('userPopup', false);
    //console.log(localStorage.getItem('userPopup'))
    window.location.reload()
  };

  const userSearch = () => {
    Axios.get('/search/findUser/' + userSearchInput, {
    }).then(async function (res) {
      setFoundUser(res.data)
    }).catch(error => console.log(error))
  }

  function BanUser(data) {
    Axios.get('/authenticate/banUser/' + data, {
    }).then(res => {
      console.log(res)
    }).catch(error => console.log(error))
  }
  console.log(foundUser)

  // ==================================== Search admin =================================================================
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
              Finding User
              </Modal.Header>
            <Modal.Body>
              <div className="fieldadmin">
                <input type="text" className="ui-input" placeholder="ค้นหาชื่อผู้ใช้"
                  onChange={(event) => {
                    setUserSearchInput(event.target.value)
                  }} />
                <button onClick={() => userSearch()} className="search-bt">
                  ค้นหา
                </button>
              </div><br />
              <div>


                <table id="customers">
                  <tr>
                    <th>User</th>
                  
                  </tr>
                  {
                    foundUser.map((record, index) => {
                      return (

                        <div className="buttonforadmin">
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
                                    <button onClick={() => BanUser(record._id)}>BAN</button>

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



              </div>
            </Modal.Body>
          </div>
        </Modal>
      </div>
    </div>
  );
}





export default SearchUser;