const { signup, login } = require("../controllers/authController");

const express = require("express");
const router = express.Router();

// POST /signup (REGISTER)
router.post("/signup", signup);

// POST /login (REGISTER)
router.post("/login", login);

module.exports = router; 
