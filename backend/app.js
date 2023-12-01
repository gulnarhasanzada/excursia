const path = require("path");
const express =  require("express");
const mongoose = require("mongoose");
require("dotenv").config({path: "config/keys.env"});
const bodyParser = require("body-parser");
const multer = require("multer");

//routes
const listingRoutes =  require("./routes/listing");
const userRoutes =  require("./routes/user");

const app = express();

//multer: fileStorage
const fileStorage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'images')
    },
    filename: (req, file, cb)=>{
        cb(null, file.originalname + '-'+ new Date().toISOString())
    }
});

//multer: fileFilter
const fileFilter = (req, file, cb)=>{
    if(file.mimeType === 'image/png' || file.mimeType === 'image/jpg' || file.mimeType === 'image/jpeg'){
        cb(null, true)
    }else{
        cb(null, false)
    }
}

app.use(bodyParser.json());
app.use(multer({storage: fileStorage, fileFilter}).array('listingImages'));


//CORS settings
app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/listings', listingRoutes);
app.use('/user', userRoutes);
app.use('/bookings', listingRoutes);
app.use('/conversations', listingRoutes);

app.use((error, req, res,next)=>{
    const status = error.statusCode || 500;
    res.status(status).json({
        message: error.message,
        data: error.data
    })
})

mongoose.connect(process.env.MONGO_DB_CONNECTION)
.then(result=>{
    app.listen(process.env.PORT)
})
.catch(err=> {
    console.log(err)
})


