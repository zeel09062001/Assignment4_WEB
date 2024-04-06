const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    purchaseHistory: { type: [String] },
    shippingAddress: { type: String },
    userId: { type: Number, unique: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
