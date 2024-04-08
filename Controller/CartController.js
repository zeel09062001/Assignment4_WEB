const Cart = require('../Models/Cart');

exports.getAllCarts = async (req, res) => {
    try {
        const carts = await Cart.find();
        res.send(carts);
    } catch (error) {
        handleServerError(res, error);
    }
};

exports.getCartById = async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.id);
        if (!cart) {
            return res.status(404).send({ error: "Cart not found" });
        }
        res.send(cart);
    } catch (error) {
        handleServerError(res, error);
    }
};

exports.createCart = async (req, res) => {
    try {
        const cart = new Cart(req.body);
        await cart.save();
        res.status(201).send({ message: 'Cart created successfully', cart });
    } catch (error) {
        handleServerError(res, error);
    }
};

exports.updateCart = async (req, res) => {
    try {
        const cartId = req.params.id;
        const updatedData = req.body;
        const cart = await Cart.findOneAndUpdate({ cartId: cartId }, updatedData, { new: true });

        if (!cart) {
            return res.status(404).send({ error: "Cart not found" });
        }

        res.send({ message: 'Cart updated successfully', cart });
    } catch (error) {
        handleServerError(res, error);
    }
};

exports.deleteCart = async (req, res) => {
    try {
        const cartId = req.params.id;
        const cart = await Cart.findOneAndDelete({ cartId: cartId });

        if (!cart) {
            return res.status(404).send({ error: "Cart not found" });
        }

        res.send({ message: 'Cart deleted successfully', cart });
    } catch (error) {
        handleServerError(res, error);
    }
};

function handleServerError(res, error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
}
