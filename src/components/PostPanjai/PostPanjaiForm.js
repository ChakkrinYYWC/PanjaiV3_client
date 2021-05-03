import React, { useEffect, useState, Component, useRef } from "react";
import { TextField, withStyles, Button, colors, IconButton, Grid, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import useForm from "./useForm";
import ButterToast, { Cinnamon } from "butter-toast";
import { AssignmentTurnedIn, Repeat } from "@material-ui/icons";
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { province } from "../../Constants/provinces";
import { DeleteSweep } from "@material-ui/icons";
import styled from 'styled-components'
import MaskedInput from 'react-text-mask';
import Input from '@material-ui/core/Input';
import Axios from 'axios'
import './PostPanjai.css'
import { data } from "jquery";

const initialFieldValues = {
    title: '',
    message: '',
    contect: '',
    location: '',
}

const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1)

        },

    },
    form: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },

    postBtn: {
        "&:hover": {
            backgroundColor: "rgba(85, 52, 4, 0.925)"
        },
        margin: theme.spacing(1),
        background: 'rgba(187, 130, 44, 0.925)'
    },
    postBtn1: {
        "&:hover": {
            backgroundColor: "rgba(85, 52, 4, 0.925)"
        },
        margin: theme.spacing(1),
        background: '#a13800'
    },

    topic: {
        color: 'red'
    },
    input: {
        display: 'none',
    },
    imgpreview: {
        Color: "rgba(85, 52, 4, 0.925)"
    },
    primary: {
        background: 'white',
        padding: '10px 10px 10px 20px',
        marginBlock: '15px',
        boxShadow: '0 2px 3px 2px rgba(187, 130, 44, 0.925)',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        borderRadius: '10px'
    },
    color1: {
        color: '#a13800',
        marginLeft: '150px'
    },
    paper: {
        fontFamily: 'mali',
    },
    // bg1: {
    //     backgroundColor: 'rgba(187, 130, 44, 0.925)',
    // },
    select: {
        '& .MuiPaper-root': {
            height: '400px'
        }
    },

})

const ImageWrapper = styled.div`
    display:flex;
    overflow-x:scroll;
    width:auto;
`

const ImageBox = styled.div`
    position: relative;
    display: inline-block;
  
`

const Image = styled.img`
    height:150px
`

const ButtonWrapper = styled.div`
    position :absolute;
    top: 0;
    right:0;
`

