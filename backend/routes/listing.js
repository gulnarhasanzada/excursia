const express =  require("express");
const listingController =  require("../controllers/listing");

const router = express.Router();

//GET /listings/
router.get("/", listingController.getListings)

module.exports = router;

