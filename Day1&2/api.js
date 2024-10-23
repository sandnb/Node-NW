// import express
const express = require('express');
// syntax -> used to create ann express framework
const app = express();
// this line is the reason that the server is working

/********
 * app.use -> a method  -> express
 * we can pass a handler/cb fn ->
 * 1. req : obj representing request
 * 2. res : obj representing response
 * 3. this method irrespective of the call done by either get/post/etc this will respond
 * *************/
// this is user defined middleware

//to get the details of items from request
// it is a inbuilt middleware -> to add data coming in body of HTTP request to req.body
app.use(express.json());


app.post("/api/user",function(req,res){
    console.log("I am inside post method",req.body);
    res.status(200).json({
        status:"success",
        message:"sending response from post method"
    })
})



// when someone makes a get request on the route /api/user , the handler will be executed
app.get("/api/user",function (req,res){
    console.log("I am inside get method");
    res.status(200).json({
        status:"success",
        message:"sending response from get method",
    })
})


// process.env.PORT => this searches for .env file in the code server itself
//node --env-file PORT // command to find the details in env file of project
//.env files are used in the projects to just store important details -> Port,api-keys
const port = process.env.PORT || 3000;

// server -> run on a port
app.listen(port,function(){
    console.log(`Server is listening at ${port}`);
})

