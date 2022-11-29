const express = require("express");

const InstitutionController = require("../controllers/institutions.controller");
const {
  verifyToken,
  isAdmin,
  isInstitution,
} = require("../middlewares/auth.middleware");

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
router.patch(
  "/profile",
  verifyToken,
  isInstitution,
  InstitutionController.updateInstitution
);

// Get own institution info
// URL: http://localhost:8080/api/institutions/info/me
router.get(
  "/info/me",
  verifyToken,
  isInstitution,
  InstitutionController.getInstitutionInfo
);

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
router.get(
  "/:id/animals",
  verifyToken,
  isInstitution,
  InstitutionController.getAnimals
);

// Get user who adopted concrete animal of institution
// URL: http://localhost:8080/api/institutions/{idInst}/animals/{idAnim}/user
router.get(
  "/:idInst/animals/:idAnim/user",
  verifyToken,
  InstitutionController.getUser
);

module.exports = router;
