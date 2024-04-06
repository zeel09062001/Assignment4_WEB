const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User table
    products: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // Reference to the Product table
        quantity: { type: Number, required: true }
    }],
    // Auto-incremented integer Id
    cartId: { type: Number, unique: true, required: true }
});

// Custom validation function to check if referenced User and Product exist
cartSchema.path('userId').validate(async function (value) {
    const User = mongoose.model('User');
    const user = await User.findById(value);
    return !!user;
}, 'User does not exist');

cartSchema.path('products.productId').validate(async function (value) {
    const Product = mongoose.model('Product');
    const product = await Product.findById(value);
    return !!product;
}, 'Product does not exist');

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
