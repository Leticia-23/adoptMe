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
      id: animal._id,
      animal_name: animal.animal_name,
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
  let animal = req.body;
  // delete name of institution from body
  delete animal.name;
  // put institution's id like institution instead id
  animal.institution = animal.id;
  delete animal.id;

  // Check all parameters are not empty
  if (
    !animal.animal_name ||
    !animal.specie ||
    !animal.breed ||
    !animal.sex ||
    !animal.photo ||
    !animal.description ||
    !animal.institution
  ) {
    return res.status(400).json({ error: "Fill all the fields" });
  }

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
      id: animal._id,
      animal_name: animal.animal_name,
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
      createdAt: animal.createdAt,
    });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

const updateAnimal = async (req, res) => {
  // return res.status(200).json("Update animal info correctly");
  let updates = req.body;
  const animalId = req.params.id;
  delete updates.animalId;
  // delete institution's info from body
  delete updates.id;
  delete updates.name;

  let animal = null;

  // Check if animal_name is a field to update
  if (updates.new_animal_name) {
    updates.animal_name = updates.new_animal_name;
    delete updates.new_animal_name;
  }

  try {
    const { data, err } = await animalHelper.updateAnimalById(
      animalId,
      updates
    );
    animal = data;

    if (err != null) {
      return res.status(400).json({ error: err });
    }

    if (!animal) {
      return res
        .status(404)
        .json({ error: "It's not possible find the animal" });
    }

    return res.status(200).json("Animal correclty updated");
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

const deleteAnimal = async (req, res) => {
  const { id } = req.params;
  let animal = null;
  try {
    const { data, err } = await animalHelper.deleteAnimalById(id);
    animal = data;

    if (err != null) {
      return res.status(400).json({ error: err });
    }

    if (!animal) {
      return res.status(404).json({
        error: "It's not possible find the animal",
      });
    }
    return res.status(204).json();
  } catch (error) {
    return res.status(500).send(error);
  }
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
