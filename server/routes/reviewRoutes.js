const express = require("express");

const router = express.Router();


const authMiddleware =
require("../middleware/authMiddleware");


const adminMiddleware =
require("../middleware/adminMiddleware");



const {

addReview,

getProductReviews,

getAllReviews,

updateReview,

deleteReview

}
=
require("../controllers/reviewController");




// User Add Review

router.post(
"/",
authMiddleware,
addReview
);



// Product Reviews

router.get(
"/product/:productId",
getProductReviews
);



// Admin All Reviews

router.get(
"/admin/all",
authMiddleware,
adminMiddleware,
getAllReviews
);



// Update

router.put(
"/:id",
authMiddleware,
updateReview
);



// Delete

router.delete(
"/:id",
authMiddleware,
deleteReview
);



module.exports = router;