const mongoose = require("mongoose");

const DB_URL = "mongodb://127.0.0.1:27017/accteoBotDb";

mongoose.set("strictQuery", true);

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.error("Failed to connect to MongoDB:", err.message);
    } else {
        console.log("Server connected to MongoDB");
    }
});
