const page404 = (req,res,next)=>{
    return res.status(404).json({
        statusCode : 404
        ,Message : "Page Not found"
    })
}


const errorHandler = (err , req,res,next)=>{
    return res.json({
        statusCode : err.status || 500
        ,Error: err.Message || "Internal server error"
    })
}

module.exports = {
    page404,
    errorHandler
}