const express = require("express");
const cookieParser = require("cookie-parser");
const app =express();
app.use(cookieParser());


const jwt=require("jsonwebtoken");
const promisify = require("util").promisify;

const promisifiedJWTSign = promisify(jwt.sign);
const promisifiedJWYVerify = promisify(jwt.verify);

const payload="1234";
const secretKey="i am secret";
// send the token 
app.get("/sign", async function (req,res) {  
    try{
        const authToken = await promisifiedJWTSign({data: payload,},secretKey,{expiresIn:"1hr", algorithm:"HS256" });
        res.cookie("jwt",authToken,{maxAge:10000000, httpOnly:true });
        res.status(200).json({
            message:"signed the jwt and sending it in cookie",
            authToken
        })
    }catch(err){
        res.status(400).json({
            message:err.message,
            status:"failure"
        })
    }
})
// verifying those tokens
app.get("/verify",async function(req,res){
   try{
    const token = req.cookies.jwt;
    const decodedToken = await promisifiedJWYVerify(token,secretKey);


    res.status(200).json({
        message:"token is decoded",
        decodedToken
    })
   }catch(err){
    res.status(400).json({
        message:err.message,
        status:"failure"
})
}
})

app.listen(3000,function(){
    console.log("Server is listening to port 3000");
})