const Animal = require("../models/animals");

const findAnimalById = async (id) => {
  try {
    const res = await Animal.findOne({ _id: id, enabled: true });
    return {
      data: res,
      err: null,
    };
  } catch (error) {
    return {
      err: error,
    };
  }
};

const registerAnimalHelper = async (animal) => {
  const new_animal = new Animal({
    animal_name: animal.animal_name,
    specie: animal.specie,
    breed: animal.breed,
    sex: animal.sex,
    photo: animal.photo,
    description: animal.description,
    institution: animal.institution,
  });
  // Other fields created by deafult in the model or empty

  return await Animal.create(new_animal);
};

module.exports = { findAnimalById, registerAnimalHelper };
