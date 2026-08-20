const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");
const Review = require("../models/Review");



// =====================================
// Admin Dashboard
// GET /api/admin/dashboard
// =====================================

const getAdminDashboard = async (req,res)=>{

    try{

        const totalUsers =
        await User.countDocuments();


        const totalProducts =
        await Product.countDocuments();


        const totalOrders =
        await Order.countDocuments();



        res.json({

            success:true,

            data:{

                metrics:{

                    totalSales:0,

                    totalUsers,

                    totalOrders,

                    lowStockCount:0

                },


                totalProducts

            }

        });


    }
    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};








// =====================================
// Users
// =====================================


const getAllUsers = async(req,res)=>{

    try{


        const users = await User.find()

        .select("-password")

        .sort({
            createdAt:-1
        });



        res.json({

            success:true,

            users

        });


    }
    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};






const getUserById = async(req,res)=>{

    try{


        const user =
        await User.findById(req.params.id)

        .select("-password");



        if(!user){

            return res.status(404).json({

                success:false,

                message:"User not found"

            });

        }



        res.json({

            success:true,

            user

        });



    }
    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};






const updateUserStatus = async(req,res)=>{

    try{


        const user =
        await User.findByIdAndUpdate(

            req.params.id,

            {
                isActive:req.body.isActive
            },

            {
                new:true
            }

        );



        res.json({

            success:true,

            message:"User status updated",

            user

        });



    }
    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};






const deleteUser = async(req,res)=>{

    try{


        await User.findByIdAndDelete(
            req.params.id
        );



        res.json({

            success:true,

            message:"User deleted successfully"

        });



    }
    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};









// =====================================
// Products
// =====================================


const getAllProducts = async(req,res)=>{

    try{


        const products =
        await Product.find()

        .sort({
            createdAt:-1
        });



        res.json({

            success:true,

            data:products

        });



    }
    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};







const createProduct = async(req,res)=>{

    try{


        const product =
        await Product.create(req.body);



        res.status(201).json({

            success:true,

            message:"Product created",

            product

        });



    }
    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};







const updateProduct = async(req,res)=>{

    try{


        const product =
        await Product.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new:true
            }

        );



        res.json({

            success:true,

            message:"Product updated",

            product

        });



    }
    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};








const deleteProduct = async(req,res)=>{

    try{


        await Product.findByIdAndDelete(
            req.params.id
        );



        res.json({

            success:true,

            message:"Product deleted"

        });



    }
    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};









// =====================================
// Orders
// =====================================


const getAllOrders = async(req,res)=>{

    try{


        const orders =
        await Order.find()

        .populate(
            "user",
            "fullName email"
        )

        .sort({
            createdAt:-1
        });



        res.json({

            success:true,

            orders

        });



    }
    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};







const updateOrderStatus = async(req,res)=>{

    try{


        const order =
        await Order.findByIdAndUpdate(

            req.params.id,

            {
                status:req.body.status
            },

            {
                new:true
            }

        );



        if(!order){

            return res.status(404).json({

                success:false,

                message:"Order not found"

            });

        }



        res.json({

            success:true,

            message:"Order status updated",

            order

        });



    }
    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};







const deleteOrder = async(req,res)=>{

    try{


        await Order.findByIdAndDelete(
            req.params.id
        );



        res.json({

            success:true,

            message:"Order deleted successfully"

        });



    }
    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};









// =====================================
// Reviews
// =====================================


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








const deleteReview = async(req,res)=>{

    try{


        const review =
        await Review.findByIdAndDelete(
            req.params.id
        );



        if(!review){

            return res.status(404).json({

                success:false,

                message:"Review not found"

            });

        }



        res.json({

            success:true,

            message:"Review deleted successfully"

        });



    }
    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};








// =====================================
// Export
// =====================================


module.exports = {


    // Dashboard
    getAdminDashboard,


    // Users
    getAllUsers,
    getUserById,
    updateUserStatus,
    deleteUser,


    // Products
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,


    // Orders
    getAllOrders,
    updateOrderStatus,
    deleteOrder,


    // Reviews
    getAllReviews,
    deleteReview


};