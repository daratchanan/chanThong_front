import React, { useEffect, useState } from 'react';
import { Box, TextField, Typography } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import SaveIcon from '@material-ui/icons/Save';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import localStorage from '../services/localStorage'
import Navbar from './Navbar';


const useStyle = makeStyles((theme) => ({
   mainContainer: {
      width: "80%",
      margin: "0 auto",
      backgroundColor: "lightblue"
   },
   top: {
      display: "flex",
      width: "100%",
   },
   avatar: {
      display: 'flex',
      '& > *': {
         margin: theme.spacing(2),
      },
   },
   large: {
      width: theme.spacing(30),
      height: theme.spacing(30),
   },
   topRight: {
      margin: theme.spacing(10),
   },
   bottom: {
      width: "90%",
      margin: "0 auto"
   },
   buttonGroup: {
      margin: "20px 0",
      width: "60%",
      display: "flex",
      justifyContent: "space-between"
   },
   profileDetail: {
      width: "60%"
   },
   textBox: {
      display: "flex",
      alignItems: "center",
      width: "100%",
      justifyContent: "space-between",
      marginBottom: theme.spacing(2),
   },
   inputBox: {
      width: "300px"
   },
   backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
   },
}));


function Profile({ setRole }) {
   const classes = useStyle();
   const { id } = jwtDecode(localStorage.getToken());

   const [username, setUsername] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [restaurantName, setRestaurantName] = useState("");
   const [address, setAddress] = useState("");
   const [province, setProvince] = useState("");
   const [district, setDistrict] = useState("");
   const [phone, setPhone] = useState("");
   const [priceRange, setPriceRange] = useState("");

   const setInitialState = (profile) => {
      setUsername(profile.username);
      setEmail(profile.email_address);
      setRestaurantName(profile.restaurant_name);
      setAddress(profile.address);
      setPhone(profile.phone_number);
      setPriceRange(profile.price_range)
   }

   const handleUsername = (event) => {
      setUsername(event.target.value);
   };

   const handleEmail = (event) => {
      setEmail(event.target.value);
   };

   const handlePassword = (event) => {
      setPassword(event.target.value);
   };

   const handleRestaurantName = (event) => {
      setRestaurantName(event.target.value);
   };

   const handleAddress = (event) => {
      setAddress(event.target.value);
   };

   const handleProvince = (event) => {
      setProvince(event.target.value);
   };

   const handleDistrict = (event) => {
      setDistrict(event.target.value);
   };

   const handlePhone = (event) => {
      setPhone(event.target.value);
   };

   const handlePriceRange = (event) => {
      setPriceRange(event.target.value);
   };

   const getProfile = async () => {
      await axios
         .get(`/partners/${id}`)
         .then(res => {
            setInitialState(res.data.targetPartner);
            console.log(res.data.targetPartner);
         })
         .catch(err => {
            alert("err")
         })
   };

   useEffect(() => {
      getProfile();
   }, [])
   

   const onFinish = async () => {
      const data = {
         username, 
         email_address:email, 
         restaurant_name:restaurantName,
         address:address,
         phone_number:phone,
         price_range:priceRange
      }

      await axios
      .post("/partners", data)
      .then(res => {
         alert("Update success")
      })
      .catch(err => {
         alert("err")
      })
   }

   // if (Object.keys(profile).length === 0) {
   //    return (
   //       <Backdrop className={classes.backdrop} open>
   //          <CircularProgress color="inherit" />
   //       </Backdrop>
   //    )
   // }

   return (
      <>
         <Navbar setRole={setRole} />
         <Box component="div" className={classes.mainContainer}>
            <Box component="header" className={classes.top}>
               <div className={classes.avatar}>
                  <Avatar
                     alt="Remy Sharp"
                     src="https://source.unsplash.com/random"
                     className={classes.large}
                  />
               </div>
               <Box component="div" className={classes.topRight}>
                  <Typography variant="h3">
                     {username}
                  </Typography>
                  <Typography variant="h5">
                     {email}
                  </Typography>
               </Box>
            </Box>
            <Box className={classes.bottom}>
               <Box className={classes.buttonGroup}>
                  <ButtonGroup variant="text" color="primary" aria-label="text primary button group" >
                     <Button style={{ fontSize: "20px" }}>Account</Button>
                     <Button style={{ fontSize: "20px" }}>History</Button>
                  </ButtonGroup>
                  <Button
                     variant="contained"
                     color="primary"
                     size="medium"
                     className={classes.button}
                     startIcon={<SaveIcon />}
                     style={{ margin: "10px 0" }}
                     type="submit"
                     onClick={onFinish}
                  >
                     Save
               </Button>
               </Box>

               <Box className={classes.profileDetail}>
                  <Box component="div" className={classes.textBox}>
                     <Typography variant="body1" >
                        Username
                  </Typography>
                     <TextField
                        className={classes.inputBox}
                        id="username"
                        // label="Username"
                        variant="outlined"
                        size="small"
                        onChange={handleUsername}
                        value={username}
                     />
                  </Box>
                  <Box component="div" className={classes.textBox}>
                     <Typography variant="body1" >
                        Email
                  </Typography>
                     <TextField
                        className={classes.inputBox}
                        id="email"
                        //label="Email@example.com"
                        variant="outlined"
                        size="small"
                        onChange={handleEmail}
                        value={email}
                     />
                  </Box>
                  {/* <Box component="div" className={classes.textBox}>
                  <Typography variant="body1" >
                     Password
                  </Typography>
                  <TextField
                     className={classes.inputBox}
                     id="password"
                     type="password"
                     label="******"
                     variant="outlined"
                     size="small"
                     onChange={handlePassword}
                  />
               </Box> */}
                  <Box component="div" className={classes.textBox}>
                     <Typography variant="body1" >
                        Restaurant Name
                  </Typography>
                     <TextField
                        className={classes.inputBox}
                        id="restaurant name"
                        //label="Restaurant Name"
                        variant="outlined"
                        size="small"
                        onChange={handleRestaurantName}
                        value={restaurantName}
                     />
                  </Box>
                  <Box component="div" className={classes.textBox}>
                     <Typography variant="body1" >
                        Address
                  </Typography>
                     <TextField
                        className={classes.inputBox}
                        id="address"
                        //label="Address"
                        variant="outlined"
                        size="small"
                        multiline
                        row={3}
                        onChange={handleAddress}
                        value={address}
                     />
                  </Box>
                  {/* <Box component="div" className={classes.textBox}>
                  <Typography variant="body1" >
                     Province
                  </Typography>

                  <FormControl variant="outlined" className={classes.inputBox} >
                     <InputLabel>Province</InputLabel>
                     <Select
                        id="demo-simple-select-outlined"
                        value="province"
                        label="province"
                        style={{ height: "40px" }}
                        onChange={handleProvince}
                     >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                     </Select>
                  </FormControl>
               </Box>
               <Box component="div" className={classes.textBox}>
                  <Typography variant="body1" >
                     District
                  </Typography>
                  <FormControl variant="outlined" className={classes.inputBox} >
                     <InputLabel>District</InputLabel>
                     <Select
                        id="demo-simple-select-outlined"
                        value="district"
                        label="District"
                        style={{ height: "40px" }}
                        onChange={handleDistrict}
                     >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                     </Select>
                  </FormControl>
               </Box> */}
                  <Box component="div" className={classes.textBox}>
                     <Typography variant="body1" >
                        Phone
                  </Typography>
                     <TextField
                        className={classes.inputBox}
                        id="phone"
                        //label="Phone"
                        variant="outlined"
                        size="small"
                        onChange={handlePhone}
                        value={phone}
                     />
                  </Box>
                  <Box component="div" className={classes.textBox}>
                     <Typography variant="body1" >
                        Price range
                  </Typography>
                     <TextField
                        className={classes.inputBox}
                        id="price"
                        //label="Phone"
                        variant="outlined"
                        size="small"
                        onChange={handlePriceRange}
                        value={priceRange}
                     />
                  </Box>
                  {/* <Box component="div" className={classes.textBox}>
                  <Typography variant="body1" >
                     Price range
                  </Typography>
                  <FormControl variant="outlined" className={classes.inputBox} >
                     <InputLabel>Price range</InputLabel>
                     <Select
                        id="demo-simple-select-outlined"
                        value="price range"
                        label="Price range"
                        style={{ height: "40px" }}
                        onChange={handlePriceRange}
                     >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                     </Select>
                  </FormControl>
               </Box> */}
               </Box>
            </Box>
         </Box>
      </>
   )
}

export default Profile;
