
require('dotenv').config();
const express=require("express");
const app=express();
const path=require("path");
const hbs=require("hbs");
const port=process.env.PORT || 3000;
const bcrypt=require("bcryptjs");
require("./db/conn");
const cookieparser=require("cookie-parser");
const Register=require("./models/register"); 
const auth=require("./middleware/auth");
const storage = require('node-sessionstorage');
const { JsonWebTokenError } = require('jsonwebtoken');
const nodemailer=require('nodemailer');
const {google}=require('googleapis')
app.use(express.json());
app.use(cookieparser());
app.use(express.urlencoded({extended:false})); //to get data from the form not undefined 
// var mail = require('./config/mailer')();
// mail.send();
//const staticpath=path.join(__dirname,"../public");
const templatepath=path.join(__dirname,"../templates/views");
const partialspath=path.join(__dirname,"../templates/partials");
//const imagepath=path.join(__dirname,"../public/images");
//console.log(imagepath);
//app.use(express.static(staticpath));
app.set("view engine","hbs");
app.set("views",templatepath);
 hbs.registerPartials(partialspath);
 app.use(express.static(path.join(__dirname,"../public/images")));

//console.log(process.env.SECRET_KEY);

app.get("/",(req,res)=>{
    res.render("index");
})

app.get("/Mock",auth , (req,res)=>{
    //  console.log(`This is the Mock test page cookie ${req.cookies.jwt}`);//get the cookie value that is sewt when user login
  
    res.render("Mock");
  })
  app.get("/ragamock",(req,res)=>{
    res.render("ragamock");
});

app.get("/indianairforce",(req,res)=>{
      res.render("indianairforce");
  
  })
  app.get("/indiannavy",(req,res)=>{
    res.render("indiannavy");

})
app.get("/nda",(req,res)=>{
    res.render("nda");

})
app.get("/contactus",(req,res)=>{
    res.render("contactus");

})
app.get("/notes",(req,res)=>{
    res.render("notes");

}) 
app.get("/liveclasses",(req,res)=>{
    res.render("liveclasses");

})
app.get("/login",(req,res)=>{
    res.render("login");
})
app.get("/registerafter",(req,res)=>{
    res.render("registerafter");
});
app.post("/login", async (req,res)=>{
    try{
        console.log("Hii everone");
    const registerStudent=new Register({   //Register define above it is model 
        firstname:req.body.Fname,
        lastname:req.body.Lname,
        email:req.body.email,
        password:req.body.pwd
    });
    console.log("Hii everone23");
      const token=await registerStudent.generateAuthToken();
       console.log(registerStudent);
      res.cookie("jwt",token,{
          expires:new Date(Date.now() + 3000 ),
          httpOnly:true
      });
      console.log("Hii");
     
        const registered= await  registerStudent.save();
        res.status(201).render("index");
        console.log("Hello hii");
    }catch(error){
        res.status(400).send(error);
    }
})


//login check
app.post("/registerafter", async(req,res)=>{
   try{  
         const email=req.body.email; //which we are filling in body of login form 
         const password=req.body.pwd;
         const useremail= await  Register.findOne({email:email});
         
         const isMatch= await bcrypt.compare(password,useremail.password);
         const token=await useremail.generateAuthToken();
         console.log("the token part:"+token);
          
      res.cookie("jwt",token,{                      //here cookies name is jwt
        expires:new Date(Date.now() +  1.2e+6 ),
        httpOnly:true
       // secure:true
    });

   if(isMatch){
            res.status(201).render("index");
        } else{
           
            res.send('<script>alert("invalid login details"); window.location.pathname = "/registerafter"</script>');
            //res.status(304).render("/registerafter");
           
           
        }

   }catch(error){
  res.status(400).send("Please Refresh the page");
  
   }
})



app.get("/emailverification",(req,res)=>{
    res.render("emailverification");    
});

// app.get('/', function(req, res){
//     res.send('id: ' + req.query.id);
//   });

