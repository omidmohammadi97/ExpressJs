const { body } = require("express-validator");

const loginValidator = ()=> [
    body("email").isEmail().withMessage("لطفا ایمیل با فرمت صحیح وارد کنید"),
    body("password").isLength({min : 6 , max : 20}).withMessage("مقدار ورودی باید بیش از 6 و کمتر از 20 کاراکتر باشد"),
  
]
const registerValidator = ()=> [
    body("username").isLength({min : 6 , max : 20}).withMessage("نام کاربری بایدحداقل 6 و حدااکثر 20 کاراکتر باشد"),
    body("age").custom(value => {
        if(isNaN(value)) throw new Error("سن باید مقدار عددی باشد")
        if(value < 10 || value > 90){
            throw new Error("سن باید بیش از  10 یا کمتر 90 باشد")
        }
    }),
    body("mobile").isMobilePhone('fa-IR').withMessage("شماره موبایل خود را با فرمت ایران وارد کنید"),
    body("email").isEmail().withMessage("لطفا ایمیل با فرمت صحیح وارد کنید"),
    body("password").isLength({min : 6 , max : 20}).withMessage("مقدار ورودی باید بیش از 6 و کمتر از 20 کاراکتر باشد"),
    body("confirmPassword").custom((value , {req})=>{
        if(value !== req.body.password){
            throw new Error("Confirmation has been failed")
        }
        return true
    })
  
]


module.exports = {
    loginValidator,registerValidator
}