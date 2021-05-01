import React, { useEffect, useState } from 'react';
import useForm from "../PostPanjai/useForm";
import * as actions from "../../action/postFDT";
import { connect } from "react-redux";
import {
    withStyles, Typography, IconButton, Button,
    TextField, MenuItem, FormControl, InputLabel,
    Select
} from '@material-ui/core';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { PhotoCamera, AssignmentTurnedIn } from "@material-ui/icons"
import ButterToast, { Cinnamon } from "butter-toast";
import zIndex from '@material-ui/core/styles/zIndex';
import DeleteIcon from '@material-ui/icons/Delete';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { data } from 'jquery';
import { tag } from "../../Constants/provinces";

const defaultImageSrc = '/image.png'

const initialFieldValues = {
    title: '',
    message: '',
    item: '',
    item1: '',
    item2: '',
    item3: '',
    n_item: '',
    category: '',
    // promptpay: '',
    endtime: '',
    lat: '',
    lng: '',
    imageFile: null,
    address: '',
    phone: '',
}

const styles = theme => ({
    form: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    root: {
        padding: theme.spacing(2),
        padding: "20px 20px 15px 20px",
    },
    margin: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    input: {
        display: 'none',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    imgpreview: {
        marginBottom: "20px",
        width: "20%",


    },
    buttonicondel: {
        "&:hover": {
            color: "rgb(255, 255, 255)",
        },
        width: "10%",
        hight: "5%",
        padding: "0",
        fontSize: '5px',

        right: "87px"
    },
    color1: {
        "&:hover": {
            color: "rgb(255, 255, 255)",
            backgroundColor: "rgb(193, 140, 87)"
        },
        color: '#a13800',
        backgroundColor: "rgb(248, 242, 236)",
        marginLeft: '25px',

    },
    Btn: {
        "&:hover": {
            backgroundColor: "rgb(255, 230, 153)",
            fontSize: '13px'
        },
        color: "rgb(51, 38, 0)",
        background: 'rgb(255, 191, 0)',
        fontFamily: 'mali',
        fontSize: '15px'
    },
    want: {
        padding: "0 40px 0 0",
        margin: "0 0 10px 0"
    },
    latijud: {
        padding: "0 40px 0 0",
        margin: "0 0 10px 0"
    },

    formControl: {
        padding: "0",
        width: "25%",
    },
    titile: {
        width: "50%",
        margin: "0 0 10px 0"

    },
    detail: {

        padding: "0 55px 0 0",
        margin: "0 0 10px 0"
    },
    // promptpay: {
    //     padding: "0 40px 0 0",
    //     margin: "0 0 10px 0"
    // },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },

});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(1),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(0),
    },
}))(MuiDialogActions);


