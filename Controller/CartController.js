const Cart = require('../Models/Cart');

// Get all carts
exports.getAllCarts = async (req, res) => {
    try {
        const carts = await Cart.find();
        res.send(carts);
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
};

// Get a cart by ID
exports.getCartById = async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.id);
        if (!cart) {
            return res.status(404).send("Cart not found");
        }
        res.send(cart);
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
};

// Create a new cart
exports.createCart = async (req, res) => {
    try {
        const cartCount = await Cart.countDocuments();
        const cart = new Cart({
            ...req.body,
            cartId: cartCount + 1
        });
        await cart.save();
        res.status(201).send(cart);
    } catch (error) {
        res.status(400).send({ error: 'Bad Request' });
    }
};

// Update a cart by ID
exports.updateCart = async (req, res) => {
    try {
        const cartId = req.params.id;
        const updatedData = req.body;

        let cart = await Cart.findById(cartId);

        if (!cart) {
            return res.status(404).send("Cart not found");
        }

        Object.assign(cart, updatedData);

        await cart.save();

        res.send(cart);
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
};

// Delete a cart by ID
exports.deleteCart = async (req, res) => {
    try {
        const cart = await Cart.findByIdAndDelete(req.params.id);
        if (!cart) {
            return res.status(404).send("Cart not found");
        }
        res.send(cart);
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
};
