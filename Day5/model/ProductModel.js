const mongoose = require("mongoose");
// const productSchemaRules = {
//  name:{
//     type:String,
//     required:[true,"Kindly Pass the name"],
//     unique:[true,"product name should be unique"],
//     maxlength:[40,"Your Product name length is more than 40 Characters"]
//  },
//  price:{
//     type:String,
//     required:[true,"Kindly pass the price"],
//     validate: {
//         validator:function(){
//         return this.price > 0;
//     },
//         message:"price can't be negative"
//     },
//  },
//  categories:{
//     type:String,
//     required:true
//  },
//  prodcutImages:{
//     type:[String]
//  },
//  averageRating: Number,
//  discount:{
//     type:String,
//     validate:{
//         validator:function(){
//             return this.discount < this.price;
//      },
//      message: "Discount must be less than actual price"
//     },
//  },
//  description:{
//    type:String,
//    required:[true,"Kindly Add Description"],
//    maxlength:[2000,"description cant be bigger than 2000 characters"]
//  },
//  stock_quantity:{
//    type:String,
//    required:[true,"You should enter stock of the product should atleast 0"],
//    validate:function(){
//       return this.stock_quantity >= 0;
//    },
//    message:"Stock quantity can't be negative"
//  },
//  brand:{
//    type:String,
//    required:[true,"Please Enter the Brand Name"]
//  }
// }
//pre & post hook
// schema -> structure & validation
const newProdcutSchemaRules = {
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
      type:[String],
      required:true
   },
   prodcutImages:{
      type:[String]
   },
   averageRating: Number,
   discount:{
      type:Number,
      validate:{
          validator:function(){
              return this.discount < this.price;
       },
       message: "Discount must be less than actual price"
      },
   },
   description:{
     type:String,
     required:[true,"Kindly Add Description"],
     maxlength:[2000,"description cant be bigger than 2000 characters"]
   },
   stock_quantity:{
     type:Number,
     required:[true,"You should enter stock of the product should atleast 0"],
     validate:function(){
        return this.stock_quantity >= 0;
     },
     message:"Stock quantity can't be negative"
   },
   brand:{
     type:String,
     required:[true,"Please Enter the Brand Name"]
   }
}
const productSchema = new mongoose.Schema(newProdcutSchemaRules);

let validCategories = ["Electronics","Audio","Clothing","Accessories","Fashion","Sports"];

productSchema.pre("save", function(next){
   const product = this;

   const invalidCategoriesArr = product.categories
                  .filter((category)=>{return !validCategories.includes(category)});
   if(invalidCategoriesArr.length > 0){
      const err = new Error("product from these categories are not allowed to be sold");
      return next(err);
   }else{
      next();
   }

})


// this modal -> will have queries/syntaxes
const ProductModel = mongoose.model("newProductModel",productSchema);

module.exports= ProductModel;