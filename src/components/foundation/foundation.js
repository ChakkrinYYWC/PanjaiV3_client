// import React, { useEffect, useState, Fragment } from 'react';
// import { connect } from 'react-redux';
// import * as action from '../../action/postFDT'
// import { Divider, Grid, Paper, Typography, withStyles, List, ListItem, ListItemText, Button, makeStyles } from '@material-ui/core';
// import PostFDT from './PostFDT'
// import ShowFDT from './ShowFDT'
// import ButterToast, { Cinnamon } from "butter-toast";
// import { DeleteSweep, AccessAlarm, ThreeDRotation } from "@material-ui/icons";
// import moment from 'moment';
// import api from '../../action/api'
// import IconButton from '@material-ui/core/IconButton';
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
// import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';
// import Icon from '@material-ui/core/Icon';
// import {
//   BrowserRouter as Router,
//   Route,
//   Switch,
//   Link,
//   Redirect
// } from "react-router-dom";


// const styles = theme => ({
//   paper: {
//     margin: theme.spacing(3),
//     padding: theme.spacing(2)
//   },
//   smMargin: {
//     "&:hover": {
//       backgroundColor: "rgba(85, 52, 4, 0.925)"
//     },
//     margin: theme.spacing(1),
//     background: 'rgba(187, 130, 44, 0.925)'
//   },
//   smMargin1: {
//     "&:hover": {
//       backgroundColor: "rgba(85, 52, 4, 0.925)"
//     },
//     margin: theme.spacing(1),
//     background: '#a13800'
//   },
//   actionDiv: {
//     textAlign: "center"
//   },
//   post1: {

//     borderRadius: 5,
//     boxShadow: '0 2px 3px 2px rgba(85, 52, 4, 0.925)',
//     height: 'auto',
//     padding: '30px 30px',
//     marginBlock: '15px'

//   },
//   framepost: {
//     // background: '#f9a825',
//     borderRadius: 5,
//     boxShadow: '0 2px 3px 2px rgba(187, 130, 44, 0.925)',
//     color: 'rgba(187, 130, 44, 0.925)',
//     height: 'auto',
//     padding: '10px 10px',
//     marginBlock: '15px'
//   },
//   frampicture: {
//     padding: '10px 10px'

//   },
//   picture: {
//     height: '150px',
//     width: 'auto',
//     margin: '10px auto',


//   },
//   frontpost: {
//     fontFamily: 'mali',
//     borderRadius: '50px'
//   },
//   color1: {
//     color: '#a13800'
//   },
//   judjudjud: {
//     marginLeft: '75px'

//   },

// })

// const Foundation = ({ classes, ...props }) => {

//   const [currentId, setCurrentId] = useState(0)

//   useEffect(() => {
//     props.fetchAllPostFDT()
//   }, [])


//   return (
//     <>
//       <h2>เด็กและเยาวชน</h2>
//       <Grid container spacing={2}>
//         {
//           props.postFDTList.filter(fdt => fdt.category == 'เด็กและเยาวชน').map((record, index) => {
//             return (
//               <Grid item xs={12} sm={4}>
//                 <Paper className={classes.framepost}>
//                   <Fragment key={index}>
//                     <ListItem>
//                       <ListItemText>
//                         <Grid container>
//                           <Grid item xs={8}>
//                             <Typography variant='h5' className={`${classes.color1} ${classes.frontpost}`}>
//                               {record.title}
//                             </Typography>
//                           </Grid>
//                         </Grid>

