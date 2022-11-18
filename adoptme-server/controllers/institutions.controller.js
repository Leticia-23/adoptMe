const mongoose = require("mongoose");
const institutionHelper = require("../helpers/institutions.helper");

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

const banInstitution = async (req, res) => {
  const { id } = req.params;
  let institution = null;
  try {
    const { data, err } = await institutionHelper.deleteInsitutionById(id);
    institution = data;

    if (err != null) {
      return res.status(400).json({ error: err });
    }

    if (!institution) {
      return res
        .status(404)
        .json({ error: "It's not possible find the institution" });
    }
    return res.status(204).json();
  } catch (error) {
    return res.status(500).send(error);
  }
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
  banInstitution,
  getAnimals,
  getAnimal,
  getUser,
};
