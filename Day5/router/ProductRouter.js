const express=require("express");
const ProductRouter = express.Router();
const  {createProductHandler,
    getProductById,
    deleteProductById} = require("../controller/ProductController");
const ProductModel = require("../model/ProductModel");
/*******Products*******/
const getAllProductHandler = async function (req,res){
    try{

        // are done one the level of DB
        // -> find all the data
        // -> sort
        // -> select
        let query = req.query;
        let selectQuery = query.select;
        let sortQuery = query.sort;

        let queryResProm = ProductModel.find();

        if(sortQuery){
            let order = sortQuery.split(" ")[1];
            let sortParam = sortQuery.split(" ")[0];
            if(order=="inc"){
                queryResProm = queryResProm.sort(sortParam); 
            }else{
                queryResProm = queryResProm.sort(-sortParam);
            }
        }
        if(selectQuery){
            queryResProm = queryResProm.select(selectQuery);
        }

        const result = await queryResProm;

        res.status(200).json({
            message:result,
            status:"success",
        })
    }catch(err){
        res.status(500).json({
            message:err.message,
            status:"failure"
        })
    }
       
        //sorting -> increasing,
        // selecting ->(name,price)
}




ProductRouter.get("/",getAllProductHandler);
ProductRouter.post("/",createProductHandler);
ProductRouter.get("/:elementId",getProductById);
ProductRouter.delete("/:elementId",deleteProductById);

module.exports = ProductRouter;


