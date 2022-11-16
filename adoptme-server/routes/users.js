const express = require("express");

const UserController = require("../controllers/users.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

const router = express.Router();

// Public

// Get user info
// URL: http://localhost:8080/api/users/{id}
router.get("/:id", UserController.getUser);

// Private

// Update profile
// URL: http://localhost:8080/api/users/profile
router.patch("/profile", verifyToken, UserController.updateProfile);

// Delete own user
// URL: http://localhost:8080/api/users
router.delete("/", UserController.deleteOwnUser);

// Ban other users
// URL: http://localhost:8080/api/users/{id}
router.delete("/:id", verifyToken, UserController.banUser);

// Get all users
// URL: http://localhost:8080/api/users
router.get("/", verifyToken, UserController.getUsers);

// Get own info
// URL: http://localhost:8080/api/users/me
router.get("/me", verifyToken, UserController.getOwnInfo);

// Get associations info
// URL: http://localhost:8080/api/users/association/{id}
router.get("/association/:id", verifyToken, UserController.getOwnInfo);

module.exports = router;
