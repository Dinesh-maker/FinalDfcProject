
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
const templatepath=path.join(__dirname,"../templates/views");
const partialspath=path.join(__dirname,"../templates/partials");
var passport = require('passport');
var atob = require('atob');

app.set("view engine","hbs");
app.set("views",templatepath);
 hbs.registerPartials(partialspath);
 app.use(express.static(path.join(__dirname,"../public/images")));

//console.log(process.env.SECRET_KEY);

app.get("/",(req,res)=>{
    res.render("index");
})

app.get("/Mock", (req,res)=>{
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
app.get("/Physicaltimer",(req,res)=>{
  res.render("Physicaltimer");

})
app.get("/Womensentries",(req,res)=>{
  res.render("Womensentries");

})
app.get("/Indiancoastguard",(req,res)=>{
  res.render("Indiancoastguard");

})
app.get("/Ndawomen",(req,res)=>{
  res.render("Ndawomen");
})
app.get("/mahilayenda",(req,res)=>{
  res.render("mahilayenda");

})
app.get("/Whyresultlate",(req,res)=>{
  res.render("Whyresultlate");

})
app.get("/newairforcechief",(req,res)=>{
  res.render("newairforcechief");

})
app.get("/Airforceresult",(req,res)=>{
  res.render("Airforceresult");

})
app.get("/AASSR2022",(req,res)=>{
  res.render("AASSR2022");

})
app.get("/NDA2022",(req,res)=>{
  res.render("NDA2022");

})
app.get("/Iafenrollment2020",(req,res)=>{
  res.render("Iafenrollment2020");

})
app.get("/Airforcenewvacancyexpectation2022",(req,res)=>{
  res.render("Airforcenewvacancyexpectation2022");

})
app.get("/AASSRAUG2022EX",(req,res)=>{
  res.render("AASSRAUG2022EX");

})
app.get("/Coastguardexamcity2022",(req,res)=>{
  res.render("Coastguardexamcity2022");

})
app.get("/Nda1admitcard2022",(req,res)=>{
  res.render("Nda1admitcard2022");

})
app.get("/MRResult2022",(req,res)=>{
  res.render("MRResult2022");

})
app.get("/NDAsecond2022",(req,res)=>{
  res.render("NDAsecond2022");

})
app.get("/NdaSyllabus",(req,res)=>{
  res.render("NdaSyllabus");

})
app.get("/NDAPYQ",(req,res)=>{
  res.render("NDAPYQ");
})
app.get("/Navysyllabus",(req,res)=>{
  res.render("Navysyllabus");
})
app.get("/Airforcesyllabus",(req,res)=>{
  res.render("Airforcesyllabus");
})

app.get("/sitemap",(req,res)=>{
  res.render("sitemap");

})

app.get("/login",(req,res)=>{
    res.render("login");
})
app.get("/registerafter",(req,res)=>{
    res.render("registerafter");
});
app.get("/Womensailor",(req,res)=>{
  res.render("Womensailor");
});
app.get("/Aganipath",(req,res)=>{
  res.render("Aganipath");
});
app.get("/NAVYAGANIVEER",(req,res)=>{
  res.render("NAVYAGANIVEER");
});
app.get("/IAFAGANIVEER",(req,res)=>{
  res.render("IAFAGANIVEER");
});
app.get("/ARMYAGANIVEER",(req,res)=>{
  res.render("ARMYAGANIVEER");
});
app.get("/IAFAGANIVEERADMITCARD",(req,res)=>{
  res.render("IAFAGANIVEERADMITCARD");
});
app.get("/IAFAGANIVEERRESULT2022",(req,res)=>{
  res.render("IAFAGANIVEERRESULT2022");
});
app.get("/IAFAGANIVEERPSL2022",(req,res)=>{
  res.render("IAFAGANIVEERPSL2022");
});
app.get("/NAVYAGANIVEERONLINEFORM",(req,res)=>{
  res.render("NAVYAGANIVEERONLINEFORM");
});
app.get("/NAVYADMITCARD2022",(req,res)=>{
  res.render("NAVYADMITCARD2022");
});
app.get("/NAVYRESULT2022",(req,res)=>{
  res.render("NAVYRESULT2022");
});
app.get("/MRAGANIVEER2022",(req,res)=>{
  res.render("MRAGANIVEER2022");
});
app.get("/coastguard2022",(req,res)=>{
  res.render("coastguard2022");
});
app.get("/coastguard012023",(req,res)=>{
  res.render("coastguard012023");
});
app.get("/practice",(req,res)=>{
  res.render("practice");
});
app.get("/Airforce012023",(req,res)=>{
  res.render("Airforce012023");
});
app.get("/Airforcewomens012023",(req,res)=>{
  res.render("Airforcewomens012023");
});
app.get("/Navywomensentry2022",(req,res)=>{
  res.render("Navywomensentry2022");
});
app.get("/Coastguard012023admitcard",(req,res)=>{
  res.render("Coastguard012023admitcard");
});
app.get("/navy012023",(req,res)=>{
  res.render("navy012023");
});
app.get("/navyMR012023",(req,res)=>{
  res.render("navyMR012023");
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
        console.log("Save Ho Gya");
        res.send('<script>alert("You are SignUp Successfully "); window.location.pathname = "/"</script>');
    }catch(error){
        res.send('<script>alert("Sorry Internal Server Error , Please signup again"); window.location.pathname = "/"</script>');
            
    }
})


//login check
app.post("/registerafter", async(req,res)=>{
   try{  
          
         const email=req.body.email; //which we are filling in body of login form 
         const password=req.body.pwd;
         const useremail= await  Register.findOne({email:email});
        const username=useremail.firstname;
        const lastname=useremail.lastname;
         storage.setItem("EmailId",email);

         const isMatch= await bcrypt.compare(password,useremail.password);
         const token=await useremail.generateAuthToken();
         console.log("the token part:"+token);
          
      res.cookie("jwt",token,{                      //here cookies name is jwt
        expires:new Date(Date.now() +  1.2e+6 ),
        httpOnly:true
       // secure:true
    });

   if(isMatch){

     console.log("ismathced0");
      
        res.status(201).render("index",{ username:username,lastname:lastname,welocmeMessage : "Welcome"}); 
        } else{
           
            res.send('<script>alert("invalid login details"); window.location.pathname = "/registerafter"</script>');
            //res.status(304).render("/registerafter");
           
           
        }

   }catch(error){
   console.log(error);
    res.status(400).send("Login unsuccessful Something went wrong");
  
   }
})



app.get("/emailverification",(req,res)=>{
    res.render("emailverification");    
});


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
        host: 'in10.fcomet.com',
        Port: 465,
        auth: {
          user: 'dfc@defencechampions.com',
          pass: 'dfc2021@'
        }

      });
      
    if(userObj != null){ 
    userObj.token='null';
    userObj.update();
    const resetToken=await userObj.generateAuthToken();
    userObj.token = resetToken;
   await userObj.save();

    const link = `https://defencechampions.com/newpassword?token=${resetToken}&id=${userObj._id}`;
    console.log("mil gya user",link);
        
      var mailOptions = {
        from: 'dfc@defencechampions.com',
        to: req.body.email,
        subject: 'Reset Password Link-DFC',
        html: `Click on this link : <a target="_blank" rel="external" href="${link}">Click Here</a>`
      };
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

app.post("/sendemail", async (req,res,next)=>{
    const entry=await  Register.countDocuments();
    console.log(entry);
    var emails=[];
    var userObj= await  Register.find();
    for(var i=0;i<entry;i++){
        emails.push(userObj[i].email);
        console.log(emails[i]);
    }
    var transporter = nodemailer.createTransport({
        host: 'mail.defencechampions.com',
        Port: 465,
        auth: {
          user: 'mail@defencechampions.com',
          pass: 'Dinesh@2022'
        }
    });
    let from = `Defencechampions <dfc@defencechampions.com>`
        var mailOptions = {
            from: from,
            bcc: emails,
            subject: req.body.subject,
            html:atob(req.body.content) 
          };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log("Error aa gya",error);
        } else {
          console.log('Email sent: ' + info.response);
         
        }
        

      });
      res.send('<script>alert("Email Sent"); window.location.pathname = "/"</script>')
    })
    app.get('*',(req,res)=>{
        res.render("404");
    })

app.listen(port,()=>{
    console.log(`server is connected at ${port}...`);
})
