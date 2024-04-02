const express = require("express");
const app = express();
const cors = require("cors");
const userAPI = require("./routes/user");
const taskAPI = require("./routes/task");
const PORT = 3000;

require("dotenv").config();
require("./db/connection");

app.use(cors());
app.use(express.json());
app.use("/api/v1",userAPI)
app.use("/api/v2",taskAPI)


app.listen(PORT,()=>{
    console.log("Server started")
})
