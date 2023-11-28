const express =  require("express");
const mongoose = require("mongoose");
require("dotenv").config({path: "config/keys.env"});
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
})

mongoose.connect(process.env.MONGO_DB_CONNECTION)
.then(result=>{
    app.listen(process.env.PORT)
})
.catch(err=> console.log(err))


