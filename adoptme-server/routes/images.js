const express = require("express");

const ImageController = require("../controllers/images.controller");

const router = express.Router();

router.post(
  "/user/avatar",
  upload.single("avatar"),
  ImageController.updateAvatar
);

module.exports = router;
