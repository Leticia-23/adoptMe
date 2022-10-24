const mongoose = require("mongoose");

// Public

const getList = async (req, res) => {
  return res.status(200).json("Get animals list correctly");
};

const getListAdopted = async (req, res) => {
  return res.status(200).json("Get adopted animals list correctly");
};

const getPublicAnimal = async (req, res) => {
  return res.status(200).json("Get public animal info correctly");
};

// Private

const registerAnimal = async (req, res) => {
  return res.status(201).json("Register animal correctly");
};

const getPrivateAnimal = async (req, res) => {
  return res.status(200).json("Get private animal info correctly");
};

const updateAnimal = async (req, res) => {
  return res.status(200).json("Update animal info correctly");
};

const deleteAnimal = async (req, res) => {
  return res.status(204).json();
};

module.exports = {
  getList,
  getListAdopted,
  getPublicAnimal,
  registerAnimal,
  getPrivateAnimal,
  updateAnimal,
  deleteAnimal,
};
