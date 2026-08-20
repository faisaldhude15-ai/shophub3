const express = require("express");

const router = express.Router();


// ==============================
// Middleware
// ==============================

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");


// ==============================
// Controller
// ==============================

const adminController = require("../controllers/adminController");



// ==============================
// Admin Protection
// ==============================

router.use(authMiddleware);
router.use(adminMiddleware);





// ==============================
// Dashboard
// ==============================

router.get(
    "/dashboard",
    adminController.getAdminDashboard
);






// ==============================
// Users
// ==============================


router.get(
    "/users",
    adminController.getAllUsers
);



router.get(
    "/users/:id",
    adminController.getUserById
);



router.put(
    "/users/:id/status",
    adminController.updateUserStatus
);



router.delete(
    "/users/:id",
    adminController.deleteUser
);







// ==============================
// Products
// ==============================


router.get(
    "/products",
    adminController.getAllProducts
);



router.post(
    "/products",
    adminController.createProduct
);



router.put(
    "/products/:id",
    adminController.updateProduct
);



router.delete(
    "/products/:id",
    adminController.deleteProduct
);







// ==============================
// Orders
// ==============================


router.get(
    "/orders",
    adminController.getAllOrders
);



router.put(
    "/orders/:id/status",
    adminController.updateOrderStatus
);



router.delete(
    "/orders/:id",
    adminController.deleteOrder
);







// ==============================
// Reviews
// ==============================


router.get(
    "/reviews",
    adminController.getAllReviews
);



router.delete(
    "/reviews/:id",
    adminController.deleteReview
);







// ==============================
// Export
// ==============================

module.exports = router;