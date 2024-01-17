const { Collection } = require("mongodb");
const { getUsersCollection } = require("../models/userModel");
const { createSecretToken } = require("../util/secretToken");
const bcrypt = require("bcryptjs");

// Signup a user
module.exports.signup = async (request, response) => {
    try {
        const collection = getUsersCollection();
        let { username, password, createdAt } = request.body;

        const existingUser = await collection.findOne({ username });

        if (existingUser) return response.json({ message: "User alredy exists" });

        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        createdAt = new Date();

        if (!username || !password)
            return response.json({
                message: "Invalid username or password"
            })

        const user = await collection.insertOne({ username, password, createdAt });
        const token = createSecretToken(user._id);

        response.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
        });

        response.status(201).json({
            message: "User signed up successfully",
            success: true,
            user
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports.login = async (request, response) => {
    try{
        const collection = getUsersCollection();
        const { username, password } = request.body;

        if (!username || !password)
            return response.json({ message: "All fields are required!" });

        const user = await collection.findOne({ username });
        if (!user)
            return response.json({
                message: "Incorrect username or password"
            });

        const auth = await bcrypt.compare(password, user.password); 
        if (!auth)
            return response.json({
                message: "Incorrect username or password"
            })

        const token = createSecretToken(user._id);
        response.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
        });

        response.status(200).json({
            message: "User logged in successfully!",
            success: true
        });
    } catch (error) {
        console.log(error);
    }
};
