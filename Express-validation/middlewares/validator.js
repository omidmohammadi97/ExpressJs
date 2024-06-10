const { validationResult } = require("express-validator");

function checkValidation (req,res,next){
    
        const error = validationResult(req);
        let objectErrors = {}
        error?.errors?.forEach(err => {
          console.log(err)
          objectErrors[err.path] = err.msg;
        });
        // console.log("objectErrors",objectErrors.keys)
       if(Object.keys(objectErrors).length > 0){
       throw { status : 400,
        error: objectErrors
        ,message : "validation error"
    }
       }
    next()
}
module.exports = {
  checkValidation
}