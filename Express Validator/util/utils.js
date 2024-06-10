const page404 = (req,res,next)=>{
    return res.status(404).json({
        statusCode : 404
        ,Message : "Page Not found"
    })
}


const errorHandler = (err , req,res,next)=>{
    console.log(err)
    return res.json({
        statusCode : err.status || 500,
        error : {
            message :  err.message  || "inertnal Server Error" ,
            invalidParams : err.error
       }
    })
}

module.exports = {
    page404,
    errorHandler
}