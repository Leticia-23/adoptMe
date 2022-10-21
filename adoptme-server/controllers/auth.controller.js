const mongoose = require("mongoose");

// Public

const signup = async (req, res) => {
  return res.status(201).json("Account created correctly");
};

const login = async (req, res) => {
  return res.status(201).json("Login correctly");
};

// Private

const logout = async (req, res) => {
  return res.status(201).json("Logout correctly");
};

module.exports = { signup, login, logout };
