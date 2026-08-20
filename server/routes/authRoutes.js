const express = require("express");

const router = express.Router();


// ==============================
// Controllers
// ==============================

const {
  register,
  login,
  profile,
} = require("../controllers/authController");


// ==============================
// Middleware
// ==============================

const authMiddleware = require("../middleware/authMiddleware");



// ==============================
// Authentication Routes
// ==============================


// Register New User
// POST /api/auth/register
router.post(
  "/register",
  register
);



// Login User
// POST /api/auth/login
router.post(
  "/login",
  login
);



// Get Current Logged-in User Profile
// GET /api/auth/profile
router.get(
  "/profile",
  authMiddleware,
  profile
);



// ==============================
// Check Authentication
// GET /api/auth/check
// ==============================

router.get(
  "/check",
  authMiddleware,
  (req,res)=>{

    res.status(200).json({

      success:true,

      message:"User authenticated",

      user:req.user

    });

  }
);



// ==============================
// Logout
// POST /api/auth/logout
// ==============================

router.post(
  "/logout",
  (req,res)=>{

    res.status(200).json({

      success:true,

      message:"Logout successful"

    });

  }
);



// ==============================
// Export Router
// ==============================

module.exports = router;