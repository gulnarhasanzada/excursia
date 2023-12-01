const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    location: {
        city: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        coordinates: {
          latitude: {
            type: Number,
            required: true
          },
          longitude: {
            type: Number,
            required: true
          },
        }
    },
    price: {
        nightly: {
            type: Number,
            required: true
        },
        weekly: Number,
        monthly: Number
    },
    capacity: {
        guests: {
            type: Number,
            required: true
        },
        bedrooms: {
            type: Number,
            required: true
        },
        bathrooms: {
            type: Number,
            required: true
        },
    },
    amenities:{
        type: [String],
        required: true
    },
    images:{
        type: [String]
    },
    host: {
        type: Number,
        required: true
    }
},
{ timestamps:true});


module.exports = mongoose.model('Listing', listingSchema)