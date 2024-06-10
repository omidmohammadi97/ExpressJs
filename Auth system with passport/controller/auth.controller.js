const {userModel} = require("../model/user.model")
const {f_hashPassword, f_comparePassword, f_singToken} =require("../utils/auth.util")

async function register(req , res ,next){
   try{
       const {fullname , email , password , userName} = req.body

       const user = await userModel.findOne({userName})
       if(user){
         const referrer = req?.header('referer') ?? req.headers.referrer;
        req.flash("error" , "this username already exist")
        return res.redirect(referrer ?? "/register")
       }
     await userModel.create({
        fullname,
        email,
        password : f_hashPassword(password),
        userName
    })
    res.redirect("/login")
   }catch(err){
    next(err)
   }


}
async function login(req , res ,next){
   try{
    const { email , password } = req.body;
    const user = await userModel.findOne({email})
    if(!user) throw {status : 404 , message : "user not found"}

    if(f_comparePassword(password , user.password)){
       const token = f_singToken({id  : user._id , email : user.email})
       console.log("token login" , token)
       res.send({token , message : "login is ok"})
    }else{
        throw { status : 400 , message : "email or password is incorrect"}
    }
   }catch(err){
    next(err)
   }
}

module.exports = {
    login,
    register
}