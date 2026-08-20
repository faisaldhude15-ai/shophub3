const Order = require("../models/Order");
const Cart = require("../models/Cart");

// =====================================
// Create Order
// POST /api/orders
// =====================================
const createOrder = async (req, res) => {
    try {
        const cart = await Cart.findOne({
            user: req.user._id
        }).populate("items.product");

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Cart is empty"
            });
        }

        const { fullName, phone, address, city, postalCode, paymentMethod } = req.body;

        const order = await Order.create({
            user: req.user._id,
            items: cart.items.map(item => ({
                product: item.product._id,
                name: item.product.name,
                quantity: item.quantity,
                price: item.price
            })),
            shippingAddress: {
                fullName,
                phone,
                address,
                city,
                postalCode
            },
            totalAmount: cart.totalPrice,
            paymentMethod: paymentMethod || "COD",
            paymentStatus: "Pending",
            orderStatus: "Pending"
        });

        // Clear Cart after order
        await Cart.findOneAndDelete({ user: req.user._id });

        res.status(201).json({
            success: true,
            message: "Order Created Successfully",
            order
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// =====================================
// Get My Orders
// GET /api/orders/my-orders
// =====================================
const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id })
            .populate("items.product")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: orders.length,
            orders
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// =====================================
// Get Single Order
// GET /api/orders/:id
// =====================================
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate("items.product")
            .populate("user", "fullName email");

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        res.status(200).json({
            success: true,
            order
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// =====================================
// Admin Get All Orders
// GET /api/orders/admin/all
// =====================================
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("user", "fullName email")
            .populate("items.product")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: orders.length,
            orders
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// =====================================
// Admin Update Order Status
// PUT /api/orders/:id/status
// =====================================
const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const validStatuses = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

        // 1. Validate status input
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status value"
            });
        }

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        // 2. Prevent changes on finalized orders
        if (order.orderStatus === "Delivered") {
            return res.status(400).json({
                success: false,
                message: "Cannot modify a completely delivered order"
            });
        }

        if (order.orderStatus === "Cancelled") {
            return res.status(400).json({
                success: false,
                message: "Cannot modify a cancelled order"
            });
        }

        // 3. Apply state mutations based on new status
        order.orderStatus = status;

        if (status === "Delivered") {
            order.deliveredAt = Date.now();
            
            // Auto-settle payment flags for Cash On Delivery orders
            if (order.paymentMethod === "COD") {
                order.paymentStatus = "Paid";
                order.isPaid = true;
                order.paidAt = Date.now();
            }
        }

        await order.save();

        res.status(200).json({
            success: true,
            message: `Order status updated to ${status}`,
            order
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createOrder,
    getMyOrders,
    getOrderById,
    getAllOrders,
    updateOrderStatus
};