//                         {/*<div className={classes.frontpost}>
//                           ข้อมูล : {record.message}
//                         </div>
//                         <Grid container justify="center">
//                           <div className={classes.frampicture} >
//                             <img src={'http://localhost:3001/image/' + record.image} className={classes.picture} />
//                           </div>
//                         </Grid> */}
//                         <div className={classes.frontpost}>
//                           ต้องการรับบริจาค "{record.item}"
//                         </div>
//                         <div className={classes.frontpost}>
//                           จำนวน : {record.n_item}
//                         </div>
//                         {/* <div className={classes.frontpost}>
//                           หมวด : {record.category}
//                         </div> */}
//                         <div className={`${classes.color1} ${classes.frontpost}`}>
//                           เวลาที่ลง : {moment(record.Timestamp).calendar()}
//                         </div>
//                         <Button variant="contained" color="primary" size="small"
//                           className={`${classes.smMargin} ${classes.frontpost}`}
//                           href={'Foundation/' + record._id}
//                         // onClick={() => senddata(record._id)}
//                         >
//                           อ่านเพิ่มเติม
//                         </Button>
//                         {/* <Link to={'Foundation/'+record._id+'/show'}>FDT</Link> */}
//                       </ListItemText>
//                     </ListItem>
//                     <Divider component='li' />
//                   </Fragment>
//                 </Paper>
//               </Grid>
//             );
//           })
//         }
//       </Grid>
//       <h2>ผู้สูงอายุ</h2>
//       <Grid container spacing={2}>
//         {
//           props.postFDTList.filter(fdt => fdt.category == 'ผู้สูงอายุ').map((record, index) => {
//             return (
//               <Grid item xs={12} sm={4}>
//                 <Paper className={classes.framepost}>
//                   <Fragment key={index}>
//                     <ListItem>
//                       <ListItemText>
//                         <Grid container>
//                           <Grid item xs={8}>
//                             <Typography variant='h5' className={`${classes.color1} ${classes.frontpost}`}>
//                               {record.title}
//                             </Typography>
//                           </Grid>
//                         </Grid>
//                         <div className={classes.frontpost}>
//                           ต้องการรับบริจาค "{record.item}"
//                         </div>
//                         <div className={classes.frontpost}>
//                           จำนวน : {record.n_item}
//                         </div>
//                         <div className={`${classes.color1} ${classes.frontpost}`}>
//                           เวลาที่ลง : {moment(record.Timestamp).calendar()}
//                         </div>
//                         <Button variant="contained" color="primary" size="small"
//                           className={`${classes.smMargin} ${classes.frontpost}`}
//                           href={'Foundation/' + record._id}
//                         // onClick={() => setCurrentId(record._id)}
//                         >
//                           อ่านเพิ่มเติม
//                         </Button>
//                       </ListItemText>
//                     </ListItem>
//                     <Divider component='li' />
//                   </Fragment>
//                 </Paper>
//               </Grid>
//             );
//           })
//         }
//       </Grid>
//       <h2>สัตว์</h2>
//       <Grid container spacing={2}>
//         {
//           props.postFDTList.filter(fdt => fdt.category == 'สัตว์').map((record, index) => {
//             return (
//               <Grid item xs={12} sm={4}>
//                 <Paper className={classes.framepost}>
//                   <Fragment key={index}>
//                     <ListItem>
//                       <ListItemText>
//                         <Grid container>
//                           <Grid item xs={8}>
//                             <Typography variant='h5' className={`${classes.color1} ${classes.frontpost}`}>
//                               {record.title}
//                             </Typography>
//                           </Grid>
//                         </Grid>
//                         <div className={classes.frontpost}>
//                           ต้องการรับบริจาค "{record.item}"
//                         </div>
//                         <div className={classes.frontpost}>
//                           จำนวน : {record.n_item}
//                         </div>
//                         <div className={`${classes.color1} ${classes.frontpost}`}>
//                           เวลาที่ลง : {moment(record.Timestamp).calendar()}
//                         </div>
//                         <Button variant="contained" color="primary" size="small"
//                           className={`${classes.smMargin} ${classes.frontpost}`}
//                           href={'Foundation/' + record._id}
//                         // onClick={() => setCurrentId(record._id)}
//                         >
//                           อ่านเพิ่มเติม
//                         </Button>
//                       </ListItemText>
//                     </ListItem>
//                     <Divider component='li' />
//                   </Fragment>
//                 </Paper>
//               </Grid>
//             );
//           })
//         }
//       </Grid>
//       <h2>ผู้พิการและผู้ป่วย</h2>
//       <Grid container spacing={2}>
//         {
//           props.postFDTList.filter(fdt => fdt.category == 'ผู้พิการและผู้ป่วย').map((record, index) => {
//             return (
//               <Grid item xs={12} sm={4}>
//                 <Paper className={classes.framepost}>
//                   <Fragment key={index}>
//                     <ListItem>
//                       <ListItemText>
//                         <Grid container>
//                           <Grid item xs={8}>
//                             <Typography variant='h5' className={`${classes.color1} ${classes.frontpost}`}>
//                               {record.title}
//                             </Typography>
//                           </Grid>
//                         </Grid>
//                         <div className={classes.frontpost}>
//                           ต้องการรับบริจาค "{record.item}"
//                         </div>
//                         <div className={classes.frontpost}>
//                           จำนวน : {record.n_item}
//                         </div>
//                         <div className={`${classes.color1} ${classes.frontpost}`}>
//                           เวลาที่ลง : {moment(record.Timestamp).calendar()}
//                         </div>
//                         <Button variant="contained" color="primary" size="small"
//                           className={`${classes.smMargin} ${classes.frontpost}`}
//                           href={'Foundation/' + record._id}
//                         // onClick={() => setCurrentId(record._id)}
//                         >
//                           อ่านเพิ่มเติม
//                         </Button>
//                       </ListItemText>
//                     </ListItem>
//                     <Divider component='li' />
//                   </Fragment>
//                 </Paper>
//               </Grid>
//             );
//           })
//         }
//       </Grid>
//       <h2>สิ่งแวดล้อม</h2>
//       <Grid container spacing={2}>
//         {
//           props.postFDTList.filter(fdt => fdt.category == 'สิ่งแวดล้อม').map((record, index) => {
//             return (
//               <Grid item xs={12} sm={4}>
//                 <Paper className={classes.framepost}>
//                   <Fragment key={index}>
//                     <ListItem>
//                       <ListItemText>
//                         <Grid container>
//                           <Grid item xs={8}>
//                             <Typography variant='h5' className={`${classes.color1} ${classes.frontpost}`}>
//                               {record.title}
//                             </Typography>
//                           </Grid>
//                         </Grid>
//                         <div className={classes.frontpost}>
//                           ต้องการรับบริจาค "{record.item}"
//                         </div>
//                         <div className={classes.frontpost}>
//                           จำนวน : {record.n_item}
//                         </div>
//                         <div className={`${classes.color1} ${classes.frontpost}`}>
//                           เวลาที่ลง : {moment(record.Timestamp).calendar()}
//                         </div>
//                         <Button variant="contained" color="primary" size="small"
//                           className={`${classes.smMargin} ${classes.frontpost}`}
//                           href={'Foundation/' + record._id}
//                         // onClick={() => setCurrentId(record._id)}
//                         >
//                           อ่านเพิ่มเติม
//                         </Button>
//                       </ListItemText>
//                     </ListItem>
//                     <Divider component='li' />
//                   </Fragment>
//                 </Paper>
//               </Grid>
//             );
//           })
//         }
//       </Grid>
//       <h2>อื่นๆ</h2>
//       <Grid container spacing={2}>
//         {
//           props.postFDTList.filter(fdt => fdt.category == 'อื่นๆ').map((record, index) => {
//             return (
//               <Grid item xs={12} sm={4}>
//                 <Paper className={classes.framepost}>
//                   <Fragment key={index}>
//                     <ListItem>
//                       <ListItemText>
//                         <Grid container>
//                           <Grid item xs={8}>
//                             <Typography variant='h5' className={`${classes.color1} ${classes.frontpost}`}>
//                               {record.title}
//                             </Typography>
//                           </Grid>
//                         </Grid>
//                         <div className={classes.frontpost}>
//                           ต้องการรับบริจาค "{record.item}"
//                         </div>
//                         <div className={classes.frontpost}>
//                           จำนวน : {record.n_item}
//                         </div>
//                         <div className={`${classes.color1} ${classes.frontpost}`}>
//                           เวลาที่ลง : {moment(record.Timestamp).calendar()}
//                         </div>
//                         <Button variant="contained" color="primary" size="small"
//                           className={`${classes.smMargin} ${classes.frontpost}`}
//                           href={'Foundation/' + record._id}
//                         // onClick={() => setCurrentId(record._id)}
//                         >
//                           อ่านเพิ่มเติม
//                         </Button>
//                       </ListItemText>
//                     </ListItem>
//                     <Divider component='li' />
//                   </Fragment>
//                 </Paper>
//               </Grid>
//             );
//           })
//         }
//       </Grid>
//     </>
//   );
// }

// const mapStateToProps = state => ({
//   postFDTList: state.postFDT.list
// })

// const mapActionToProps = {
//   fetchAllPostFDT: action.fetchAll,
//   fetchPostFDT: action.fetchById,
//   deletePostMessage: action.Delete
// }

// export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Foundation));
