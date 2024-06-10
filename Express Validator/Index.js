const express = require("express");
const morgan = require("morgan");
const path = require("path");
const {errorHandler , page404} = require("./util/utils");
const { categoryModel } = require("./mongose/model/category.model");
const { isValidObjectId } = require("mongoose");
const omitEmpty = require("omit-empty");
const { loginValidator  , registerValidator } = require("./validators/auth.validator");
const { IdValidator } = require("./validators/id.validator");
const { queryValidaton } = require("./validators/query.validator");
const { validationResult } = require("express-validator");
const {checkValidation} = require('./middlewares/validator')
const app = express();
require('./mongose/config/mongo.config')
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(morgan('tiny'))
app.get("/" , (req,res)=>{
    res.send("hello")
})

app.post("/login" , loginValidator() , checkValidation , (req,res,next) =>{
  res.send(req.body)
})
app.post("/register" , registerValidator() , checkValidation, (req,res,next) =>{
  res.send(req.body)
})

app.post('/createCategory', async (req, res , next)=> {
  try { 
    const {name , order , descripton} = req.body;
  const result = await categoryModel.create({
    name,
    order,
    descripton
  })
  res.send(result); 
  }catch(err){
    next(err)
  }
  
})

app.get("/categories" , async(req , res ,next)=>{
  try{
    const resultCategories = await categoryModel.find();
    res.send({
      statusCode : 200,
      docsLen : resultCategories.length,
      cateories : resultCategories 
    })

  }catch(err){
    next(err)
  }
}) 
app.get("/category/:id"  , IdValidator , checkValidation , (req , res ,next)=>{
 res.send(req.params)
})
app.get("/category?title?sort"  , queryValidaton , checkValidation , (req , res ,next)=>{
  res.send(req.params)
 })
app.get("/categories/:id" , async(req , res ,next)=>{
  try{
    const {id} = req.params;
    if(!isValidObjectId(id)) throw {statusCode : 500 , message : "Not Valid ObjectId"}

    const category = await categoryModel.findOne({_id : id});
    res.send({
      statusCode : 200,
      res : category
    })

  }catch(err){
    next(err)
  }
})


app.use(errorHandler)
app.use(page404)
app.listen(3000 , ()=>{
    console.log("listening on port 3000")
}) 