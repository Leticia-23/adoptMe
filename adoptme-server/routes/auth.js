const express = require("express");

const UserController = require("../controllers/auth.controller");

const router = express.Router();

// Create user
// URL: http://localhost:5001/api/auth/signup
router.post("/signup", UserController.signup);

module.exports = router;
