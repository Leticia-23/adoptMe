const mongoose = require("mongoose");

// Public

const getInstitution = async (req, res) => {
  return res.status(200).json("Get institution info correctly");
};

const getInstitutions = async (req, res) => {
  return res.status(200).json("Get all institutions correctly");
};

// Private

const updateInstitution = async (req, res) => {
  return res.status(200).json("Update profile correctly");
};

const getInstitutionInfo = async (req, res) => {
  return res
    .status(200)
    .json("Get own and private institution information correctly");
};

const getAnimals = async (req, res) => {
  return res.status(200).json("Get animals of institution correctly");
};

const getAnimal = async (req, res) => {
  return res.status(200).json("Get concrete animal of institution correctly");
};

const getUser = async (req, res) => {
  return res
    .status(200)
    .json("Get user who adopted concrete animal of institution correctly");
};

module.exports = {
  getInstitution,
  getInstitutions,
  updateInstitution,
  getInstitutionInfo,
  getAnimals,
  getAnimal,
  getUser,
};
