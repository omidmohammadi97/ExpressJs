const { Router} = require("express");
const { login , register} = require("../controller/auth.controller");
const { loginValidator , registerValidator} = require("../validators/auth.validator")
const { checkValidation} = require("../middleware/validator")
const router = Router()
console.log("Authroutes")
router.post("/login" ,loginValidator() , checkValidation,  login )
router.post("/register" ,registerValidator() ,checkValidation , register )

module.exports = {
    Authroutes : router
}