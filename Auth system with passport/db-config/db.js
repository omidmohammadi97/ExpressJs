const mongoose = require("mongoose");

const DB_URL = "mongodb://127.0.0.1:27017/miniProject2";


const dbConnection = async()=>{
    try{
        mongoose.set("strictQuery", false);
        mongoose.connect(DB_URL)
        console.log("connection established")
    }catch(err){
        console.error("Failed to connect to MongoDB:", err.message);

    }
   
}
module.exports = {
    dbConnection
}
// mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
//     if (err) {
//         console.error("Failed to connect to MongoDB:", err.message);
//     } else {
//         console.log("Server connected to MongoDB");
//     }
// });
