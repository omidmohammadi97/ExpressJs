const express = require("express");
const morgan = require("morgan");
const path = require("path");
const {errorHandler , page404} = require("./util/utils")
const app = express();
app.use("/static" , express.static("public"))
app.set("view engine" , "pug")
app.set("views" , path.join(__dirname,"views"))
app.use(express.json());
app.use(express.urlencoded());
// app.use(morgan(':method :url :response-time ms :res[content-length] '))
// app.use(morgan('combined'))
app.use(morgan('tiny'))

const  users = [
    {name : "omid",
    age : 26,
    sex : "male"
    },
    {name : "vahid",
    age : 32,
    sex : "male"
    },
    {name : "elahe",
    age : 40,
    sex : "female"
    }
]

app.get("/" , (req,res,next)=>{
    res.render('Index' ,{
        Link : 'https:livemenu.ir',
        name : "omid mohammadi",
        skills : "developer",
        users 

    }
    )
})

app.use(page404)
app.use(errorHandler)
app.listen(3000 , ()=>{
    console.log("listening on port 3000")
})