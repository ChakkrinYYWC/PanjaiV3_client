import Axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { render } from 'react-dom';
import { Link, Redirect, useHistory } from 'react-router-dom';
import loginImg from "../img/login.svg";
import "./register.css";

function RegisterFrom() {
    /*------------------------------------------------------------*/
    const [name, setName] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [CPassword, setCPassword] = useState();
    const [Email, setEmail] = useState();
    const [address, setAddress] = useState();
    const [phone, setPhone] = useState();
    const [file, setFile] = useState();

    const PanjaiToken = localStorage.getItem('PanjaiToken');
    // Axios.post('/authenticate/register', PanjaiToken,{
    // }).then(res => {
    //     console.log(res)
    //     if(res.data === "noLogin"){
    //         window.location.href = "http://localhost:3000/Login"
    //     } else {
    //         console.log(PanjaiToken)
    //     }
    // }).catch(error => console.log(error))

    const uploadFile = (event) => {
        event.preventDefault()
        // console.log(file)
        // console.log(username)
        // console.log(password)
        // console.log(Email)
        if (password !== CPassword) {
            window.alert('Confirm password incorrect!')
            //window.location.href = "http://localhost:3000/Login"
        }
        else {
            const formData = new FormData();
            formData.append('IDcard', file); // appending file
            formData.append('name', name)
            formData.append('username', username)
            formData.append('password', password)
            formData.append('email', Email)
            formData.append('address', address)
            formData.append('phone', phone)
            formData.append('PanjaiToken', PanjaiToken)
            const nowDay = new Date();
            formData.append('month', (nowDay.getMonth() + 1))
            formData.append('year', nowDay.getFullYear())
            //console.log(JSON.stringify(formData))
            Axios.post('/authenticate/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => {
                console.log(res)
                if (res.data.name) {
                    window.alert("Error: " + res.data.message)
                    console.log("error")
                } else {
                    window.location.href = "/Login"
                }
            }).catch(error => console.log(error))
        }
    }

    return (
        <div className="grid-container">
            <div className="item1_reg">
                <div className="image">
                    <img src={loginImg} />
                </div>
            </div>

            <div className="item2_reg">
                <h3>สมัครสมาชิก</h3>
                <center><form>
                    <div className="form-group">
                        <label>ชื่อ-นามสกุล:</label><br />
                        <input className='reg'
                            type="text"
                            name="Surname"
                            placeholder="ชื่อ-สกุล"
                            onChange={(event) => {
                                setName(event.target.value)
                            }}
                        />
                    </div>

                    <div className="form-group">
                        <label>ชื่อผู้ใช้:</label><br />
                        <input className='reg'
                            type="text"
                            name="Username"
                            placeholder="ชื่อผู้ใช้"
                            onChange={(event) => {
                                setUsername(event.target.value)
                            }}
                        />
                    </div>

                    <div className="form-group">
                        <label>รหัสผ่าน: </label><br />
                        <input className='reg'
                            type="password"
                            name="Password"
                            placeholder="รหัสผ่าน"
                            onChange={(event) => {
                                setPassword(event.target.value)
                            }}
                        />
                    </div>

                    <div className="form-group">
                        <label>ยืนยันรหัสผ่าน: </label><br />
                        <input className='reg'
                            type="password"
                            name="CPassword"
                            placeholder="รหัสผ่าน"
                            onChange={(event) => {
                                setCPassword(event.target.value)
                            }}
                        />
                    </div>

                    <div className="form-group">
                        <label>อีเมล: </label><br />
                        <input className='reg'
                            type="email"
                            name="email"
                            placeholder="อีเมล"
                            onChange={(event) => {
                                setEmail(event.target.value)
                            }}
                        />
                    </div>

                    <div className="form-group">
                        <label>ที่อยู่: </label><br />
                        <input className='reg'
                            type="text"
                            name="address"
                            placeholder="ที่อยู่"
                            onChange={(event) => {
                                setAddress(event.target.value)
                            }}
                        />
                    </div>

                    <div className="form-group">
                        <label>เบอร์โทรศัพท์: </label><br />
                        <input className='reg'
                            type="phone number"
                            name="phone"
                            placeholder="เบอร์โทรศัพท์"
                            onChange={(event) => {
                                setPhone(event.target.value)
                            }}
                        />
                    </div>

                    <div>
                        <label>ภาพบัตรประจำตัวประชาชน: </label><br />
                        <input className='reg'
                            type='file'
                            id='customFile'
                            onChange={(event) => {
                                setFile(event.target.files[0])
                            }}
                        />
                    </div>

                    <br />
                    <div>
                        <button className="btn btn-lg " onClick={uploadFile}>สมัครสมาชิก</button>
                    </div>
                </form></center>
            </div>
        </div>
    )
}

export default RegisterFrom;