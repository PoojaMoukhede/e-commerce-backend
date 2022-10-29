const express = require("express");
const Order = require("../models/Order")
const router = express.Router();
const { v4:uuidv4 } =require('uuid');
const stripe=require("stripe")("sk_test_51LxZNrSEaWwG4qfpeC36BwIYGrsT3FTP0GBCdvkVrqJ80doPmTBWeJ2UGDTNxCZw9cgLyHVtaZbfUdM8UXIHKxac00EVOWhlOG")


//create
router.post("/order",async(req,res)=>{
    const {token,subTotal,currUser,cartItem}=req.body;
    
    try{
      const customer= await stripe.customers.create({
        email:token.email,
        source:token.id
      })
     const payment=await stripe.charges.create({
      amount:subTotal,
      currency:"INR",
      customer:customer.id,
      receit_email:token.email
     },{
      idempotencyKey:uuidv4()
     })
     if(payment){
      const newOrder=new Order({
        name:currUser.name,
        email:currUser.email,
        userId:currUser._id,
        products:cartItem,
        amount:subTotal,
        address:{
          street:token.card.address_line1,
          city:token.card.address_city,
          country:token.card.address_country,
          pincode:token.card.address_zip,
        },
        transectionId:payment.source.id

        
      })
      newOrder.save()
      res.send("payment done")
     }
     else{
      res.send("payment failed")
     }
     
    } catch(e){
      res.status(400).json(e)
    }
   
})
router.post("/getorder",async(req,res)=>{
  const {userId}=req.body
  try{
const order=await Order.find({userId:userId})
res.send(order)
  }catch(e){
 res.status(400).json({message:e.message})
  }
})



module.exports=router
