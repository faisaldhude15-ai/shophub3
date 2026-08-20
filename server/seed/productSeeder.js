const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Product = require("../models/Product");

const products = [

{
    name:"iPhone 16 Pro Max",

    description:
    "Apple iPhone 16 Pro Max with A18 Pro chip, advanced camera system",

    price:399999,

    discountPrice:359999,

    discount:10,

    category:"Mobiles",

    brand:"Apple",

    images:[
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab"
    ],

    colors:[
        "Black",
        "Gold",
        "Blue"
    ],

    sizes:[
        "128GB",
        "256GB"
    ],

    features:[
        "A18 Pro Chip",
        "48MP Camera",
        "5G Support"
    ],

    stock:25,

    ratings:4.8,

    numReviews:120,

    isFeatured:true,

    isActive:true
},



{
    name:"JBL Speaker",

    description:
    "Powerful JBL Bluetooth Speaker with deep bass",

    price:28000,

    discountPrice:24999,

    discount:10,

    category:"Electronics",

    brand:"JBL",

    images:[
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1"
    ],

    features:[
        "Bluetooth 5.3",
        "Deep Bass",
        "24 Hours Battery"
    ],

    stock:30,

    ratings:4.7,

    numReviews:220,

    isFeatured:true,

    isActive:true
},




{
    name:"MacBook Pro M5",

    description:
    "Apple MacBook Pro powerful laptop",

    price:420000,

    discountPrice:399999,

    discount:5,

    category:"Laptop",

    brand:"Apple",

    images:[
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
    ],

    features:[
        "M5 Processor",
        "Retina Display",
        "Fast Performance"
    ],

    stock:15,

    ratings:4.9,

    numReviews:90,

    isFeatured:true,

    isActive:true
},




{
    name:"Sony WH-1000XM5 Headphones",

    description:
    "Premium noise cancelling wireless headphones",

    price:95000,

    discountPrice:85000,

    discount:10,

    category:"Audio",

    brand:"Sony",

    images:[
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
    ],

    features:[
        "Noise Cancellation",
        "Wireless",
        "High Quality Sound"
    ],

    stock:20,

    ratings:4.8,

    numReviews:150,

    isFeatured:true,

    isActive:true
}

];




// Load ENV

dotenv.config();




// MongoDB Connection

mongoose.connect(process.env.MONGO_URI)

.then(async()=>{


console.log("MongoDB Connected");


// Remove old data

await Product.deleteMany();



// Insert new products

const createdProducts = await Product.insertMany(products);



console.log(
`${createdProducts.length} Products Added Successfully`
);



process.exit();



})

.catch((error)=>{


console.log(
"Seeder Error:",
error.message
);


process.exit(1);


});