app.get("/newpassword",async(req,res)=>{
    const id=req.query.id;
    console.log("id",id);
    const userObj=await Register.findOne({_id:id});
    const token = req.query.token;
    
    storage.setItem("UserId",id)
    console.log("token is ",token);
    console.log("db token",userObj.token);
    if(userObj.token === token){
        res.render("newpassword");
        }
    else{
        res.send('<script>alert("URL is faulty"); window.location.href = "/"</script>');
    }
})
app.post("/createNew", async (req,res)=>{
    try{
        const userId=storage.getItem("UserId");
        console.log("userId ",userId);
        //?How get user id for userObj
        const userObj=await Register.findOne({_id:userId});
        console.log("userObj ",userObj);
        userObj.password = req.body.pwd;
        const newToken=await userObj.generateAuthToken();
        userObj.token=newToken;
        await userObj.save();
        console.log("KAAM KHTM");
        res.send('<script>alert("Your password has been changed"); window.location.href = "/"</script>');
    }catch(error){
        res.status(400).send(error);
    }
})

app.post("/emailverification", async (req,res,next)=>{
    const email=req.body.email;
    const userObj= await  Register.findOne({email:email});
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        Port: 465,
        auth: {
          user: 'navyrocks1999@gmail.com',
          pass: '8377077113'
        }

      });
      
    if(userObj != null){ 
    userObj.token='null';
    userObj.update();
    const resetToken=await userObj.generateAuthToken();
    userObj.token = resetToken;
   await userObj.save();

    const link = `http://localhost:3000/newpassword?token=${resetToken}&id=${userObj._id}`;
    console.log("mil gya user",link);
        
      var mailOptions = {
        from: 'defencechampions@gmail.com',
        to: req.body.email,
        subject: 'Sending Email using Node.js',
        html: `Click on this link : <a target="_blank" rel="external" href="${link}">Click Here</a>`
      };
//     const CLIENT_ID='207876639273-30jmrt4g564o6eae765m00u22ki9n5e4.apps.googleusercontent.com'
//     const CLIENT_SECRET='8_FKMs6e8MIcbzP1AqxGNusF'
//     const REDIRECT_URI='https://developers.google.com/oauthplayground'
//     const REFRESH_TOKEN='1//04oRZF5PXzW3DCgYIARAAGAQSNwF-L9IrTZ77zkitudg7YwGLQmQ-IUd7bvQIL_vLBD4CXsWk1jRMYrzvLCn61qonnxN1pvfxnxk'
    

//   const oAuth2client=new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URI)
//   oAuth2client.setCredentials({refresh_token:REFRESH_TOKEN})

//  async function sendMail(){
//       try{
  
//     const accessToken=await oAuth2client.getAccessToken()
//     const transport=nodemailer.createTransport({
//         service:'smtp.gmail.com',
//         auth:{
//             type: 'OAuth2',
//         user: 'navyrocks1999@gmail.com',
//         clientId: CLIENT_ID,
//         clientSecret: CLIENT_SECRET,
//         refreshToken: REFRESH_TOKEN,
//         accessToken: accessToken
//         }
//     })
    
//     const mailOptions={
//         from:'navyrocks1999@gmail.com',
//         to:'onlinejobhelp1999@gmail.com',
//         subject:"Reset password",
//         text:"Please reset your password"
//     };
  
//      const result=await transport.sendMail(mailOptions)
//      return result
//       }
//       catch(error){
//           return error
//       }
//   }
//   sendMail().then(result=>console.log("Email sent...",result))
//   .catch((error)=>console.log(error.message));
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log("Error aa gya",error);
    } else {
      console.log('Email sent: ' + info.response);
     
    }
  });
  res.send('<script>alert("Reset Pass word Link is Sent to Your Email Account(check hide text if not found)"); window.location.href = "/"</script>');
  console.log("Gya");
  

}

else{
res.send('<script>alert("Email does not exist"); window.location.pathname = "/emailverification"</script>');
}
    
})

app.listen(port,()=>{
    console.log(`server is connected at ${port}...`);
})