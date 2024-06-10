const {Schema , model} = require("mongoose");
const categorySchema =  new Schema({
     name : {type : String , requried : true , trim : true , minlength : 5 , maxLength : 15 },
     order : {type : Number , requried : true }, 
     descripton : {type : String , trim : true , minlength : 5  , maxLength : 50 }
},
{
    timestamps : true
});
const categoryModel = model("category" , categorySchema  );
module.exports = {
    categoryModel
}