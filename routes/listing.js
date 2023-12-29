const express =  require("express");
const {body} = require('express-validator');
const listingController =  require("../controllers/listing");
const validator = require('../util/validator');
const isAuth = require("../middleware/is-auth");

const router = express.Router();

//GET /listings/ get list of all listings
router.get("", listingController.getListings)

//POST /listings/ create new listing
router.post("", isAuth, listingController.createListing)

//GET /listings/:id get a listing by id
router.get("/listing/:listingId", listingController.getListing)

//PUT /listings/:id update a listing by id
router.put("/listing/:listingId",isAuth, listingController.updateListing)

//DELETE /listings/:id delete listing by id
router.delete("/listing/:listingId",isAuth, listingController.deleteListing)

module.exports = router;

