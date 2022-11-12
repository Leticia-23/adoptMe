const mongoose = require("mongoose");

const validator = require("validator");
const bcrypt = require("bcrypt");

const authHelper = require("../helpers/auth.helper");

// Public

const signup = async (req, res) => {
  const { username, email, password, repeatPassword } = req.body;

  console.log("signup", username, email, password, repeatPassword);

  // Check all parameters are not empty
  if (!username || !email || !password || !repeatPassword) {
    return res.status(400).json({ error: "Fill all the fields" });
  }

  // Check if the email is valid
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Email is not valid" });
  }

  // Generate a Salt
  const salt = await bcrypt.genSalt(10);
  // Hash password
  const hashed_password = await bcrypt.hash(password, salt);

  // Check user doesn't exist before and create user
  try {
    await authHelper.signup_helper(username, email, hashed_password);
    return res.status(201).json("Account created correctly");
  } catch (error) {
    return res.status(409).send({ error: "User already exist" });
  }
};

const signup_association = async (req, res) => {
  const { name, email, password, repeatPassword } = req.body;

  console.log("signup_association", name, email, password, repeatPassword);

  // Check all parameters are not empty
  if (!name || !email || !password || !repeatPassword) {
    return res.status(400).json({ error: "Fill all the fields" });
  }

  // Check if the email is valid
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Email is not valid" });
  }

  // Generate a Salt
  const salt = await bcrypt.genSalt(10);
  // Hash password
  const hashed_password = await bcrypt.hash(password, salt);

  // Check user doesn't exist before and create user
  try {
    await authHelper.signup_association_helper(name, email, hashed_password);
    return res.status(201).json("Institution created correctly");
  } catch (error) {
    return res.status(409).send({ error: "Institution already exist" });
  }
};

const login = async (req, res) => {
  return res.status(201).json("Login correctly");
};

// Private

const logout = async (req, res) => {
  return res.status(201).json("Logout correctly");
};

const createAdmin = async (req, res) => {
  const { username, email, password, repeatPassword } = req.body;

  console.log("createAdmin", username, email, password, repeatPassword);

  // Check all parameters are not empty
  if (!username || !email || !password || !repeatPassword) {
    return res.status(400).json({ error: "Fill all the fields" });
  }

  // Check if the email is valid
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Email is not valid" });
  }

  // Generate a Salt
  const salt = await bcrypt.genSalt(10);
  // Hash password
  const hashed_password = await bcrypt.hash(password, salt);

  // Check user doesn't exist before and create user
  try {
    await authHelper.createAdmin_heper(username, email, hashed_password);
    return res.status(201).json("Admin account created correctly");
  } catch (error) {
    return res.status(409).send({ error: "Admin already exist" });
  }
};

module.exports = { signup, signup_association, login, logout, createAdmin };
