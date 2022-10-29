const express = require("express");
const app = express()
const bodyParser = require("body-parser")
const product=require("./models/Product")
const productRoute=require("./routes/productR")
const userRoute=require("./routes/user")
const OrderRoute = require("./routes/order")
const cors=require("cors")
const mongoose=require("mongoose")

mongoose.connect("mongodb+srv://pooja:pooja@cluster0.bvclplx.mongodb.net/?retryWrites=true&w=majority",
{ useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) console.log(err);
    else console.log("Database Connected");
  });



app.use(cors())
app.use(express.json())
app.use(bodyParser.json());
app.use("/",productRoute)
app.use("/",userRoute)
app.use("/",OrderRoute)



app.get("/",(req,res)=>{
    res.send("hello")
})

app.get("*", (req, res) => {
    res.status(404).json({
      status: "Failed",
      message: "Page Not Found",
    });
  });

app.get("/product",(req,res)=>{
   product.find({},(err,docs)=>{
    if(err){
        console.log(err)
    }else{
        res.send(docs)
    }
   })
})


app.listen(process.env.PORT || 8080,()=>{
    console.log("server is up")
})