const PostPanjaiForm = ({ classes, ...props }) => {

    const currentUser = localStorage.getItem('currentUser')
    const [multi_image, setMulti_image] = useState([]);
    const [data, setdata] = useState([]);
    const [text, settext] = useState('')
    const [url_file, seturl_file] = useState([]);

    // const [{ alt, src }, setImg] = useState([{
    //     src: undefined,
    //     alt: 'Upload an Image'
    // }]);

    useEffect(() => {
        //console.log(props.currentId)

        Axios.get('/Too-Panjai/', {
        }).then(async res => {
            await setdata(res.data.sort((a, b) => (a._id > b._id ? -1 : 1))) //sortdata
            //console.log(res.data)
        }).catch(error => console.log(error))

        if (props.currentId != 0) {
            setValues({
                ...data.find(x => x._id == props.currentId)
            })
            setErrors({})
        }

    }, [props.currentId])

    const validate = () => {
        console.log(file.length)

        // if (file.length == 0) {
        //     settext('กรุณาใส่รูป')
        // }

        let temp = { ...errors }
        temp.title = values.title ? "" : "กรุณาใส่ข้อมูล."
        temp.message = values.message ? "" : "กรุณาใส่ข้อมูล."
        temp.contect = values.contect ? "" : "กรุณาใส่ข้อมูล."
        temp.location = values.location ? "" : "กรุณาใส่ข้อมูล."
        if(props.currentId == 0){
            temp.image = file.length ? "" : "กรุณาใส่ข้อมูล."
        }
        setErrors({
            ...temp
        })
        console.log(temp)
        return Object.values(temp).every(x => x === "")
    }

    //console.log(text)

    var {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm,
        file,
        setFile
    } = useForm(initialFieldValues, props.setCurrentId)

    const setPhotos = e => {

        //console.log(e.target.files)
        //setFile(e.target.files)
        setFile((prev) => prev.concat(e.target.files))
        settext('')

        if (e.target.files) {

            // Array.from(e.target.files).map((file) => {
            //     setImg({
            //         src: URL.createObjectURL(file),
            //         alt: file.name
            //     });
            // });

            const filesArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
            //console.log("filesArray: ", filesArray);
            //seturl_file({file : e.target.files,url : filesArray})
            setMulti_image((prevImages) => prevImages.concat(filesArray));
            Array.from(e.target.files).map(
                (file) => URL.revokeObjectURL(file) // avoid memory leak
            );
        }
    }
    //console.log(file)

    const renderPhotos = (source) => {

        if (source.length != 0) {
            return (
                <ImageWrapper>
                    {
                        source.map((photo) => {
                            return (
                                <>
                                    <ImageBox>
                                        <Image src={photo} alt="" className={classes.imgpreview} />
                                        {/* <ButtonWrapper>
                                            <IconButton color="#000000" onClick={() => onRemoveImg(photo)}>
                                                <DeleteSweep />
                                            </IconButton>
                                        </ButtonWrapper> */}
                                    </ImageBox>
                                </>
                            );

                        })
                    }
                    <Button>
                        <IconButton color="#000000" onClick={() => onRemoveImg()}>
                            <DeleteSweep />
                        </IconButton>
                    </Button>
                    {/* <button type='button' onClick={() => onRemoveImg()}>Clear image</button> */}
                </ImageWrapper>
            )
        }

    };

    const onRemoveImg = () => {
        console.log('**')
        setFile([])
        setMulti_image([])

        // console.log(fileremove.name)
        // const filesArray = Array.from(file).filter(f_old => f_old.name !== fileremove.name);
        // //console.log(filesArray)
        // setFile(filesArray)
        //setMulti_image(multi_image.filter(url_old => url_old !== url))
    }

    const handleSubmit = async e => {
        e.preventDefault()
        const onSuccess = () => {
            ButterToast.raise({
                content: <Cinnamon.Crisp title="ตู้ปันใจ"
                    content="โพสต์เสร็จสมบรูณ์"
                    scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                    icon={<AssignmentTurnedIn />}
                />
            })
            resetForm()
            setMulti_image([])
            setFile([])
            window.location.reload()
        }

        console.log(validate())
        console.log(text)
        if (await validate() && text == '') {

            if (props.currentId == 0) {

                const formData = new FormData();

                //console.log(file.length)
                //console.log(file[0][0])

                for (let i = 0; i < file.length; i++) {
                    for (let j = 0; j < file[i].length; j++) {
                        ///console.log(file[i][j])
                        formData.append('image', file[i][j]);
                    }
                }

                formData.append('title', values.title);
                formData.append('message', values.message);
                formData.append('contect', values.contect);
                formData.append('location', values.location);
                formData.append('creator', currentUser);

                //console.log('โพสได้จ้า')
                Axios.post('/Too-Panjai/', formData, {
                }).then(async res => {
                    onSuccess()
                    console.log(res.data)
                }).catch(error => console.log(error))

            }
            else {
                Axios.put('/Too-Panjai/' + props.currentId, values, {
                }).then(async res => {
                    onSuccess()
                    //console.log(res.data)
                }).catch(error => console.log(error))
            }
        }

    }
    //console.log(file.length)

    const closeEdit = e => {
        e.preventDefault()
        resetForm()
        props.setCurrentId(0);
    }

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };


    // post
    if (props.currentId == 0) {
        if (currentUser !== "null") {
            return (
                <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`}
                    onSubmit={handleSubmit}>
                    <Grid item xs={12} >
                        {/* <div>
                        <img src={src} alt={alt} className={classes.imgpreview} />
                    </div> */}

                        {
                            renderPhotos(multi_image)
                        }

                        <input
                            accept="image/*"
                            className={classes.input}
                            id="icon-button-file"
                            type="file"
                            multiple
                            onChange={setPhotos}
                        />
                        <label htmlFor="icon-button-file" >
                            <IconButton color="primary" aria-label="upload picture" component="span" className={classes.color1} >
                                <PhotoCamera />
                            </IconButton>
                        </label>

                        <div style={{ color: "rgb(117, 24, 12)", textAlign: "center" }}>{text}</div>
                        {/* แสดงเป็นตัวอักษรสีแดง */}

                    </Grid>


                    <Grid item xs={12} sm={6}
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        <TextField
                            // style={{backgroundColor:'white', marginBottom:'1rem', marginTop:'1rem'}}
                            InputProps={{ style: { border: '3px', margin: '1rem 0 1rem 0', } }}
                            name="title"
                            label="ชื่อสิ่งของ"
                            size="small"
                            fullWidth
                            className={classes.paper}
                            value={values.title}
                            onChange={handleInputChange}
                            {...(errors.title && { error: true, helperText: errors.title })}
                        />
                    </Grid>


                    <Grid item xs={12} sm={6}
                        container
                        direction="row"
                        justify="center"
                        alignItems="center" >

                        <TextField
                            name="message"

                            InputProps={{ style: { border: '3px', margin: '1rem 0 1rem 0',  } }}
                            label="ข้อมูลสิ่งของ"
                            fullWidth
                            size="small"

                            // rows={4}
                            value={values.message}
                            onChange={handleInputChange}
                            {...(errors.message && { error: true, helperText: errors.message })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}
                        container
                        direction="row"
                        justify="center"
                        alignItems="center" >

                        <TextField
                            type='number'
                            name="contect"

                            InputProps={{ style: { border: '3px', margin: '1rem 0 1rem 0' } }}
                            label="เบอร์โทรศัพท์"
                            fullWidth
                            size="small"
                            value={values.contect}
                            onChange={handleInputChange}
                            {...(errors.contect && { error: true, helperText: errors.contect })}
                        />

                    </Grid>

                    <Grid item xs={12} sm={6}
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        <FormControl fullWidth className={classes.select}>
                            <InputLabel >จังหวัด</InputLabel>
                            <Select
                                InputProps={{ style: { border: '3px', margin: '1rem 0 1rem 0' } }}
                                name='location'
                                value={values.location}
                                fullWidth
                                onChange={handleInputChange}
                                {...(errors.location && { error: true, helperText: errors.location })}
                            >
                                {province.map((province) => <MenuItem value={province}>{province}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Grid>


                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        type="submit"
                        className={classes.postBtn}

                    >โพสต์</Button>
                </form >
            )
        } else {
            return (
                <div><center>Please login to available posting.</center></div>
            )
        }
        // กดแก้่ไข
    } else {
        return (
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form} ${classes.bg1}`}
                onSubmit={handleSubmit}>

                <Grid item xs={12} sm={6}
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <TextField
                        // style={{backgroundColor:'white', marginBottom:'1rem', marginTop:'1rem'}}
                        InputProps={{ style: { border: '3px', margin: '1rem 0 1rem 0' } }}
                        name="title"

                        label="ชื่อสิ่งของ"
                        fullWidth
                        className={classes.paper}
                        value={values.title}
                        onChange={handleInputChange}
                        {...(errors.title && { error: true, helperText: errors.title })}
                    />
                </Grid>


                <Grid item xs={12} sm={6}
                    container
                    direction="row"
                    justify="center"
                    alignItems="center" >

                    <TextField
                        name="message"

                        InputProps={{ style: { border: '3px', margin: '1rem 0 1rem 0' } }}
                        label="ข้อมูล"
                        fullWidth

                        // rows={4}
                        value={values.message}
                        onChange={handleInputChange}
                        {...(errors.message && { error: true, helperText: errors.message })}
                    />
                </Grid>
                <Grid item xs={12} sm={6}
                    container
                    direction="row"
                    justify="center"
                    alignItems="center" >

                    <TextField
                        name="contect"

                        InputProps={{ style: { border: '3px', margin: '1rem 0 1rem 0',  } }}
                        label="เบอร์โทรศัพท์"
                        fullWidth
                        value={values.contect}
                        onChange={handleInputChange}
                        {...(errors.contect && { error: true, helperText: errors.contect })}
                    />
                </Grid>

                <Grid item xs={12} sm={6}
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <FormControl fullWidth >
                        <InputLabel >จังหวัด</InputLabel>
                        <Select
                            name='location'
                            value={values.location}
                            fullWidth
                            onChange={handleInputChange}
                            {...(errors.location && { error: true, helperText: errors.location })}
                        >
                            {province.map((province) => <MenuItem value={province}>{province}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Grid>


                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    type="submit"
                    className={classes.postBtn}

                >โพสต์</Button>
                <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={closeEdit}
                    className={classes.postBtn1}

                >ยกเลิก</Button>
            </form>
        );
    }

}

export default (withStyles(styles)(PostPanjaiForm));