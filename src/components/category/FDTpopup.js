import React, { Component, useEffect, useState } from 'react';
import './FDTpopup.css'
import { Card, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as action from '../../action/postFDT'
import moment from 'moment';
import Axios from 'axios';

import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link,
    Redirect
} from "react-router-dom";
var once = false

function Popup({ classes, ...props }) {
    const [foundFDT, setFoundFDT] = useState([]);

    const FDTword = localStorage.getItem('FDTclicked')
    async function onetime() {
        if (once == false) {
            if (FDTword == "เงิน") {
                window.location.href = "/#003"
            } else {
                await Axios.get('/Foundation/FDTpopup/' + FDTword, {
                }).then(async res => {
                    //console.log(res.data);
                    await setFoundFDT(res.data)
                }).catch(error => console.log(error))
                once = true;
            }
        }
    }

    onetime()

    return (

        <div className="dek" >
            <div className="box-white">

                <div className="Title"><i className="fab fa-gratipay"></i>มูลนิธิที่ต้องการ "{localStorage.getItem('FDTclicked')}"<i className="fab fa-gratipay"></i></div>
                <div className="foundation">
                    <div className="row m-0">



                        {
                            foundFDT.map((record, index) => {

                                return (

                                    <div className="column col-xs-6 col-sm-6 col-md-6 col-lg-4">
                                        <Card className="foundat">
                                            {/* {console.log(record.Image[0])} */}
                                            <Card.Img variant="top" src={'http://localhost:3001/Foundation/' + record.image[0]} />
                                            <Card.Body>
                                                <Link to={"/Foundation/" + record.category + "/" + record._id} className="Tfound">{record.title}</Link>
                                                <div className="information">ต้องการรับบริจาค : {record.item}</div>
                                                <div className="information">จำนวน : {record.n_item}</div>
                                                <div className="information">ที่อยู่ : {record.address}</div>
                                                <div className="information">เบอร์โทรศัพท์ : {record.phone} </div>
                                                <div className="information-1">วันที่ลง : {moment(record.Timestamp).calendar()}</div>
                                                <Link to={"/Foundation/" + record.category + "/" + record._id} className="CardTitle">อ่านเพิ่มเติม</Link>

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



export default Popup;