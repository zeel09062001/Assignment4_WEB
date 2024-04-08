const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderId: { type: Number, unique: true, required: true },
    userId: { type: Number, required: true }, 
    products: [{
        productId: { type: String, required: true }, 
        quantity: { type: Number, required: true }
    }],
    totalAmount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
