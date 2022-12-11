const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const ImageController = require("../controllers/images.controller");

const router = express.Router();

/* router.post(
  "/user/avatar",
  upload.single("avatar"),
  ImageController.updateAvatar
); */

// http://localhost:8080/api/images/user/avatar
router.post(
  "/user/avatar",
  upload.single("avatar"),
  ImageController.uploadImage
);

module.exports = router;
