const express = require("express");

const UserController = require("../controllers/users.controller");

const router = express.Router();

// Public

// Get user info
// URL: http://localhost:8080/api/users/{id}
router.get("/:id", UserController.getUserInfo);

// Private

// Update profile
// URL: http://localhost:8080/api/users/profile
router.put("/profile", UserController.updateProfile);

// Delete own user
// URL: http://localhost:8080/api/users
router.delete("/", UserController.deleteOwnUser);

// Ban other users
// URL: http://localhost:8080/api/users/{id}
router.delete("/:id", UserController.banUser);

// Get all users
// URL: http://localhost:8080/api/users
router.get("/", UserController.getUsers);

// Get own info
// URL: http://localhost:8080/api/users/me
router.get("/me", UserController.getOwnInfo);

// Get associations info
// URL: http://localhost:8080/api/users/association/{id}
router.get("/association/:id", UserController.getOwnInfo);

module.exports = router;
