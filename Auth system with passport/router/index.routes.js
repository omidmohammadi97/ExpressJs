const { Router} = require("express");
const {userModel} = require("../model/user.model")
const {f_hashPassword } = require("../utils/auth.util")
const {f_checkAuth  } = require("../middleware/check-auth")
const {checkAuthentication ,redirectIfIsAuth } = require("../middleware")
const { checkValidation} = require("../middleware/validator")
const { registerValidator} = require("../validators/auth.validator")
const router = Router();
function initRoutes(passport){
    // console.log("passport",passport)
    router.get("/" , (req ,res)=>{
        res.render("index" ,  {title : "Home"})
    })
    //registerValidator() ,checkValidation ,
    router.post("/register",redirectIfIsAuth, async (req, res , next) => {
        try {
            const {fullname, userName, password} = req.body;
            // const hashPassword = f_hashPassword(password);

            const user = await userModel.findOne({userName})
            console.log("USER" , user)
          
            if(user) {
                const referrer =  req?.header('Referrer') ?? req.headers.referer;
                console.log("referrer" , referrer)
                req.flash("error", "این نام کاربری قبلا استفاده شده است");
                return res.redirect(referrer ?? "/register")
            }
            await userModel.create({
                fullname, 
                userName,
                password : f_hashPassword(password)
            })
            res.redirect("/login")
        } catch (error) {
            console.log("error" , error)
            next(error)
        }
    })
    router.post("/login", redirectIfIsAuth, passport.authenticate('local', {
        successRedirect: "/profile",
        failureRedirect: "/login",
        failureFlash: true
    }),async (req, res) => {
        console.log("INJA CHI?")
        res.redirect("/profile")
    })
    router.get("/register", redirectIfIsAuth ,async (req ,res )=>{
    res.render("register" ,  {title : "Register"})
     })
    router.get("/profile" ,checkAuthentication ,  (req ,res)=>{
        const user = req.user
        res.render("profile" ,  {title : "Profile"  , user})
    })
    router.get("/login" ,redirectIfIsAuth,  (req ,res)=>{
        res.render("login" ,  {title : "Login"})
    })
    router.get("/logout" ,checkAuthentication ,  (req ,res)=>{
       req.logOut({keepSessionInfo : false} , (err)=>{
        if(err) console.log(err)
       });
       res.redirect("/login")
    })
    return router;
}


module.exports = {
    Allroutes : initRoutes 
}