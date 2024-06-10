const { default : mongoose} = require("mongoose")
const userSchema = new mongoose.Schema({
    fullname : {type : String , required : true},
    userName : {type : String  , minlength : 5 , maxlength : 20},
    password : {type : String, required : true  , minlength : 10 },
    email : {type : String , required : true  , unique: true , trim : true}
},
{
    timestamps : true
}
)
const userModel = mongoose.model("user" , userSchema);
module.exports = {
    userModel
}