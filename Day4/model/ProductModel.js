const mongoose = require("mongoose");
const productSchemaRules = {
 name:{
    type:String,
    required:[true,"Kindly Pass the name"],
    unique:[true,"product name should be unique"],
    maxlength:[40,"Your Product name length is more than 40 Characters"]
 },
 price:{
    type:Number,
    required:[true,"Kindly pass the price"],
    validate: {
        validator:function(){
        return this.price > 0;
    },
        message:"price can't be negative"
    },
 },
 categories:{
    type:String,
    required:true
 },
 prodcutImages:{
    type:[String]
 },
 averageRating: Number,
 discountedPrice:{
    type:String,
    validate:{
        validator:function(){
            return this.discountedPrice < this.price;
     },
     message: "Discount must be less than actual price"
    },
 }
}
const productSchema = new mongoose.Schema(productSchemaRules);
// this modal -> will have queries/syntaxes
const ProductModel = mongoose.model("productModel",productSchema);

module.exports= ProductModel;