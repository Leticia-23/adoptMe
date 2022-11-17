const express = require("express");

const InstitutionController = require("../controllers/institutions.controller");
const { verifyToken, isAdmin } = require("../middlewares/auth.middleware");

const router = express.Router();

// Public

// Get institution info
// URL: http://localhost:8080/api/institutions/{id}
router.get("/:id", InstitutionController.getInstitution);

// Get all institutions
// URL: http://localhost:8080/api/institutions
router.get("/", InstitutionController.getInstitutions);

// Private

// Update institution profile
// URL: http://localhost:8080/api/institutions/profile
//TODO: use patch for only some fields
router.patch("/profile", verifyToken, InstitutionController.updateInstitution);

// Get own institution info
// URL: http://localhost:8080/api/institutions/me
router.get("/me", verifyToken, InstitutionController.getInstitutionInfo);

// Ban institution
// URL: http://localhost:8080/api/institutions/{id}
router.delete(
  "/:id",
  verifyToken,
  isAdmin,
  InstitutionController.banInstitution
);

// Get animals of institution
// URL: http://localhost:8080/api/institutions/{id}/animals
router.get("/:id/animals", verifyToken, InstitutionController.getAnimals);

// Get concrete animal of institution
// URL: http://localhost:8080/api/institutions/{id}/animals/{id}
router.get("/:id/animals/:id", verifyToken, InstitutionController.getAnimal);

// Get user who adopted concrete animal of institution
// URL: http://localhost:8080/api/institutions/{id}/animals/{id}/user
router.get("/:id/animals/:id/user", verifyToken, InstitutionController.getUser);

module.exports = router;
