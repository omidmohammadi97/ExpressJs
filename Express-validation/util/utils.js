const {validationMapprer} = require("./express-validationMapper")
const page404 = (req,res,next)=>{
    return res.status(404).json({
        statusCode : 404
        ,Message : "Page Not found"
    })
}


const errorHandler = (err , req,res,next)=>{
    console.log("error",JSON.stringify(err , null , 4))
    return res.json({
        statusCode : err.status || err.statusCode  || 500,
        error : {
            message :  err.message  || "inertnal Server Error" ,
            invalidParams : validationMapprer(err)
       }
    })
}

module.exports = {
    page404,
    errorHandler
}