const PostFDT = ({ classes, ...props }) => {

    const [multi_image, setMulti_image] = useState([]);
    const arr = []

    // const [{ alt, src }, setImg] = useState({
    //     src: defaultImageSrc,
    //     alt: 'Upload an Image'
    // });

    useEffect(() => {
        if (props.current != 0) {
            setValues({
                ...props.postFDTList.find(x => x._id == props.current)
            })
            setErrors({})
        }
    }, [props.current])

    const validate = () => {
        let temp = { ...errors }
        temp.title = values.title ? "" : "กรุณาใส่ข้อมูล."
        temp.message = values.message ? "" : "กรุณาใส่ข้อมูล."
        temp.item1 = values.item1 ? "" : "กรุณาใส่ข้อมูล."
        // temp.item2 = values.item2 ? "" : "กรุณาใส่ข้อมูล."
        // temp.item3 = values.item3 ? "" : "กรุณาใส่ข้อมูล."
        temp.n_item = values.n_item ? "" : "กรุณาใส่ข้อมูล."
        temp.lat = values.lat ? "" : "กรุณาใส่ข้อมูล."
        temp.lng = values.lng ? "" : "กรุณาใส่ข้อมูล."
        temp.address = values.address ? "" : "กรุณาใส่ข้อมูล."
        temp.phone = values.phone ? "" : "กรุณาใส่ข้อมูล."
        //temp.endtime = values.endtime ? "" : "กรุณาใส่ข้อมูล."
        temp.category = values.category ? "" : "กรุณาใส่ข้อมูล."
        // temp.promptpay = values.promptpay ? "" : "กรุณาใส่ข้อมูล."
        setErrors({
            ...temp
        })
        return Object.values(temp).every(x => x == "")
    }

    var {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetFormFDT,
        file,
        setFile,
        category,
        setCategory
    } = useForm(initialFieldValues, props.setCurrent)

    const setPhotos = e => {
        // console.log(e.target.files[0])
        setFile(e.target.files)

        if (e.target.files) {
            const filesArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
            //console.log("filesArray: ", filesArray);
            setMulti_image((prevImages) => prevImages.concat(filesArray));
            Array.from(e.target.files).map(
                (file) => URL.revokeObjectURL(file) // avoid memory leak
            );
        }
    }

    const renderPhotos = (source) => {
        // console.log('source: ', source);
        return source.map((photo) => {
            return (
                <>

                    <img src={photo} alt="" key={photo} className={classes.imgpreview} />

                    <Button
                        className={classes.buttonicondel}
                        variant="contained"
                        color="secondary"
                        onClick={() => onRemoveImg(photo)} component="span">
                        Delete
                    </Button>
                </>
            );
        });
    };

    const onRemoveImg = (url) => {
        setMulti_image(multi_image.filter(url_old => url_old !== url))
    }

    const handleSubmit = e => {
        e.preventDefault()
        const onSuccess = () => {
            ButterToast.raise({
                content: <Cinnamon.Crisp title="มูลนิธิ"
                    content="สร้างโพสต์สำหรับมูลนิธิเสร็จสมบูรณ์"
                    scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                    icon={<AssignmentTurnedIn />}
                />
            })
            resetFormFDT()
            setMulti_image([])
        }
        console.log(validate())
        console.log(props.current)
        if (validate() && props.current == 0) {
            if (props.current == 0) {
                console.log('***')
                const formData = new FormData();

                for (let i = 0; i < file.length; i++) {
                    formData.append('image', file[i]);
                }

                formData.append('title', values.title);
                formData.append('message', values.message);
                formData.append('item1', values.item1);
                formData.append('item2', values.item2);
                formData.append('item3', values.item3);
                formData.append('n_item', values.n_item);
                formData.append('address', values.address);
                formData.append('phone', values.phone);
                formData.append('category', values.category);
                // formData.append('category', category);
                // formData.append('promptpay', values.promptpay);
                formData.append('endtime', values.endtime);
                formData.append('lat', values.lat);
                formData.append('lng', values.lng);

                props.createPostFDT(formData, onSuccess) //ส่งค่าไปserver
            }
        } else if (props.current != 0) {
            console.log(values)
            props.updatePostFDT(props.current, values, onSuccess)
        }

    }

    const handleChange = e => {
        setCategory(e.target.value);
    };
    const [selectedDate, setSelectedDate] = React.useState(new Date('2021-04-30T21:11:54'));

    const handleDateChange = (date) => {
        setSelectedDate(date);
        values.endtime = date
        console.log(date);
    };

    //console.log(values)

    const handleChangeDate = e => {
        console.log(e.target)
    };

    if (props.current == 0) {
        return (
            <form noValidate autoComplete="off" className={`${classes.root} ${classes.form}`}>

                <Typography gutterBottom>
                    <TextField
                        id="standard-basic"
                        label="หัวข้อ"
                        className={classes.titile}
                        name="title"
                        value={values.title}
                        onChange={handleInputChange}
                        {...(errors.title && { error: true, helperText: errors.title })}
                    />
                    <TextField
                        id="standard-basic"
                        name="message"
                        className={classes.detail}
                        label="รายละเอียด"
                        fullWidth
                        multiline
                        rows={2}
                        value={values.message}
                        onChange={handleInputChange}
                        {...(errors.message && { error: true, helperText: errors.message })}
                    />
                    <TextField
                        id="standard-basic"
                        name="item1"
                        label="ชิ้นที่1"
                        className={classes.want}
                        value={values.item1}
                        onChange={handleInputChange}
                        {...(errors.item1 && { error: true, helperText: errors.item1 })}
                    />
                    <TextField
                        id="standard-basic"
                        name="item2"
                        label="ชิ้นที่2"
                        className={classes.want}
                        value={values.item2}
                        onChange={handleInputChange}
                        {...(errors.item2 && { error: true, helperText: errors.item2 })}
                    />
                    <TextField
                        id="standard-basic"
                        name="item3"
                        label="ชิ้นที่3"
                        className={classes.want}
                        value={values.item3}
                        onChange={handleInputChange}
                        {...(errors.item3 && { error: true, helperText: errors.item3 })}
                    />
                    <TextField
                        id="standard-number"
                        name="n_item"
                        label="Number"
                        type="number"
                        label="จำนวน"
                        value={values.n_item}
                        onChange={handleInputChange}
                        {...(errors.n_item && { error: true, helperText: errors.n_item })}
                    />
                    <TextField
                        id="standard-number"
                        name="lat"
                        label="ละติจูด"
                        type="number"
                        className={classes.latijud}
                        value={values.lat}
                        onChange={handleInputChange}
                        {...(errors.lat && { error: true, helperText: errors.lat })}
                    />
                    <TextField
                        id="standard-number"
                        name="lng"
                        label="ลองจิจูด"
                        type="number"
                        value={values.lng}
                        onChange={handleInputChange}
                        {...(errors.lng && { error: true, helperText: errors.lng })}
                    /><br />
                    <TextField
                        id="standard-basic"
                        name="address"
                        className={classes.detail}
                        label="ที่อยู่"
                        multiline
                        value={values.address}
                        onChange={handleInputChange}
                        {...(errors.address && { error: true, helperText: errors.address })}
                    />
                    <TextField
                        id="standard-number"
                        name="phone"
                        type='number'
                        label="เบอร์โทรศัพท์"
                        value={values.phone}
                        onChange={handleInputChange}
                        {...(errors.phone && { error: true, helperText: errors.phone })}
                    /><br />
                    {/* <TextField
                        id="standard-basic"
                        name="promptpay"
                        type="number"
                        className={classes.promptpay}
                        label="พร้อมเพย์"
                        value={values.promptpay}
                        onChange={handleInputChange}
                        {...(errors.promptpay && { error: true, helperText: errors.promptpay })}
                    /> */}

                    <FormControl className={classes.formControl}>
                        <InputLabel >หมวดหมู่</InputLabel>
                        <Select
                            InputProps={{ style: { border: '3px', fontFamily: 'mali', height: '40px' } }}
                            name='category'
                            value={values.category}
                            fullWidth
                            onChange={handleInputChange}
                            {...(errors.category && { error: true, helperText: errors.category })}
                        >
                            {tag.map((tag) => <MenuItem value={tag}>{tag}</MenuItem>)}
                        </Select>
                    </FormControl>



                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container >
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="dd/MM/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="วันสิ้นสุดโครงการ"
                                value={selectedDate}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />

                        </Grid>
                    </MuiPickersUtilsProvider>

                    <div className=''>{renderPhotos(multi_image)}</div>

                    <input
                        accept="image/*"
                        className={classes.input}
                        id="icon-button-file"
                        type="file"
                        multiple
                        onChange={setPhotos}
                    />
                    <label htmlFor="icon-button-file">
                        <IconButton color="primary" aria-label="upload picture" component="span" className={classes.color1} >
                            <PhotoCamera />
                        </IconButton>
                    </label>

                </Typography>


                <DialogActions>
                    <Button onClick={handleSubmit}
                        className={classes.Btn}
                        color="primary" >
                        Post
                </Button>
                </DialogActions>
            </form>
        );
    } else {
        arr.push(values.item)
        // console.log(values.item)
        // console.log(arr)
        return (
            <form noValidate autoComplete="off" className={`${classes.root} ${classes.form}`}>
                <Typography gutterBottom>
                    <TextField
                        id="standard-basic"
                        className={classes.titile}
                        label="หัวข้อ"
                        name="title"
                        value={values.title}
                        onChange={handleInputChange}
                        {...(errors.title && { error: true, helperText: errors.title })}
                    />
                    <TextField
                        id="standard-basic"
                        name="message"
                        className={classes.detail}
                        label="รายละเอียด"
                        fullWidth
                        multiline
                        rows={2}
                        value={values.message}
                        onChange={handleInputChange}
                        {...(errors.message && { error: true, helperText: errors.message })}
                    />
                    <TextField
                        id="standard-basic"
                        name="item"
                        label="สิ่งของที่รับบริจาค"
                        className={classes.want}
                        value={values.item}
                        onChange={handleInputChange}
                        {...(errors.item && { error: true, helperText: errors.item })}
                    />
                    <TextField
                        id="standard-number"
                        name="n_item"
                        label="Number"
                        type="number"
                        label="จำนวน"
                        value={values.n_item}
                        onChange={handleInputChange}
                        {...(errors.n_item && { error: true, helperText: errors.n_item })}
                    />
                    <TextField
                        id="standard-number"
                        name="lat"
                        label="ละติจูด"
                        type="number"
                        className={classes.latijud}
                        value={values.lat}
                        onChange={handleInputChange}
                        {...(errors.lat && { error: true, helperText: errors.lat })}
                    />
                    <TextField
                        id="standard-number"
                        name="lng"
                        type="number"
                        label="ลองจิจูด"
                        value={values.lng}
                        onChange={handleInputChange}
                        {...(errors.lng && { error: true, helperText: errors.lng })}
                    /><br />
                    <TextField
                        id="standard-basic"
                        name="address"
                        className={classes.detail}
                        label="ที่อยู่"
                        multiline
                        value={values.address}
                        onChange={handleInputChange}
                        {...(errors.address && { error: true, helperText: errors.address })}
                    />
                    <TextField
                        id="standard-number"
                        name="phone"
                        type='number'
                        label="เบอร์โทรศัพท์"
                        value={values.phone}
                        onChange={handleInputChange}
                        {...(errors.phone && { error: true, helperText: errors.phone })}
                    /><br />
                    {/* <TextField
                        id="standard-basic"
                        name="promptpay"
                        type="number"
                        className={classes.promptpay}
                        label="พร้อมเพย์"
                        value={values.promptpay}
                        onChange={handleInputChange}
                        {...(errors.promptpay && { error: true, helperText: errors.promptpay })}
                    /><br /> */}
                    {/* <input
                        accept="image/*"
                        className={classes.input}
                        id="icon-button-file"
                        type="file"
                        onChange={showPreview}
                    />
                    <label htmlFor="icon-button-file">
                        <IconButton color="primary" aria-label="upload picture" component="span">
                            <PhotoCamera />
                        </IconButton>
                    </label>
                    <div>
                        <img src={src} alt={alt} className={classes.imgpreview} />
                    </div> */}



                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container >
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="dd/MM/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="วันสิ้นสุดโครงการ"
                                value={selectedDate}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />

                        </Grid>
                    </MuiPickersUtilsProvider>
                    <div className=''>{renderPhotos(multi_image)}</div>
                    <input
                        accept="image/*"
                        className={classes.input}
                        id="icon-button-file"
                        type="file"
                        multiple
                        onChange={setPhotos}
                    />
                    <label htmlFor="icon-button-file">
                        <IconButton color="primary" aria-label="upload picture" component="span" className={classes.color1} >
                            <PhotoCamera />
                        </IconButton>
                    </label>

                </Typography>


                <DialogActions>
                    <Button onClick={handleSubmit}
                        className={classes.Btn}
                        color="primary" >
                        save
                </Button>
                </DialogActions>
            </form>
        );
    }
}

const mapStateToProps = state => ({
    postFDTList: state.postFDT.list
})

const mapActionToProps = {
    createPostFDT: actions.create,
    updatePostFDT: actions.update
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(PostFDT));
