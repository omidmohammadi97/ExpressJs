const { param } = require("express-validator");

const IdValidator = param("id").isMongoId().withMessage("invalid id")
module.exports= {
    IdValidator
}