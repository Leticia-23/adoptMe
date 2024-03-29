const mongoose = require("mongoose");

const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authHelper = require("../helpers/auth.helper");
const userHelper = require("../helpers/users.helper");
const institutionHelper = require("../helpers/institutions.helper");

// Public

const signup = async (req, res) => {
  const { name, email, password, repeatPassword } = req.body;

  // Check all parameters are not empty
  if (!name || !email || !password || !repeatPassword) {
    return res.status(400).json({ error: "Fill all the fields" });
  }

  // Check if the email is valid
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Email is not valid" });
  }

  // Check passwords
  if (password !== repeatPassword) {
    return res.status(400).json({ error: "Passwords don't match" });
  }

  // Generate a Salt
  const salt = await bcrypt.genSalt(10);
  // Hash password
  const hashed_password = await bcrypt.hash(password, salt);

  // Check user doesn't exist before and create user
  try {
    await authHelper.signup_helper(name, email, hashed_password);
    return res.status(201).json("Account created correctly");
  } catch (error) {
    return res.status(409).send({ error: "User already exist" });
  }
};

const signup_institution = async (req, res) => {
  const { name, email, password, repeatPassword } = req.body;

  // Check all parameters are not empty
  if (!name || !email || !password || !repeatPassword) {
    return res.status(400).json({ error: "Fill all the fields" });
  }

  // Check if the email is valid
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Email is not valid" });
  }

  // Check passwords
  if (password !== repeatPassword) {
    return res.status(400).json({ error: "Passwords don't match" });
  }

  // Generate a Salt
  const salt = await bcrypt.genSalt(10);
  // Hash password
  const hashed_password = await bcrypt.hash(password, salt);

  // Check user doesn't exist before and create user
  try {
    await authHelper.signup_institution_helper(name, email, hashed_password);
    return res.status(201).json("Institution created correctly");
  } catch (error) {
    return res.status(409).send({ error: "Institution already exist" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  let user = null;
  let institution = null;

  // Check parameters are not empty
  if (!email || !password) {
    return res.status(400).json({ error: "Fill all the fields" });
  }

  // Check if the email is valid
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Email is not valid" });
  }

  // Check if user or institution exists
  try {
    const { data, err } = await userHelper.findUserByEmail(email);
    user = data;

    if (err != null) {
      return res.status(400).json({ error: err });
    }
    if (!user) {
      // Search if is an institution
      const { data, err } = await institutionHelper.findInstitutionByEmail(
        email
      );
      institution = data;

      if (err != null) {
        return res.status(400).json({ error: err });
      }

      if (!institution) {
        return res
          .status(404)
          .json({ error: "There isn't an account with that email" });
      }
    }
  } catch (error) {
    return res.status(500).json({ error: error });
  }

  // Generate token
  if (!institution) {
    // Check password
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      // Better say "incorrect login" than "incorrect password"
      return res.status(400).json({ error: "Incorrect login. Try again" });
    }

    // User account
    const accesToken = jwt.sign(
      {
        name: user.name,
        id: user._id,
      },
      process.env.TOKEN_SECRET
    );

    // Response
    return res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      biography: user.biography,
      avatar: user.avatar,
      role: user.role,
      createdAt: user.createdAt,
      accessToken: accesToken,
    });
  } else {
    // Institution account

    // Check password
    const validPassword = await bcrypt.compare(password, institution.password);

    if (!validPassword) {
      // Better say "incorrect login" than "incorrect password"
      return res.status(400).json({ error: "Incorrect login. Try again" });
    }

    const accesToken = jwt.sign(
      {
        name: institution.name,
        id: institution._id,
      },
      process.env.TOKEN_SECRET
    );

    // Response
    return res.status(200).json({
      id: institution._id,
      name: institution.name,
      email: institution.email,
      web_URL: institution.web_URL,
      phoneNumber: institution.phoneNumber,
      information: institution.information,
      avatar: institution.avatar,
      createdAt: institution.createdAt,
      role: "institution",
      accessToken: accesToken,
    });
  }
};

// Private

const logout = async (req, res) => {
  return res.status(201).json("Logout correctly");
};

const createAdmin = async (req, res) => {
  const { name, email, password, repeatPassword } = req.body;

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
    await authHelper.createAdmin_heper(name, email, hashed_password);
    return res.status(201).json("Admin account created correctly");
  } catch (error) {
    return res.status(409).send({ error: "Admin already exist" });
  }
};

module.exports = { signup, signup_institution, login, logout, createAdmin };
