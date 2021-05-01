import React, { useState, useRef } from 'react'
import './Noti1.css'
import { Button, Overlay, Popover } from "react-bootstrap"
import Axios from 'axios';
import { ContactSupportOutlined } from '@material-ui/icons';
var once = false;

function Notification({ open, t }) {

    const username = localStorage.getItem('currentUser')
    const user_id = localStorage.getItem('currentUser_id')
    const user_contact = localStorage.getItem('currentUser_phone')

    async function accept(record) {
        //console.log(record._id)
        const item = record.notification
        const sendTo = record.requester
        const notiId = record._id
        const data = { username, sendTo, item, notiId }
        if (window.confirm('เมื่อกดยืนยันแล้ว ผู้รับของมีเวลา 1 อาทิตย์ในการติดต่อกลับมาหาคุณ ไม่เช่นนั้นจะกลายเป็นโมฆะ')) {
            // const data = { currentUser_id }
            await Axios.post('/Too-Panjai/recieveAccept', data, {
            }).then(res => {
                //console.log(res)
                if (res.data !== "OK") {
                    window.alert(res.data)
                }
                window.location.reload()
            }).catch(error => console.log(error))
        }
        //window.alert("Send contact to "+record.requester)
    }

    async function deny(record) {
        const notiId = record._id
        const data = { notiId }
        await Axios.post('/Too-Panjai/recieveDeny', data, {
        }).then(res => {
            window.location.reload()
        }).catch(error => console.log(error))
        //window.alert("Send contact to "+record.requester)
    }

    function deleteRecieve(record) {
        const recieveId = record._id
        const data = { recieveId }
        Axios.post('/Too-Panjai/deleteRecieve', data, {
        }).then(res => {
            window.location.reload()
        }).catch(error => console.log(error))
    }

    const [noti, setNoti] = useState([])
    const [recieves, setRecieve] = useState([])

    Axios.post('/Too-Panjai/notifications/' + user_id, {
    }).then(res => {
        //console.log(res.data);
        setNoti(res.data)
    }).catch(error => console.log(error))

    Axios.post('/Too-Panjai/findRecieve/' + user_id, {
    }).then(res => {
        //console.log(res.data);
        setRecieve(res.data)
    }).catch(error => console.log(error))

    const [input, setInput] = useState("")
    //console.log(noti)
    return (
        <div>
            {/* <Button onClick={handleClick}>Holy guacamole!</Button> */}

            <Overlay
                //true แสดง
                show={open}
                target={t}
                placement="bottom"
            // container={ref.current}
            // containerPadding={20}
            >
                <Popover id="popover-contained" className="NotiPanel">
                    <Popover.Title as="h3">การแจ้งเตือน</Popover.Title>
                    <Popover.Content>


                        <div className="boxNoti">
                            <div className="boxtext">คำขอ</div>
                            {
                                noti.map((record, index) => {
                                    return (
                                        <div className="grid">
                                            <div className="NameKamko">{record.requester} ต้องการ {record.notification} จากคุณ</div>
                                            <div>
                                                <i onClick={() => accept(record)} class="fas fa-check-circle" ></i>
                                                <i onClick={() => deny(record)} class="fas fa-times-circle"></i>
                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </div>




                        {/* คำตอบรับ */}
                        <div className="boxNoti">
                            <div className="boxtext">คำอนุมัติ</div>
                            {
                                recieves.map((record, index) => {
                                    return (
                                        <div className="grid">
                                            <div className="NameKamko">{record.owner} ได้ยอมรับคำขอ ({record.item}) ของคุณแล้ว<br />โปรดติดต่อ : {record.owner_contact}</div>
                                            <button onClick={() => deleteRecieve(record)}>ลบ</button>
                                        </div>
                                    )
                                })
                            }

                        </div>


                    </Popover.Content>

                </Popover>
            </Overlay>
        </div>
    )
}

export default Notification
