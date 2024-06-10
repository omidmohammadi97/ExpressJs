const express = require("express");
const morgan = require("morgan");
const path = require("path");
const {errorHandler , page404} = require("./util/utils");
const { categoryModel } = require("./mongose/model/category.model");
const { isValidObjectId } = require("mongoose");
const { validate } = require("express-validation");
const { registerValidator,loginValidator } = require("./validators/auth.validator");
const app = express();
require('./mongose/config/mongo.config')
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(morgan('tiny'))
app.get("/" , (req,res)=>{
    res.send("hello")
})

app.post("/login" ,validate(loginValidator) , (req,res,next)=>{
  res.send(req.body)
})

app.post("/register" ,validate(registerValidator) , (req,res,next)=>{
  res.send(req.body)
})


app.use(errorHandler)
app.use(page404)
app.listen(3000 , ()=>{
    console.log("listening on port 3000")
}) 