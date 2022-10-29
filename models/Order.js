const mongoose =require("mongoose");

const OrderSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    userId:{type:String,required:true},
    products:[],
    amount:{type:Number,required:true},
    address:{type:Object,required:true},
    isDeliverd:{type:String,default:"pending",required:true}
},{timestamps:true}
)

module.exports=mongoose.model("Order",OrderSchema)