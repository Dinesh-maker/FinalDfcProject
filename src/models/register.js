const mongoose=require("mongoose");

const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const studentSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    token:{
        type:String,
        required:true
    }
 

})
studentSchema.methods.generateAuthToken=async function(){
    try{
        console.log(this);
        const token=jwt.sign({_id:this._id},process.env.SECRET_KEY);
        console.log(token);
         this.token = token;
         console.log(this);
         console.log("aa gya");
        return token;
    }catch(error){
        res.send("the error part is :"+error);
        console.log("the errorr is "+error);
    }
}

studentSchema.pre("save",async function(next){
    if(this.isModified("password")){
        console.log(`the current password is ${this.password}`);
    this.password= await bcrypt.hash(this.password,10);
    console.log(`the current password is ${this.password}`);
    }
    next();
})

//collection name 1
const Register= new mongoose.model("Register",studentSchema);

module.exports=Register;
