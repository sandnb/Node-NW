const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();
const {PORT, DB_PASSWORD, DB_USER} = process.env;
const app = express();
const UserRouter = require("./router/UserRouter");
const ProductRouter = require("./router/ProductRouter");
const dbURL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.mwyhmyh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
//here our server is contacts DB in async mode
mongoose.connect(dbURL).then(function(){
    console.log("Connection Success");
}).catch(err => console.log(err));

app.use(express.json());// to get data from user , is example for userDefinedMiddleWare
app.use("/api/user",UserRouter);
app.use("/api/product",ProductRouter);

// app.get("/search",function(req,res){
//     console.log(req.query);
//     res.status(200).json({
//         message:req.query,
//         status:"success",
//     })
// })

// 404 route not found
app.use(function(req,res){
    res.status(404).json({
        status:"failure",
        message:"404 Page Not Found"
    })
});

app.listen(PORT,function(){
    console.log(`server is running at this port ${PORT}`);
})

/***
 * At Code level -> prevent repetition -> Factory Design
 * At file level -> strucutre to segregate the code -> MVC architecture
 * MVC - Model View Controller Architecture
 * **/