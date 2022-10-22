const mongoose = require("mongoose");

// Public

const getUserInfo = async (req, res) => {
  return res.status(201).json("Get user info correctly");
};

// Private

const updateProfile = async (req, res) => {
  return res.status(201).json("Update profile correctly");
};

const deleteOwnUser = async (req, res) => {
  return res.status(201).json("Delete own user correctly");
};

const banUser = async (req, res) => {
  return res.status(201).json("Ban user correctly");
};

const getUsers = async (req, res) => {
  return res.status(201).json("Get all users correctly");
};

const getOwnInfo = async (req, res) => {
  return res.status(201).json("Get own information correctly");
};

const getAssociationInfo = async (req, res) => {
  return res.status(201).json("Get association private information correctly");
};

module.exports = {
  getUserInfo,
  updateProfile,
  deleteOwnUser,
  banUser,
  getUsers,
  getOwnInfo,
  getAssociationInfo,
};
