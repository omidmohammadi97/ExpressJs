const express = require("express");
const {errorHandler , page404} = require('./util/utils');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : true}));
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();

app.post("/login" ,(req,res,next) => {
    try{
        console.log("helllo",req.body)

        const {username , email} = req.body;
        const token = jwt.sign({
            username : username,
            email : email
        } , 
        process.env.SECRET,
        {
            expiresIn : "1s",
            algorithm:"HS512"
        }
        )
        console.log(token)
        f_verifyToken(token);
        f_decodeToken(token);

    }catch(err){
        console.log(err)
    }
})
function f_verifyToken(token) {
    const result = jwt.verify(token , process.env.SECRET)
    console.log("Result varify : ",result)
}
function f_decodeToken(token) {
    const decodeData = jwt.decode(token)
    console.log("Result decodeData : ",decodeData)
}
app.use(errorHandler) 
app.use(page404)
app.listen(process.env.PORT , ()=>{
    console.log("server run on port " + process.env.PORT)
})
