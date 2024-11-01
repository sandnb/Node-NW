const express = require('express');
const UserRouter = express.Router();
const { createUserHandler,
    getAllUsers,
    getUserById,
    deleteUserById
} = require("../controller/UserController");

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
/********users*******/
UserRouter.get("/",getAllUsers);
UserRouter.post("/",checkInput,createUserHandler);
UserRouter.get("/:elementId",getUserById)
UserRouter.delete("/:elementId",deleteUserById);

module.exports = UserRouter;
