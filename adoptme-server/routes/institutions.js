const express = require("express");

const InstitutionController = require("../controllers/institutions.controller");

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
router.patch("/profile", InstitutionController.updateInstitution);

// Get own institution info
// URL: http://localhost:8080/api/institutions/me
router.get("/me", InstitutionController.getInstitutionInfo);

// Get animals of institution
// URL: http://localhost:8080/api/institutions/{id}/animals
router.get("/:id/animals", InstitutionController.getAnimals);

// Get concrete animal of institution
// URL: http://localhost:8080/api/institutions/{id}/animals/{id}
router.get("/:id/animals/:id", InstitutionController.getAnimal);

// Get user who adopted concrete animal of institution
// URL: http://localhost:8080/api/institutions/{id}/animals/{id}/user
router.get("/:id/animals/:id/user", InstitutionController.getUser);

module.exports = router;
