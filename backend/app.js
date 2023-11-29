const express =  require("express");
const mongoose = require("mongoose");
require("dotenv").config({path: "config/keys.env"});
const bodyParser = require("body-parser");

//routes
const listingRoutes =  require("./routes/listing");
const userRoutes =  require("./routes/user");

const app = express();

app.use(bodyParser.json());

//CORS settings
app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
})

app.use('/listings', listingRoutes);
app.use('/users', userRoutes);
app.use('/bookings', listingRoutes);
app.use('/conversations', listingRoutes);

mongoose.connect(process.env.MONGO_DB_CONNECTION)
.then(result=>{
    app.listen(process.env.PORT)
})
.catch(err=> console.log(err))


