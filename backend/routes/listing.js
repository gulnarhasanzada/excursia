const express =  require("express");
const {body} = require('express-validator');
const listingController =  require("../controllers/listing");
const validator = require('../util/validator');

const router = express.Router();

//GET /listings/ get list of all listings
router.get("", listingController.getListings)

//POST /listings/ create new listing
router.post("", validator.validateCreateListing,listingController.createListing)

//GET /listings/:id get a listing by id
router.get("/listing/:listingId", listingController.getListing)

//PUT /listings/:id update a listing by id
router.put("/listing/:listingId", listingController.updateListing)

module.exports = router;

