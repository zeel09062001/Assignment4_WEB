const Comment = require('../Models/Comment');

// Get all comments
exports.getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find();
        res.send(comments);
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
};

// Get a comment by Id
exports.getCommentById = async (req, res) => {
    try {
        const comment = await Comment.findOne({ commentId: req.params.id });
        if (!comment) {
            return res.status(404).send("Comment not found");
        }
        res.send(comment);
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
};

// Create a new comment
exports.createComment = async (req, res) => {
    try {
        const commentCount = await Comment.countDocuments();
        const comment = new Comment({
            ...req.body,
            commentId: commentCount + 1
        });
        await comment.save();
        res.status(201).send({ message: 'Comment added successfully', comment });
    } catch (error) {
        res.status(400).send({ error: 'Bad Request' });
    }
};

// Update a comment by Id
exports.updateComment = async (req, res) => {
    try {
        const commentId = req.params.id;
        const updatedData = req.body;

        let comment = await Comment.findOneAndUpdate({ _id: commentId }, updatedData, { new: true });

        if (!comment) {
            return res.status(404).send("Comment not found");
        }

        res.send({ message: 'Comment updated successfully', comment });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Comment updated successfully' });
    }
};


// Delete a comment by Id
exports.deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findOneAndDelete({ commentId: req.params.id });
        if (!comment) {
            return res.status(404).send("Comment not found");
        }
        res.send({ message: 'Comment deleted successfully', comment });
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
};
