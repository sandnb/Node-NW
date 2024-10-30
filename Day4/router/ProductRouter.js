const express=require("express");
const ProductRouter = express.Router();
const  {createProductHandler,
    getAllProductHandler,
    getProductById,
    deleteProductById} = require("../controller/ProductController");
/*******Products*******/
ProductRouter.get("/",getAllProductHandler);
ProductRouter.post("/",createProductHandler);
ProductRouter.get("/:productId",getProductById);
ProductRouter.delete("/:productId",deleteProductById);

module.exports = ProductRouter;