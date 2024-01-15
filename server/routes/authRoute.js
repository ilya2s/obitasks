const { signup, login } = require("../controllers/authController");
const { userVerification } = require("../middlewares/authMiddleware");

const express = require("express");
const router = express.Router();

// POST /signup (REGISTER)
router.post("/signup", signup);

// POST /login (REGISTER)
router.post("/login", login);

// POST / (User verification in home dir)
router.post("/", userVerification);

module.exports = router; 
