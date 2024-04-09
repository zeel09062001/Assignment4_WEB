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

app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb+srv://Zeel:Zeelshekhaliya@cluster0.cyx7zp5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB atlas connection success"))
    .catch(err => console.error("MongoDB connection error:", err));

// Product
app.post("/api/products/createProduct", productController.createProduct);
app.get("/api/products/getProducts", productController.getAllProducts);
app.get("/api/products/getProduct/:id", productController.getProductById);
app.put("/api/products/updateProduct/:id", productController.updateProduct);
app.delete("/api/products/deleteProduct/:id", productController.deleteProduct);

// User
app.get("/api/users/getUsers", userController.getAllUsers);
app.get("/api/users/getUsers/:id", userController.getUserById);
app.post("/api/users/createUsers", userController.createUser);
app.put("/api/users/updateUsers/:id", userController.updateUser);
app.delete("/api/users/deleteUsers/:id", userController.deleteUser);

// Comments
app.get("/api/comments/getComments", commentController.getAllComments);
app.get("/api/comments/getComments/:id", commentController.getCommentById);
app.post("/api/comments/addComments", commentController.createComment);
app.put("/api/comments/updateComments/:id", commentController.updateComment);
app.delete("/api/comments/deleteComments/:id", commentController.deleteComment);

// Cart
app.get("/api/cart/getCart", cartController.getAllCarts);
app.get("/api/cart/getCart/:id", cartController.getCartById);
app.post("/api/cart/createCart", cartController.createCart);
app.put("/api/cart/updateCart/:id", cartController.updateCart);
app.delete("/api/cart/deleteCart/:id", cartController.deleteCart);

//Order
app.get("/api/orders/getOrder", orderController.getAllOrders);
app.get("/api/orders/getOrder/:id", orderController.getOrderById);
app.post("/api/orders/createOrder", orderController.createOrder);
app.put("/api/orders/updateOrder/:id", orderController.updateOrder);
app.delete("/api/orders/deleteOrder/:id", orderController.deleteOrder);

module.exports = app;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
