const Review = require("../models/Review");
const Product = require("../models/Product");


// =======================================
// Update Product Rating
// =======================================

const updateProductRating = async (productId) => {

    const reviews = await Review.find({
        product: productId
    });


    const numReviews = reviews.length;


    let ratings = 0;


    if(numReviews > 0){

        ratings =
        reviews.reduce(
            (sum, item)=> sum + item.rating,
            0
        ) / numReviews;

    }



    await Product.findByIdAndUpdate(
        productId,
        {
            ratings,
            numReviews
        }
    );

};





// =======================================
// Add Review
// POST /api/reviews
// =======================================

const addReview = async(req,res)=>{

try{


const {
productId,
rating,
comment
}=req.body;



if(!productId || !rating || !comment){

return res.status(400).json({

success:false,

message:"All fields are required"

});

}




const product = await Product.findById(productId);


if(!product){

return res.status(404).json({

success:false,

message:"Product not found"

});

}





const alreadyReview =
await Review.findOne({

user:req.user._id,

product:productId

});



if(alreadyReview){

return res.status(400).json({

success:false,

message:"Already reviewed"

});

}





const review = await Review.create({

user:req.user._id,

product:productId,

rating,

comment

});





await updateProductRating(productId);





res.status(201).json({

success:true,

message:"Review Added",

review

});



}
catch(error){

res.status(500).json({

success:false,

message:error.message

});

}


};







// =======================================
// Get Product Reviews
// GET /api/reviews/:productId
// =======================================

const getProductReviews = async(req,res)=>{

try{


const reviews =
await Review.find({

product:req.params.productId

})
.populate(
"user",
"fullName email"
)
.sort({
createdAt:-1
});




res.json({

success:true,

reviews

});



}
catch(error){

res.status(500).json({

success:false,

message:error.message

});

}


};







// =======================================
// Admin All Reviews
// GET /api/reviews/admin/all
// =======================================

const getAllReviews = async(req,res)=>{

try{


const reviews =
await Review.find()
.populate(
"user",
"fullName email"
)
.populate(
"product",
"name"
)
.sort({
createdAt:-1
});



res.json({

success:true,

reviews

});



}
catch(error){

res.status(500).json({

success:false,

message:error.message

});

}


};







// =======================================
// Update Review
// PUT /api/reviews/:id
// =======================================

const updateReview = async(req,res)=>{


try{


const review =
await Review.findById(
req.params.id
);



if(!review){

return res.status(404).json({

success:false,

message:"Review not found"

});

}




if(
review.user.toString()
!== req.user._id.toString()
){

return res.status(403).json({

success:false,

message:"Access denied"

});

}





review.rating =
req.body.rating;


review.comment =
req.body.comment;



await review.save();



await updateProductRating(
review.product
);




res.json({

success:true,

message:"Review Updated",

review

});



}
catch(error){

res.status(500).json({

success:false,

message:error.message

});

}


};








// =======================================
// Delete Review
// User + Admin
// DELETE /api/reviews/:id
// =======================================

const deleteReview = async(req,res)=>{


try{


const review =
await Review.findById(
req.params.id
);



if(!review){

return res.status(404).json({

success:false,

message:"Review not found"

});

}




// User OR Admin

if(

review.user.toString()
!== req.user._id.toString()

&&

req.user.role !== "admin"

){


return res.status(403).json({

success:false,

message:"Access denied"

});


}




const productId =
review.product;



await review.deleteOne();



await updateProductRating(
productId
);



res.json({

success:true,

message:"Review Deleted"

});



}
catch(error){

res.status(500).json({

success:false,

message:error.message

});

}


};







module.exports = {

addReview,

getProductReviews,

getAllReviews,

updateReview,

deleteReview

};