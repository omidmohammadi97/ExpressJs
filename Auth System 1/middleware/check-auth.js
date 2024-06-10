const { f_verifyToken } = require("../utils/auth.util");

const {userModel} = require("../model/user.model")

async function f_checkAuth(req ,res, next){
    try{
        const auth = req?.headers?.authorization;
        const [bearer , token] = auth?.split(" ");
        if(bearer && bearer.toLowerCase() === "bearer"){
            if(token){
                const verifyRes = f_verifyToken(token);
                const user = await userModel.findOne({email : verifyRes.email })
                if(!user) throw { status : 401 , message : "not found user account "}
                req.isAuthenticated = !!user //!! makes boolean 
                req.user = {
                    fullname : user.fullname,
                    email : user.email
                }
                return next();
            }else{
                throw { status : 401 , message : " login failed"}
            }
        }else{
            throw { status : 401 , message : " authorization failed"}
        }
    }catch(err){
        next(err)
    }
}
module.exports = {
    f_checkAuth
}