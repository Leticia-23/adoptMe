const mongoose = require("mongoose");
const animalHelper = require("../helpers/animals.helper");

// Public

const getList = async (req, res) => {
  return res.status(200).json("Get animals list correctly");
};

const getListAdopted = async (req, res) => {
  return res.status(200).json("Get adopted animals list correctly");
};

const getPublicAnimal = async (req, res) => {
  const { id } = req.params;
  let animal = null;

  try {
    const { data, err } = await animalHelper.findAnimalById(id);
    animal = data;

    if (err != null) {
      return res.status(400).json({ error: err });
    }

    if (!animal) {
      return res
        .status(404)
        .json({ error: "It's not possible find the animal" });
    }

    return res.status(200).json({
      name: animal.name,
      specie: animal.specie,
      breed: animal.breed,
      sex: animal.sex,
      photo: animal.photo,
      description: animal.description,
      adopted: animal.adopted,
      institution: animal.institution,
    });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// Private

const registerAnimal = async (req, res) => {
  // const { name, specie, breed, sex, photo, description, institution } =
  //   req.body;

  let animal = req.body;

  console.log("body: ", animal);
  delete animal.name;
  console.log("body without institution name: ", animal);

  //add to the body de institution id if not already added with verify token

  // Check all parameters are not empty
  // if (
  //   !animal_name ||
  //   !specie ||
  //   !breed ||
  //   !sex ||
  //   !photo ||
  //   !description ||
  //   !institution
  // ) {
  //   return res.status(400).json({ error: "Fill all the fields" });
  // }

  // Check user doesn't exist before and create user
  try {
    await animalHelper.registerAnimalHelper(animal);
    return res.status(201).json("Animal registered correctly");
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};

const getPrivateAnimal = async (req, res) => {
  const { id } = req.params;
  let animal = null;

  try {
    const { data, err } = await animalHelper.findAnimalById(id);
    animal = data;

    if (err != null) {
      return res.status(400).json({ error: err });
    }

    if (!animal) {
      return res
        .status(404)
        .json({ error: "It's not possible find the animal" });
    }

    return res.status(200).json({
      name: animal.name,
      specie: animal.specie,
      breed: animal.breed,
      sex: animal.sex,
      bornDate: animal.bornDate,
      size: animal.size,
      color: animal.color,
      photo: animal.photo,
      danger: animal.danger,
      sterile: animal.sterile,
      description: animal.description,
      adopted: animal.adopted,
      adoptionDate: animal.adoptionDate,
      institution: animal.institution,
      user: animal.user,
    });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
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
