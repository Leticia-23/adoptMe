const express = require("express");

const AuthController = require("../controllers/auth.controller");

const { verifyToken } = require("../middlewares/auth.middleware");

const router = express.Router();

// Public

// Create user
// URL: http://localhost:8080/api/auth/signup
router.post("/signup", AuthController.signup);

// Create association
// URL: http://localhost:8080/api/auth/signup/institution
router.post("/signup/institution", AuthController.signup_institution);

// Login user or institution
// URL: http://localhost:8080/api/auth/login
router.post("/login", AuthController.login);

// Only endpoint, not for frontend

// Create admin
// URL: http://localhost:8080/api/auth/admin
router.post("/admin", AuthController.createAdmin);

// Private

// Logout user
// URL: http://localhost:8080/api/auth/logout
router.post("/logout", verifyToken, AuthController.logout);

module.exports = router;
