require("dotenv").config();
const jwt = require("jsonwebtoken");
const { getUsersCollection } = require("../models/userModel");
const { ObjectId } = require("mongodb");

module.exports.userVerification = (request, response) => {
    const collection = getUsersCollection();

    const token = request.cookies.token;
    
    if (!token) return response.json({ status: false });

    jwt.verify(token, process.env.TOKEN_KEY, async (error, data) => {
        if (error) return response.json({ status: false });

        const _id = new ObjectId(data.id);
        
        const user = await collection.findOne({ _id });
        if (!user) return response.json({ status: false });

        return response.json({
            status: true,
            username: user.username,
            id: user._id
        });
    });
};
