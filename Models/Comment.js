const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    productId: { type: String, ref: 'Product', required: true }, // Use String type for productId
    userId: { type: Number, ref: 'User', required: true }, // Use Number type for userId
    rating: { type: Number, required: true },
    text: { type: String, required: true },
    images: [{ type: String }],
    // Auto-incremented integer Id
    commentId: { type: Number, unique: true, required: true }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
