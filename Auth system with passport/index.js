const express = require("express")
var expressLayouts = require('express-ejs-layouts');
var flash = require('express-flash');
var session = require('express-session');
const {f_notFound , f_errorHandling} = require("./utils/error-handling")
const  { Allroutes }  = require("./router/index.routes")
const dotenv = require("dotenv");
const passport = require("passport")
const {passportInit} = require("./passport.config")
dotenv.config();
const app = express();
const PORT = process.env.PORT
const db = require('./db-config/db')
db.dbConnection();
// Setup application
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(flash());
app.use(session(
    {
        secret : "secret",
        resave : false,
        saveUninitialized : false
    }
));

//engine ejs
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('layout', './layout/main.ejs');
//set up passport
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());
///routes
app.use(Allroutes(passport));
app.use(f_notFound)
app.use(f_errorHandling)
app.listen(3000  , ()=>{
console.log(`app start in port  ${PORT}`)    
})