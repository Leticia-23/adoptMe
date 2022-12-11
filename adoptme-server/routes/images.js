const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const ImageController = require("../controllers/images.controller");

const router = express.Router();

// http://localhost:8080/api/images/avatar
router.post("/avatar", upload.single("avatar"), ImageController.uploadImage);

module.exports = router;
