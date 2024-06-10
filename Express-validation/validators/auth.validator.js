const { Joi } = require("express-validation");

const loginValidator = {
    body: Joi.object({
        email : Joi.string().email().message("email is not valid").required(),
        password : Joi.string().min(6).max(20).regex(/[a-zA-Z0-9]{6,20}/)
    })
}

const registerValidator = {
    body: Joi.object({
        email : Joi.string().email().required(),
        username : Joi.string().alphanum().min(4).max(30).required(),
        password : Joi.string().min(6).max(20).required().regex(/[a-zA-Z0-9]{6,20}/).message("password must be at least 6 characters and maxmimum 20 characters and contain only characters and numbers"),
        confirmPassword : Joi.ref('password') ,
        age : Joi.number().integer().min(18).max(70),
        mobile : Joi.string().min(11).max(13).regex(/^(\+98|0)?9\d{9}$/).message("فرمت وارد شده صحیح نمیباشد")

    })
}
module.exports = {
    loginValidator
    ,registerValidator
}
