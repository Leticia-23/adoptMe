const mongoose = require("mongoose");

// Public

const signup = async (req, res) => {
  return res.status(201).json("Account created correctly");
};

const signup_association = async (req, res) => {
  return res.status(201).json("Association created correctly");
};

const login = async (req, res) => {
  return res.status(201).json("Login correctly");
};

// Private

const logout = async (req, res) => {
  return res.status(201).json("Logout correctly");
};

module.exports = { signup, signup_association, login, logout };
