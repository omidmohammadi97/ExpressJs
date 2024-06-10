// const passport = require("passport");
const {Strategy : LocalStrategy} = require("passport-local")
const {userModel} = require("./model/user.model");
const { compareSync } = require("bcrypt");
function passportInit(passport){
  console.log("HELLO BABE")
    const authenticatedUser = async (userName , password , done)=>{
      try { 
        console.log("INJAY")
        const user = await userModel.findOne({userName});
        if(!user) return done(null , false , {message : "user not found"})
        if(compareSync(password , user.password)) return done(null , user)
        return done(null , false , {message : "username or password is incorrect"})
      }catch(e){
        console.log("INJAY??" , e)
        done(e)
      }
     }
     const localStrategy = new LocalStrategy({usernameField : "userName" , passwordField : "password" }, authenticatedUser)
     const serializeUser = passport.serializeUser((user , done)=>{
        return done(null , user.id)
     })
     const deserializeUser = passport.deserializeUser( async (id , done)=>{
        const user = await userModel.findOne({_id : id});
        if(!user) return done(null , false , {message : "user not found"})
        return done(null , user)
     })
     passport.use("local" , localStrategy , serializeUser , deserializeUser)
   }
     module.exports = {
      passportInit
     }
