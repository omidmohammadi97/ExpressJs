const express = require("express");
const {errorHandler , page404} = require('./util/utils');
const crypto = require("crypto");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

app.post("/hashpass/:pass" , (req , res , next) => {
    const pass = req.params.pass;
    let resultHash = f_hashPass(pass);
    res.send(resultHash)

})
app.get("/checkpass/:pass/:hashedPass" , (req , res , next) => {
    const pass = req.params.pass;
    const hashedPass = req.params.hashedPass;
    let varifyRes = f_varifyPass(pass , hashedPass);
    res.send(varifyRes)

})

let f_hashPass = (pass)=>{
    let salt = crypto.randomBytes(16).toString("hex");
    let hash  = crypto.pbkdf2Sync(pass , salt , 500 , 64 , "sha512").toString("hex");
    let finalHash = `$S2.${salt}.${hash}`;
    return finalHash;

}
let f_varifyPass = (pass , hashedPass)=>{
    var salt = hashedPass.split(".")?.[1];
    let hash  = crypto.pbkdf2Sync(pass , salt , 500 , 64 , "sha512").toString("hex");
    let newHash = `$S2.${salt}.${hash}`;

    return (hashedPass === newHash)
}
app.use(errorHandler) 
app.use(page404)
app.listen(process.env.PORT , ()=>{
    console.log("server run on port " + process.env.PORT)
})