const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.Number, ref: 'User', required: true },
    products: [{
        productId: { type: mongoose.Schema.Types.Number, ref: 'Product', required: true },
        quantity: { type: Number, required: true, min: 1 } // Example validation for quantity
    }],
    cartId: { type: Number, unique: true, required: true }
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
