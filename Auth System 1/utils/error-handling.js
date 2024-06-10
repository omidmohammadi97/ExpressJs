function f_notFound(req , res ,next){
    res.send({
        status: 404 , 
        message : "page not found"
    })
}
function f_errorHandling(err , req , res ,next){
   const status = err?.status ?? err?.statusCode ?? 500
   res.send({
    statusCode : status,
    message : err?.message ?? "InternalServerError"
   }) 
}
module.exports = {
    f_notFound,
    f_errorHandling
}