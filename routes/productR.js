const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

router.get("/getall",async(req,res)=>{
  try{
       const products=await Product.find({})
       res.send(products)
  }catch(e){
     return res.status(400).json({message:e})
  }
})

module.exports=router