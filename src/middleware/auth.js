const { Router } = require("express");
const jwt=require("jsonwebtoken");
const Register=require("../models/register");
const crypto=require('crypto');

// const auth= async(req,res,next)=>{
//     try{
//           const token=req.cookies.jwt;// this is cookie generate when login or register
//           const verifyUser=jwt.verify(token,process.env.SECRET_KEY);
//           console.log(verifyUser);
//          const user= await Register.findOne({_id:verifyUser._id});
//          console.log(user);

//           next();

//     }catch(error){
//         res.send('<script>alert("Please Login Before Accessing This Page "); window.location.pathname = "/registerafter"</script>');

//     }
// }
// module.exports=auth;