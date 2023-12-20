const Listing = require("../models/listing");
const {validationResult} = require('express-validator');
const User = require("../models/user");

exports.getListings = (req,res, next)=>{
    Listing.find()
    .then(result=>{
        res.status(200).json({
            listings: result
        });
    })
    .catch(err => {
        next(err);
    }) 
}

exports.getListing = async (req,res, next)=>{
    const listingId = req.params.listingId;
    try {
        const listing =  await Listing.findById(listingId);
        if(!listing){
            const error = new Error('Listing not found!');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            listing
        });
    } catch (err) {
        next(err);
    }
}

exports.createListing = async (req,res, next)=>{
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(422).json({
            message: 'Incorrect data',
            errors: error.array()
        })
    }
    const listing = new Listing({
        title: req.body.title,
        description: req.body.description,
        location: {
            city: req.body.location.city,
            country: req.body.location.country,
            coordinates: {
              latitude: +req.body.location.coordinates.latitude,
              longitude: +req.body.location.coordinates.longitude,
            }
        },
        price:{
            nightly: req.body.price.nightly,
            weekly: req.body.price.weekly,
            monthly: req.body.price.monthly
        },
        capacity:{
            guests: req.body.capacity.guests,
            bedrooms: req.body.capacity.bedrooms,
            bathrooms: req.body.capacity.bathrooms
        },
        amenities:req.body.amenities,
        images: req.body.images,
        host: req.userId
    })
    
    try {
        const newListing = await listing.save(); //saving new listing
        const user = await User.findById(req.userId);
        user.listings.push(newListing) //adding new listing to user
        await user.save();
        res.status(201).json({
            message: "Listing created successfully!",
            host: {_id: user._id, name: user.firstName+ ' '+ user.lastName},
            listing: newListing
        });
    } catch (err) {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
}

//needs fixing
exports.updateListing = async (req,res, next)=>{
    const listing = new Listing({
        title: req.body.title,
        description: req.body.description,
        location: {
            city: req.body.location.city,
            country: req.body.location.country,
            coordinates: {
              latitude: +req.body.location.coordinates.latitude,
              longitude: +req.body.location.coordinates.longitude,
            }
        },
        price:{
            nightly: req.body.price.nightly,
            weekly: req.body.price.weekly,
            monthly: req.body.price.monthly
        },
        capacity:{
            guests: req.body.capacity.guests,
            bedrooms: req.body.capacity.bedrooms,
            bathrooms: req.body.capacity.bathrooms
        },
        amenities:req.body.amenities,
        images: req.body.images,
        host: req.body.host
    })
    
    try {
        const updatedListing = await listing.save()
        res.status(201).json({
            message: "Listing created successfully!",
            listing: updatedListing
        });
    } catch (err) {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
}


exports.deleteListing = async (req, res, next)=>{
    const id = req.params.listingId;
    try {
        const listing = await Listing.findById(id);
        console.log(listing);
        if(!listing){
            const error = new Error('Listing not found!');
            error.statusCode = 404;
            throw error;
        }
        await Listing.findByIdAndDelete(id); //deleting listing
        const user = await User.findById(req.userId); 
        user.listings.pull(id);             //deleting listing from listings array in user object
        await user.save();
        res.status(200).json({
            message: "Listing deleted successfully!"
        });
    } catch (err) {
        next(err);
    }

}

