const Router = require("express");

const auth = require("./auth");
const users = require("./users");
const animals = require("./animals");
const institutions = require("./institutions");
const images = require("./images");

const router = Router();

router.use("/auth", auth);

router.use("/users", users);

router.use("/animals", animals);

router.use("/institutions", institutions);

router.use("/images", images);

module.exports = router;
