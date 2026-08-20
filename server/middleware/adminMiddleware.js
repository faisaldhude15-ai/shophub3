/**
 * Middleware to restrict route access to administrators only.
 * Assumes an authentication middleware has already populated req.user.
 */
const adminMiddleware = (req, res, next) => {
  try {
    // 1. Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Please log in first."
      });
    }

    // 2. Safe string extraction (handles plain strings and formatting)
    const userRole = req.user.role ? String(req.user.role).trim().toLowerCase() : "";

    // 3. Evaluation against authorized role
    if (userRole !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin privileges required."
      });
    }

    // 4. Authorization successful, proceed to next handler
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error during authorization verification."
    });
  }
};

module.exports = adminMiddleware;
