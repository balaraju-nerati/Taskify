const express = require("express");
const app = express();
const PORT = 3000
require("dotenv").config();
require("./db/connection")

app.get("/",(req,res)=>{
    res.send("Hello from backend")
})

app.listen(PORT,()=>{
    console.log("Server started")
})
