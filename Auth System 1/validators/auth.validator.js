const { body } = require("express-validator");

const loginValidator = ()=> [
    body("email").isEmail().withMessage("فرمت وارد شده برای ایمیل صحیص نیست"),
]
const registerValidator = ()=> [
    body("userName").notEmpty().withMessage("مقدار نام کاربری نمیتواند خالی باشد"),
    body("email").isEmail().withMessage("فرمت وارد شده برای ایمیل صحیص نیست"),
    body("password").isLength({min : 5}).withMessage("مقدار پسورد نمیتواند از 5 کاراکتر کمتر باشد"),

]

module.exports = {
    loginValidator,
    registerValidator
}