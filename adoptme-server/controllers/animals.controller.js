const mongoose = require("mongoose");
const animalHelper = require("../helpers/animals.helper");

// Public

const getList = async (req, res) => {
  let animals = null;
  try {
    const { data, err } = await animalHelper.getListHelper();
    animals = data;

    if (err != null) {
      return res.status(400).json({ error: err });
    }

    if (!animals) {
      return res.status(404).json({
        error: "Animals to adopt not found",
      });
    }
    return res.status(200).json({ animals: animals });
  } catch (error) {
    return res.status(500).send(error);
  }
};

const getListAdopted = async (req, res) => {
  let animals = null;
  try {
    const { data, err } = await animalHelper.getListAdoptedHelper();
    animals = data;

    if (err != null) {
      return res.status(400).json({ error: err });
    }

    if (!animals) {
      return res.status(404).json({
        error: "Animals adopted not found",
      });
    }
    return res.status(200).json({ animals: animals });
  } catch (error) {
    return res.status(500).send(error);
  }
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
  // TODO: upload photo
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
    /* TODO: add photo */
    /* !animal.photo || */
    !animal.description ||
    !animal.institution
  ) {
    return res.status(400).json({ error: "Fill all the fields" });
  }

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
      /*  user: animal.user, */
      createdAt: animal.createdAt,
    });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// TODO: upload photo
const updateAnimal = async (req, res) => {
  let updates = req.body;

  const animalId = req.params.id;
  delete updates.animalId;

  // delete institution's info from body
  delete updates.id;
  delete updates.name;

  let animal = null;

  // Check if each field is empty ("") to delete for the patch request
  if (updates.new_animal_name === "") {
    //There isn't new name
    delete updates.new_animal_name;
  } else {
    // There is a new name
    updates.animal_name = updates.new_animal_name;
    delete updates.new_animal_name;
  }

  if (updates.description === "") {
    delete updates.description;
  }

  if (updates.size === "") {
    delete updates.size;
  }

  if (updates.color === "") {
    delete updates.color;
  }

  if (updates.bornDate === "") {
    delete updates.bornDate;
  }

  if (updates.danger === "") {
    delete updates.danger;
  } else {
    if (updates.danger === "Yes") {
      updates.danger = true;
    } else {
      updates.danger = false;
    }
  }

  if (updates.sterile === "") {
    delete updates.sterile;
  }
  if (updates.sterile === "Yes") {
    updates.sterile = true;
  } else {
    updates.sterile = false;
  }

  if (updates.adopted === "") {
    delete updates.adopted;
  }
  if (updates.adopted === "Yes") {
    updates.adopted = true;
  } else {
    updates.adopted = false;
  }

  if (updates.adoptionDate === "") {
    delete updates.adoptionDate;
  }

  if (updates.photo === "") {
    delete updates.photo;
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
