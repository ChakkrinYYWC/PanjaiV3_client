import React, { Component, useEffect, useState } from 'react';
import './category.css'
import { Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as action from '../../action/postFDT'
import moment from 'moment';
import Axios from 'axios';
import Button from '@material-ui/core/Button';

import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import SlideShow from 'react-image-show';
import { Grid } from '@material-ui/core';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link,
    Redirect
} from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';
import imgdek from './dek.png';
// import old from './old.png';
import { urlencoded } from 'body-parser';



function Category({ ...props }) {
    var Array_image = [];

    const [loading, setLoading] = useState(true);
    const [bg, setBg] = useState();

    // const ArrayimgHeader = [
    //     {
    //         category: "เด็กและเยาวชน",
    //         img: "dek.png"
    //     },
    //     {
    //         category: "ผู้สูงอายุ",
    //         img: "https://www.rakkaya.com/wp-content/uploads/2019/11/geriatric-package.jpg"
    //     },
    // ]

    // const [imgHeaderPage,setimgHeaderPage] = useState();

    useEffect(async () => {
        await props.fetchAllPostFDT()
        //console.log(props.postFDTList);

        // function getImg(ArrayimgHeader) {

        //     ArrayimgHeader.map((item) => {

        //         if (item.category === props.currentId.match.params.name) {
        //             // alert(item.img);
        //             setimgHeaderPage(item.img)
        //             console.log(imgHeaderPage);
        //         }

        //         return imgHeaderPage;
        //     })
        // }
        // await getImg(ArrayimgHeader);
        await setLoading(false);

    }, [])
    //console.log(props)

    const data = { data: props.currentId.match.params.name }
    Axios.post('/Foundation/background', data, {
    }).then(res => {
        // console.log(res.data.image)
        setBg(res.data.image)
    }).catch(error => {
        console.log(error)
    })



    return (
        <>
            {
                loading ?
                    <div>loading...</div>
                    :
                    <>
                        <div className="dek" style={{ backgroundImage: `url(${bg})` }}>
                            <div className="box-white">

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

                                <div className="Title"><i className="fab fa-gratipay"></i>{props.currentId.match.params.name}<i className="fab fa-gratipay"></i></div>
                                <div className="foundation">
                                    <div className="row m-0">
                                        {
                                            props.postFDTList.filter(fdt => fdt.category == props.currentId.match.params.name).map((record, index) => {
                                                return (
                                                    <div className="column col-xs-6 col-sm-6 col-md-6 col-lg-4">
                                                        <Card className="foundat">

                                                            <Card.Img variant="top" src={record.image[0]} />



                                                            {/* <Card.Img variant="top" img src={'http://localhost:3001/Foundation/' + image}/> //multi image */}



                                                            <Card.Body>
                                                                <Link to={"/Foundation/" + props.currentId.match.params.name + "/" + record._id} className="Tfound">{record.title}</Link>
                                                                <div className="information">ต้องการรับบริจาค : {record.item}</div>
                                                                <div className="information">จำนวน : {record.n_item} บาท</div>
                                                                <div className="information">ที่อยู่ : {record.address}</div>
                                                                <div className="information">เบอร์โทรศัพท์ : {record.phone} </div>
                                                                <div className="information-1">วันที่ลง : {moment(record.Timestamp).calendar()}</div>
                                                                <Link to={"/Foundation/" + props.currentId.match.params.name + "/" + record._id} className="CardTitle">อ่านเพิ่มเติม</Link>

                                                            </Card.Body>
                                                        </Card>
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                                </div>

                            </div>
                            {/* <div>21866666673</div> */}
                            {/* <footer id="sticky-footer" >
                                                <div className="footer">
                                                  
                                                    <div className="logofooter" ><i className="fab fa-gratipay"></i></div>
                                                    <Link to="/#001" className="textfooter">ปันใจ </Link>
                                                   
                                                </div>
                                            </footer> */}

                        </div>

                                );
                    </>
            }

        </>

    );
}

const mapStateToProps = state => ({
    postFDTList: state.postFDT.list
})

const mapActionToProps = {
    fetchAllPostFDT: action.fetchAll
}

export default connect(mapStateToProps, mapActionToProps)(Category);