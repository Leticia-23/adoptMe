const express = require("express");

const AuthController = require("../controllers/auth.controller");

const router = express.Router();

// Public

// Create user
// URL: http://localhost:8080/api/auth/signup
router.post("/signup", AuthController.signup);

// Create association
// URL: http://localhost:8080/api/auth/signup/association
router.post("/signup/association", AuthController.signup_association);

// Login user
// URL: http://localhost:8080/api/auth/login
router.post("/login", AuthController.login);

// Private

// Logout user
// URL: http://localhost:8080/api/auth/logout
router.post("/logout", AuthController.logout);

module.exports = router;
