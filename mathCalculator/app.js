const express = require("express");
const bodyParser  = require("body-parser");

const app = express();

app.get("/" , (req, res)=>{
    res.send("This is the simple math colculator");
})

app.listen(3000, function(){
    console.log("Your server is runnig at port 3000");
})