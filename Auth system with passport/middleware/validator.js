const { validationResult } = require("express-validator");

function checkValidation (req,res,next){
    
        const error = validationResult(req);
        let objectErrors = {}
        error?.errors?.forEach(err => {
            console.error(err)
          objectErrors[err.path] = err.msg;
        });
       if(Object.keys(objectErrors).length > 0){
       throw { 
         status : 400
        ,message : objectErrors
    }
       }
    next()
}
module.exports = {
  checkValidation
}