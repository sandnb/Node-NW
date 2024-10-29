const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();
const {PORT, DB_PASSWORD, DB_USER} = process.env;
const app = express();
const UserModel = require("./UserModel");
const ProductModel = require("./ProductModel");

const {getAllFactory, 
    createFactory,  
    getByIdFactory, 
    deleteByIdFactory} = require("./utility/crudFactory");

const dbURL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.mwyhmyh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

//here our server is contacts DB in async mode
mongoose.connect(dbURL).then(function(connection){
    console.log("Connection Success");
}).catch(err => console.log(err));


app.use(express.json());// to get data from user , is example for userDefinedMiddleWare




/***Controller Functions***/
/*************Users********************/
const createUserHandler = createFactory(UserModel);
const getAllUsers = getAllFactory(UserModel);
const getUserById = getByIdFactory(UserModel);
const deleteUserById = deleteByIdFactory(UserModel);
const checkInput = function(req,res,next){// checklist if we are sending the empty data or not to post method
    if(req.method == "POST"){
        const userDetails = req.body;
        const isEmpty = Object.keys(userDetails).length == 0;
        if(isEmpty){
            res.status(404).json({
                status:"failure",
                message:"user Details are empty"
            })
        }
    }else{
        next();
    }
}

/*****************Products********************/
const createProductHandler = createFactory(ProductModel);
const getAllProductHandler = getAllFactory(ProductModel);
const getProductById = getByIdFactory(ProductModel);
const deleteProductById = deleteByIdFactory(ProductModel);


/*****routes****/
/********users*******/
app.get("/api/user",getAllUsers);
app.post("/api/user",checkInput,createUserHandler);
app.get("/api/user/:userId",getUserById)
app.delete("/api/user/:userId",deleteUserById);
/*******Products*******/
app.get("/api/product",getAllProductHandler);
app.post("/api/product",createProductHandler);
app.get("/api/product/:productId",getProductById);
app.delete("/api/product/:productId",deleteProductById);

// closure in JS






// 404 route not found
app.use(function(req,res){
    res.status(404).json({
        status:"failure",
        message:"404 Page Not Found"
    })
});

//app.use(checkInput);

app.listen(PORT,function(){
    console.log(`server is running at this port ${PORT}`);
})

/***
 * At Code level -> prevent repetition -> Factory Design
 * At file level -> strucutre to segregate the code -> MVC
 * **/