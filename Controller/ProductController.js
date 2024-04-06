const Product = require("../Models/Product");

// Create a product
exports.createProduct = async (req, res) => {
    try {
        const id = await Product.countDocuments() + 1;
        const product = new Product({
            _id: id,
            ...req.body
        });
        await product.save();
        res.status(201).send(product);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.send(products);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send();
        }
        res.send(product);
    } catch (error) {
        res.status(500).send(error);
    }
};

//Update a product
exports.updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const updatedData = req.body;

        let product = await Product.findById(productId);

        if (!product) {
            return res.status(404).send("Product not found");
        }

        Object.assign(product, updatedData);

        await product.save();

        res.send(product);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).send();
        }
        res.send(product);
    } catch (error) {
        res.status(500).send(error);
    }
};
