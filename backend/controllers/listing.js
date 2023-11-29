exports.getListings = (req,res, next)=>{
    res.status(200).json({
        listings:[
            {
                listingId: '1',
                title: "Lake house",
                address: {
                    country: "Canada",
                    city: "Barrie",
                    province: "ON",
                    streetName: "Country Lane",
                    streetNo: "193"
                }
            }
        ]
    });
}

