const express = require("express");

const AuthController = require("../controllers/animals.controller");

const router = express.Router();

// Public

// Get animals to adopt list
// URL: http://localhost:8080/api/animals
router.get("/", AuthController.getList);

// Get adopted animals list
// URL: http://localhost:8080/api/animals/adopted
router.get("/adopted", AuthController.getListAdopted);

// Get public info for an animal
// URL: http://localhost:8080/api/animals/public/{id}
router.get("/public/:id", AuthController.getPublicAnimal);

// Private

// Register animal
// URL: http://localhost:8080/api/animals
router.post("/", AuthController.registerAnimal);

// Get private info for an animal
// URL: http://localhost:8080/api/animals/{id}
router.get("/:id", AuthController.getPublicAnimal);

// Update animal info
// URL: http://localhost:8080/api/animals/{id}
// TODO: use patch if not al data updated
// TODO: make adoptions table
router.put("/:id", AuthController.updateAnimal);

// Delete animal
// URL: http://localhost:8080/api/animals{id}
router.delete("/:id", AuthController.deleteAnimal);

module.exports = router;
