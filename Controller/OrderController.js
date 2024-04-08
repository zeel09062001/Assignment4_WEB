const Order = require('../Models/Order');

// Get all orders
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findOne({ orderId: req.params.id });
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new order
exports.createOrder = async (req, res) => {
    try {
        const { userId, products, totalAmount } = req.body;

        // Create a new order
        const order = new Order({
            userId: userId,
            products: products,
            totalAmount: totalAmount,
            orderId: Math.floor(Math.random() * 1000) // Generate a random orderId
        });

        // Save the order to the database
        await order.save();

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an order
exports.updateOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const updates = req.body;

        // Update the order
        const order = await Order.findOneAndUpdate({ orderId: orderId }, updates, { new: true });
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        res.json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete an order
exports.deleteOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findOneAndDelete({ orderId: orderId });
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }
        res.send("Order deleted successfully");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
