const express = require("express")
const {f_notFound , f_errorHandling} = require("./utils/error-handling")
const { Allroutes } = require("./router/index.routes")
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const PORT = process.env.PORT
const db = require('./db-config/db')
db.dbConnection();
console.log(PORT)
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(Allroutes);
app.use(f_notFound)
app.use(f_errorHandling)
app.listen(3000  , ()=>{
console.log(`app start in port  ${PORT}`)    
})