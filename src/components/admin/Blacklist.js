import React from 'react';
import { useState, useEffect } from 'react';
import './ModalNoti.css'
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

  if(once == false){
    Axios.get('/search/findBanedUser', {
    }).then(async function (res) {
      setFoundUser(res.data)
    }).catch(error => console.log(error))
    once = true
  }

  function UnBanUser(data){
    Axios.get('/authenticate/unBanUser/' + data, {
    }).then(res => {
        //console.log(res)
        window.location.reload()
    }).catch(error => console.log(error))
  }


  // ====================================== Blacklist =========================================
  return (
    <div>
      <div className="bigpopup">
        <Modal className="popup" show={isShow}>
          <div className="pd">
            <Modal.Header className="popuptitle" closeButton onClick={handleClose}>
              Blacklist
            </Modal.Header>
            <Modal.Body><table width="100%">
              {
                foundUser.map((record, index) => {
                  return (
                    <div>
                      <div>
                        <a>{record.username}</a>
                        <button onClick={() => UnBanUser(record._id)}>Unban</button>
                      </div>
                    </div>
                  )
                })

              }
              {/* <tr>
                <td>Username1</td>
                <td><button > Profile </button></td>
                <td><button > Release </button></td>
              </tr>
              <br />
              <tr>
                <td>Username2</td>
                <td><button > Profile </button></td>
                <td><button > Release </button></td>
              </tr> */}
            </table>
            </Modal.Body>
          </div>
        </Modal>
      </div>
    </div>
  );
}
export default Blacklist;