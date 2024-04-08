const User = require("../Models/User");

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        res.status(500).send("Error fetching users: " + error.message);
    }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.send(user);
    } catch (error) {
        res.status(500).send("Error fetching user: " + error.message);
    }
};

// Create a new user
exports.createUser = async (req, res) => {
    try {
        const userCount = await User.countDocuments();
        const user = new User({
            ...req.body,
            userId: userCount + 1
        });
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(500).send("Error creating user: " + error.message);
    }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedData = req.body;

        let user = await User.findById(userId);

        if (!user) {
            return res.status(404).send("User not found");
        }

        Object.assign(user, updatedData);

        await user.save();

        res.send(user);
    } catch (error) {
        res.status(500).send("Error updating user: " + error.message);
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ userId: req.params.id });
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.send("User deleted successfully");
    } catch (error) {
        res.status(500).send("Error deleting user: " + error.message);
    }
};
