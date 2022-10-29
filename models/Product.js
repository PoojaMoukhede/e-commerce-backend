const mongoose =require("mongoose");

const ProductSchema=new mongoose.Schema({
    title:{type:String,required:true,unique:true},
    description:{type:String,required:true},
    image:{type:String,required:true},
    catagory:{type:String},
    price:{type:String}
},{timestamps:true}
)

module.exports=mongoose.model("Product",ProductSchema)