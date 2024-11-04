const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const {PORT} = process.env;
const cookieParser = require("cookie-parser");
//home
//products
//clearCookies

app.use(cookieParser());
// -> home get the request i will add a cookie -> share that cookie with res
app.get("/",function(req,res){
    res.cookie("prevPage","home",{
        maxAge: 100000000000,
        httpOnly:true   
    })
    res.status(200).json({
        message:"Thank you for the visit"
    })
})

// we will check whether the user visiting our webpage for the first/ it has already visited
app.get("/products",function(req,res){
   console.log(req.cookies);
   let msgStr = "";
   if(req.cookies.prevPage){
    msgStr = `You have already visitied the ${req.cookies.prevPage}`
   }
   res.status(200).json({
    message:`thank you for accessing the product route ${msgStr}`
   })
})

//clear cookies 
app.get("/clearCookies", function(req,res){
    res.clearCookie("prevPage",{path:"/"});
    res.status(200).json({
        message:"I have cleared your cookie"
    })
})

app.listen(PORT,function(){
    console.log(`server is running on ${PORT}`);
})