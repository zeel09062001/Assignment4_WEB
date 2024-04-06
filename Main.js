const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const productController = require("./Controller/ProductController");
const userController = require('./Controller/UserController');
const commentController = require('./Controller/CommentController');
const cartController = require('./Controller/CartController');
const orderController = require('./Controller/OrderController')

const app = express();
const PORT = 4040;

// Middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb+srv://zshekhaliya:6KEF6ekl5D3PAZ0T@cluster0.7lqrzyu.mongodb.net/Web_Assignment4?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB atlas connection success"))
    .catch(err => console.error("MongoDB connection error:", err));

// Product
app.post("/api/products", productController.createProduct);
app.get("/api/products", productController.getAllProducts);
app.get("/api/products/:id", productController.getProductById);
app.put("/api/products/:id", productController.updateProduct);
app.delete("/api/products/:id", productController.deleteProduct);

// User
app.get("/api/users", userController.getAllUsers);
app.get("/api/users/:id", userController.getUserById);
app.post("/api/users", userController.createUser);
app.put("/api/users/:id", userController.updateUser);
app.delete("/api/users/:id", userController.deleteUser);

// Comments
app.get("/api/comments", commentController.getAllComments);
app.get("/api/comments/:id", commentController.getCommentById);
app.post("/api/comments", commentController.createComment);
app.put("/api/comments/:id", commentController.updateComment);
app.delete("/api/comments/:id", commentController.deleteComment);

// Cart
app.get("/api/cart", cartController.getAllCarts);
app.get("/api/cart/:id", cartController.getCartById);
app.post("/api/cart", cartController.createCart);
app.put("/api/cart/:id", cartController.updateCart);
app.delete("/api/cart/:id", cartController.deleteCart);

//Order
app.get("/api/orders", orderController.getAllOrders);
app.get("/api/orders/:id", orderController.getOrderById);
app.post("/api/orders", orderController.createOrder);
app.put("/api/orders/:id", orderController.updateOrder);
app.delete("/api/orders/:id", orderController.deleteOrder);

module.exports = app;
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
