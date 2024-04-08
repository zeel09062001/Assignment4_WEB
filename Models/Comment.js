const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    productId: { type: Number, ref: 'Product', required: true },
    userId: { type: Number, ref: 'User', required: true },
    rating: { type: Number, required: true },
    text: { type: String, required: true },
    images: [{ type: String }],
    // Auto-incremented integer Id
    commentId: { type: Number, unique: true, required: true }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
