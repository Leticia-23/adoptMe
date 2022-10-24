const Router = require("express");

const auth = require("./auth");
const users = require("./users");
const animals = require("./animals");
const institutions = require("./institutions");

const router = Router();

router.use("/auth", auth);

router.use("/users", users);

router.use("/animals", animals);

router.use("/institutions", institutions);

module.exports = router;
