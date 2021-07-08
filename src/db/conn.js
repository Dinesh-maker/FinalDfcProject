const mongoose=require("mongoose");
mongoose.connect("mongodb+srv://Dinesh:KJVyZOajNQImX2Z4@cluster0.hsbsw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(()=>{
    console.log("connection successful");
}).catch((e)=>{
    console.log(`No conncection `);
})