const bcrypt = require("bcrypt");
const jwt =require("jsonwebtoken")
const secret = "omid mohammadi is a good programmer"
function f_hashPassword(password){
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password , salt)
}

function f_comparePassword(password , hashedPassword){
    return bcrypt.compareSync(password , hashedPassword);

}

function f_singToken(payload){
    return jwt.sign(payload , secret )
}

function f_verifyToken(token){
    console.log("token" , token)
    return jwt.verify(token , secret )
}


module.exports = {
    f_hashPassword,
    f_comparePassword,
    f_singToken,
    f_verifyToken
}