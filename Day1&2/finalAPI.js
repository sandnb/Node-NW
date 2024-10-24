const express = require("express");
const short = require("short-uuid");
const { status } = require("express/lib/response");

const app = express();

const fs= require("fs");
// read the json file where we have our details of users
const strContent = fs.readFileSync("./dev-data.json","utf-8");
//json format read from dev-data.json file need to be convereted to normal json format from string
const userDataStore = JSON.parse(strContent);

app.get("/api/user",function(req,res){
   try{
    console.log("I am inside get method");

    if(userDataStore.length == 0){
        throw new Error("No Users Found");
    }
    res.status(200).json({
        status:"success",
        message:userDataStore
    })
   }catch(err){
        res.status(404).json({
            status:"failure",
            message:err.message
        })
   }});

app.use(express.json());// to get data from user

app.use(function(req,res,next){// checklist if we are sending the empty data or not to post method
    if(req.method == "POST"){
        const userDetails = req.body;
        const isEmpty = Object.keys(userDetails).length == 0;
        if(isEmpty){
            res.status(404).json({
                status:"failure",
                message:"user Details are empty"
            })
        }else{
            next()
        }
    }else{
        next();
    }
})

// to create a user
app.post("/api/user",createUserHandler);

// to get user based on id -> template route
app.get("/api/user/:userId",getUserById)

function getUserByid(id){
    const user = userDataStore.find(user=>{
        return user.id == id; 
    })
    if(user == undefined){
        return "no user found";
    }else{
        return user;
    }
}

function createUserHandler(req,res){
    const id = short.generate();// generate a new id when this cb/handler fn is called
    const userDetails = req.body;
    userDetails.id = id;

    userDataStore.push(userDetails);// the userDetails will be stored in local storage
    // add the user to the file
    const strUserStore = JSON.stringify(userDataStore);
    fs.writeFileSync("./dev-data.json",strUserStore);

    res.status(200).json({
        status:"success",
        message:"got response from post method"
    })
}

function getUserById(req,res){
    try{
        const userId = req.params.userId;
    const userDetails = getUserByid(userId);
    if(userDetails == "no user found"){
        throw new Error(`user with ${userId} not found`)
    }else{
        res.status(200).json({
            status:"success",
            message:userDetails
        })
    }
    }catch(err){
        res.status(404).json({
            status:"failure",
            message:err.message
        })
    }
}


app.use(function(req,res){
    res.status(200).json({
        status:"failure",
        message:"404 Page Not Found"
    })
})

const port = process.env.PORT || 3000;

app.listen(port,function(req,res){
    console.log(`server is running at ${port} port`);
})